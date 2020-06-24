import React, { Component } from 'react';
import './App.css';
import { fire } from './services/Firebase'
import { Header } from './components';
import { Container } from './containers';

class App extends Component {
  constructor(props) {
    super(props);
    fire();
  }

  render () {
    return (
      <div>
        <Header />
        <Container />
      </div>
    );
  }
}

export default App;
