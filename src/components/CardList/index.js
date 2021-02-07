import React, { Component } from 'react';
import getTranslateWord from '../../services/dictionary';
import Card from '../Card';
import { Input, Form, Button, Spin } from 'antd';

import s from './CardList.module.scss';
import FirebaseContext from '../../context/firebaseContext';
class CardList extends Component {

	state = {
		isBusy: false,
		value: '',
		wordsArr: [],
	}

	formRef = React.createRef();
	inputEngRef = React.createRef();

	constructor(props) {
		super(props);

		props.inputERef && props.inputERef(this.inputEngRef);
	}

	componentDidMount() {
		const { getUserCardsRef, setWordsArr } = this.context;
		getUserCardsRef().on('value', res => {
			setWordsArr(res.val() || []);
			this.setState({
				wordsArr: res.val() || [],
			}); 
		});
	}

	handleInputChange = ({target}) => {
		this.setState({
			value: target.value,
		})
	}
	
	getTheWord = async ()  => {
		const {value} = this.state;
		const getWord = await getTranslateWord(value);
		const {addItem} = this.context;
		console.log(getWord);
		addItem && addItem(getWord);
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
		const { isBusy, wordsArr } = this.state;
		const { deletedItem, deleteUserUid } = this.context;

		if (wordsArr.length === 0) {
			return <Spin/>
		}

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
						<Form.Item>
							<Button
								type="primary"
								onClick={deleteUserUid}
							>
								Выйти
							</Button>
						</Form.Item>
					</Form>
				</div>
				<div className={s.root}>
					{
						wordsArr.map(({ eng, rus, id }) => (
							<Card
								onDeleted={() => {
									deletedItem(id);
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

CardList.contextType = FirebaseContext;

export const hoc = (Component, getData, setDataArr, add, deleted, deleteUser) => {
	return class extends React.PureComponent {
		state = {
			isBusy: false,
			value: '',
			wordsArr: [],
		}
	
		formRef = React.createRef();
		inputEngRef = React.createRef();
	
		constructor(props) {
			super(props);
	
			props.inputERef && props.inputERef(this.inputEngRef);
		}
	
		componentDidMount() {
			getData().on('value', res => {
				setDataArr(res.val() || []);
				this.setState({
					wordsArr: res.val() || [],
				}); 
			});
		}
	
		handleInputChange = ({target}) => {
			this.setState({
				value: target.value,
			})
		}
		
		getTheWord = async ()  => {
			const {value} = this.state;
			const getWord = await getTranslateWord(value);
			console.log(getWord);
			add && add(getWord);
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
			const { isBusy, wordsArr } = this.state;
	
			if (wordsArr.length === 0) {
				return <Spin/>
			}
	
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
							<Form.Item>
								<Button
									type="primary"
									onClick={deleteUser}
								>
									Выйти
								</Button>
							</Form.Item>
						</Form>
					</div>
					<div className={s.root}>
						{
							wordsArr.map(({ id, ...props }) => (
								<Component
									onDeleted={() => {
										deleted(id);
									}}
									key={id}
									{...props}
								/>
							))
						}
					</div>
				</>
			);
		}

	}
}

export default hoc(Card);
