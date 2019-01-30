import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function withAuth(WrappedComponent) {
	class Authenticate extends Component {

		componentDidMount() {
			if(!this.props.isAuthenticated) {
				this.props.history.push('/signin');
			}
		};

		componentDidUpdate(nextProps) {
			if(!nextProps.isAuthenticated) {
				this.props.history.push('/signin');
			}
		};

		render() {
			return <WrappedComponent {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.currentUser.isAuthenticated,
			signInRequired: state.error.signInRequired
		}
	};

	return connect(mapStateToProps, null)(Authenticate);
}

