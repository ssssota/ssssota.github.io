<script>
  let active = true;

  setTimeout(() => active = false, 3500);
</script>

<div class="root" class:active>
  <div class="top-border">
    <p class="welcome">Welcome</p>
    <div class="hider"></div>
  </div>
  {#if active}
    <button
      class:skip-button="{active}"
      on:click="{() => active = false}"
    >
      Skip >>
    </button>
  {/if}
</div>

<style>
.root * {
  font-family: 'Roboto Slab', serif;
  cursor: default;
  user-select: none;

}
.root {
  display: none;

  mask-image: linear-gradient(60deg, black 0% 50%, transparent 50.1%);
  -webkit-mask-image: linear-gradient(60deg, black 0% 50%, transparent 50.1%);
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-size: 200vw 200vh;
  -webkit-mask-size: 200vw 200vh;
  animation: mask-move 0.5s ease 2.8s 1 normal both;
}
.root.active {
  display: block;
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  
  background: black;
  color: white;
}
.top-border {
  z-index: 10000;
  position: fixed;
  top: calc(50vh - 25vmin); height: 50vmin;
  left: calc(50vw - 25vmin); width: 50vmin;
  border: 1px solid white;
}
.top-border::after, .top-border::before {
  z-index: 9000;
  display: block;
  content: '';
  position: absolute;
  top: 0;
  background: black;
  width: 100%;
  height: 100%;
}
.top-border::after { left: calc(100% + 1px); }
.top-border::before { right: calc(100% + 1px); }
.welcome {
  z-index: 500;
  display: block;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 0; right: 0;
  text-align: center;
  font-size: 7.5vmin;
  transform: translate(0, -50%);

  animation:
    slide-in1 0.3s ease 0.5s 1 normal backwards,
    slide-out1 0.2s ease 2.2s 1 normal forwards;
}
.hider {
  z-index: 8000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: exclusion;
  background: white;

  animation: slide-in2 0.2s ease 1.8s 1 normal both;
}
.skip-button {
  position: fixed;
  z-index: 11000;
  background: transparent;
  border: 0;
  color: white;
  bottom: 1em;
  right: 5em;
}

@keyframes slide-in1 {
  0% { transform: translate(100%, -50%); }
  100% { transform: translate(0%, -50%); }
}
@keyframes slide-in2 {
  0% { transform: translate(calc(-100% - 1px)); }
  100% { transform: translate(0%); }
}
@keyframes slide-out1 {
  0% { transform: translate(0%, -50%); }
  100% { transform: translate(-100%, -50%); }
}
@keyframes mask-move {
  0% {
    mask-position: 0 -100vh;
    -webkit-mask-position: 0 -100vh;
  }
  100% {
    mask-position: -100vw 0;
    -webkit-mask-position: -100vw 0;
  }
}
</style>