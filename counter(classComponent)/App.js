import {Component} from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './Reducer';
import Counter from "./Counter";

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Counter/>
      </Provider>
    );
  }
}

export default App;