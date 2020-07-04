<script>
  import Item from './Item.svelte';
  const skills = [
    { name: 'JavaScript', detail: '何を作るにもだいたい使ってる。' },
    { name: 'TypeScript', detail: 'AltJSの中でも一番好き。' },
    { name: 'Haxe', detail: 'アルバイト先の主力言語。AltJSとして使う。' },
    { name: 'C#', detail: 'JSよりネイティブ寄りなものを作るときに使う。' },
    { name: 'C', detail: 'Arduino言語として使うことが多い。' },
    { name: 'Firebase', detail: '趣味で使うサーバレス環境。' },
    { name: 'Azure', detail: 'アルバイト先で使うサーバレス環境。' },
    { name: 'WebRTC', detail: 'いま熱いと思う技術。触ったことがあるのはWebAPIとOSSのmediasoup。' }
  ];
</script>

<Item title="Skills">
  <div slot="content" class="flex">
    {#each skills as skill}
      <Item title="{skill.name}">
        <p slot="content">{skill.detail}</p>
      </Item>
    {/each}
  </div>
</Item>

<style type="text/scss">
.flex {
  display: flex;
  flex-wrap: wrap;

  & :global(section) {
    padding: 0.5em 1.5em;
  }
  & :global(section h3) {
    margin: 0.2em 0;
  }

  p {
    margin: 0;
    padding: 0;
  }
}
</style>