import React from 'react';
import Card from '../Card';

import s from './CardList.module.scss';

const CardList = ({ items }) => {

	return (
		<div className={s.cardList}>
			{
				items
					.map(({ eng, rus }, index) => (
						<Card key={index} eng={eng} rus={rus} />
					))
			}
		</div>
	)

}

export default CardList;
