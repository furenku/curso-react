import React, { Component } from 'react';

import { Provider } from 'react-redux';

import store from './store';

import MiComponente from './MiComponente';


// definir un listener que será invocado cada que cambie el estado
store.subscribe(
  () => {
    console.log( "ha cambiado el estado:", store.getState() )
  }
);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MiComponente/>
      </Provider>
    );
  }
}

export default App;
