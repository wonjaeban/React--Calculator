import { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import calculator from './src/modules/calculator';
import CalculatorContainer from './src/containers/CalculatorContainer';

const store = createStore(calculator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CalculatorContainer />
      </Provider>
    );
  }
}

export default App;
