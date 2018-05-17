import React from 'react';
import axios from "axios/index";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FaDatabase from 'react-icons/lib/fa/database';
import Header from "./Header";
import Server from "./Server";
import '../styles/ServerManager.css';
import ServerAdder from "./ServerAdder";
import Popup from "reactjs-popup";
import FaPlus from "react-icons/lib/fa/plus";

function Servers(props){
  const serversLoaded = props.servers !== undefined;
  if (!serversLoaded) return <label className={'ServerManager-notice'}>Buscando servidores en el sistema...</label>;
  else {
    let servers = props.servers;
    if (props.filterBy != null && props.filterBy.trim() !== '')
      servers = servers.filter((server) => server.createdBy === props.filterBy);
    return <div className={'ServerManager-server-holder'}>
      {servers.map(function (server) {
        return (
          <Server key={server.id} data={server} handleDelete={props.handleDelete} handleModify={props.handleModify}/>
        )
      })}
    </div>
  }
}

export default class ServerManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      token: props.history.location.state.token,
      failed: false,
      servers: undefined,
      filterBy: null
    };
    this.getServers();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.setInput = this.setInput.bind(this);
  }
  /* Fetches server list from PicApp Shared Server*/
  getServers(){
    let self = this;
    axios.get('https://picappss.herokuapp.com/api/servers?BusinessToken=' + this.state.token)
      .then(response => self.handleResponse(response))
      .catch(() => self.handleError());
  }
  handleResponse(response) {
    this.setState({servers: response.data});
  }
  handleError() {
    console.log('error');
    this.setState({failed: true});
  }
  /* Deletes a server */
  handleDelete(serverId) {
    confirmAlert({
      title: 'Confirme para eliminar el servidor',
      message: '¿Seguro que desea eliminarlo?',
      buttons: [{label: 'Si',
          onClick: () => {
            let url = 'http://picappss.herokuapp.com/api/servers/' + serverId + '?BusinessToken=' + this.state.token;
            axios.delete(url).then(() => this.getServers()).catch(() => this.handleError());
          }
        }, {label: 'No',onClick: () => {}}]})
  }
  /* Modifies a server*/
  handleModify(server){
    let url = 'http://picappss.herokuapp.com/api/servers/' + server.id + '?BusinessToken=' + this.state.token;
    axios.put(url, server).then(() => this.getServers()).catch(() => this.handleError());
  }
  /* Adds a server*/
  handleAdd(server){
    let url = 'http://picappss.herokuapp.com/api/servers/?BusinessToken=' + this.state.token;
    axios.post(url, server).then(() => this.getServers()).catch(() => this.handleError());
  }
  setInput(event){
    this.setState({filterBy: event.target.value});
  }

  render(){
    return (
      <div>
        <Header/>
        <div className={'ServerManager-title-filter-holder'}>
          <div className={'ServerManager-title-holder'}>
            <label className={'ServerManager-icon'}><FaDatabase/></label>
            <label className={'ServerManager-label'}>Administración de Servidores</label>
          </div>
          <div className={'ServerManager-filter-holder'}>
            <label className={'ServerManager-filter-title'}>Filtrar por propietario:</label>
            <input className={'ServerManager-filter-input'} placeholder={'Ingrese el nombre del propietario'}
                   onChange={this.setInput}/>
          </div>
        </div>
        <Servers servers={this.state.servers} handleDelete={this.handleDelete}
                 handleModify={this.handleModify} filterBy={this.state.filterBy}/>
        {this.state.servers !== undefined &&
          <Popup trigger={
            <div className={'ServerManager-add-holder'}>
              <label className={'ServerManager-add-label'}>Añadir Servidor</label>
              <label className={'ServerManager-add-icon'}><FaPlus/></label>
            </div>
          } modal>
            {close => (<ServerAdder onConfirm={(info) => {this.handleAdd(info); close();}} onCancel={() => {close();}}/>)}
          </Popup>
        }
      </div>
    )
  }
}