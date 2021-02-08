import React, { Component } from 'react';

import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/Home";
import LoginPage from './pages/Login';

import { Spin, Layout, Menu } from 'antd';

import s from './App.module.scss';
import FirebaseContext from './context/firebaseContext';
import { Content, Header } from 'antd/lib/layout/layout';
import { PrivateRoute } from './utils/privateRoute';
import CurrentCard from './pages/CurrentCard';






class App extends Component {
	state = {
		user: null,
	}

	componentDidMount() {
		const { auth, setUserUid } = this.context;
		auth.onAuthStateChanged((user) => {

			if (user) {
				setUserUid(user.uid);
				localStorage.setItem('user', JSON.stringify(user.uid));
				this.setState({
					user,
				});
			} else {
				setUserUid(null);
				localStorage.removeItem('user');
				this.setState({
					user: false,
				});
			}
		});
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
				<Switch>
					<Route path="/login" component={LoginPage} />
					<Route render={(props) => {
						const { history: { push } } = props
						return (
							<Layout>
								<Header>
									<Menu theme="dark" mode="horizontal">
										<Menu.Item key="1">
											<Link to="/">Home</Link>
										</Menu.Item>
										{/* <Menu.Item key="2">
									<Link to="/about">About</Link>
								</Menu.Item>
								<Menu.Item key="3" onClick={() => push('/contacts')}>
									Contacts
								</Menu.Item> */}
									</Menu>
								</Header>
								<Content>
									<Switch>
										<PrivateRoute path="/" exact component={HomePage} />
										<PrivateRoute path="/home/:id?/:isDone?" exact component={HomePage} />
										<PrivateRoute path="/word/:id?" component={CurrentCard} />
										{/* <Redirect to="/" />  */}
										{/* <Route path="/about" render={() => <h1>Немного о себе</h1>} /> */}
										{/* <Route path="/contacts" render={() => <h1>Немного контактов</h1>} /> */}
									</Switch>
								</Content>
							</Layout>
						)
					}} />
				</Switch>
			</BrowserRouter>
		)
	}
}
App.contextType = FirebaseContext;

export default App;
