import React from 'react';
import '../styles/UserModifier.css';
import DataForm from "./DataForm";

export default class UserModifier extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: null
    };
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleOwnerChange(event){
    this.setState({name: this.state.name, password: event.target.value});
  }
  handleClick(){
    let password = (this.state.password !== null ? this.state.password : this.props.prevPass);
    let info = {password: password};
    this.props.onConfirm(info);
  }
  render() {
    return (
      <div>
        <div className={'UserModifier-form'}>
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