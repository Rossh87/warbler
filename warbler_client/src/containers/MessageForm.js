import React, {Component} from 'react';
import {connect} from 'react-redux';
import postNewMessage from '../store/actions/messages/postNewMessage';

class MessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageText: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange (e) {
		e.preventDefault();
		const message = e.target.value;
		this.setState(prev => ({messageText: message}));
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.postNewMessage(this.state.messageText);
		this.setState(prevState => ({
			messageText: ''
		}));
		this.props.history.push('/');
	}

	render() {

		return (
			<form onSubmit={this.handleSubmit}>
				{this.props.error.message && (
					<div className="alert alert-danger">
						{this.props.error}
					</div>
				)}

				<input type="text" value={this.state.messageText} onChange={this.handleChange} className="form-control"/>
				<button className="btn btn-success pull-right" type='submit'>Add My Message</button>
			</form>
		)
	}
}

function mapStateToProps(state) {
	return {
		error: state.error
	}
}



export default connect(mapStateToProps, {postNewMessage})(MessageForm);