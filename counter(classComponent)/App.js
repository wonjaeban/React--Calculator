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

  render() {
    return (
      <Provider store={store}>
        <Counter></Counter>
      </Provider>
    );
  }
}

export default App;
