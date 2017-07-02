import React, {Component}   from 'react';
import { setDocumentTitle, renderErrorsFor } from '../../utils';

const themes = [
  'monokai',
  'bespin',
  '3024-day',
  '3024-night',
  'cobalt',
  'eclipse',
  'dracula',
  'isotope',
  'duotone',
  'icecoder',
  'material',
  'midnight',
  'solarized'
]

class ThemeOptions extends Component {
  constructor(props) {
    super(props)
  }
  themeOptions() {
    const {selectedTheme} = this.props;
    return themes.map(theme => {
      return <option selected={theme == selectedTheme}>{theme}</option>
    })
  }

  setTheme(e) {
    this.props.setTheme(e.target.value)
  }


  render() {
    return(
      <div className="col-lg-6 col-md-6 col-sm-3" style={{paddingLeft: '0%', marginBottom: '2%'}}>
        <label className="control-label">theme</label>
        <select className="form-control" id="select" onChange={::this.setTheme}>
          {this.themeOptions()}
        </select>
      </div>
    )
  }
}

export default ThemeOptions
