import React from 'react';
import '../../styles/LoginButton.css';

export default class LoginButton extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = props.handleClick;
  }
  render() {
    return (
      <button className='Login-button' onClick={this.handleClick}>Login</button>
    )
  }
}