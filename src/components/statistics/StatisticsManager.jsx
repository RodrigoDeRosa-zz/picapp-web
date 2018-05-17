import React from 'react';
import Header from "../utils/Header";
import '../../styles/StatisticsManager.css';
import FaAreaChart from "react-icons/lib/fa/area-chart";
import axios from "axios/index";

var BarChart = require("react-chartjs").Bar;

export default class StatisticsManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      servers: null,
      users: null
    };
    this.getServers();
    this.getUsers();
  }
  getUsers(){
    let self = this;
    axios.get('https://picappss.herokuapp.com/api/users')
      .then(response => self.setState({users: response.data}))
      .catch(() => self.handleError());
  }
  getServers(){
    let self = this;
    axios.get('https://picappss.herokuapp.com/api/servers?BusinessToken=' + this.props.history.location.state.token)
      .then(response => self.setState({servers: response.data}))
      .catch(() => self.handleError());
  }
  handleError() {
    console.log('error');
    this.setState({failed: true});
  }
  processUsers(users){
    let ownersData = {};
    users.map((user) => {
      if (! (user.applicationOwner in ownersData) ) ownersData[user.applicationOwner] = 1;
      else ownersData[user.applicationOwner] += 1;
      return '';
    });
    let chartData = [];
    for (let property in ownersData) {
      if (ownersData.hasOwnProperty(property)) {
        chartData.push({x: property, y: ownersData[property]});
      }
    }
    return chartData;
  }
  processServers(servers){
    let ownersData = {};
    servers.map((server) => {
      if (! (server.createdBy in ownersData) ) ownersData[server.createdBy] = 1;
      else ownersData[server.createdBy] += 1;
      return '';
    });
    let chartData = [];
    for (let property in ownersData) {
      if (ownersData.hasOwnProperty(property)) {
        chartData.push({x: property, y: ownersData[property]});
      }
    }
    return chartData;
  }
  getUsersChart(usersInfo){
    let labels = [];
    usersInfo.map((user) => labels.push(user.x));
    let data = [];
    usersInfo.map((user) => data.push(user.y));
    return <BarChart width={600} height={300}
                     data={{
                       labels: labels,
                       datasets: [{
                         label: '# of Users',
                         fillColor: "rgba(171,207,225,0.5)",
                         strokeColor: "rgba(151,187,205,0.8)",
                         highlightFill: "rgba(171,207,225,0.75)",
                         highlightStroke: "rgba(151,187,205,1)",
                         data: data
                       }]
                     }}
    />
  }
  getServersChart(serversInfo){
    let labels = [];
    serversInfo.map((server) => labels.push(server.x));
    let data = [];
    serversInfo.map((server) => data.push(server.y));
    return <BarChart width={600} height={300}
      data={{
        labels: labels,
        datasets: [{
          label: '# of Servers',
          fillColor: "rgba(171,207,225,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(171,207,225,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: data
        }]
      }}
    />
  }
  render(){
    return (
      <div>
        <Header/>
        <div className={'ServerManager-title-holder'}>
          <label className={'ServerManager-icon'}><FaAreaChart/></label>
          <label className={'ServerManager-label'}>Estadísticas de Aplicación</label>
        </div>
        {this.state.servers !== null && this.state.users !== null &&
          <div className={'charts-container'}>
            <div className={'chart-holder'}>
              <label className={'chart-label'}>Servidores por propietario</label>
              <div className={'chart'}>
                {this.getServersChart(this.processServers(this.state.servers))}
              </div>
            </div>
            <div className={'chart-holder'}>
              <label className={'chart-label'}>Usuarios por propietario</label>
              <div className={'chart'}>
              {this.getUsersChart(this.processUsers(this.state.users))}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}