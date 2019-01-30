import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MessageTimeline from './MessageTimeline';

const Homepage = ({currentUser}) => {
	if(!currentUser.isAuthenticated) {
		return (
			<div className="home-hero">
				<h1>What's Happening</h1>
				<h4>New to Warbler?</h4>
				<Link to='/signup' className='btn btn-primary'>
					Sign Up Here
				</Link>
			</div>
		)
	}

	return (
		<MessageTimeline 
			profileImageUrl={currentUser.profileImageUrl}
			username={currentUser.username}
		/>
	) 

}

export default Homepage;

Homepage.propTypes = {
	currentUser: PropTypes.shape({
		profileImageUrl: PropTypes.string,
		username: PropTypes.string,
		isAuthenticated: PropTypes.bool.isRequired
	}).isRequired
};