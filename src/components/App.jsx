import React from 'react';
import '../styles/App.css'
import Login from "./Login";
import {Route, Switch} from "react-router-dom";
import Manager from "./Manager";
import ServerManager from "./ServerManager";
import UserManager from "./UserManager";

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/manager' component={Manager}/>
        <Route exact path='/servers' component={ServerManager}/>
        <Route exact path='/users' component={UserManager}/>
      </Switch>
    );
  }
}