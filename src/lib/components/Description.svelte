<script lang="ts">
  import Markdown from 'svelte-exmarkdown';
  import { gfmPlugin } from 'svelte-exmarkdown/gfm';
  export let content: string;
</script>

<Markdown md={content} plugins={[gfmPlugin]} />
