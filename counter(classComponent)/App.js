<<<<<<< HEAD
import { Component } from "react";
import { counter, Counter } from "./Counter";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(counter); // 스토어를 만듭니다.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  PlusCount = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  MinusCount = () => {
    this.setState({
      counter: this.state.counter - 1,
    });
  };
=======
import {Component} from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counter from "./src/modules/counter";
import CounterContainer from './src/containers/CounterContainer';


const store = createStore(counter);
>>>>>>> 79b944c79dad514ad8fba1a227ca0aaeb5b436a3

class App extends Component {
  render() {
    return (
      <Provider store={store}>
<<<<<<< HEAD
        <Counter></Counter>
=======
        <CounterContainer/>
>>>>>>> 79b944c79dad514ad8fba1a227ca0aaeb5b436a3
      </Provider>
    );
  }
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 79b944c79dad514ad8fba1a227ca0aaeb5b436a3
