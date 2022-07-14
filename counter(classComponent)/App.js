import {Component} from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counter from "./src/modules/counter";
import CounterContainer from './src/containers/CounterContainer';


const store = createStore(counter);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterContainer/>
      </Provider>
    );
  }
}

export default App;