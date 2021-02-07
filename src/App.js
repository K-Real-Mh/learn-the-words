import React, { Component } from 'react';

import { BrowserRouter, Route, Link } from "react-router-dom";

import HomePage from "./pages/Home";
import LoginPage from './pages/Login';

import { Spin, Layout, Menu } from 'antd';

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
				<Route render={(props) => {
					const {history: {push}} = props
					return (
					<Layout>
						<Header>
							<Menu theme="dark" mode="horizontal">
								<Menu.Item key="1">
									<Link to="/">Home</Link>
								</Menu.Item>
								<Menu.Item key="2">
									<Link to="/about">About</Link>
								</Menu.Item>
								<Menu.Item key="3" onClick={() => push('/contacts')}>
									Contacts
								</Menu.Item>
							</Menu>
						</Header>
						<Content>
							<Route path="/" exact component={HomePage} />
							<Route path="/about" render={() => <h1>Немного о себе</h1>} />
							<Route path="/contacts" render={() => <h1>Немного контактов</h1>} />
						</Content>
					</Layout>
					)}} />

			</BrowserRouter>
		)
	}
}
App.contextType = FirebaseContext;

export default App;
