import { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Calculator from './Calculator';
import { reducer } from './Reducer';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Calculator />
      </Provider>
    );
  }
}

export default App;
