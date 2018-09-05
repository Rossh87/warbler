import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessages, deleteMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem';

class MessageList extends Component {

	componentDidMount() {
		this.props.fetchMessages();
	}

	render() {
		const {messages} = this.props;

		const messageList = messages.map(msg => (
				<MessageItem
					messageId={msg._id} 
					key={msg._id} 
					date={msg.createdAt} 
					text={msg.text}
					username={msg.user.username}
					profileImageUrl={msg.user.profileImageUrl}
					deleteMessage={this.props.deleteMessage}
				/>
			)
		)

		return (
			<div className="row col-sm-8">
				<div className="offset-1 col-sm-10">
					<ul className="list-group" id='messages'>
						{messageList}
					</ul>
				</div>
			</div>
		)

	}


}

function mapStateToProps(state) {
	return {
		messages: state.messages
	}
};

export default connect(mapStateToProps, {fetchMessages, deleteMessage})(MessageList);