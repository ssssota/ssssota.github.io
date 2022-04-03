<script lang="ts" context="module">
  export const hydrate = false;
</script>

<script lang="ts">
  import About from '$lib/components/About.svelte';
  import Career from '$lib/components/Career.svelte';
  import Skill from '$lib/components/Skill.svelte';
  import Work from '$lib/components/Work.svelte';
  import { about, careers, skills, works } from '$lib/data';
  import '../app.css';

  let sortedCareer: typeof careers;
  $: sortedCareer = careers.sort((a, b) => {
    if (b.to === undefined) return -1;
    if (a.to === undefined) return 1;
    return (
      new Date(`${a.to.year}/${a.to.month}/1`).valueOf() -
      new Date(`${b.to.year}/${b.to.month}/1`).valueOf()
    );
  });
</script>

<About {about} />

<h2>Careers</h2>
{#each sortedCareer as career (career.name)}
  <Career {career} />
{/each}

<h2>Works</h2>
{#each works as work (work.name)}
  <Work {work} />
{/each}

<h2>Skills</h2>
{#each skills.sort((a, b) => b.value - a.value) as skill (skill.name)}
  <Skill {skill} />
{/each}

<footer>
  <p><small>&copy; TOMIKAWA Sotaro</small></p>
  <p><small>last modified: {new Date().toUTCString()}</small></p>
</footer>
