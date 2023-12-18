<script lang="ts">
  import Career from '$lib/components/Career.svelte';
  import { careers } from '$lib/data';

  let sortedCareer: typeof careers;
  $: sortedCareer = careers.sort(
    (a, b) =>
      new Date(`${a.from.year}/${a.from.month}/1`).valueOf() -
      new Date(`${b.from.year}/${b.from.month}/1`).valueOf(),
  );
</script>

<h1>Career</h1>
{#each sortedCareer as career (career.name)}
  <Career {career} />
{/each}
