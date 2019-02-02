document.addEventListener('DOMContentLoaded', () => {
    new InputQuestion()
})

class InputQuestion {
    get months() { return 12 }
    get list() {
        return [
            ['厳寒', '初春', '新春'],
            ['厳冬', '立春', '余寒'],
            ['弥生', '早春', '浅春'],
            ['春暖', '陽春', '桜花'],
            ['新緑', '若葉', '薫風'],
            ['初夏', '向夏', '梅雨'],
            ['盛夏', '猛暑', '大暑'],
            ['晩夏', '立秋', '残暑'],
            ['新秋', '初秋', '清秋'],
            ['仲秋', '秋冷', '紅葉'],
            ['晩秋', '暮秋', '向寒'],
            ['初冬', '寒冷', '師走']
        ]
    }

    get correctAns() {
        return this.list[this.currentMonth].sort()
    }

    get used() {
        return this._used
    }

    get currentMonth() {
        return this._current
    }
    set currentMonth(m) {
        this._count++
        this._current = m
    }

    get randomMonth() {
        return Math.floor(Math.random() * this.months)
    }

    get nextMonth() {
        let m = this.randomMonth
        while (this.used[m]) m = this.randomMonth
        return m
    }

    constructor(form = '#questionForm',
                month = '#month',
                ans1 = '#ans1',
                ans2 = '#ans2',
                ans3 = '#ans3') {
        console.log(this)

        this.$form = document.querySelector(form)
        this.$month = document.querySelector(month)
        this.$ans1 = document.querySelector(ans1)
        this.$ans2 = document.querySelector(ans2)
        this.$ans3 = document.querySelector(ans3)

        this.$form.addEventListener('submit', this.onAns.bind(this))

        this._count = 0
        this._used = []
        for (let i = 0; i < this.months; i++) this._used[i] = false

        this.setQuestion()
    }

    setQuestion() {
        this.currentMonth = this.nextMonth
        this._used[this.currentMonth] = true
        this.$month.textContent = this.currentMonth + 1
        this.$ans1.value = this.$ans2.value = this.$ans3.value = ''
    }

    onAns(e) {
        e.preventDefault()

        const ans = [this.$ans1.value.trim(),
                     this.$ans2.value.trim(),
                     this.$ans3.value.trim()].sort()
        if (ans[0] == this.correctAns[0] &&
            ans[1] == this.correctAns[1] &&
            ans[2] == this.correctAns[2]) {
            alert('正解')
        } else {
            alert(this.correctAns)
        }

        if (this._count >= 12) {
            this._count = 0
            this._used.map(() => false)
        }
        this.setQuestion()
    }
}