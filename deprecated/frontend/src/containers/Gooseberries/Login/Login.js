import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { AUTH_TOKEN } from '../../../constants'
import NoneLogin from '../../../hoc/NoneLogin/NoneLogin'
import classes from './Login.module.css'

const LOGIN_SCHEMA = Yup.object().shape({
	username: Yup.string().required('Username is required.'),
	password: Yup.string().required('Password is required')
})

const LOGIN_MUTATION = gql`
	mutation Login($username: String!, $password: String!) {
		login(input: { username: $username, password: $password }) {
			user {
				token
			}
		}
	}
`

export default class Login extends Component {
	render() {
		return (
			<NoneLogin elseRedirect="/home" className={classes.Login}>
				<h1>Log In</h1>
				<Mutation mutation={LOGIN_MUTATION}>
					{(loginUser, { loading, error, data }) => {
						if (loading) return <p>Loading...</p>
						if (error) return <p>ERROR</p>
						if (data) {
							this._confirm(data)
							return <Redirect to="/home" />
						}
						// TODO: Create error checks
						return (
							<div>
								<Formik
									initialValues={{ username: '', password: '' }}
									validationSchema={LOGIN_SCHEMA}
									onSubmit={(values, { resetForm, setErrors }) => {
										loginUser({
											variables: {
												username: values.username,
												password: values.password
											}
										})
									}}
									render={({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										handleSubmit
									}) => {
										return (
											<form onSubmit={handleSubmit} className={classes.Form}>
												<label for="username">
													<span className={classes.label}>Username</span>
													<input
														type="Text"
														id="username"
														name="username"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.username}
													/>
												</label>
												{touched.username && errors && errors.username && (
													<p>{errors.username}</p>
												)}
												<label for="password">
													<span className={classes.label}>Password</span>
													<input
														type="Password"
														id="password"
														name="password"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.password}
													/>
												</label>
												{touched.password && errors && errors.password && (
													<p>{errors.password}</p>
												)}
												<div>
													<button type="Submit">Submit</button>
												</div>
											</form>
										)
									}}
								/>
							</div>
						)
					}}
				</Mutation>
			</NoneLogin>
		)
	}

	_confirm = async data => {
		const { token } = data.login.user
		this._saveUserData(token)
	}

	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token)
	}
}
