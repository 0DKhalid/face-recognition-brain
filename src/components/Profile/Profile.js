import React from 'react';
import './Profile.css';

class Profile extends React.Component {
  state = {
    name: this.props.user.name,
    age: this.props.user.age,
    pet: this.props.user.pet
  };

  formChangeHandller = event => {
    switch (event.target.name) {
      case 'name':
        this.setState({ name: event.target.value });
        break;
      case 'age':
        this.setState({ age: event.target.value });
        break;
      case 'pet':
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  profileUpdateHnadller = data => {
    const token = window.sessionStorage.getItem('token');
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ formInput: data })
    })
      .then(response => response.json())
      .then(response => {
        if (response === 'success') {
          this.props.loadUserData({ ...this.props.user, ...data });
          this.props.toggleModal();
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { user } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className='profile-modal'>
        <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
          <main className='pa4 black-80 w-80'>
            <img
              src='http://tachyons.io/img/logo.jpg'
              className='h3 w3 dib'
              alt='avatar'
            />
            <h1>{this.state.name}</h1>
            <h4 className='tc'>Images submitted: 5</h4>
            <p className='tc'>Member since: Jun</p>
            <hr />
            <label className='mt2 fw6' htmlFor='user-name'>
              Name:
            </label>
            <input
              onChange={this.formChangeHandller}
              placeholder={user.name}
              className='pa2 ba w-100'
              type='text'
              name='name'
              id='name'
            />
            <label className='mt2 fw6' htmlFor='user-age'>
              Age:
            </label>
            <input
              onChange={this.formChangeHandller}
              placeholder={user.age}
              className='pa2 ba w-100'
              type='text'
              name='age'
              id='age'
            />
            <label className='mt2 fw6' htmlFor='user-pet'>
              Pet:
            </label>
            <input
              onChange={this.formChangeHandller}
              placeholder={user.pet}
              className='pa2 ba w-100'
              type='text'
              name='pet'
              id='pet'
            />
            <div
              className='mt3'
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <button
                onClick={() => this.profileUpdateHnadller({ name, age, pet })}
                className='b pa2 grow pointer hover-white w-40 bg-light-green b--black-20'
              >
                Save
              </button>
              <button
                onClick={this.props.toggleModal}
                className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
              >
                Cancel
              </button>
            </div>
          </main>
          <div onClick={this.props.toggleModal} className='modal-close'>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
