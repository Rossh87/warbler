import React from 'react';
import DefaultProfileImage from '../images/default-profile-image.jpg';
import PropTypes from 'prop-types';

const UserAside = ({profileImageUrl, username}) => {
	return (
		<aside className="col-sm-2">
			<div className="panel panel-default">
				<div className="panel-body">
					<img 
						src={profileImageUrl || DefaultProfileImage}
						alt={username} 
						width="200"
						height="200"
						className="img-thumbnail"
					/>
				</div>
			</div>
		</aside>
	)
}

export default UserAside;

UserAside.propTypes = {
	profileImageUrl: PropTypes.string,
	username: PropTypes.string.isRequired
};