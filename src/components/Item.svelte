<script>
  export let title;
  export let href = null;
  export let target = null;
</script>

<section>
  <slot name="icon"></slot>
  <div>
    <h3>
      {#if href}
        <a {href} {target}>{title || 'Title is a requried.'}</a>
      {:else}
        {title || 'Title is a requried.'}
      {/if}
    </h3>
    <slot name="content"></slot>
  </div>
</section>

<style type="text/scss">
section {
  display: flex;
  flex: wrap;
  align-items: center;
  
  h3 {
    font-family: 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;

    &:link,
    &:visited,
    &:active {
      color: inherit;
    }
  }
}
</style>