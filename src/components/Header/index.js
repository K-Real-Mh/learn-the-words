import React from 'react'
import s from './Header.module.scss';
import cl from 'classnames';

const Header = ({ children, size = 'xl', white }) => {

	let sizePoint;
	switch (size) {
		case 'xl':
			sizePoint = 1;
			break;
		case 'l':
			sizePoint = 2;
			break;
		case 'm':
			sizePoint = 3;
			break;
		case 's':
			sizePoint = 4;
			break;
		case 'xs':
			sizePoint = 5;
			break;
		default:
			sizePoint = 1;
			break;
	}


	return React.createElement(
		`h${sizePoint}`,
		{
			className: cl(s.header, s[`size${size.toUpperCase()}`],
				{
					[s.whiteColor]: white,
				}),
		},
		children,
	)
}

export default Header

