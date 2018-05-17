import React from 'react';
import Header from "../utils/Header";
import FaFileO from "react-icons/lib/fa/file-o";

export default class FileManager extends React.Component {
  render(){
    return (
      <div>
        <Header/>
        <div className={'ServerManager-title-holder'}>
          <label className={'ServerManager-icon'}><FaFileO/></label>
          <label className={'ServerManager-label'}>Administración de Archivos</label>
        </div>
      </div>
    )
  }
}