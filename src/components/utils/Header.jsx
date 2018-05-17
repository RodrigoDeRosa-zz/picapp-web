import React from 'react';
import '../../styles/Header.css';

export default class Header extends React.Component{
  render() {
    return (
      <div className={'Header-holder'}>
        <img className='Header-logo' src={require('../../resources/picapp_logo.png')} alt='PicApp Server Management'/>
        <div className={'Header-company-holder'}>
          <a className={'Header-label'} href={'https://k42.kn3.net/1CA79F72D.gif'}>SteelSoft Inc.</a>
          <label className={'Header-label-sm'}>De Rosa - Errazquin - Guerrero - Schapira</label>
        </div>
      </div>
    )
  }
}