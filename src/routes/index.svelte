<script lang="ts">
  import About from '$lib/components/About.svelte';
  import Career from '$lib/components/Career.svelte';
  import Skill from '$lib/components/Skill.svelte';
  import Work from '$lib/components/Work.svelte';
  import { about, careers, skills, works } from '$lib/data';
</script>

<About {about} />

<h2>Careers</h2>
{#each careers as career (career.name)}
  <Career {career} />
{/each}

<h2>Works</h2>
{#each works as work (work.name)}
  <Work {work} />
{/each}

<h2>Skills</h2>
{#each skills as skill (skill.name)}
  <Skill {skill} />
{/each}

<footer>
  <small>&copy; TOMIKAWA Sotaro</small>
  <small>last modified: {new Date().toUTCString()}</small>
</footer>
