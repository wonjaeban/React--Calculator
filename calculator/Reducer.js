import { createStore } from 'redux';

function reducer(state = '0', action) {
  if (action.type === '증가') {
    state++;
    return state;
  } else {
    return state;
  }
}

let store = createStore(reducer);

export { store };
