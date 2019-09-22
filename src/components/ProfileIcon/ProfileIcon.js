import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class ProfileIcon extends Component {
  state = {
    dropdownOpen: false
  };

  toggle = () =>
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

  render() {
    return (
      <div className='pa2 tc'>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle tag='span' data-toggle='dropdown'>
            <img
              src='http://tachyons.io/img/logo.jpg'
              className='br-100 h3 w3 dib'
              alt='avatar'
            />
          </DropdownToggle>
          <DropdownMenu
            right
            className='b--transparent shadow-5 '
            style={{
              position: 'absolute',
              top: '61px',
              right: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }}
          >
            <DropdownItem onClick={this.props.toggleModal}>
              View Profile
            </DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange('signout')}>
              Signout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
