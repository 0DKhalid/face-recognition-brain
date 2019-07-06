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
  box: {},
  route: 'signin',
  isSignout: false,
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

  calculationFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      rightCol: width - clarifaiFace.right_col * width
    };
  };

  drawBoxAroundFace = data => {
    this.setState({ box: data });
    // console.log(this.state.box);
  };

  onInputHandller = event => {
    this.setState({ input: event.target.value, imageUrl: '' });
  };

  onClickHandller = () => {
    this.setState({ imageUrl: this.state.input });

    // console.log(this.state.imageUrl);
    fetch('https://enigmatic-dawn-22140.herokuapp.com/imageurl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          fetch('https://enigmatic-dawn-22140.herokuapp.com/image', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
          this.drawBoxAroundFace(this.calculationFaceLocation(data));
        }
      })
      .catch(err => console.log(err));
  };

  onChangeRoute = route => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ route: route, isSignout: true });
    }

    this.setState({ route: route });
  };

  render() {
    // console.log(this.state);
    return (
      <div className='App'>
        <Particles className='Particales' params={particlesOption} />
        <Navigation
          isSignout={this.state.isSignout}
          onRouteChange={this.onChangeRoute}
        />
        {this.state.route === 'home' ? (
          <Fragment>
            <Logo />
            <Rank rank={this.state.user.entries} name={this.state.user.name} />
            <ImageLinkForm
              onClick={this.onClickHandller}
              onInput={this.onInputHandller}
            />
            <FaceRecognition
              box={this.state.box}
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
