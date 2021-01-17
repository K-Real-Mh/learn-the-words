import React, { Component } from 'react';
import getTranslateWord from '../../services/dictionary';
import Card from '../Card';
import { Input, Form, Button } from 'antd';

import s from './CardList.module.scss';
class CardList extends Component {

	state = {
		isBusy: false,
		value: '',
	}

	formRef = React.createRef();
	inputEngRef = React.createRef();

	constructor(props) {
		super(props);

		props.inputERef && props.inputERef(this.inputEngRef);
	}

	handleInputChange = ({target}) => {
		this.setState({
			value: target.value,
		})
	}
	
	getTheWord = async ()  => {
		const {value} = this.state;
		const getWord = await getTranslateWord(value);
		const {onAddItem} = this.props;
		onAddItem && onAddItem(getWord);

		this.setState({
			value: '',
			isBusy: false,
		})
	}

	handleSubmitForm = async () => {
		this.setState({
			isBusy:true,
		}, this.getTheWord)
		this.formRef.current.resetFields();
	}

	render() {
		const { items = [], onDeletedItem } = this.props;
		const { isBusy } = this.state;
		return (
			<>
				<div className={s.form}>
					<Form
						ref={this.formRef}
						name="basic"
						layout="inline"
						onFinish={this.handleSubmitForm}
						
					>
						<Form.Item
							label="English Word"
							name="eng"
						>
							<Input
								ref={this.inputEngRef}
								placeholder="Введите слово на инглише"
								onChange={this.handleInputChange}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={isBusy}
							>
								Добавить
							</Button>
						</Form.Item>
					</Form>
				</div>
				<div className={s.root}>
					{
						items.map(({ eng, rus, id }) => (
							<Card
								onDeleted={() => {
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
