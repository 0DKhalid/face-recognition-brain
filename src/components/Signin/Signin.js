import React, { Component } from 'react';

class Signin extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    errorHappened: false
  };

  onChangeHandller = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
      errorHappened: false
    });
  };

  saveAuthTokenInSession = token => {
    window.sessionStorage.setItem('token', token);
  };

  onSubmitHandller = () => {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.userId && user.msg === 'success') {
          this.saveAuthTokenInSession(user.token);
          fetch(`http://localhost:3000/profile/${user.userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`
            }
          })
            .then(data => data.json())
            .then(user => {
              if (user && user.email) {
                this.props.loadUserData(user);
                this.props.onRouteChange('home');
              }
            })
            .catch(console.log);
        } else {
          this.setState({ error: user.error, errorHappened: true });
        }
      })
      .catch(console.log);
  };
  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
              {this.state.errorHappened && (
                <div className='bg-dark-red white br4'>
                  <p className='pa2'>{this.state.error}</p>
                </div>
              )}
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                  type='email'
                  name='email'
                  id='email-address'
                  onChange={this.onChangeHandller}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                  type='password'
                  name='password'
                  id='password'
                  onChange={this.onChangeHandller}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                className='b ph3 pv3 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Sign in'
                onClick={this.onSubmitHandller}
              />
            </div>
            <div className='lh-copy mt3'>
              <p
                onClick={() => this.props.onRouteChange('register')}
                className='f5 link dim black db pointer'
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
