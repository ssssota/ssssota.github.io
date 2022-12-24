<script lang="ts">
  import Markdown from 'svelte-exmarkdown';
  export let content: string;
</script>

<Markdown md={content} />
