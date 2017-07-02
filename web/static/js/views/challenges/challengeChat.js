import React, {Component}   from 'react';
import { setDocumentTitle, renderErrorsFor } from '../../utils';


class ChallengeChat extends Component {

  constructor(props) {
    super(props);
    this.state = {showChat: false}
  }
  toggleChat() {
    const {showChat} = this.state;
    this.setState({showChat: !showChat})
  }

  renderChat() {
    if (this.state.showChat) {
      return (
        <div style={{height: "400px", marginTop: "5px", marginLeft: "15px", width: "280px"}}>
          <div className="panel panel-info" style={{height: "300px"}}>
            <div className="panel-heading">
              <h3 className="panel-title">chat<span onClick={::this.toggleChat} style={{marginLeft: "87%", fontSize: "16px"}}>x</span></h3>
            </div>
            <div className="panel-body">
              Panel content
            </div>
          </div>
          <textArea className="form-control" style={{height: "78px"}}/>
        </div>
      )
    } else {
      return (
        <div className="panel panel-info" style={{marginTop: "5px", marginLeft: "15px", width: "280px"}}>
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



