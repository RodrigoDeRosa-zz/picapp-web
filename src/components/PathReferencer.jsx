import React from 'react';
import '../styles/PathReferencer.css';

export default class PathReferencer extends React.Component {
  render() {
    return (
      <div className={'PathReferencer-holder'}>
        <label className={'PathReferencer-icon'} onClick={this.props.handleClick}>{this.props.icon}</label>
        <label className={'PathReferencer-label'}>{this.props.title}</label>
      </div>
    )
  }
}