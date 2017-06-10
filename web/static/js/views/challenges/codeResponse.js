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
    this.state = {challenge: {}}
  }
  componentWillReceiveProps(nextProps) {
    this.setState({challenge: nextProps.challenge})
  }

  _updateChallengeResponse(codeText) {
    this.props.updateChallengeResponse(codeText);
  }

  render() {
  const options = {
     lineNumbers: true,
     mode: 'javascript',
     theme: this.props.theme
  }
  return (
      <Codemirror
        value={this.state.challenge.response}
        onChange={::this._updateChallengeResponse}
        options={options}/>
   )
  }
}

export default CodeResponse;
