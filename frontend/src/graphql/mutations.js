import gql from 'graphql-tag'
import * as Yup from 'yup'

export const LOGIN_SCHEMA = Yup.object().shape({
	username: Yup.string().required('Username is required.'),
	password: Yup.string().required('Password is required.')
})

export const LOGIN_MUTATION = gql`
	mutation Login($username: String!, $password: String!) {
		login(input: { username: $username, password: $password }) {
			user {
				username
				email
				image
				firstName
				lastName
				isStaff
				dateJoined
				bio
				token
				threadMemberships {
					edges {
						node {
							thread {
								name
							}
						}
					}
				}
			}
		}
	}
`

export const REGISTER_SCHEMA = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Username has to be at least three characters.')
		.required('Username is required.'),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters.')
		.required('Password is required.'),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Password does not match.')
		.required('Password confirm is required'),
	email: Yup.string()
		.email('Please enter an valid email.')
		.required('Email is required.'),
	dateOfBirth: Yup.date()
		.min('1900-01-01', 'Invalid date.')
		.max(new Date(), 'Invalid date.')
		.required('Date of birth is required.')
})

export const REGISTER_MUTATION = gql`
	mutation Register(
		$username: String!
		$password: String!
		$email: String!
		$dateOfBirth: Date!
		$confirmationLink: String!
	) {
		register(
			input: {
				username: $username
				password: $password
				email: $email
				dateOfBirth: $dateOfBirth
				confirmationLink: $confirmationLink
			}
		) {
			user {
				username
			}
		}
	}
`

export const CREATE_THREAD_SCHEMA = Yup.object().shape({
	name: Yup.string()
		.min(3, 'The name of the thread must be longer than 3 characters.')
		.max(20, 'The name of the thread can not be over 20 characters.')
		.required('Thread name is required.')
		.matches(/^\S{3,}$/, 'Thread name cannot have any spaces.')
		.matches(
			/^[a-zA-Z0-9_.-]*$/,
			'Thread name can only contain alphabets, numbers, dashes and underscores.'
		),
	description: Yup.string()
		.min(30, 'Description must be at least 30 characters.')
		.max(500, 'The length of the description cannot exceed 500.')
		.required('Description is required.')
})

export const CREATE_THREAD_MUTATION = gql`
	mutation CreateThread($name: String!, $description: String!, $threadImage: Upload) {
		createThread(
			input: { name: $name, description: $description, threadImage: $threadImage }
		) {
			thread {
				id
				threadImage
				name
				description
			}
		}
	}
`

export const JOIN_THREAD_MUTATION = gql`
	mutation JoinThread($threadName: String!) {
		joinThread(threadName: $threadName) {
			membership {
				thread {
					name
				}
				user {
					image
					username
				}
				nickname
				isAdmin
			}
		}
	}
`

export const LEAVE_THREAD_MUTATION = gql`
	mutation LeaveThread($threadName: String!) {
		leaveThread(threadName: $threadName) {
			successful
		}
	}
`
