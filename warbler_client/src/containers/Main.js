import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';

// Get local components
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import MessageForm from './MessageForm';
import withAuth from '../hocs/withAuth';

// Get actions/dispatchers
import authUser from '../store/actions/auth/authUser';
import refreshAuthToken from '../store/actions/auth/refreshAuthToken';
import {removeError} from '../store/actions/errorActionCreators';

// Get service function for mapStateToProps
import isStaleSelector from '../services/isStaleSelector';

class Main extends Component {
	componentDidMount() {
		setInterval(this.checkTokenExp, 30000);
	}

	checkTokenExp = () => {
		const { refreshAuthToken, tokenIsStale } = this.props;

		if(tokenIsStale()) {
			refreshAuthToken();
		};
	}

	render() {

		const {authUser, error, removeError, currentUser} = this.props;

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
							error={error} 
							removeError={removeError} 
							authUser={authUser}
							signUp={false}
							{...props}
						/>} 
					/>

					<Route path='/signup' render={props => 
						<AuthForm 
							buttonText='Sign Up' 
							heading='Join Today!' 
							error={error} 
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

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		error: state.error,
		tokenIsStale: isStaleSelector(state, 30) 
	};
};

const actions = {
	authUser,
	removeError,
	refreshAuthToken
};

export {Main};
export default compose(
	withRouter,
	connect(mapStateToProps, actions)
)(Main);

Main.propTypes = {
	authUser: PropTypes.func.isRequired,
	error: PropTypes.object.isRequired,
	removeError: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired,
	refreshAuthToken: PropTypes.func.isRequired,
	tokenIsStale: PropTypes.func.isRequired
};