<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  const pageLimit = 5;
  let displayArticleCount = pageLimit;
  const showMore = () => {
    displayArticleCount += pageLimit;
  };
</script>

<svelte:head>
  <title>ssssotaのブログ</title>
  <meta name="description" content="ssssotaの記事一覧" />
</svelte:head>

{#each data.articles.slice(0, displayArticleCount) as article (article['discussionUrl'])}
  <a href="/articles/{article.slug}">
    <section>
      <h2 class="title">{article.title}</h2>
      <p class="description">{article.description}</p>
      <small>{article.createdAt.toISOString().split('T')[0]}</small>
    </section>
  </a>
{/each}
{#if displayArticleCount < data.articles.length}
  <button class="showmore" on:click={showMore}>Show more ...</button>
{/if}

<style>
  a {
    color: currentColor;
    text-decoration: none;
  }
  .title {
    margin: 1em 0 0 0;
  }
  .description {
    margin: 0.5em 0 0 0;
    opacity: 0.75;
  }
  .showmore {
    appearance: none;
    background-color: transparent;
    border: 0;
  }
</style>
