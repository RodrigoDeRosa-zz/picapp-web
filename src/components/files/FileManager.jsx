import React from 'react';
import Header from "../utils/Header";
import FaFileO from "react-icons/lib/fa/file-o";
import '../../styles/ServerManager.css';
import '../../styles/File.css';
import File from '../files/File';

const firebase = require("firebase");
require("firebase/firestore");
const config = {
  apiKey: "AIzaSyAU4dpcPI14ftEfvUiXO2Uh6QLxle6rO-E",
  authDomain: "picapp-4a6d8.firebaseapp.com",
  databaseURL: "https://picapp-4a6d8.firebaseio.com",
  projectId: "picapp-4a6d8",
  storageBucket: "picapp-4a6d8.appspot.com",
  messagingSenderId: "1023151485778"
};
firebase.initializeApp(config);

function Files(props){
  const loaded = props.files.length !== 0;
  if (!loaded) return <label className={'ServerManager-notice'}>Buscando archivos en el sistema...</label>;
  else {
    let files = props.files;
    if (props.filterBy != null && props.filterBy.trim() !== '')
      files = files.filter((file) => file.owner.startsWith(props.filterBy));
    return <div className={'FileManager-file-holder'}>
      {files.map(function (file) {
        return (
          <File key={file.id} data={file} history={props.history}/>
        )
      })}
    </div>
  }
}

export default class FileManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      files: [],
      filterBy: null
    };
    this.setInput = this.setInput.bind(this);
    // Start database
    const db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
    // Load data
    db.collection("Users").get().then((querySnapshot) => {
      const users = {};
      querySnapshot.forEach((doc) => {
        users[doc.id] = doc.data().name;
      });
      let counter = 0;
      let loadedFiles = [];
      db.collection("Stories").get().then((snapshot) => {
        snapshot.forEach((doc) => {
          let file = {
            id: counter++,
            url: doc.data().image,
            owner: users[doc.data().user_id],
            date: doc.data().timestamp
          };
          loadedFiles.push(file);
        });
        console.log(loadedFiles);
        this.setState({files: loadedFiles});
      });
    });
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
            <label className={'ServerManager-icon'}><FaFileO/></label>
            <label className={'ServerManager-label'}>Administración de Archivos</label>
          </div>
          <div className={'ServerManager-filter-holder'}>
            <label className={'ServerManager-filter-title'}>Filtrar por propietario:</label>
            <input className={'ServerManager-filter-input'} placeholder={'Ingrese el nombre del propietario'}
                   onChange={this.setInput}/>
          </div>
        </div>
        <Files files={this.state.files} history={this.props.history} filterBy={this.state.filterBy}/>
      </div>
    )
  }
}