<script lang="ts">
  import Skill from '$lib/components/Skill.svelte';
  import { skills } from '$lib/data';
</script>

<h1>Skills</h1>
<div>
  {#each skills.sort((a, b) => b.value - a.value) as skill (skill.name)}
    <Skill {skill} />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-shrink: 0;
    gap: 2em;
  }
  div > :global(*) {
    width: 45%;
  }
</style>
