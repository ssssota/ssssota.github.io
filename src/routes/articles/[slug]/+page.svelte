<script lang="ts">
  import Markdown from 'svelte-exmarkdown';
  import { gfmPlugin } from 'svelte-exmarkdown/gfm';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<article>
  <h1>{data.article.title}</h1>
  <small>{new Date(data.article.createdAt).toISOString()}</small>

  <Markdown plugins={[gfmPlugin]} md={data.article.body} />
</article>

<a href={data.article.discussionUrl}>Leave a comment.</a>
