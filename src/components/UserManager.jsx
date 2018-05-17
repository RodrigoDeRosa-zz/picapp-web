import React from 'react';
import '../styles/UserManager.css';
import axios from "axios/index";
import Header from "./Header";
import FaChild from "react-icons/lib/fa/child";
import Popup from "reactjs-popup";
import FaPlus from "react-icons/lib/fa/plus";
import User from "./User";
import { confirmAlert } from 'react-confirm-alert';
import UserAdder from "./UserAdder";

function Users(props){
  const usersLoaded = props.users !== undefined;
  if (!usersLoaded) return <label className={'UserManager-notice'}>Buscando usuarios en el sistema...</label>;
  else {
    let users = props.users;
    if (props.filterBy != null && props.filterBy.trim() !== '')
      users = users.filter((user) => user.applicationOwner.startsWith(props.filterBy));
    return <div className={'UserManager-user-holder'}>
      {users.map(function (user) {
        return (
          <User key={user.name} data={user} handleDelete={props.handleDelete} handleModify={props.handleModify}/>
        )
      })}
    </div>
  }
}

export default class UserManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      failed: false,
      users: undefined,
      filterBy: null
    };
    this.getUsers();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.setInput = this.setInput.bind(this);
  }
  /* Fetches server list from PicApp Shared Server*/
  getUsers(){
    let self = this;
    axios.get('https://picappss.herokuapp.com/api/users')
      .then(response => self.handleResponse(response))
      .catch(() => self.handleError());
  }
  handleResponse(response) {
    this.setState({users: response.data});
  }
  handleError() {
    this.setState({failed: true});
  }
  /* Deletes a server */
  handleDelete(userId) {
    confirmAlert({
      title: 'Confirme para eliminar el usuario',
      message: '¿Seguro que desea eliminarlo?',
      buttons: [{label: 'Si',
        onClick: () => {
          let url = 'http://picappss.herokuapp.com/api/users/' + userId;
          axios.delete(url).then(() => this.getUsers()).catch(() => this.handleError());
        }
      }, {label: 'No',onClick: () => {}}]})
  }
  /* Modifies a server*/
  handleModify(user){
    let url = 'http://picappss.herokuapp.com/api/users/' + user.username;
    let password = user.password;
    axios.put(url, user)
      .then((response) => {
        let tokenUrl = 'http://picappss.herokuapp.com/api/token';
        axios.post(tokenUrl, {username: response.data.user.username, password: password});
        this.getUsers();
      })
      .catch(() => this.handleError());
  }
  /* Adds a server*/
  handleAdd(user){
    let url = 'http://picappss.herokuapp.com/api/user/?ApplicationToken=93207910';
    let password = user.password;
    axios.post(url, user)
      .then((response) => {
        let tokenUrl = 'http://picappss.herokuapp.com/api/token';
        axios.post(tokenUrl, {username: response.data.user.username, password: password})
          .then(() => this.getUsers());
      })
      .catch(() => this.handleError());
  }
  setInput(event){
    this.setState({filterBy: event.target.value});
  }

  render(){
    return (
      <div>
        <Header/>
        <div className={'UserManager-title-filter-holder'}>
          <div className={'UserManager-title-holder'}>
            <label className={'UserManager-icon'}><FaChild/></label>
            <label className={'UserManager-label'}>Administración de Usuarios</label>
          </div>
          <div className={'ServerManager-filter-holder'}>
            <label className={'ServerManager-filter-title'}>Filtrar por propietario de aplicación:</label>
            <input className={'ServerManager-filter-input'} placeholder={'Ingrese el nombre del propietario'}
                   onChange={this.setInput}/>
          </div>
        </div>
        <Users users={this.state.users} handleDelete={this.handleDelete}
               handleModify={this.handleModify} filterBy={this.state.filterBy}/>
        {this.state.users !== undefined &&
        <Popup trigger={
          <div className={'UserManager-add-holder'}>
            <label className={'UserManager-add-label'}>Añadir Usuario</label>
            <label className={'UserManager-add-icon'}><FaPlus/></label>
          </div>
        } modal>
          {close => (<UserAdder onConfirm={(info) => {this.handleAdd(info); close();}} onCancel={() => {close();}}/>)}
        </Popup>
        }
      </div>
    )
  }
}