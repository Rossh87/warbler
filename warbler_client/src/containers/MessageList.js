import React, {Component} from 'react';
import {connect} from 'react-redux';
import fetchMessages from '../store/actions/messages/fetchMessages';
import deleteMessage from '../store/actions/messages/deleteMessage';
import MessageItem from '../components/MessageItem';

class MessageList extends Component {

	componentDidMount() {
		this.props.fetchMessages();
	}

	render() {
		const {messages, deleteMessage, currentUser, error} = this.props;

		const messageList = messages.map(msg => (
				<MessageItem
					key={msg._id} 
					date={msg.createdAt} 
					text={msg.text}
					username={msg.user.username}
					profileImageUrl={msg.user.profileImageUrl}
					deleteMessage={deleteMessage.bind(this, msg.user._id, msg._id)}
					isMessageOwner={currentUser === msg.user._id}
				/>
			)
		)

		return (
			
			<div className="row col-sm-8">
				<div className="offset-1 col-sm-10">
					<ul className="list-group" id='messages'>
						{error.message && 
							<div className='alert alert-danger'>
								{error.message}
							</div>
						}
						{
							(messages.length > 0) ?
							messageList
							: <div>
								<h1>No Messages!</h1>
							</div>
						}
					</ul>
				</div>
			</div>
		)
	}
}

MessageList.displayName = 'MessageList';

function mapStateToProps(state) {
	return {
		messages: state.messages,
		currentUser: state.currentUser.id,
		error: state.error
	}
};

export default connect(mapStateToProps, {fetchMessages, deleteMessage})(MessageList);