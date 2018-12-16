const $content = document.querySelector('#content')

// URLパラメータを取得
const getUrlParam = (search) => {
  const obj = {}
  const opts = (search || location.search).substr(1).split('&')
  opts.forEach(opt => {
    if (opt === '') return
    const [key, val] = opt.split('=')
    obj[key] = val
  })
  return obj
}
const urlParam = getUrlParam()

 // 指定要素にマークダウンをロード
const loadMarkdownToElem = $elem => url => {
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('progress', e => console.log(e))
  xhr.addEventListener('load', () => {
    resetHTML($elem, marked(xhr.responseText))
    setupOriginLink()
  })
  xhr.open('get', url)
  xhr.send()
}
const loadMarkdown = loadMarkdownToElem($content)

// HTMLテキストから要素をリセット = innerHTML
const resetHTML = ($elem, htmlText) => {
  $elem.textContent = ''
  $elem.insertAdjacentHTML('afterbegin', htmlText)
}

// 同一オリジンのリンクを設定
const setupOriginLink = () => {
  document.querySelectorAll('a[href]').forEach($e => {
    const url = new URL($e.href)
    if (isSamePath(url)) {
      $e.addEventListener('click', e => {
        e.preventDefault()
        pageTransition(url)
      })
    }
  })
}

// 指定URLオブジェクトに遷移
const pageTransition = (url) => {
  history.pushState(null, '', url.href)
  loadMarkdown(pageParamToUrl(getUrlParam(url.search)))
}

// ページパラメータからmarkdownのURLを生成
const pageParamToUrl = param => {
  return (param.page)?
    './' + param.page.replace(/\./g, '/').replace(/\/$/, '/index') + '.md':
    './index.md'
}

// URLオブジェクトは同じパスか
const isSamePath = (url) => {
  return url.origin === location.origin && url.pathname.replace(/index\.html/, '') === '/' && getUrlParam(url.search).page
}

// onload
document.addEventListener('DOMContentLoaded', () => {
  loadMarkdown(pageParamToUrl(urlParam))
})
// 遷移が発生したら
onpopstate = e => {
  loadMarkdown(pageParamToUrl(getUrlParam()))
}