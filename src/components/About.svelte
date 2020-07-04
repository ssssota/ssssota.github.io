<script>
  import Item from './Item.svelte';
  const iconSize = 48;
</script>

<section>
  <p>
    <img src="./assets/face_icon.min.svg" alt="アイコン" />
  </p>
  <div>
    <Item title="Tomikawa Sotaro">
      <p slot="content">絵も、デザインも、音楽も全部やりたいけど、長続きするのはプログラミング関係だけ。</p>
    </Item>
    <ul>
      <li>
        <Item title="Univ.">
          <img slot="icon" src="./assets/school.svg" alt="学校のアイコン" width="{iconSize}" height="{iconSize}"/>
          <p slot="content">九州工業大学</p>
        </Item>
      </li>
      <li>
        <Item title="GitHub">
          <img slot="icon" src="./assets/GitHub-Mark.svg" alt="GitHubのアイコン" width="{iconSize}" height="{iconSize}">
          <p slot="content"><a href="https://github.com/ssssota" target="_blank">ssssota</a></p>
        </Item>
      </li>
      <li>
        <Item title="Twitter">
          <img slot="icon" src="./assets/Twitter_Social_Icon_Circle_Black.svg" alt="Twitterのアイコン" width="{iconSize}" height="{iconSize}">
          <p slot="content"><a href="https://twitter.com/ssssotaro" target="_blank">@ssssotaro</a></p>
        </Item>
      </li>
    </ul>
  </div>
</section>

<style type="text/scss">
section {
  border-right: 5px dashed white;
  width: 25%;
  min-width: 300px;
  padding: 2em;

  &>p {
    text-align: center;
    
    img {
      width: 75%;
    }
  }

  div>:global(section h3) {
    font-size: 2em;
  }
  
  ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
      display: block;
      list-style: none;
      margin: 0 1em;

      & :global(section) {
        align-items: center;
      }
      img {
        margin: 0.5em;
        display: block;
        height: 100%;
      }
    }
  }
}

@media (max-width: 1304px) {
  section {
    border: 0;
    width: 100%;
    &>p img {
      max-width: 300px;
    }

    ul {
      justify-content: space-evenly;
    }
  }
}
</style>