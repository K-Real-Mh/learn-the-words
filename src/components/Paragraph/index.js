import React from 'react';
import s from "./Paragraph.module.scss";
import cl from "classnames";

const Paragraph = ({children, white = false, small=false, lead=false}) => {
	return (
		<p className={cl(s.paragraph, {
			[s.white] : white,
			[s.small] : small,
			[s.lead] : lead,
		})}>
			{children}
		</p>
	)
}

export default Paragraph