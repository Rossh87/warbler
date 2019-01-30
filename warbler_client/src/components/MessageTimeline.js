import React from 'react';
import PropTypes from 'prop-types';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeline = ({profileImageUrl, username}) => {

	return (
		<div className="row">
			<UserAside 
				profileImageUrl={profileImageUrl}
				username={username}
			/>
			<MessageList />
		</div>
	)
};

export default MessageTimeline;

MessageTimeline.propTypes = {
	profileImageUrl: PropTypes.string,
	username: PropTypes.string.isRequired
};