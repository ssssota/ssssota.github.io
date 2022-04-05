<script lang="ts">
  import type { About } from '$lib/data';
  import GitHub from './Icons/GitHub.svelte';
  import Twitter from './Icons/Twitter.svelte';

  export let about: About;
</script>

<h2 class="name">{about.name}</h2>
<div>
  {#if about.nickname !== undefined}
    <p class="nickname">{about.nickname}</p>
  {/if}
  <div class="spacer" />
  {#if about.github !== undefined}
    <p>
      <a href="https://github.com/{about.github}">
        <GitHub class="icon" />
      </a>
    </p>
  {/if}
  {#if about.twitter !== undefined}
    <p>
      <a href="https://twitter.com/{about.twitter}">
        <Twitter class="icon" />
      </a>
    </p>
  {/if}
</div>

<style>
  div {
    display: flex;
    gap: 1em;
    align-items: center;
    padding: 0.5em 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
  a :global(.icon) {
    width: 1.5em;
    height: 1.5em;
  }
  .name {
    margin: 1em 0 0;
  }
  .spacer {
    flex-grow: 1;
  }
</style>
