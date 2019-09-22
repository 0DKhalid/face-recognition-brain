import React from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

const Navigation = ({ onRouteChange, isSignout, toggleModal }) => {
  if (isSignout) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange('register')}
          className='f3 link dim underline pa3 pointer'
        >
          Register
        </p>
        <p
          onClick={() => onRouteChange('signin')}
          className='f3 link dim underline pa3 pointer'
        >
          Sign in
        </p>
      </nav>
    );
  }
};

export default Navigation;
