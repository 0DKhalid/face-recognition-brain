import React from 'react';

const Navigation = ({ onRouteChange, isSignout }) => {
  if (isSignout) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange('signout')}
          className='f3 link dim underline pa3 pointer'
        >
          Sign Out
        </p>
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
