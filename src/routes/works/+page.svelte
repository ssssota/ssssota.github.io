<script lang="ts">
  import Work from '$lib/components/Work.svelte';
  import { works } from '$lib/data';
</script>

<h1>Works</h1>
{#each works as work (work.name)}
  <Work {work} />
{/each}
