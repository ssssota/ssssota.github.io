<script lang="ts">
  import Markdown from 'svelte-exmarkdown';
  import { gfmPlugin } from 'svelte-exmarkdown/gfm';
  import type { PageData } from './$types';
  const plugins = [gfmPlugin];
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.scrap.title} - ssssota</title>
  <meta name="description" content={data.scrap.description} />
  <meta property="og:title" content={data.scrap.title} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ssssota.dev/" />
  <meta property="og:image" content="https://ssssota.dev/ogp.png" />
  <meta property="og:site_name" content="ssssota" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<article>
  <h1>{data.scrap.title}</h1>
  <small>{new Date(data.scrap.createdAt).toISOString()}</small>

  <section>
    <Markdown {plugins} md={data.scrap.body} />
  </section>

  {#each data.scrap.threads as thread}
    <section class="thread">
      <a class="author" href="https://github.com/{thread.author}">
        <img src="https://github.com/{thread.author}.png?size=16" alt="" />
        {thread.author}
      </a>
      <Markdown {plugins} md={thread.body} />

      {#each thread.comments as comment}
        <section class="comment">
          <a class="author" href="https://github.com/{comment.author}">
            <img src="https://github.com/{comment.author}.png?size=16" alt="" />
            {comment.author}
          </a>
          <Markdown {plugins} md={comment.body} />
        </section>
      {/each}
    </section>
  {/each}
</article>

<a href={data.scrap.discussionUrl}>Leave a comment.</a>

<style>
  section {
    overflow-wrap: break-word;
  }
  .thread,
  .comment {
    padding: 0.5em 0 0 1em;
    border-left: 3px solid rgba(0 0 0 / 0.25);
  }
  .author {
    color: currentColor;
    text-decoration: none;
  }
</style>
