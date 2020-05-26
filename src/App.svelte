<script>
	import Splash from './components/Splash.svelte';
	import About from './components/About.svelte';
	import History from './components/History.svelte';
	import Skills from './components/Skills.svelte';
	import Works from './components/Works.svelte';
</script>

<main>
	<Splash/>
	<About/>
	<article>
		<Skills/>
		<Works/>
	</article>
</main>

<style type="text/scss">
:global(body) {
	margin: 0;
	padding: 0;

	background: linear-gradient(60deg, #9affca, #9af1ff, #9ac4ff, #bc9aff, #e89aff, #ff9ad8, #ff9a9a, #f4ff9a, #a8ff9a);
	background-size: 1800% 1800%;

	-webkit-animation: background-gradient 300s linear infinite;
	-moz-animation: background-gradient 300s linear infinite;
	animation: background-gradient 300s linear infinite;
}
:global(a[target="_blank"])::after {
	display: inline-block;
	content: '';
	background-image: url('/assets/open_in_new-24px.svg');
	background-size: contain;
	width: 1em;
	height: 1em;
}
:global(*) {
	box-sizing: border-box;
}

main {
	margin: 0 4%;
	min-height: 100vh;
	
	display: flex;
	flex-wrap: wrap;
	background: rgba(255, 255, 255, 0.65);

	article {
		width: 75%;
		padding-left: 2em;

		& > :global(section > div > h3) {
			margin-bottom: 0;
			font-size: 2em;

			&::before {
				content: '#';
				margin-right: 0.5em;
				cursor: default;
			}
		}
	}
}

@media (max-width: 1304px) {
	main article {
		width: 95%;
	}
}

@keyframes background-gradient {
	0%{background-position:0% 50%}
	50%{background-position:100% 50%}
	100%{background-position:0% 50%}
}
</style>