import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import PropTypes from 'prop-types';

const MessageItem = props =>  {
	const {
		date,
		profileImageUrl,
		text,
		username,
		deleteMessage,
		isMessageOwner
	} = props;


	return(
		<div>
			<li className="list-group-item">
				<img src={profileImageUrl || DefaultProfileImg} alt={username} height="100" width="100" className="timeline-image" />
				<div className="message-area">
					<Link to='/'>@{username} &nbsp; </Link>
					<span className="text-muted">
						<Moment className='text-muted' format="Do MMM YYYY">
							{date}
						</Moment>
					</span>
					<p>{text}</p>
					{
						isMessageOwner &&
						<a className='btn btn-danger' onClick={deleteMessage}>Delete</a>
					}
				</div>
			</li>
		</div>
	)
}

export default MessageItem;

MessageItem.propTypes = {
	date: PropTypes.string.isRequired,
	profileImageUrl: PropTypes.string,
	text: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	deleteMessage: PropTypes.func.isRequired,
	isMessageOwner: PropTypes.bool.isRequired
};