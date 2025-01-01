import { c } from "../styles";

const links = [
	{ name: "GitHub", url: "https://github.com/ssssota" },
	{ name: "Twitter", url: "https://twitter.com/ssssotaro" },
	{ name: "Speaker Deck", url: "https://speakerdeck.com/ssssota" },
	{ name: "Zenn", url: "https://zenn.dev/ssssota" },
	{ name: "Qiita", url: "https://qiita.com/ssssota" },
	{ name: "Bluesky", url: "https://bsky.app/profile/ssssota.bsky.social" },
] as const satisfies { name: string; url: string }[];

export function Page() {
	return (
		<>
			<header class={c("flex", "justify-between", "items-baseline")}>
				<h1>ssssota.dev</h1>
				<nav class={c("flex", "gap-[12px]")}>
					<a
						href="https://github.com/ssssota/ssssota.github.io/discussions/categories/articles"
						target="_blank"
						rel="noreferrer"
					>
						Blog
					</a>
					<a
						href="https://github.com/ssssota/ssssota.github.io/discussions/categories/scraps"
						target="_blank"
						rel="noreferrer"
					>
						Scraps
					</a>
				</nav>
			</header>
			<main>
				<About />
				<Links />
			</main>
			<footer>
				<small>&copy; 2025 TOMIKAWA Sotaro.</small>
			</footer>
		</>
	);
}

function About() {
	return (
		<section>
			<h2 id="about">About</h2>
			<p>冨川 宗太郎 (TOMIKAWA Sotaro)</p>
			<p>Software Engineer</p>
		</section>
	);
}

function Links() {
	return (
		<section>
			<h2 id="links">Links</h2>
			<ul>
				{links.map(({ name, url }) => (
					<li key={name}>
						<a href={url} target="_blank" rel="noreferrer">
							{name}
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
