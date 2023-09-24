import React, { ReactNode } from 'react'
import './index.scss'


interface PillProps {
	bg?: string;
	color?: string;
	text?: ReactNode;
	size?: string;
	className?: string;
	children?: React.ReactNode[] | React.ReactNode;
}
function Pill(props: PillProps) {
	const {  text,className, children } = props;

	return (
		<div className={`pill ${className ? className : "default"}`}>
			{text}
			{children}
		</div>
	);
}

export default Pill
