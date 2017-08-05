import React                 from 'react';
import Actions               from '../../actions/currentChallenge';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

import Codemirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/solarized.css';

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/ruby/ruby.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/erlang/erlang.js'


class CodeResponse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {challenge: {}, typing: false}
    setInterval(::this.checkTyping, 3000)
  }

  checkTyping() {
    if (!this.state.typing) {
      this.props.removeCurrentParticipantTyping()
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({challenge: nextProps.challenge})
  }

  updateChallengeResponse(codeText) {
    this.setState({typing: true})
    this.props.updateChallengeResponse(codeText);
    this.setState({typing: false})
  }

  notTyping(focus) {
    if (!focus) {
      this.props.removeCurrentParticipantTyping()
    }
  }

  render() {
    const options = {
       lineNumbers: true,
       mode: this.props.language,
       theme: this.props.theme,
       tabSize: 2
    }
    return (
        <Codemirror
          refs="codeMirror"
          value={this.state.challenge.response}
          onFocusChange={::this.notTyping}
          onChange={::this.updateChallengeResponse}
          options={options}/>
    )
  }
}

export default CodeResponse;
