<script lang="ts">
  import Card from '$lib/components/Card.svelte';
</script>

<div class="container">
  <Card --bg-color="#f9f9f3">
    <header>
      <nav>
        <a class="top-link" href="/">ssssota.dev</a>
        <div class="links">
          <a href="/articles">Blog</a>
          <a href="/scraps">Scraps</a>
        </div>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </Card>
</div>

<style>
  .container {
    padding: 30px 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #faf0e0;
    color: #003;
    overflow-x: hidden;
  }
  header {
    padding-top: 1em;
  }
  header nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: space-between;
    align-items: baseline;
  }
  header nav a {
    text-decoration: none;
    color: currentColor;
  }
  .top-link {
    font-size: 2em;
    font-weight: bold;
  }
  .links {
    display: flex;
    gap: 1em;
  }
  main {
    width: min(40em, 75vw);
    padding-bottom: 2rem;
  }
</style>
