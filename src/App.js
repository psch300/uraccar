import React, { Component } from 'react';
import { Header } from './components';
import { Containers } from './containers';
import { fire } from './services/Firebase';

class App extends Component {
  constructor() {
    super();
    fire();
  }

  render () {
    return (
      <div>
        <Header></Header>
        <Containers></Containers>
      </div>
    );
  }
}

export default App;
