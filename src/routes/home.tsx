import "./home.css"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import { useEffect, useState } from "react";
import rotationLight from "./rotation-light.png"
import rotation from "./rotation.svg"
import multiply from "./complete-multiply.png"

export default function Home() {
	const alpha = "\u03B1";
	const beta = "\u03B2";
	const theta = 'ɵ';
	const phi = 'ɸ';

	const singleRowClassStr = `class SingleRow {\n\tconstructor(a1 = 0, a2 = 0, a3 = 0) {\n\t\tthis.a1 = a1;\n\t\tthis.a2 = a2;\n\t\tthis.a3 = a3;\n\t}\n}`;
	const MatrixClassStr = `class Matrix {\n\tconstructor(a1, a2, a3) {\n\t\tthis.a1 = a1;\n\t\tthis.a2 = a2;\n\t\tthis.a3 = a3;\n\t}\n}`;
	const multiplyFnStr = `function multiply(m1, m2) {\n\tconst res = new SingleRow();\n\tres.a1 = m1.a1 * m2.a1.a1 + m1.a2 * m2.a2.a1 + m1.a3 * m2.a3.a1;\n\t`
		+ `res.a2 = m1.a1 * m2.a1.a2 + m1.a2 * m2.a2.a2 + m1.a3 * m2.a3.a2;\n\tres.a3 = m1.a1 * m2.a1.a3 + m1.a2 * m2.a2.a3 + m1.a3 * m2.a3.a3;\n\treturn res;\n}`;

	const code = `const circle = new SingleRow(2 + Math.cos(theta), Math.sin(theta), 0);
const Ry = new Matrix(
	new SingleRow(Math.cos(phi), 0, Math.sin(phi)),
	new SingleRow(0, 1, 0),
	new SingleRow(-Math.sin(phi), 0, Math.cos(phi))
);
const Rx = new Matrix(
	new SingleRow(1, 0, 0),
	new SingleRow(0, Math.cos(A), Math.sin(A)),
	new SingleRow(0, -Math.sin(A), Math.cos(A))
);
const Rz = new Matrix(
	new SingleRow(Math.cos(B), Math.sin(B), 0),
	new SingleRow(-Math.sin(B), Math.cos(B), 0),
	new SingleRow(0, 0, 1)
);
const spinningDonut = multiply(multiply(multiply(circle, Ry), Rx), Rz);
`;

	const LIndex = "let L= 8 * (spinningDonut.a2 - spinningDonut.a3\n  + 2 * Math.cos(B) * Math.sin(A) * Math.sin(phi)\n" +
		"  - 2 * Math.cos(phi) * Math.cos(theta) * Math.sin(B)\n  - 2 * Math.cos(phi) * Math.sin(B)\n" +
		"  + 2 * Math.cos(A) * Math.sin(phi)\n);\n\n// donut luminicity will be seen by these characters\n" +
		"// these 12\nlet charOut = \"., -~:;=!*#$@\";\n\n\nif (x < screen_width && y < height && zBuffer[o] < reciNz) {" +
		"\n\tzBuffer[o] = reciNz;\n\t// If L < 0, . will be buffer\n\tbuffer[o] = charOut[L > 0 ? L : 0];\n}";


	const fullCode = singleRowClassStr + "\n" + MatrixClassStr + "\n" + multiplyFnStr +
		`\nwhile (true) {\n\tlet buffer = new Array(1760).fill(" ");\n\tlet zBuffer = new Array(1760).fill(0);\n\t` +
		`for (let theta = 0; theta < 6.28; theta += 0.07) {\n\t\tfor (let phi = 0; phi < 6.28; phi += 0.02) {\n\t\t\t` +
		`const circle = new SingleRow(2 + Math.cos(theta), Math.sin(theta), 0);\n\t\t\tconst Ry = new Matrix(\n\t\t\t\t` +
		`new SingleRow(Math.cos(phi), 0, Math.sin(phi)),\n\t\t\t\tnew SingleRow(0, 1, 0),\n\t\t\t\tnew SingleRow(-Math.sin(phi), 0, Math.cos(phi))` +
		`\n\t\t\t);\n\t\t\tconst Rx = new Matrix(\n\t\t\t\tnew SingleRow(1, 0, 0),\n\t\t\t\tnew SingleRow(0, Math.cos(A), Math.sin(A)), ` +
		`\n\t\t\t\tnew SingleRow(0, -Math.sin(A), Math.cos(A))\n\t\t\t); \n\t\t\tconst Rz = new Matrix(\n\t\t\t\t` +
		`new SingleRow(Math.cos(B), Math.sin(B), 0), \n\t\t\t\tnew SingleRow(-Math.sin(B), Math.cos(B), 0),\n\t\t\t\tnew SingleRow(0, 0, 1) \n\t\t\t);` +
		`\n\t\t\tconst spinningDonut = multiply(multiply(multiply(circle, Ry), Rx), Rz);\n\t\t\tlet reciNz = 1 / (spinningDonut.a3 + 5);` +
		`\n\t\t\tlet x = 40 + 30 * spinningDonut.a1 * reciNz;\n\t\t\tlet y = 12 + 15 * spinningDonut.a2 * reciNz;\n\t\t\t` +
		`let o = x + screen_width * y;\n\t\t\tlet L = 8 * (spinningDonut.a2 - spinningDonut.a3\n\t\t\t\t+ 2 * Math.cos(B) * Math.sin(A) * Math.sin(phi)` +
		`\n\t\t\t\t- 2 * Math.cos(phi) * Math.cos(theta) * Math.sin(B)\n\t\t\t\t- 2 * Math.cos(phi) * Math.sin(B) \n\t\t\t\t` +
		`+ 2 * Math.cos(A) * Math.sin(phi) \n\t\t\t);\n\n\t\t\tlet charOut = "., -~:;=!*#$@";\n\t\t\t` +
		`if (x < screen_width && y < height && zBuffer[o] < reciNz) {\n\t\t\t\tzBuffer[o] = reciNz;\n\t\t\t\tbuffer[o] = charOut[L > 0 ? L : 0];` +
		`\n\t\t\t}\n\t\t}\n\t}\n\tfor (let i = 0; i <1761; i++) {\n\t\tout.innerHTML = (i % 80 ? buffer[i] : '<br />');\n\t\t` +
		`A += 0.00004;\n\t\tB += 0.00002;\n\t}\n}`;

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(fullCode);
		} catch (e) {
			console.log(e);
		}
	}

	const [isDark, setIsDark] = useState(false);

	document.onscroll = () => {
		const pos = document.documentElement.getClientRects();
		if (pos[0].y > -450) {
			document.body.classList.add("light");
			document.body.classList.remove("grey-1", "grey-2", "grey-3", "grey-4", "grey-5",
				"grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5");
			setIsDark(false);
		}
		else if (pos[0].y > -500) {
			document.body.classList.remove("grey-2", "grey-3", "grey-4", "grey-5",
				"grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5");
			document.body.classList.add("grey-1");
			setIsDark(false);
		}
		else if (pos[0].y > -550) {
			document.body.classList.remove("light", "grey-1", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5", "grey-2", "grey-3", "grey-4", "grey-5",);
			document.body.classList.add("grey-1-5");
			setIsDark(false);
		}
		else if (pos[0].y > -600) {
			document.body.classList.remove("grey-1", "grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5", "light", "grey-3", "grey-4", "grey-5",);
			document.body.classList.add("grey-2");
			setIsDark(false);
		}
		else if (pos[0].y > -650) {
			document.body.classList.remove("grey-1", "grey-1-5", "grey-2", "grey-3-5", "grey-4-5", "grey-5-5", "light", "grey-3", "grey-4", "grey-5",);
			document.body.classList.add("grey-2-5");
			setIsDark(false);
		}
		else if (pos[0].y > -700) {
			document.body.classList.add("grey-3");
			document.body.classList.remove("grey-2", "grey-1", "light", "grey-4", "grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5");
			setIsDark(false);
		}
		else if (pos[0].y > -750) {
			document.body.classList.add("grey-3-5");
			document.body.classList.remove("grey-2", "grey-1", "light", "grey-4", "grey-1-5", "grey-2-5", "grey-3", "grey-4-5", "grey-5-5");
			setIsDark(false);
		}
		else if (pos[0].y > -800) {
			document.body.classList.add("grey-4");
			document.body.classList.remove("grey-2", "grey-1", "light", "grey-3", "grey-5", "grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5");
			setIsDark(true);
		}
		else if (pos[0].y > -850) {
			document.body.classList.add("grey-4-5");
			document.body.classList.remove("grey-2", "grey-1", "light", "grey-3", "grey-5", "grey-1-5", "grey-2-5", "grey-3-5", "grey-4", "grey-5-5");
			setIsDark(true);
		}
		else if (pos[0].y > -900) {
			document.body.classList.remove("grey-2", "grey-1", "light", "grey-3", "grey-4", "grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5");
			document.body.classList.add("grey-5");
			setIsDark(true);
		}
		else if (pos[0].y > -950) {
			document.body.classList.remove("grey-2", "grey-1", "light", "grey-3", "grey-4", "grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5");
			document.body.classList.add("grey-5-5");
			setIsDark(true);
		}
		else {
			document.body.classList.remove("light", "grey-1", "grey-2", "grey-3", "grey-4", "grey-5",
				"grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5");
			setIsDark(true);
		}
	}

	useEffect(() => {
		document.body.classList.add("light");
		Prism.highlightAll();
	}, [])
	return (
		<main id="home">
			<h1>3D Spinning Donut</h1>
			<section id="popularity-of-donut">
				In programming Community you may have heard of a
				3D spinning donut. Today I will explain how to
				make this donut in 3D. And write it's code in a better way
			</section>
			<section id="introduction-by-a1k0n">
				<div id="a1k0n">Brief details by a1k0n</div>
				At its core, it's a framebuffer and a Z-buffer into which I render pixels.
				Since it's just rendering relatively low-resolution ASCII art, I massively
				cheat. All it does is plot pixels along the surface of the torus at fixed-angle
				increments, and does it densely enough that the final result looks solid.
				The “pixels” it plots are ASCII characters corresponding to the illumination
				value of the surface at each point: .,-~:;=!*#$@ from dimmest to brightest.
			</section>
			<section id="understanding-donut">
				<div>
					<div>Understanding Donut</div>
					So, Before creating a donut, We need a circle <br />
					and equation of a circle is
					<span className="math-eq">x<sup>2</sup> + y<sup>2</sup> = r<sup>2</sup></span><br />.
					If we put <span className="math-eq">x = r · cos ɵ</span> and <span className="math-eq">y = r · sin ɵ</span>, <br />
					Since circle is 2D shape, z = 0 We will <br />
					get coordinates of a circle <span className="math-eq">(r · cos ɵ, r · sin ɵ, 0)</span> <br />
				</div>
				<div>
					<div>Create and Rotate Donut</div>
					<p>
						To create a donut, we need to rotate circle along Y-axis.
						To rotate circle along Y-axis, we will multiply coordinates
						as 1D matrix with rotation matrix of Y-axis(<span style={{ fontStyle: "italic" }}>R<sub>y</sub></span>)
						Then multiply the result with Rotation matrices of X-axis(<span style={{ fontStyle: "italic" }}>R<sub>x</sub></span>).
						Then multiply the result with Rotation matrices of Z-axis(<span style={{ fontStyle: "italic" }}>R<sub>z</sub></span>).
					</p>

					<img src={isDark ? rotationLight : rotation} typeof="image/svg+xml" className="rotation-img" />
					<br />

					Resulting Matrix will be: <br />
					<img src={multiply} typeof="image/svg+xml" className="rotation-img" />
					<br />
					<p>
						Now that looks like a huge complicated matrix, isn't it?
						Now to solve it, We will simply create a class of 1x3 matrix and a 3x3 matrix.
						And a function multiply them
					</p>

					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{singleRowClassStr}
							</code>
						</pre>
						<pre>
							<code className="language-javascript">
								{MatrixClassStr}
							</code>
						</pre>
						<pre id="matrix-multiply">
							<code className="language-javascript">
								{multiplyFnStr}
							</code>
						</pre>
					</div>
					<p>
						By these, matrices we will get will be</p>

					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">{code}
							</code>
						</pre>
					</div>
					<p>
						Now we have just done our matrix multiply. <br />
						2 is distance from origin to center of circle</p>

					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{"// w * h = 1760\nlet screen_width = 80, height = 22;\n// our donut characters will be stored in this array\n" +
									"let buffer;\nlet zBuffer;\n// A is angle for rotation along X-axis, B is for rotation along Z-axis\n" +
									"let A = 0, B = 0;\n// R1 is radius of circle for donut, R2 is distance of circle from Y-axis\nlet R2 = 2, R1 = 1;"}
							</code>
						</pre>
					</div>
					<p>
						Yes, A and B are {alpha} and {beta} used to rotate the donut in X and Z axis.
						All this is outside infinite loop
						We will need to infinite loop to keep our program running
						Now inside infinite loop</p>

					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{'while (true) {\n\tlet buffer = new Array(1760).fill(" ");\n' +
									'\tlet zBuffer = new Array(1760).fill(0);\n}'}
							</code>
						</pre>
					</div>
					<p>
						We will store our donut characters in buffer array.
						Now, What is {theta} and {phi}?
						These are nested for loops.</p>

					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{"for (let theta = 0; theta < 6.28; theta += 0.07) {\n\t// When we will rotate circle on Y-axis, " +
									"\n\t// It will create donut, rotation on Y require phi\n\tfor (let phi = 0; phi < 6.28; phi += 0.02) {\n\t}\n}"}
							</code>
						</pre>
					</div>
					<p>
						Now, Our main matrix multiplication, etc.
						Next inside nested for loop
						First part is matrix multiplication which we already did <a href="#matrix-multiply" className="aloo-link">here</a>
						Now we will need a variable to keep distance from origin to camera or us</p>
					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{"let reciNz = 1 / (spinningDonut.a3 + 5);"}
							</code>
						</pre>
					</div>
					<p>
						Ok so where will our donut particles/ characters be?
						We will need position for them</p>

					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{"let x = 40 + 30 * spinningDonut.a1 * reciNz;\nlet y = 12 + 15 * spinningDonut.a2 * reciNz;\n\n// o is index of current buffer\nlet o = x + screen_width * y;"}
							</code>
						</pre>
					</div>
					<p>
						Why division by reciNz? That's the mystery I couldn't solve either
						Next, because of light, so part will shine will other won't, how to calculate it?
						For that we will calculate lumanicity index which will be from 0 to √2
						then we will multiply it with 8 which will always be less than 12 and by that,
						We will use it as index from <span style={{ color: "darkseagreen" }}>.,-~:;=!*#$@</span> and if index is less than 0, we will use '.'</p>
					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{LIndex}
							</code>
						</pre>
					</div>
					<p>
						What are we subtracting? Maybe most(not all) values that had 2 as coefficient
						Work inside of nested for-loop is done, all that remains is to print characters
						First we will clear screen then print all characters</p>

					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{"out.innerHTML = '';"}
							</code>
						</pre>
					</div>
					<div className="code-highlighting">
						<pre>
							<code className="language-javascript">
								{"for (let i = 0; i <1761; i++) {\n\t// On every 80th character, new line will be printed\n\t" +
									"// If there's a reminder then buffer printed\n\tout.innerHTML = (i % 80 ? buffer[i] : '<br />');" +
									"\n\tA += 0.00004;\n\tB += 0.00002;\n}"}
							</code>
						</pre>
					</div>
					<p>
						And our Spinning Donut is completed <br />
						Complete code is</p>
					<div className="code-highlighting">
						<pre>
							<div id="code-title">
								<i className="material-icons" onClick={() => { copyCode() }}>content_copy</i>
							</div>
							<code className="language-javascript">
								{fullCode}
							</code>
						</pre>
					</div>
				</div>
			</section>
		</main>
	);
}