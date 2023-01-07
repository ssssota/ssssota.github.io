<script lang="ts">
  import type { PageData } from './$types';

  import Card from '$lib/components/Card.svelte';
  import Footer from '$lib/components/Footer.svelte';
  export let data: PageData;
</script>

<svelte:head>
  <title>ssssota</title>
  <meta name="description" content="ssssota's portfolio" />
  <meta property="og:title" content="ssssota" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ssssota.dev/" />
  <meta property="og:image" content="https://ssssota.dev/ogp.png" />
  <meta property="og:site_name" content="ssssota" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<main>
  <Card --bg-color="#f9f9f3">
    <slot />
    <Footer lastModifiedAt={data.renderedAt} />
  </Card>
</main>

<style>
  main {
    padding: 30px 15px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #faf0e0;
    color: #003;
  }
</style>
