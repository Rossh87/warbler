import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TextInput from '../legos/TextInput';

class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username:'', 
			password: '',
			profileImageUrl: ''
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = e => {
		const {signUp, authUser} = this.props;
		e.preventDefault();
		const authType = signUp ? 'signUp' : 'signIn';
		authUser(authType, this.state)
			// .then(() => {
			// 	this.props.history.push('/');
			// })
			// .catch(() => {return})
		this.props.history.push('/')
	}

	renderSignup = (signUp, username, profileImageUrl) => {
		if(signUp) {
			return(
				<div>
					<TextInput 
						inputName='username'
						handleChange={this.handleChange}
						value={username}
					/>

					<TextInput 
						inputName='profileImageUrl'
						handleChange={this.handleChange}
						value={profileImageUrl}
					/>
				</div>
			)
		}
	}

	renderErrorMessage = ({message}) => {
		if(message) {
			return(
				<div className='alert alert-danger'>
					{message}
				</div>
			)
		}
	}

	render() {
		const {
			email, 
			username, 
			password, 
			profileImageUrl
		} = this.state;

		const {
			heading, 
			buttonText, 
			signUp, 
			error, 
			removeError, 
			history
		} = this.props;

		history.listen(() => {
			removeError();
		});

		return (
			<div className="row justify-content-md-center text-center">
				<div className="col-md-6">
					<form onSubmit={this.handleSubmit}>
						<h2>{heading}</h2>

						{this.renderErrorMessage(error)}

						<TextInput 
							inputName='email'
							handleChange={this.handleChange}
							value={email}
						/>

						<TextInput 
							inputName='password'
							handleChange={this.handleChange}
							value={password}
						/>

						{this.renderSignup(signUp, username, profileImageUrl)}

						<button type='submit' className='btn btn-primary btn-block btn-large'>{buttonText}</button>
					</form>
				</div>
			</div>
		)
	}
}

export default AuthForm;

AuthForm.propTypes = {
	heading: PropTypes.string.isRequired, 
	buttonText: PropTypes.string.isRequired, 
	signUp: PropTypes.bool.isRequired, 
	error: PropTypes.object.isRequired, 
	removeError: PropTypes.func.isRequired, 
	history: PropTypes.func.isRequired
}