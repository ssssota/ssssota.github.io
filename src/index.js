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
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    console.log(xhr.response)
    $content.insertAdjacentHTML('afterbegin', marked(xhr.response))
  })
  if (urlParam.page) {
    const url = './'+urlParam.page.replace(/\./g, '/').replace(/\/$/, '/index')+'.md'
    console.log(url)
    xhr.open('get', url)
  } else {
    xhr.open('get', './index.md')
  }
  xhr.send()
})