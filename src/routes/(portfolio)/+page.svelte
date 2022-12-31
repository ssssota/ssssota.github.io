<script lang="ts">
  import About from '$lib/components/About.svelte';
  import { about } from '$lib/data';
</script>

<About {about} />

<ul>
  <li><a href="/career"><span class="emoji">💼</span> Career</a></li>
  <li><a href="/works"><span class="emoji">🧱</span> Works</a></li>
  <li><a href="/skills"><span class="emoji">📚</span> Skills</a></li>
  <li><a href="/articles"><span class="emoji">📝</span> Blog</a></li>
</ul>

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0.5em 0;
  }
  a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }
  .emoji {
    font-family: 'apple color emoji', 'segoe ui emoji', 'noto color emoji',
      'android emoji, emojisymbols', 'emojione mozilla', 'twemoji mozilla',
      'segoe ui symbol';
  }
</style>
