import React from 'react';
import '../styles/ServerAdder.css'
import DataForm from "./DataForm";

export default class ServerAdder extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: null,
      owner: null
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleNameChange(event){
    this.setState({name: event.target.value, password: this.state.owner});
  }
  handleOwnerChange(event){
    this.setState({name: this.state.name, password: event.target.value});
  }
  handleClick(){
    let serverName = (this.state.name !== null ? this.state.name : Math.random().toString(36).substring(7));
    let serverOwner = (this.state.owner !== null ? this.state.owner : 'admin');
    let body = {
      id: Math.floor(Math.random() * 1000000) + 2,
      _rev: 0,
      createdBy: serverOwner,
      createdTime: new Date().getTime(),
      name: serverName,
      lastConnection: (new Date()).getTime()
    };
    this.props.onConfirm(body);
  }
  render() {
    return (
      <div>
        <div className={'ServerAdder-form'}>
          <DataForm title={'Nombre'} placeholder={'Ingrese el nombre del nuevo servidor.'}
                    handleChange={this.handleNameChange} for={'add'}/>
          <DataForm title={'Propietario'} placeholder={'Ingrese el nombre del usuario propietario.'}
                    handleChange={this.handleOwnerChange} for={'add'}/>
        </div>
        <label>El nombre por defecto es aleatorio y el propietario por defecto es admin.</label>
        <div className={'ServerAdder-buttons-holder'}>
          <button className={'ServerAdder-button'} onClick={this.handleClick}>Confirmar</button>
          <button className={'ServerAdder-button'} onClick={this.props.onCancel}>Cancelar</button>
        </div>
      </div>
    )
  }
}