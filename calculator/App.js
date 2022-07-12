import { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Calculator from './Calculator';

function reducer(number1 = '0', action) {
  if (action.type === 'new') {
    number1 = action.text;
  }
  return number1;
}

let store = createStore(reducer);

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
