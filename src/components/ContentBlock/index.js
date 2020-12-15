import React from 'react';
import s from './ContentBlock.module.scss';

const ContentBlock = ({title, descr, background = '#ffffff'}) => {
	const backgroundColor = { backgroundColor: background }
	return (
		<div className={s.content} style={backgroundColor}>
			{title && <h1 className={s.content__headText}>{title}</h1>}
			{title && <p className={s.content__text}>{descr}</p>}
		</div>
	)
}

export default ContentBlock;