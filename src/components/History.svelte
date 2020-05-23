<script>
  import Item from './Item.svelte';
  let selected = { title: 'test', detail: 'hello world' };
</script>

<Item title="History">
  <span slot="content">
    <Item title="{selected.title}">
      <p slot="content">{selected.detail}</p>
    </Item>
    <p><input type="range"></p>
  </span>
</Item>

<style type="text/scss">
span {
  input[type="range"] {
    width: 60vw;

    appearance: none;
    -webkit-appearance: none;
    background-color: black;
    line-height: 1;
    height: 1px;
    border-radius: 5px;
  }
}

@media (max-width: 1304px) {
  span input[type="range"] {
    width: 70vw;
  }
}
</style>