<script>
  import Item from './Item.svelte';
  import Techtip from './Techtip.svelte';
</script>

<Item title="Works">
  <span slot="content">
    <Item title="nwoc-sm">
      <img src="https://raw.githubusercontent.com/ssssota/nwoc-sm/master/nwoc-sm/src/assets/sm.svg" alt="nwoc-smのアイコン" slot="icon"/>
      <span slot="content">
        <p>豊田高専卒業時、5年間活動した吹奏楽部に贈った「楽譜管理アプリ」。</p>
        <p>
          <Techtip name="Typescript"/>
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
    <Item title="Fontviewer">
      <img src="https://raw.githubusercontent.com/ssssota/fontviewer/master/src/icon256.png" alt="Fontviewerのアイコン" slot="icon"/>
      <span slot="content">
        <p>自分のデザイン補助ツールとして作ったフォント一覧表示アプリ。<a href="https://coliss.com/articles/build-websites/operation/design/fontviewer.html">coliss.com</a>様で紹介していただいた。</p>
        <p>
          <Techtip name="Javascript"/>
          <Techtip name="CSS"/>
          <Techtip name="Electron"/>
        </p>
      </span>
    </Item>
    <Item title="Portfolio">
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