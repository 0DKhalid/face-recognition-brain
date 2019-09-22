import React, { Component } from 'react';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: '',
    errorHappened: false
  };

  onChangeHandller = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errorHappened: false,
      error: ''
    });
  };

  onSubmitHandller = () => {
    //store user data in server
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        entrise: 1
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          this.setState({ error: user.error, errorHappened: true });
        } else {
          //create function that store user data in app compnent state to load his information on profile screen
          this.props.loadUserData(user);
          this.props.onRouteChange('signin');
        }
      });
  };
  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Register</legend>
              {this.state.errorHappened && (
                <div className='bg-dark-red white br4'>
                  <p className='pa2'>{this.state.error}</p>
                </div>
              )}
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Name
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                  type='text'
                  name='name'
                  id='name'
                  onChange={this.onChangeHandller}
                />
              </div>
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
                className='b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Register'
                onClick={this.onSubmitHandller}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
