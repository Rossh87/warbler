import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../images/warbler-logo.png';
import {logout} from '../store/actions/auth';

class Navbar extends Component {
	logout = e => {
		e.preventDefault();
		this.props.logout();
	}

	renderNavAuthorized = () => {
		return ( 
			<ul className="nav navbar-nav navbar-right">
				<li>
					<Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>
						New Message
					</Link>
				</li>
				<li>
					<a onClick={this.logout}>Log Out</a>
				</li>
			</ul>
		)
	}

	renderNavUnauthorized = () => {
		return (
			<ul className="nav navbar-nav navbar-right">
				<li>
					<Link to='/signup'>Sign Up</Link>
				</li>
				<li>
					<Link to='/signin'>Sign In</Link>
				</li>
			</ul>
		)
	}

	renderNavConditionally = () => {
		return this.props.currentUser.isAuthenticated ?
			this.renderNavAuthorized()
			: this.renderNavUnauthorized()
	}

	render() {
		return(
			<nav className='navbar navbar-expand'>
				<div className='container-fluid'>
					<div className="navbar-header">
						<Link to='/' className='navbar-brand'>
							<img src={Logo} alt="Warbler Home"/>
						</Link>
					</div>
					{this.renderNavConditionally()}
				</div>
			</nav>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, {logout})(Navbar);