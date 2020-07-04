<script>
  import Item from './Item.svelte';
  import Techtip from './Techtip.svelte';
</script>

<Item title="Works">
  <span slot="content">
    <Item title="fontvuer" href="https://fontvuer.netlify.app" target="_blank">
      <img src="https://fontvuer.netlify.app/icon.png" alt="fontvuer icon" slot="icon"/>
      <span slot="content">
        <p>フォント一覧表示アプリ。下記Fontviewerの後継。</p>
        <p>
          <Techtip name="TypeScript"/>
          <Techtip name="Electron"/>
          <Techtip name="Vue.js"/>
          <Techtip name="GitHub Actions"/>
        </p>
      </span>
    </Item>
    <Item title="fontscan" href="https://www.npmjs.com/package/fontscan" target="_blank">
      <img src="./assets/noimage.svg" alt="NO Image" slot="icon"/>
      <span slot="content">
        <p>フォント情報を取得するNode.jsライブラリ。</p>
        <p>
          <Techtip name="TypeScript"/>
        </p>
      </span>
    </Item>
    <Item title="nwoc-sm" href="https://github.com/ssssota/nwoc-sm" target="_blank">
      <img src="https://raw.githubusercontent.com/ssssota/nwoc-sm/master/nwoc-sm/src/assets/sm.svg" alt="nwoc-smのアイコン" slot="icon"/>
      <span slot="content">
        <p>豊田高専卒業時、5年間活動した吹奏楽部に贈った「楽譜管理アプリ」。</p>
        <p>
          <Techtip name="TypeScript"/>
          <Techtip name="Vue.js"/>
          <Techtip name="SCSS"/>
          <Techtip name="Firebase"/>
          <Techtip name="Github Actions"/>
        </p>
      </span>
    </Item>
    <Item title="Lean to Turn">
      <img src="https://cdn.discordapp.com/app-icons/493392808237858826/375debb8c608805f1e7a5ccdb547621a.png" alt="Lean to Turnのアイコン" slot="icon"/>
      <span slot="content">
        <p>豊田高専4年時、学科展示として制作した。Unityでカメラを用いたモーショントラッキングによるカーレースゲーム。</p>
        <p>
          <Techtip name="Unity"/>
          <Techtip name="C#"/>
          <Techtip name="OpenCV"/>
        </p>
      </span>
    </Item>
    <Item title="Fontviewer" href="https://github.com/ssssota/fontviewer" target="_blank">
      <img src="https://raw.githubusercontent.com/ssssota/fontviewer/master/src/icon256.png" alt="Fontviewerのアイコン" slot="icon"/>
      <span slot="content">
        <p>自分のデザイン補助ツールとして作ったフォント一覧表示アプリ。<a href="https://coliss.com/articles/build-websites/operation/design/fontviewer.html">coliss.com</a>様で紹介していただいた。</p>
        <p>
          <Techtip name="JavaScript"/>
          <Techtip name="CSS"/>
          <Techtip name="Electron"/>
        </p>
      </span>
    </Item>
    <Item title="Portfolio" href="https://github.com/ssssota/ssssota.github.io" target="_blank">
      <img src="/favicon.png" alt="このページのアイコン" slot="icon"/>
      <span slot="content">
        <p>このページ。就活で必要になると思って急いで用意した。</p>
        <p>
          <Techtip name="Svelte"/>
          <Techtip name="Github Pages"/>
          <Techtip name="Github Actions"/>
        </p>
      </span>
    </Item>
    <Item title="CSSアニメーションで「たべるんごのうた」" href="https://taberungo-no-uta.netlify.app/" target="_blank">
      <img src="https://taberungo-no-uta.netlify.app/images/りんごろう.png" alt="りんごろう" slot="icon"/>
      <span slot="content">
        <p>流行りに乗ってCSSアニメーションの練習を兼ねて作った。</p>
        <p>
          <Techtip name="SCSS"/>
          <Techtip name="CSSアニメーション"/>
          <Techtip name="Svelte"/>
        </p>
      </span>
    </Item>
    <Item title="願う" href="https://negau-tanabata.web.app/" target="_blank">
      <img src="./assets/noimage.svg" alt="NO Image" slot="icon"/>
      <span slot="content">
        <p>七夕の短冊飾り風画像ジェネレータ。Twitterなどで共有できる。</p>
        <p>
          <Techtip name="Firebase"/>
          <Techtip name="Canvas"/>
          <Techtip name="JavaScript"/>
        </p>
      </span>
    </Item>
  </span>
</Item>

<style type="text/scss">
img {
  margin: 1em;
  display: block;
  height: 5em;
}
  
@media (max-width: 1304px) {
  img {
    height: 3em;
  }
}
</style>