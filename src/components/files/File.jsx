import React from 'react';
import '../../styles/File.css';

export default class File extends React.Component{
  render(){
    const file = this.props.data;
    return (
      <div className={'File-holder'} onMouseEnter={this.setHovering} onMouseLeave={this.unsetHovering}>
        <div className={'File-category-item'}>
          <label className={'File-category-name'}>Propietario: </label>
          <label className={'File-category-value'}>{file.owner}</label>
        </div>
        <div className={'File-category-item'}>
          <label className={'File-category-name'}>URL: </label>
          <a className={'File-url'} href={file.url} title={'Ver Archivo'} target={'_blank'}>{file.url}</a>
        </div>
        <div className={'File-category-item'}>
          <label className={'File-category-name'}>Creado el: </label>
          <label className={'File-category-value'}>{new Date(file.date).toUTCString()}</label>
        </div>
      </div>
    )
  }
}