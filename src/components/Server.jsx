import React from 'react';
import Popup from "reactjs-popup";
import '../styles/Server.css'
import ServerModifier from "./ServerModifier";

export default class Server extends React.Component{
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
    this.props.handleDelete(this.props.data.id);
  }
  handleModification(info){
    let body = {
      id: this.props.data.id,
      _rev: this.props.data.ref,
      createdBy: info.password,
      createdTime: Date.parse(this.props.data.createdAt),
      name: info.name,
      lastConnection: (new Date()).getTime()
    };
    this.props.handleModify(body);
  }

  render(){
    const server = this.props.data;
    return (
      <div className={'Server-holder'} onMouseEnter={this.setHovering} onMouseLeave={this.unsetHovering}>
        <label className={'Server-delete-label' + (this.state.hover ? ' show' : '')}
               onClick={this.handleDelete}>ELIMINAR</label>
        <Popup trigger={<label className={'Server-modify-label' + (this.state.hover ? ' show' : '')}>MODIFICAR</label>} modal>
          {close => (<ServerModifier onConfirm={(info) => {this.handleModification(info); this.unsetHovering(); close();}}
                                     onCancel={() => {this.unsetHovering(); close();}}
                                     prevName={server.name} prevOwner={server.createdBy}/>)}
        </Popup>
        <label className={'Server-title'}>{server.name}</label>
        <div className={'Server-category-item'}>
          <label className={'Server-category-name'}>Propietario: </label>
          <label className={'Server-category-value'}>{server.createdBy}</label>
        </div>
        <div className={'Server-category-item'}>
          <label className={'Server-category-name'}>Server ID: </label>
          <label className={'Server-category-value'}>{server.id}</label>
        </div>
        <div className={'Server-category-item'}>
          <label className={'Server-category-name'}>Application Token: </label>
          <label className={'Server-category-value'}>{server.token}</label>
        </div>
        <div className={'Server-category-item'}>
          <label className={'Server-category-name'}>Actualizado el: </label>
          <label className={'Server-category-value'}>{new Date(Date.parse(server.updatedAt)).toUTCString()}</label>
        </div>
      </div>
    )
  }
}