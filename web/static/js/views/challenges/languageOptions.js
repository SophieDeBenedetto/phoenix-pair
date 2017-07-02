import React, {Component}  from 'react';

const languages = [
  'ruby',
  'javascript',
  'swift',
  'python',
  'php',
  'erlang'
]


class LanguageOptions extends Component {

  languageOptions() {
    return languages.map(language => {
      return <option>{language}</option>
    })
  }

  render() {
    return (
      <div className="col-lg-6 col-md-6 col-sm-3" style={{paddingLeft: '0%', marginBottom: '2%'}}>
        <label className="control-label">language</label>
        <select 
          className="form-control" 
          value={this.props.language} 
          onChange={this.props.setLanguage}>
          {this.languageOptions()}
        </select>
      </div>
    )
  }
}

export default LanguageOptions
