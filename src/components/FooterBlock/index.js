import React from 'react';
import s from './FooterBlock.module.scss';

const FooterBlock = ({userName = 'User'}) => {
	const date = new Date();

	return (
		<div className={s.footer}>
			<p>Все права защищены</p>
			<p>{userName}</p>
			<p>{date.getFullYear()}</p>
		</div>
	)
}

export default FooterBlock;