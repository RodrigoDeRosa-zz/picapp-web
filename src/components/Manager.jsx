import React from 'react';
import Header from "./Header";
import PathReferencer from "./PathReferencer";
import '../styles/Manager.css';
import FaDatabase from 'react-icons/lib/fa/database';
import FaAreaChart from 'react-icons/lib/fa/area-chart';
import FaChild from 'react-icons/lib/fa/child';

export default class Manager extends React.Component {
  constructor(props){
    super(props);
    this.goToServers = this.goToServers.bind(this);
    this.goToUsers = this.goToUsers.bind(this);
  }

  goToServers(){
    this.props.history.push('/servers', {token: this.props.history.location.state.token});
  }

  goToUsers(){
    this.props.history.push('/users');
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
          <PathReferencer title={'Servidores'} icon={<FaDatabase/>} handleClick={this.goToServers}/>
          <PathReferencer title={'Usuarios'} icon={<FaChild/>} handleClick={this.goToUsers}/>
          <PathReferencer title={'Estadísticas'} icon={<FaAreaChart/>}/>
        </div>
      </div>
    )
  }
}