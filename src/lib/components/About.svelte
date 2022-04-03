<script lang="ts">
  import type { About } from '$lib/data';

  export let about: About;
</script>

<h2>{about.name}</h2>
{#if about.nickname !== undefined}
  <p>{about.nickname}</p>
{/if}
{#if about.github !== undefined}
  <p><a href="https://github.com/{about.github}">{about.github}</a></p>
{/if}
{#if about.twitter !== undefined}
  <p><a href="https://twitter.com/{about.twitter}">{about.twitter}</a></p>
{/if}
