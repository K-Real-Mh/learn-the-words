import React from 'react'
import s from './Section.module.scss';
import cl from 'classnames';

const Section = ({children, bgColor = "#ffffff", className}) => {
	const styleCover = {backgroundColor: `${bgColor}`};
	console.log(styleCover);
	return (
		<section className={cl(className, s.cover)} style={styleCover}>
			<div className={s.wrap}>
				{children}
			</div>
		</section>
	)
}

export default Section;