import React from 'react';
import '../styles/ServerModifier.css';
import DataForm from "./DataForm";

export default class ServerModifier extends React.Component {
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
    let serverName = (this.state.name !== null ? this.state.name : this.props.prevName);
    let serverOwner = (this.state.owner !== null ? this.state.owner : this.props.prevOwner);
    let info = {name: serverName, password: serverOwner};
    this.props.onConfirm(info);
  }
  render() {
    return (
      <div>
        <div className={'ServerModifier-form'}>
          <DataForm title={'Nombre'} placeholder={'Ingrese el nuevo nombre del servidor.'}
                    handleChange={this.handleNameChange} for={'modify'}/>
          <DataForm title={'Propietario'} placeholder={'Ingrese el nombre del usuario propietario.'}
                    handleChange={this.handleOwnerChange} for={'modify'}/>
        </div>
        <div className={'ServerModifier-buttons-holder'}>
          <button className={'ServerModifier-button'} onClick={this.handleClick}>Confirmar</button>
          <button className={'ServerModifier-button'} onClick={this.props.onCancel}>Cancelar</button>
        </div>
      </div>
    )
  }
}