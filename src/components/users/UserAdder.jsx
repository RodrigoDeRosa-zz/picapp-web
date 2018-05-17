import React from 'react';
import '../../styles/UserAdder.css'
import DataForm from "../utils/DataForm";

export default class UserAdder extends React.Component{
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
    let username = (this.state.name !== null ? this.state.name : Math.random().toString(36).substring(7));
    let password = (this.state.password !== null ? this.state.password : Math.random().toString(36).substring(7));
    let body = {
      id: Math.floor(Math.random() * 1000000) + 2,
      _rev: 0,
      password: password,
      applicationOwner: 'SteelSoft',
      username: username
    };
    this.props.onConfirm(body);
  }
  render() {
    return (
      <div>
        <div className={'UserAdder-form'}>
          <DataForm title={'Nombre de usuario'} placeholder={'Ingrese el nombre del nuevo usuario.'}
                    handleChange={this.handleNameChange} for={'add'}/>
          <DataForm title={'Contraseña'} placeholder={'Ingrese la nueva contraseña.'}
                    handleChange={this.handleOwnerChange} for={'add'}/>
        </div>
        <label>El nombre de usuario y la contraseña por defecto son aleatorias.</label>
        <div className={'UserAdder-buttons-holder'}>
          <button className={'UserAdder-button'} onClick={this.handleClick}>Confirmar</button>
          <button className={'UserAdder-button'} onClick={this.props.onCancel}>Cancelar</button>
        </div>
      </div>
    )
  }
}