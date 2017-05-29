
import React                 from 'react';
import { connect }           from 'react-redux';
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

  _updateChallengeResponse(e) {
    debugger;
    // var newText =
    dispatch(Actions.updateResponse())
  }

  render() {
  const options = {
     lineNumbers: true,
     mode: 'javascript',
     theme: 'monokai'
  }
  return (
    <div>
      <Codemirror
        value={"hello world!"}
        onChange={::this._updateChallengeResponse}
        options={options}/>
    </div>
   )
  }
}

export default CodeResponse
