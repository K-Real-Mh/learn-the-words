import React from 'react';
import cl from 'classnames'

import s from './Card.module.scss';

class Card extends React.Component {


	state = {
		done: false,
	}

	handleCardClick = () => {
		if (this.state.done) {
			this.setState({
				done: false,
			})
		} else {
			this.setState({
				done: true,
			})
		}
	}

	render() {
		const { eng, rus } = this.props;
		const { done } = this.state;

		

		return (
			<div 
				className={cl(s.card, { [s.done]: done })}
				onClick= {this.handleCardClick}
			>
				<div className={s.cardInner}>
					<div className={s.cardFront}>
						{eng}
					</div>
					<div className={s.cardBack}>
						{rus}
					</div>
				</div>
			</div>
		);
	}
}

export default Card;