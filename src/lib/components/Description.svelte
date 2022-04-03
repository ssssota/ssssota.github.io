<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  export let content: string;
</script>

<SvelteMarkdown source={content} />
