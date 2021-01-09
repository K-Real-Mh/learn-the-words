import React, { Component } from 'react';
import Card from '../Card';

import s from './CardList.module.scss';

class CardList extends Component {

	state = {
		valueEng: '',
		valueRus: '',
		label: '',
	}

	handleInputChangeEng = (e) => {
		this.setState({
			valueEng: e.target.value,
		});
	}

	handleInputChangeRus = (e) => {
		this.setState({
			valueRus: e.target.value
		});
	}

	handleSubmitForm = (e) => {
		e.preventDefault();
		this.props.onAddItem(this.state.valueEng, this.state.valueRus);
		this.setState(({valueEng, valueRus})=>{
			return {
				label: "Добавлена карточка. Cлово на англ.яз: " + valueEng + " Перевод: "+ valueRus,
				valueEng: '',
				valueRus: '',
			}
		})
	}

	render() {
		const { items =[], onDeletedItem,  inputRef } = this.props;
		return (
			<>
				<div>
					{this.state.label}
				</div>
				<form 
				onSubmit={this.handleSubmitForm}
				className={s.form}
				>
					<input 
					ref={inputRef}
					type="text"
					value={this.state.valueEng}
					placeholder="слово на английском"
					onChange={this.handleInputChangeEng}
					/>
					<input 
					type="text"
					value={this.state.valueRus}
					placeholder="перевод"
					onChange={this.handleInputChangeRus}
					/>
					<button>Add New Word</button>
				</form>
				<div className={s.root}>
					{
						items.map(({ eng, rus, id }) => (
							<Card
							onDeleted={()=> {
								onDeletedItem(id);
							}}
								key={id}
								eng={eng}
								rus={rus}
							/>
						))
					}
				</div>
			</>
		);
	}
}

export default CardList;
