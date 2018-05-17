import React from 'react';
import '../styles/UserModifier.css';
import DataForm from "./DataForm";

export default class UserModifier extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      password: null
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleNameChange(event){
    this.setState({name: event.target.value, password: this.state.password});
  }
  handleOwnerChange(event){
    this.setState({name: this.state.name, password: event.target.value});
  }
  handleClick(){
    let username = (this.state.name !== null ? this.state.name : this.props.prevName);
    let password = (this.state.password !== null ? this.state.password : this.props.prevPass);
    let info = {username: username, password: password, prevName: this.props.prevName};
    this.props.onConfirm(info);
  }
  render() {
    return (
      <div>
        <div className={'UserModifier-form'}>
          <DataForm title={'Nombre de Usuario'} placeholder={'Ingrese el nuevo nombre de usuario.'}
                    handleChange={this.handleNameChange} for={'modify'}/>
          <DataForm title={'Contraseña'} placeholder={'Ingrese la nueva contraseña.'}
                    handleChange={this.handleOwnerChange} for={'modify'}/>
        </div>
        <div className={'UserModifier-buttons-holder'}>
          <button className={'UserModifier-button'} onClick={this.handleClick}>Confirmar</button>
          <button className={'UserModifier-button'} onClick={this.props.onCancel}>Cancelar</button>
        </div>
      </div>
    )
  }
}