import React from "react"
import "./model.css"

export default function Model({ children, className, show }: { children: React.JSX.Element, className?: string, show: boolean }) {
	return show && (
		<div className={"model" + (className ? (" " + className) : "")}>
			{children}
		</div>
	)
}