<script>
  export let name;
  export let color = null;

  $: computedColor = color || `hsl(${name.split('').map(c=>c.charCodeAt(0)).reduce((acc,cur)=>acc^cur)*4%360}, 100%, 75%)`
</script>

<span style="background: {computedColor}">
  {name}
</span>

<style>
span {
  margin: 0 0.5em;
  padding: 1px 0.5em;
  border-radius: 1em;
}
</style>