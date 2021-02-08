import React from 'react';
import Card from '../../components/Card';
import FirebaseContext from '../../context/firebaseContext';
import { Typography, Spin } from "antd";
import s from './CurrentCard.module.scss';
const { Title } = Typography;

class CurrentCard extends React.PureComponent {
	state = {
		word: {
			id: 0,
			eng: '',
			rus: '',
		}
	}


	componentDidMount() {
		console.log(this.props);
		const { getUserCurrentCardRef } = this.context;
		const {  match : {params} } = this.props
		if (params.id) {
			getUserCurrentCardRef(params.id).once('value').then(res =>{
				this.setState({
					word:res.val(),
				});
			})
		}
		
	}

	render() {
		const { word: { eng, rus } } = this.state;

		if (eng === '' && rus === '') {
			return <div className={s.root}><Spin /></div>
		}

		return (
			<div className={s.root}>
				<Title>
					This is our Current Card - { eng }
				</Title>
				<Card eng={eng} rus={rus}/>
			</div>
		)
	}

};

CurrentCard.contextType = FirebaseContext;

export default CurrentCard;


