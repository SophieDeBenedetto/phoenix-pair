import React, {Component}   from 'react';
import MessageListItem      from './messageListItem';

class ChallengeChat extends Component {

  constructor(props) {
    super(props);
    this.state = {showChat: false, message: null, messagesContainer: null}
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const messagesContainer = this.messagesContainer;
    if (messagesContainer)
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  toggleChat() {
    const {showChat} = this.state;
    this.setState({showChat: !showChat})
    this.scrollToBottom();
  }

  submitMessage(e) {
    if (e.key === 'Enter') {
      this.props.submitMessage(e.target.value)
      this.refs.messageForm.value = ''
    }
  }

  renderMessages() {
    return this.props.messages.map(m => {
      return (
        <MessageListItem
          currentUser={this.props.currentUser}
          message={m} />
      )
    })
  }

  renderChat() {
    if (this.state.showChat) {
      return (
        <div style={{height: "400px", marginTop: "5px"}}>
          <div className="panel panel-info" style={{height: "300px"}}>
            <div className="panel-heading">
              <h3 className="panel-title">chat<span onClick={::this.toggleChat} style={{marginLeft: "87%", fontSize: "16px"}}>x</span></h3>
            </div>
            <div
              className="panel-body"
              style={{height: "240px", overflowX: "scroll"}}
              ref={(el) => { this.messagesContainer = el; }}>
              {this.renderMessages()}
            </div>
          </div>
          <textArea
            className="form-control"
            style={{height: "78px"}}
            ref="messageForm"
            onKeyPress={::this.submitMessage}/>
        </div>
      )
    } else {
      return (
        <div className="panel panel-info" style={{marginTop: "5px"}}>
          <div className="panel-heading">
            <h3 className="panel-title">chat<span onClick={::this.toggleChat} style={{marginLeft: "87%", fontSize: "16px"}}>+</span></h3>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      this.renderChat()
    )
  }
}

export default ChallengeChat



