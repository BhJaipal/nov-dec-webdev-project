import { useEffect, useState } from 'react'
import { Link } from 'react-router';

function NavLogo({ isMobile }: { isMobile: boolean }) {
	if (isMobile) {
		return (
			<div id="logo">
				<button id="logo-btn">Portfolio</button>
			</div>
		)
	} else {
		return <div id="logo">Portfolio</div>
	}
}

function Header() {
	if (!visualViewport) throw new Error("visualViewport is not defined | null");
	if (!visualViewport.width) throw new Error("visualViewport.wdth is not defined | null");
	const [isMobile, setIsMobile] = useState(visualViewport.width <= 400)

	useEffect(() => {
		if (visualViewport) {
			if (visualViewport?.width < 400)
				setIsMobile(
					true
				)
			else setIsMobile(false);
		}
	}, [])

	return (
		<nav>
			<NavLogo isMobile={isMobile} />
			<div id="links">
				<div className="nav-items"><Link to={"/"}>Home</Link></div>
				<div className="nav-items"><Link to={"/todo-list"}>Todo List</Link></div>
				<div className="nav-items"><Link to={"/about-me"}>About Me</Link></div>
			</div>
		</nav>
	);
}
export default Header;