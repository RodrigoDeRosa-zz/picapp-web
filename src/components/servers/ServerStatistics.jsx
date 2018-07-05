import React from "react";
import '../../styles/ServerStatistics.css';
import Header from "../utils/Header";
import FaAreaChart from "react-icons/lib/fa/area-chart";
import axios from "axios/index";

var BarChart = require("react-chartjs").Bar;
var LineChart = require("react-chartjs").Line;

export default class ServerStatistics extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stories: null
    };
    this.getData();
  }
  getData(){
    let self = this;
    axios.get('https://picapp-app-server.herokuapp.com/stats')
      .then(response => {
        self.setState({
          stories: response.data.stories,
          flashes: response.data.flashes,
          errors: response.data.errors,
          friendships: response.data.friendships
        });
      })
      .catch((error) => self.handleError(error));
  }
  handleError(error) {
    console.log(error);
    this.setState({failed: true});
  }
  getStoriesVsFlashesChart(stories, flashes){
    let labels = [];
    labels.push('Stories');
    labels.push('Flashes');
    let data = [];
    data.push(stories.length);
    data.push(flashes.length);
    return <BarChart width={600} height={300}
                     data={{
                       labels: labels,
                       datasets: [{
                         label: '# of Publications',
                         fillColor: "rgba(81,207,225,0.5)",
                         strokeColor: "rgba(151,187,205,0.8)",
                         highlightFill: "rgba(81,207,225,0.75)",
                         highlightStroke: "rgba(151,187,205,1)",
                         data: data
                       }]
                     }}
    />
  }
  getErrorsChart(errors){
    return this.getChart(errors, "rgba(0,0,0,0)", "rgba(230,80,80,0.8)", "rgba(0,0,0,0)", "rgba(0,0,0,0)");
  }
  getStoriesChart(stories){
    return this.getChart(stories, "rgba(0,0,0,0)", "rgba(80,200,100,0.8)", "rgba(0,0,0,0)", "rgba(0,0,0,0)");
  }
  getFriendshipsChart(friendships){
    return this.getChart(friendships, "rgba(0,0,0,0)", "rgba(80,100,200,0.8)", "rgba(0,0,0,0)", "rgba(0,0,0,0)");
  }
  getFlashesChart(flashes){
    return this.getChart(flashes, "rgba(0,0,0,0)", "rgba(180,20,180,0.8)", "rgba(0,0,0,0)", "rgba(0,0,0,0)");
  }
  getChart(rawData, fill, stroke, highlightF, highlightS){
    let today = new Date();
    let minus1 = new Date();
    minus1.setDate(today.getDate() - 1);
    let minus2 = new Date();
    minus2.setDate(today.getDate() - 2);
    let minus3 = new Date();
    minus3.setDate(today.getDate() - 3);
    let labels = [minus3.toDateString(), minus2.toDateString(), minus1.toDateString(), today.toDateString()];
    let data = [0, 0, 0, 0];
    rawData.map(element => {
      let date = new Date(element).toDateString();
      if (date === labels[0]) data[0] += 1;
      else if (date === labels[1]) data[1] += 1;
      else if (date === labels[2]) data[2] += 1;
      else if (date === labels[3]) data[3] += 1;
    });
    let max =  Math.max(data[0], data[1], data[2], data[3]);
    let stepWidth = Math.ceil(max / 10);
    return <LineChart width={600} height={300}
                      data={{
                        labels: labels,
                        datasets: [{
                          label: '# of Users',
                          fillColor: fill,
                          strokeColor: stroke,
                          highlightFill: highlightF,
                          highlightStroke: highlightS,
                          data: data
                        }]
                      }} options={{
                        bezierCurve: false,
                        scaleOverride : true,
                        scaleSteps : Math.ceil(max / stepWidth),
                        scaleStepWidth : stepWidth,
                        scaleStartValue : 0,
                        datasetStrokeWidth: 2
    }}/>
  }

  render(){
    return (
      <div>
      <Header/>
        <div className={'ServerManager-title-holder'}>
          <label className={'ServerManager-icon'}><FaAreaChart/></label>
          <label className={'ServerManager-label'}>Estadísticas de {this.props.name}</label>
        </div>
        {this.state.stories === null &&
          <label className={'ServerManager-notice'}>Calculando estadísticas del servidor...</label>
        }
        {this.state.stories !== null &&
        <div className={'charts-container'}>
          <div className={'chart-holder'}>
            <label className={'chart-label'}>Errores en los últimos 4 días</label>
            <div className={'chart'}>
              {this.getErrorsChart(this.state.errors)}
            </div>
          </div>
          <div className={'chart-holder'}>
            <label className={'chart-label'}>Solicitudes de amistad en los últimos 4 días</label>
            <div className={'chart'}>
              {this.getFriendshipsChart(this.state.friendships)}
            </div>
          </div>
          <div className={'chart-holder'}>
            <label className={'chart-label'}>Flashes en los últimos 4 días</label>
            <div className={'chart'}>
              {this.getFlashesChart(this.state.flashes)}
            </div>
          </div>
          <div className={'chart-holder'}>
            <label className={'chart-label'}>Stories en los últimos 4 días</label>
            <div className={'chart'}>
              {this.getStoriesChart(this.state.stories)}
            </div>
          </div>
          <div className={'chart-holder'}>
            <label className={'chart-label'}>Stories vs. Flashes - Cantidades Totales</label>
            <div className={'chart'}>
              {this.getStoriesVsFlashesChart(this.state.stories, this.state.flashes)}
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}