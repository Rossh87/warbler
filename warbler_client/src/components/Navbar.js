// Import packages
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import media
import Logo from '../images/warbler-logo.png';

const Navbar = ({logout, currentUser}) => {

	const renderNavAuthorized = () => {
		return ( 
			<ul className="nav navbar-nav navbar-right">
				<li>
					<Link to={`/users/${currentUser.id}/messages/new`}>
						New Message
					</Link>
				</li>
				<li>
					<a onClick={logout}>Log Out</a>
				</li>
			</ul>
		)
	}

	const renderNavUnauthorized = () => {
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

	const renderNavConditionally = () => {
		return currentUser.isAuthenticated ?
			renderNavAuthorized()
			: renderNavUnauthorized()
	}

	return(
		<nav className='navbar navbar-expand'>
			<div className='container-fluid'>
				<div className="navbar-header">
					<Link to='/' className='navbar-brand'>
						<img src={Logo} alt="Warbler Home"/>
					</Link>
				</div>
				{renderNavConditionally()}
			</div>
		</nav>
	)
}


export default Navbar;

Navbar.propTypes = {
	currentUser: PropTypes.shape({
	        isAuthenticated: PropTypes.bool,
	        user: PropTypes.object
    	}).isRequired,

	logout: PropTypes.func.isRequired
};