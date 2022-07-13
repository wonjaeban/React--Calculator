import React from 'react';
import CounterContainer from './src/containers/CounterContainer';
import { createStore } from 'redux';
import counter from "./src/modules/counter";
import { Provider } from 'react-redux';

const store = createStore(counter); // 스토어를 만듭니다.

function App() {
  return (
    <Provider store={store}>
      <CounterContainer />
    </Provider>
  );
}

export default App;