import React, { Component } from 'react';
import axios from 'axios';
import './Navbar.css';

export default class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      menus: [],
      subMenus: [],
      hamburgerToggle: false,
      menuIsOpen: false
    };
  }

  componentDidMount () {
    let url = '/API/menu/find';
    axios.get(url).then((res) => {
      this.setState({menus: res.data.menus, subMenus: res.data.submenus});
    }).catch((err) => {
      console.log(err);
    });
  }

  hamburgerToggle () {
    this.setState({hamburgerToggle: !this.state.hamburgerToggle});
  }
  handdleMenu (name) {
    this.state.menuIsOpen === name
    ? this.setState({menuIsOpen: ''})
    : this.setState({menuIsOpen: name});
  }
  render () {
    let {menuIsOpen, hamburgerToggle, menus} = this.state;
    if (!menus) return null;
    let Menu = menus.map((menu) => {
      return (
        <li
          key={menu.name}
          className={menuIsOpen === menu.name ? 'dropdown open' : 'dropdown'}>
          <a onClick={this.handdleMenu.bind(this, menu.name)}>{menu.name} <span className='caret' /></a>
          <ul className='dropdown-menu'>
            <li className='dropdown-header' />
            {this.state.subMenus.map((subMenu) => {
              return subMenu.parent_FK_ID === menu.id
                ? <li key={subMenu.name}>
                  <a href={subMenu.link}>{subMenu.name}</a>
                </li>
                : null;
            })}
          </ul>
        </li>
      );
    });

    let hamburgerClass = hamburgerToggle ? 'hamburger is-open' : 'hamburger is-closed';
    let overlayClass = hamburgerToggle ? 'overlay' : null;
    let wrapperClass = hamburgerToggle ? 'toggled' : null;
    let overlayStyle = hamburgerToggle ? {display: 'block'} : null;

    return (
      <div id='wrapper' className={wrapperClass}>
        <div className={overlayClass} style={overlayStyle} />
        <nav className='navbar navbar-inverse navbar-fixed-top' id='sidebar-wrapper' role='navigation'>
          <ul className='nav sidebar-nav'>
            <li className='sidebar-brand'>
              <a href='/logout'>SEAT</a>
            </li>
            <li>
              <a href='/mainpage'>Inicio</a>
            </li>
            {Menu}
          </ul>
        </nav>
        <div id='page-content-wrapper'>
          <button type='button' className={hamburgerClass} data-toggle='offcanvas' onClick={this.hamburgerToggle.bind(this)}>
            <span className='hamb-top' />
            <span className='hamb-middle' />
            <span className='hamb-bottom' />
          </button>
        </div>
      </div>
    );
  }
}
