import React, { PureComponent } from 'react';

import {
	FrownOutlined,
	SyncOutlined,
	SmileOutlined,
} from '@ant-design/icons';

import BackgroundBlock from '../../components/BackgroundBlock';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Section from '../../components/Section';
import CardList from '../../components/CardList';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

import firstBackground from '../../assets/background.jpg';
import secondBackground from '../../assets/background2.jpg';
import goodGif from '../../assets/goodGif.gif';

import s from './HomePage.module.scss'
import FirebaseContext from '../../context/firebaseContext';

export default class HomePage extends PureComponent {

	state = {
		wordArr: [],
	}

	inputRef = React.createRef();

	render() {
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
						onClick={() => {
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

HomePage.contextType = FirebaseContext;
