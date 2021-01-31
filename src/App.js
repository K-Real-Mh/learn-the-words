import React, { Component } from 'react';

import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import LoginPage from './pages/Login';

import { Spin, Layout } from 'antd';

import s from './App.module.scss';
import FirebaseContext from './context/firebaseContext';
import { Content, Header } from 'antd/lib/layout/layout';






class App extends Component {
	state = {
		user: null,
	}

	componentDidMount() {
		console.log(this.context);
		const { auth, setUserUid } = this.context;

		auth.onAuthStateChanged((user) => {

			if (user) {
				setUserUid(user.uid);
				this.setState({
					user,
				});
			} else {
				setUserUid(null);
				this.setState({
					user: false,
				});
			}
		})
	}


	render() {
		const { user } = this.state;

		if (user === null) {
			return (
				<div className={s.loader_wrap}>
					<Spin size="large" />
				</div>
			)
		}

		return (
			<BrowserRouter>

				<Route path="/login" component={LoginPage} />
				<Route render={() => (
					<Layout>
						<Header>

						</Header>
						<Content>
							<Route path="/" exact component={HomePage} />
							<Route path="/about" render={() => <h1>Немного о себе</h1>} />
						</Content>
					</Layout>
				)} />

			</BrowserRouter>
		)
	}
}
App.contextType = FirebaseContext;

export default App;
