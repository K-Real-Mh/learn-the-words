import React from 'react';
import s from './Button.module.scss';

const Button = ({children}) => {
	return (
		<a href='#' className={s.btn}>
			{children}
		</a>
	)
}

export default Button
