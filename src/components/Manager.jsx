import React from 'react';
import Header from "./utils/Header";
import PathReferencer from "./utils/PathReferencer";
import '../styles/Manager.css';
import FaDatabase from 'react-icons/lib/fa/database';
import FaAreaChart from 'react-icons/lib/fa/area-chart';
import FaChild from 'react-icons/lib/fa/child';
import FaFileO from "react-icons/lib/fa/file-o";

export default class Manager extends React.Component {
  constructor(props){
    super(props);
    this.goToServers = this.goToServers.bind(this);
    this.goToUsers = this.goToUsers.bind(this);
    this.goToFiles = this.goToFiles.bind(this);
    this.goToStatistics = this.goToStatistics.bind(this);
  }
  goToServers(){
    this.props.history.push('/servers', {token: this.props.history.location.state.token});
  }
  goToUsers(){
    this.props.history.push('/users');
  }
  goToFiles(){
    this.props.history.push('/files', {token: this.props.history.location.state.token});
  }
  goToStatistics(){
    this.props.history.push('/statistics', {token: this.props.history.location.state.token});
  }

  render() {
    return (
      <div>
        <Header/>
        <div className='Manager-title-holder'>
          <label className='Manager-title-main'>Bienvenido al administrador de aplicaciones de PicApp</label>
          <label className='Manager-title-secondary'>Seleccione la opción deseada para ver más información</label>
        </div>
        <div className='Manager-route-holder'>
          <PathReferencer title={'Servidores'} icon={<FaDatabase/>} handleClick={this.goToServers} full/>
          <PathReferencer title={'Usuarios'} icon={<FaChild/>} handleClick={this.goToUsers}/>
          <PathReferencer title={'Archivos'} icon={<FaFileO/>} handleClick={this.goToFiles}/>
          <PathReferencer title={'Estadísticas'} icon={<FaAreaChart/>} handleClick={this.goToStatistics} full/>
        </div>
      </div>
    )
  }
}