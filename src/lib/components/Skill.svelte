<script lang="ts">
  import type { Skill } from '$lib/data';

  export let skill: Skill;
  let float = 0;
  $: float = skill.value - Math.floor(skill.value);
</script>

<div>
  <h3>{skill.name}</h3>
  <div class="stars">
    {#each Array(skill.value - float) as _}
      <span>⭐</span>
    {/each}
    {#if float !== 0}
      <span class="half" style="--half-value:{float * 100}%">⭐</span>
    {/if}
  </div>
  {#if skill.description !== undefined}
    <p>{skill.description}</p>
  {/if}
</div>

<style>
  .stars {
    display: flex;
  }
  .half {
    clip-path: inset(0 var(--half-value, 50%) 0 0);
  }
</style>
