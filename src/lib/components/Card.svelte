<div {...$$props}>
  <slot />
</div>

<style>
  div {
    background-color: var(--bg-color, transparent);
    box-shadow: 0 0.2em 0.5em 0 var(--shadow-color, rgba(0 0 0 / 0.2));

    padding: 1em 2.5em;
    border-radius: 2em;
  }
</style>
