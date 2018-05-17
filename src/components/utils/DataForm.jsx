import React from 'react';
import '../../styles/DataForm.css';

export default class DataForm extends React.Component {
  render() {
    return (
      <div className='DataForm-holder'>
        <label className={'DataForm-label'}>{this.props.title}</label>
        <input className={'DataForm-input' + (this.props.for === 'add' ? ' add' : ' modify')} type={this.props.type}
               placeholder={this.props.placeholder} onChange={this.props.handleChange}/>
      </div>
    )
  }
}