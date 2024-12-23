import { useEffect } from "react";
import "./about-me.css"

export default function AboutMe() {
	useEffect(() => {
		document.body.classList.remove("light", "grey-1", "grey-2", "grey-3", "grey-4", "grey-5",
			"grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5");
	});
	return (
		<main>
			<section id="aboutme">
				<picture>
					<img src="pop-os.svg" className="pfp-logo" />
				</picture>
				<div id="data">
					<h1>I use Linux BTW</h1>
					<p>
						<span className="key color-1">Name</span>Jaipal <br /><br />
						<span className="key color-1">Hobby</span>Coding, Sleeping,
						Eating<br /><br />
						<span className="key color-2">OS</span>Pop!_OS 24.04<br /><br />
						<span className="key color-2">My Fav. Language</span>
						Python
						<br /><br />
						<span className="key color-3">Best for memory manage</span>
						C
						<br /><br />
						<span className="key color-3"
						>Best for making backend ASAP</span
						>Go
					</p>
					<h2 className="color-1">Personal Life 404</h2>
				</div>
			</section>
		</main>
	);
}