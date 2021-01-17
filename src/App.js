import React, { Component } from 'react'
import firebase  from 'firebase';

import {
	FrownOutlined,
	SyncOutlined,
	SmileOutlined,
} from '@ant-design/icons';

import BackgroundBlock from './components/BackgroundBlock';
import Header from './components/Header';
import Paragraph from './components/Paragraph';
import Section from './components/Section';
import CardList from './components/CardList';
import Button from './components/Button';
import Footer from './components/Footer';

import firstBackground from './assets/background.jpg';
import secondBackground from './assets/background2.jpg';
import goodGif from './assets/goodGif.gif';

import s from './App.module.scss';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


class App extends Component {

	state = {
		wordArr: [],
	}

	inputRef = React.createRef();

	handleDeletedItem = (id) => {
		this.setState(({wordArr}) => {
			const idx = wordArr.findIndex(item => item.id  === id);
			const newWordArr = [
				...wordArr.slice(0, idx),
				...wordArr.slice(idx + 1)
			]
			return {
				wordArr: newWordArr,
			};
		});
	}

	handleAddItem = (values) => {
		console.log(values);
		this.setState(({wordArr}) => {
			const newCard = {
				eng: values.text,
				rus: values.translate,
				id: +new Date(),
			}
			const newWordArr = [
				...wordArr
			];
			newWordArr.push(newCard);
			database.ref('/').set([...wordArr, {
				eng: values.text,
				rus: values.translate,
				id: +new Date(),
			}])
			return {
				wordArr: newWordArr,
			};
		})
	}

	componentDidMount() {
		database.ref('/').once('value').then(res => {
			this.setState({
				wordArr: res.val(),
			});
		})
	}

	setNewWord = () => {
		const { wordArr } = this.state;

		database.ref('/').set([...wordArr, {
			id: +new Date(),
			eng: 'mouse',
			rus: 'мышь'
		}])
	}

	render() {
		const {wordArr} = this.state;
		return (
			<>
				<BackgroundBlock
					BackgroundImg={firstBackground}
					fullHeight
				>
					<Header white>
						Время учить слова онлайн
					</Header>
					<div className={s.good}>
						<img src={goodGif} />
					</div>
					<Paragraph white>
						Используйте карточки для запоминания и пополняйте словарный запас
					</Paragraph>
					<Button
						onClick = {() => {
							this.inputRef.current.focus();
						}}
					>
						Начать бесплатный урок
					</Button>
				</BackgroundBlock>
				<Section className={s.textCenter}>
					<Header size="l">
						Мы создали уроки, чтобы помочь вам увереннее разговаривать на английском языке
					</Header>
					<div className={s.motivation}>
						<div className={s.motivationBlock}>
							<div className={s.icons}>
								<FrownOutlined />
							</div>
							<Paragraph small>
								До наших уроков вы расстроены, ведь даже ваша кошка мяукает на английском языке.
							</Paragraph>
						</div>
						<div className={s.motivationBlock}>
							<div className={s.icons}>
								<SyncOutlined spin />
							</div>
							<Paragraph small>
								Но затем вы начинаете учить слова с помощью наших онлайн карточек
							</Paragraph>
						</div>
						<div className={s.motivationBlock}>
							<div className={s.icons}>
								<SmileOutlined />
							</div>
							<Paragraph small>
								В конце концов вы выучиваете слова, и можете гордиться собой
							</Paragraph>
						</div>
					</div>
				</Section>
				<Section bgColor="#f0f0f0" className={s.textCenter}>
					<Header size='l'>
						Начать учить английский просто
					</Header>
					<Paragraph>
						Кликай по карточкам и узнавай новые слова, быстро и легко!
					</Paragraph>
					<CardList 
					inputERef={el => this.inputRef = el} 
					onDeletedItem={this.handleDeletedItem} 
					items={wordArr} 
					onAddItem={this.handleAddItem} 
					/>
				</Section>
				<BackgroundBlock
					BackgroundImg={secondBackground}
				>
					<Header size='l' white>
						Изуйчайте английский с персональным сайтом помощником
					</Header>
					<Paragraph white>
						Начните прямо сейчас
					</Paragraph>
				</BackgroundBlock>
				<Footer />
			</>
		);
	}
}


export default App;
