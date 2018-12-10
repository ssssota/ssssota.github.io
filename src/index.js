const $content = document.querySelector('#content')
const urlParam = (() => {
  const obj = {}
  const opts = location.search.substr(1).split('&')
  opts.forEach(opt => {
    if (opt === '') return
    const [key, val] = opt.split('=')
    obj[key] = val
  })
  console.log(obj)
  return obj
})()

document.addEventListener('DOMContentLoaded', () => {
  if (urlParam.page) {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      console.log(xhr.response)
      $content.insertAdjacentHTML('afterbegin', marked(xhr.response))
    })
    xhr.open('get', './'+urlParam.page.replace(/./g, '/')+'.md')
    xhr.send()
  } else {
    console.log('no spec')
  }
})