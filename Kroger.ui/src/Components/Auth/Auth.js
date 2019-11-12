import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends React.Component {

    loginClickEvent = (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
      }

    render() {
        return (
            <div>
                <h2>Please Log In</h2>
                <div className="auth-buttons">
                    <button onClick={this.loginClickEvent}>Login with Google</button>
                </div>
            </div>
        );
    }
}

export default Auth;