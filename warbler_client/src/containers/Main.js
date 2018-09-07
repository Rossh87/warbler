import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/error';
import withAuth from '../hocs/withAuth';
import MessageForm from './MessageForm';

const Main = props => {
	const {authUser, errors, removeError, currentUser} = props;
	
	return(
		<div className="container">
			<Switch>
				<Route exact path='/' render={props => <Homepage currentUser={currentUser} {...props}/>} />

				<Route path='/signin' render={props => 
					<AuthForm buttonText='Log In' heading='Welcome Back' errors={errors} removeError={removeError} authUser={authUser} {...props}/>} 
				/>

				<Route path='/signup' render={props => 
					<AuthForm buttonText='Sign Up' heading='Join Today!' errors={errors} removeError={removeError} signUp authUser={authUser} {...props}/>} 
				/>

				<Route path='/users/:id/messages/new' component={withAuth(MessageForm)} />
					
			</Switch>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));