import React from 'react';
import '../styles/App.css'
import Login from "./login/Login";
import {Route, Switch} from "react-router-dom";
import Manager from "./Manager";
import ServerManager from "./servers/ServerManager";
import UserManager from "./users/UserManager";
import StatisticsManager from "./statistics/StatisticsManager";
import FileManager from "./files/FileManager";

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/manager' component={Manager}/>
        <Route exact path='/servers' component={ServerManager}/>
        <Route exact path='/users' component={UserManager}/>
        <Route exact path='/statistics' component={StatisticsManager}/>
        <Route exact path='/files' component={FileManager}/>
      </Switch>
    );
  }
}