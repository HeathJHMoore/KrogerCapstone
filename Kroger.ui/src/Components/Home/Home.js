import React, { Component } from 'react';
import values from '../APIRequests/values';
import './Home.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import ProductCard from '../ProductCard/ProductCard';

class Home extends Component {

  state = {
    displayValues : []
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }  

  getValues = () => {
    // make API call
    values.getValues()
      .then((resp) => {
        let myNewValues = [...resp];
        this.setState({displayValues : myNewValues});
      })
      .catch((error) => console.log(error))
  }

  showAllValues = () => {
    const myValues = [...this.state.displayValues];
    return myValues.map((item) => {
      return <ProductCard product={item}/>
    })
  }

  render () {
    const testText = this.props.testText;
    return (
      <div className="Home">
          <button onClick={this.logMeOut}>Log Out</button>
          <button onClick={this.getValues}>Load Data</button>
          <div className="productContainer">{this.showAllValues()}</div>
      </div>
    );
  }
}

export default Home;