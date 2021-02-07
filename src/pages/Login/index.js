import React, { Component } from 'react'
import { Layout, Form, Input, Button } from 'antd';

import s from './Login.module.scss'
import FirebaseContext from '../../context/firebaseContext';

const { Content } = Layout;

export default class LoginPage extends Component {

	state = {
		registration: false,
	}

	componentDidMount() {
		
	}
	

	handleClickLink = () => {
		this.setState({
			registration: true,
		})
	}

	onFinish = ({ email, password }) => {
		const { signWithEmail, setUserUid } = this.context;
		const { history } = this.props;
		signWithEmail(email, password)
			.then(res => {
				setUserUid(res.user.uid);
				localStorage.setItem('user', res.user.uid)
				history.push('/')
			})
	}

	onFinishRegister = ({ email, password }) => {
		const { createUserWithEmail } = this.context;
		const { history } = this.props;
		createUserWithEmail(email, password)
			.then(res => {
				console.log('res', res);
				history.push('/')
			})
	}

	onFinishFailed = (errMessage) => {
		console.log(errMessage);
	}

	renderForm = () => {
		const layout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};
		const tailLayout = {
			wrapperCol: { offset: 6, span: 18 },
		};

		return (
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={this.onFinish}
				onFinishFailed={this.onFinishFailed}
			>
				<Form.Item
					label="Username"
					name="email"
					rules={[{ required: true, message: 'Please input your email!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
				</Button>
				Or <a onClick={this.handleClickLink}>register now!</a>
				</Form.Item>
			</Form>
		)

	}

	registrationForm = () => {
		const layout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};
		const tailLayout = {
			wrapperCol: { offset: 6, span: 18 },
		};

		return (
			<Form
				{...layout}
				name="register"
				onFinish={this.onFinishRegister}
				onFinishFailed={this.onFinishFailed}
				scrollToFirstError
			>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
						{
							required: true,
							message: 'Please input your E-mail!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="password"
					label="Password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject('The two passwords that you entered do not match!');
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Register
				</Button>

				</Form.Item>
			</Form>
		)

	}

	render() {
		const { registration } = this.state;
		return (
			<Layout>
				<Content>
					<div className={s.root}>
						<div className={s.form_wrap}>
							{registration ? this.registrationForm() : this.renderForm()}
						</div>
					</div>
				</Content>
			</Layout>
		)
	}
}

LoginPage.contextType = FirebaseContext;