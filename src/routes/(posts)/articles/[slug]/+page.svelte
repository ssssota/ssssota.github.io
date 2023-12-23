<script lang="ts">
  import Markdown from 'svelte-exmarkdown';
  import { gfmPlugin } from 'svelte-exmarkdown/gfm';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.article.title} - ssssota</title>
  <meta name="description" content={data.article.description} />
  <meta property="og:title" content={data.article.title} />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="https://ssssota.dev/articles/{data.article.slug}"
  />
  <meta
    property="og:image"
    content="https://ssssota.dev/articles/{data.article.slug}/ogp.png"
  />
  <meta property="og:site_name" content="ssssota" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<article>
  <h1>{data.article.title}</h1>
  <small>{new Date(data.article.createdAt).toISOString()}</small>

  <Markdown plugins={[gfmPlugin()]} md={data.article.body} />
</article>

<a href={data.article.discussionUrl}>Leave a comment.</a>
