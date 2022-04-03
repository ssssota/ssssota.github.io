<script lang="ts">
  import type { Work } from '$lib/data';
  import Description from './Description.svelte';

  export let work: Work;
</script>

<h3><a href={work.link}>{work.name}</a></h3>
<Description content={work.description} />
