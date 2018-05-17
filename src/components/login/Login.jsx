import React from 'react';
import '../../styles/Login.css';
import axios from 'axios';
import LoginForm from "./LoginForm";
import LoginButton from "./LoginButton";

export default class Login extends React.Component {
  /*Component builder. Contains info about the form inside it and manages button events.*/
  constructor(props){
    super(props);
    this.state = {
      formIsValid: {username: true, password: true},
      username: null,
      password: null,
      errorMessage: 'Usuario o contraseña inválidos.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  /* Updates the state when the form is modified*/
  handleChange(username, password){
    this.setState({
      username: username,
      password: password
    });
  }
  /* Handles button's click*/
  handleClick(){
    // Check field validity
    let userValid = this.isValid(this.state.username);
    let passwordValid = this.isValid(this.state.password);
    // Set error message
    let message = 'Usuario o contraseña inválidos.';
    if (!userValid && !passwordValid) message = 'Ingrese un usuario y contraseña.';
    else if (!userValid) message = "Ingrese un usuario.";
    else if (!passwordValid) message = "Ingrese una contraseña.";
    // Update state
    this.setState({
      formIsValid: { username: userValid, password: passwordValid },
      errorMessage: message
    });
    // Login to the server
    if (passwordValid && userValid) {
      // Set values for request
      let headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      };
      let data = {username: this.state.username, password: this.state.password};
      // Perform HTTP request
      let self = this;
      axios.post('https://picappss.herokuapp.com/api/token', data, headers)
        .then(response => self.handleResponse(response))
        .catch(() => self.handleError());
    }
  }
  /* Handle response from login*/
  handleResponse(response) {
    this.props.history.push('/manager', {token: response.data.token.token});
  }
  /* Set state on login error*/
  handleError(){
    this.setState({
      formIsValid: {username: false, password: false},
      errorMessage: 'Usuario o contraseña incorrecto'
    })
  }
  /* Checks validity of form fields*/
  isValid(field){
    return field != null && field.trim() !== '';
  }

  render() {
    return (
      <div className="Login-holder">
        <img className='Login-logo' src={require('../../resources/picapp_logo.png')} alt='PicApp Server Management'/>
        <LoginForm formIsValid={this.state.formIsValid} handleChange={this.handleChange}
                   username={this.state.username} password={this.state.password}/>
        <label className={'Login-error-label' + ((this.state.formIsValid.password && this.state.formIsValid.username) ? '' : ' show')}>
          {this.state.errorMessage}
        </label>
        <LoginButton handleClick={this.handleClick}/>
      </div>
    )
  }
}
