import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './Reducer';
import Counter from "./Counter";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
        <Counter/>
      </Provider>
  );
}

export default App;