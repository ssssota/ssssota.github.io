<script lang="ts">
  import type { Career } from '$lib/data';
  import Description from './Description.svelte';

  export let career: Career;
  let from: string;
  $: {
    const date = new Date(`${career.from.year}/${career.from.month}/1`);
    from = `${date.getFullYear()}/${date.getMonth() + 1}`;
  }
  let to = '現在';
  $: if (career.to === undefined) {
    to = '現在';
  } else {
    const date = new Date(`${career.to.year}/${career.to.month}/1`);
    to = `${date.getFullYear()}/${date.getMonth() + 1}`;
  }
</script>

<h3>{career.name}</h3>
<p>{from} ~ {to}</p>
{#if career.description !== undefined}
  <Description content={career.description} />
{/if}
