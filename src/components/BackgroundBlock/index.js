import React from 'react';
import s from './BackgroundBlock.module.scss';

const BackgroundBlock = ({children, BackgroundImg, fullHeight = false}) => {
	const styleCover = { backgroundImage: `url(${BackgroundImg})` };
	if (fullHeight) {
		styleCover.height = '100vh';
	}

	return (
		<div className={s.cover} style={styleCover}>
			<div className={s.wrap}>
				{children}
			</div>
		</div>
	)
}

export default BackgroundBlock;