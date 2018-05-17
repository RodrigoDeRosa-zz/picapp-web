import React from 'react';
import Popup from "reactjs-popup";
import '../styles/User.css'
import UserModifier from "./UserModifier";

export default class User extends React.Component{
  constructor(props){
    super(props);
    this.state = { hover: false };
    this.setHovering = this.setHovering.bind(this);
    this.unsetHovering = this.unsetHovering.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModification = this.handleModification.bind(this);
  }
  setHovering(){
    this.setState({hover: true});
  }
  unsetHovering(){
    this.setState({hover: false});
  }
  handleDelete(){
    this.props.handleDelete(this.props.data.name);
  }
  handleModification(info){
    let body = {
      id: this.props.data.id,
      _rev: this.props.data.ref,
      password: info.password,
      applicationOwner: this.props.data.applicationOwner,
      username: this.props.data.name
    };
    this.props.handleModify(body);
  }

  render(){
    const user = this.props.data;
    return (
      <div className={'User-holder'} onMouseEnter={this.setHovering} onMouseLeave={this.unsetHovering}>
        <label className={'User-delete-label' + (this.state.hover ? ' show' : '')}
               onClick={this.handleDelete}>ELIMINAR</label>
        <Popup trigger={<label className={'User-modify-label' + (this.state.hover ? ' show' : '')}>MODIFICAR</label>} modal>
          {close => (<UserModifier onConfirm={(info) => {this.handleModification(info); this.unsetHovering(); close();}}
                                     onCancel={() => {this.unsetHovering(); close();}}
                                     prevPass={user.password}/>)}
        </Popup>
        <div className={'User-category-item'}>
          <label className={'User-category-name'}>Nombre de usuario: </label>
          <label className={'User-category-value'}>{user.name}</label>
        </div>
        <div className={'User-category-item'}>
          <label className={'User-category-name'}>Contraseña: </label>
          <label className={'User-category-value'}>{user.password}</label>
        </div>
        <div className={'User-category-item'}>
          <label className={'User-category-name'}>Business Token: </label>
          <label className={'User-category-value'}>{user.token}</label>
        </div>
        <div className={'User-category-item'}>
          <label className={'User-category-name'}>Propietario de aplicación: </label>
          <label className={'User-category-value'}>{user.applicationOwner}</label>
        </div>
      </div>
    )
  }
}