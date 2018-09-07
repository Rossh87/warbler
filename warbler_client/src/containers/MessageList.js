import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessages, deleteMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem';

class MessageList extends Component {

	componentDidMount() {
		this.props.fetchMessages();
	}

	render() {
		const {messages, deleteMessage, currentUser} = this.props;

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

function mapStateToProps(state) {
	return {
		messages: state.messages,
		currentUser: state.currentUser.user.id
	}
};

export default connect(mapStateToProps, {fetchMessages, deleteMessage})(MessageList);