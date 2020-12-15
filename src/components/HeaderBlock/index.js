import React from 'react';
import s from './HeaderBlock.module.scss'
import { ReactComponent as ReactLogoSvg } from '../../logo.svg';

const HeaderBlock = ({ title, hideBackground = false, descr, background = false }) => {
	const styleCover = {
		backgroundImage: hideBackground ? 'none' : {},
		backgroundColor: background ? background : {}
	}
	
	return (
		<div className={s.cover}  style={styleCover}>
			<div className={s.wrap}>
			{title && <h1 className={s.header}>{title}</h1>}
				<ReactLogoSvg />
			{descr && <p className={s.descr}>{descr}</p>}
			</div>
		</div>
	)
}

export default HeaderBlock;
