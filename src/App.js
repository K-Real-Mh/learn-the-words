import React, { Component } from 'react'


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

import { wordsList } from "./wordsList";

import s from './App.module.scss';



class App extends Component {

	state = {
		wordArr: wordsList,
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

	handleAddItem = (eng, rus) => {
		this.setState(({wordArr}) => {
			const lastIdx = wordArr[wordArr.length - 1].id;
			const newCard = {
				eng: eng,
				rus: rus,
				id: lastIdx + 1,
			}
			const newWordArr = [
				...wordArr
			];
			newWordArr.push(newCard);
			return {
				wordArr: newWordArr,
			};
		})
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
					inputRef={this.inputRef} 
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
