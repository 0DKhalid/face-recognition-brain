import React, { Component, Fragment } from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecogntion/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';

const particlesOption = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignout: false,
  isProfileOpen: false,
  user: {
    id: '',
    email: '',
    name: '',
    joined: '',
    entries: 0
  }
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(data => data.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            })
              .then(data => data.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUserData(user);
                  this.onChangeRoute('home');
                }
              })
              .catch(console.log);
          }
        })
        .catch(console.log);
    }
  }

  loadUserData = user => {
    this.setState({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        entries: user.entries,
        joined: user.joined
      }
    });
  };

  calculationFaceLocations = data => {
    if (data && data.outputs) {
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        // console.log(clarifaiFace);
        return {
          topRow: clarifaiFace.top_row * height,
          leftCol: clarifaiFace.left_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
          rightCol: width - clarifaiFace.right_col * width
        };
      });
    }
    return false;
  };

  drawBoxAroundFaces = data => {
    if (data) {
      this.setState({ boxes: data });
      // console.log(this.state.boxes);
    }
  };

  onInputHandller = event => {
    this.setState({ input: event.target.value, imageUrl: '' });
  };
  onClickHandller = () => {
    this.setState({ imageUrl: this.state.input });
    const token = window.sessionStorage.getItem('token');
    // console.log(this.state.imageUrl);
    fetch('http://localhost:3000/imageurl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
          this.drawBoxAroundFaces(this.calculationFaceLocations(data));
        }
      })
      .catch(err => console.log(err));
  };

  onChangeRoute = route => {
    if (route === 'signout') {
      window.sessionStorage.removeItem('token');
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ route: route, isSignout: true });
    }

    this.setState({ route: route });
  };

  toggleModal = () =>
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));

  render() {
    // console.log(this.state);
    return (
      <div className='App'>
        <Particles className='Particales' params={particlesOption} />
        <Navigation
          isSignout={this.state.isSignout}
          onRouteChange={this.onChangeRoute}
          toggleModal={this.toggleModal}
        />
        {this.state.isProfileOpen && (
          <Modal>
            <Profile
              user={this.state.user}
              loadUserData={this.loadUserData}
              isProfileOpen={this.state.isProfileOpen}
              toggleModal={this.toggleModal}
            />
          </Modal>
        )}
        {this.state.route === 'home' ? (
          <Fragment>
            <Logo />
            <Rank rank={this.state.user.entries} name={this.state.user.name} />
            <ImageLinkForm
              onClick={this.onClickHandller}
              onInput={this.onInputHandller}
            />
            <FaceRecognition
              boxes={this.state.boxes}
              imageUrl={this.state.imageUrl}
            />
          </Fragment>
        ) : this.state.route === 'signin' ? (
          <Signin
            onRouteChange={this.onChangeRoute}
            loadUserData={this.loadUserData}
          />
        ) : (
          <Register
            loadUserData={this.loadUserData}
            onRouteChange={this.onChangeRoute}
          />
        )}
      </div>
    );
  }
}

export default App;
