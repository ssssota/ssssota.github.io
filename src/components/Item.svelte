<script>
  export let title;
</script>

<section>
  <slot name="icon"></slot>
  <div>
    <h3>{title || 'Title is a requried.'}</h3>
    <slot name="content"></slot>
  </div>
</section>

<style>
section {
  display: flex;
  flex: wrap;
  align-items: center;
}
</style>