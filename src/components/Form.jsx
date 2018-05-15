import React from 'react';
import '../styles/Form.css';

export default class Form extends React.Component {
  render() {
    return (
      <div className='Form-holder'>
        <label className='Form-label'>{this.props.title}</label>
        <input className={'Form-input' + (this.props.correct ? '' : ' -incorrect')}
               type={this.props.type} placeholder={this.props.placeholder} onChange={this.props.handleChange}/>
      </div>
  )
  }
}