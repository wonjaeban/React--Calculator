export function reducer(number = 0, action) {
    switch (action.type) {
        case 'INCREASE':
          return number + 1;
        case 'DECREASE':
          return number - 1;
        case 'RESET':
          return 0;
        default:
          return number;
      }
  }
  