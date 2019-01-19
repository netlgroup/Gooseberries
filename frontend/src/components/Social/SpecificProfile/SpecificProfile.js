import React from 'react'

import classes from './SpecificProfile.module.css'

export default props => {
	console.log(props.user)
	let {
		firstName,
		lastName,
		image,
		username,
		email,
		dateOfBirth,
		lastLogin,
		isActive
	} = props.user
	return (
		<div>
			<img src={image} alt="Profile" />
			<h1>{isActive}</h1>
			<h1>{`${firstName} ${lastName}`}</h1>
			<h1>{username}</h1>
			<h1>{email}</h1>
			<h1>{dateOfBirth}</h1>
			<h1>{lastLogin}</h1>
		</div>
	)
}
