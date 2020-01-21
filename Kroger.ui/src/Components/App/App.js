import React from 'react';
import firebase from 'firebase/app';

import './App.scss';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Auth from '../Auth/Auth';
import Home from '../Home/Home';

import fbConnection from '../../Data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  const routeChecker = props => ( authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/MyHome', state: { from: props.location }}}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>
};

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  const routeChecker = props => ( authed === true
    ? (<Component {...props} authed={authed} />)
    : (<Redirect to={{ pathname: '/Home', state: { from: props.location }}}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>
};

class App extends React.Component {

  state = {
    authed : false
  }

  logMeIn = (e) => {
    // e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then();
  }

  logMeOut = () => {
    this.setState({authed : false})
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    ///checks to see if user is authed on every render as a fix to timing issue
    const { authed } = this.state;
    // if (authed) {
    //   console.log("yo you are authed in the mount")
    //   userData.checkForUserAcct(firebase.auth().currentUser.uid)
    //   .then((resp) => {
    //     if (resp === 0){
    //       console.log("we are trying to create a new user")
    //       userData.createNewUser(firebase.auth().currentUser.uid)
    //     }
    //   })
    // }
    return (
      <div className="App">
      <BrowserRouter>
        <React.Fragment>
          {/* <MyNavbar authed={this.state.authed} logMeIn={this.logMeIn} logMeOut={this.logMeOut}/> */}
          {/* alternate auth */}
          {/* <MyNavbar authed={authed} /> */}
            <Switch>
              <PublicRoute path='/Home' component={Home} authed={this.state.authed}/>
              <PublicRoute path='/Auth' component={Auth} authed={this.state.authed}/>
              <PrivateRoute path='/MyHome' component={Home} authed={this.state.authed}/>
              <Redirect from="*" to="/Home"/>
            </Switch>
        </React.Fragment>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
