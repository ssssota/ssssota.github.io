<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => ({
    props: { renderedAt: new Date().toISOString().substring(0, 10) },
  });
</script>

<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';
  export let renderedAt: string;
</script>

<main>
  <Card --bg-color="#f9f9f3">
    <slot />
    <Footer lastModifiedAt={renderedAt} />
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
