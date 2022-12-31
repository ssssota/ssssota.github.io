<script lang="ts">
  import type { PageData } from './$types';

  import Card from '$lib/components/Card.svelte';
  import Footer from '$lib/components/Footer.svelte';
  export let data: PageData;
</script>

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
