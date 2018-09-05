import React, {Component} from 'react';

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
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {return})
	}

	render() {
		const {email, username, password, profileImageUrl} = this.state;

		const {heading, buttonText, signUp, errors, removeError, history} = this.props;

		history.listen(() => {
			removeError();
		});

		return (
			<div className="row justify-content-md-center text-center">
				<div className="col-md-6">
					<form onSubmit={this.handleSubmit}>
						<h2>{heading}</h2>

						{errors.message && 
							<div className='alert alert-danger'>
								{errors.message}
							</div>
						}

						<label htmlFor="email">Email:</label>
						<input 
							type="text" 
							id='email' 
							name='email' 
							className="form-control"
							onChange={this.handleChange}
							value={email}
						/>

						<label htmlFor="password">Password:</label>
						<input 
							type="password" 
							id='password' 
							name='password' 
							className="form-control"
							onChange={this.handleChange}
							value={password}
						/>

						{signUp &&
							<div>
								<label htmlFor="username">Username:</label>
								<input 
									type="text" 
									id='username' 
									name='username' 
									className="form-control"
									onChange={this.handleChange}
									value={username}
								/>
	
								<label htmlFor="profileImageUrl">profileImageUrl:</label>
								<input 
									type="text" 
									id='profileImageUrl' 
									name='profileImageUrl' 
									className="form-control"
									onChange={this.handleChange}
									value={profileImageUrl}
								/>
							</div>
						}

						<button type='submit' className='btn btn-primary btn-block btn-large'>{buttonText}</button>
					</form>
				</div>
			</div>
		)
	}
}

export default AuthForm;