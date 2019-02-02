document.addEventListener('DOMContentLoaded', () => {
    new SelectQuestion()
})

class SelectQuestion {
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
    get months() { return 12 }
    get randomMonth() {
        return Math.floor(Math.random() * this.months)
    }
    get randomQuestion() {
        const month = this.randomMonth
        const id = Math.floor(Math.random() * 3)
        return { month, id, question: this.list[month][id]}
    }

    set currentQuestion(q) {
        this._current = q
    }
    get currentQuestion() {
        return this._current
    }

    get nextQuestion() {
        let q = this.randomQuestion
        while (this.currentQuestion == q) q = this.randomQuestion
        return q
    }

    constructor(word = '#word', btn = '#month') {
        console.log(this)
        this.$word = document.querySelector(word)
        this.$months = []
        for (let i = 0; i < this.months; i++) {
            this.$months[i] = document.querySelector(btn + (i + 1))
            this.$months[i].addEventListener('click', this.onAns.bind(this))
        }

        this.setQuestion()
    }

    setQuestion() {
        this.currentQuestion = this.nextQuestion
        this.$word.textContent = this.currentQuestion.question
    }

    onAns(e) {
        console.log(e.target)
        const month = e.target.dataset.month - 1

        if (this.currentQuestion.month == month) {
            alert('正解')
        } else {
            alert((this.currentQuestion.month + 1) + '月')
        }

        this.setQuestion()
    }
}