<script lang="ts">
  import Card from '$lib/components/Card.svelte';
</script>

<Card --bg-color="#f9f9f3">
  <header>
    <nav>
      <a href="/">ssssota.dev</a>
    </nav>
  </header>
  <main>
    <slot />
  </main>
</Card>

<style>
  :root {
    padding: 30px 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #faf0e0;
    color: #003;
    overflow: hidden;
  }
  header {
    padding-top: 1em;
  }
  header nav a {
    font-size: 2em;
    font-weight: bold;
    text-decoration: none;
    color: currentColor;
  }
  main {
    width: min(20em, 75vw);
  }
</style>
