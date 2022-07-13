export function reducer(number = '0', action) {
  switch (action.type) {
    case 'new':
      return action.text;
    case 'plusSomething':
      return number + action.text;
    default:
      return number;
  }
}
