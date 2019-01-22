import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import {authUser, refreshAuthorizationToken} from '../store/actions/auth';
import {removeError} from '../store/actions/error';
import withAuth from '../hocs/withAuth';
import MessageForm from './MessageForm';

class Main extends Component {
	componentDidMount() {
		// check if user is auth'd and active.  
		const timedCheck = () => {
			const {refreshAuthorizationToken, currentUser} = this.props;
			if(currentUser.isActive && currentUser.isAuthenticated) {
				// calculate time remaining until auth token expires.
				// If < 1 min, declare token stale and attempt to refresh
				const exp = currentUser.authExpiration;
				const current = Math.floor(Date.now() / 1000);
				const staleToken = (exp - current) < 60;
				// call refresh function
				if(staleToken) {
					refreshAuthorizationToken();
				}
			}
		}

		setInterval(timedCheck, 30000);
	}
	
	render() {

		const {authUser, errors, removeError, currentUser} = this.props;

		return(
			<div className="container">
				<Switch>
					<Route exact path='/' render={props => 
						<Homepage 
							currentUser={currentUser} 
							{...props}
						/>} 
					/>

					<Route path='/signin' render={props => 
						<AuthForm 
							buttonText='Log In' 
							heading='Welcome Back' 
							errors={errors} 
							removeError={removeError} 
							authUser={authUser} 
							{...props}
						/>} 
					/>

					<Route path='/signup' render={props => 
						<AuthForm 
							buttonText='Sign Up' 
							heading='Join Today!' 
							errors={errors} 
							removeError={removeError} 
							signUp 
							authUser={authUser} 
							{...props}
						/>} 
					/>

					<Route 
						path='/users/:id/messages/new' 
						component={withAuth(MessageForm)}
					/>
						
				</Switch>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withRouter(connect(mapStateToProps, {authUser, removeError, refreshAuthorizationToken})(Main));