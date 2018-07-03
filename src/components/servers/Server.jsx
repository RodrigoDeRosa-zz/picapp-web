import React from 'react';
import Popup from "reactjs-popup";
import '../../styles/Server.css';
import FaAreaChart from "react-icons/lib/fa/area-chart";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import FaCheckCircle from "react-icons/lib/fa/check-circle";
import ServerModifier from "./ServerModifier";

export default class Server extends React.Component{
  constructor(props){
    super(props);
    this.state = { hover: false };
    this.setHovering = this.setHovering.bind(this);
    this.unsetHovering = this.unsetHovering.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModification = this.handleModification.bind(this);
    this.showStatistics = this.showStatistics.bind(this);
    this.isAlive = this.isAlive.bind(this);
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
  showStatistics(){
    if (this.isAlive()) this.props.history.push('/server/'+this.props.data.name);
  }
  isAlive(){
    return this.props.data.name === 'applicationServer-v2.0';
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
        <div className={'Server-statistics-holder' + (this.isAlive() ? '' : ' off')} onClick={this.showStatistics}>
          <label className={'Server-statistics-icon' + (this.state.hover ? ' show' : '') + (this.isAlive() ? '' : ' off')}><FaAreaChart/></label>
          <label className={'Server-statistics-label' + (this.state.hover ? ' show' : '') + (this.isAlive() ? '' : ' off')}>Estadísticas</label>
        </div>
        <div className={'Server-title-holder'}>
          <label className={'Server-title' + (this.isAlive() ? '' : ' off')}>{server.name}</label>
          {!this.isAlive() && <label className="Server-status-icon-off"><FaTimesCircle/></label>}
          {this.isAlive() && <label className="Server-status-icon-on"><FaCheckCircle/></label>}
        </div>
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