import React from 'react';
import '../../styles/LoginForm.css'
import Form from "../utils/Form";

export default class LoginForm extends React.Component{
  /* Props composition:
  *   - handleChange: Function to be called on input change
  *   - formIsValid: Boolean value that determines whether the content of the form is valid or not
  *   - username | password: Previous contents for re-rendering.*/
  constructor(props){
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  /* Handles change in username input*/
  handleUserChange(event){
    this.setState({username: event.target.value, password: this.props.password});
    this.props.handleChange(event.target.value, this.props.password)
  }
  /* Handles change in password input*/
  handlePasswordChange(event){
    this.setState({username: this.props.username, password: event.target.value});
    this.props.handleChange(this.props.username, event.target.value);
  }

  render () {
    return (
      <div className='LoginForm-holder'>
        <Form title='Usuario' placeholder='Ingrese su nombre de usuario'
              correct={this.props.formIsValid.username} handleChange={this.handleUserChange}/>
        <Form title='Contraseña' type='password' placeholder='Ingrese su contraseña'
              correct={this.props.formIsValid.password} handleChange={this.handlePasswordChange}/>
      </div>
    )
  }
}
