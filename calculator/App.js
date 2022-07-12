import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AllButton from './AllButton';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './Reducer';

class App extends Component {
  //최종적으로 화면에 있는 문자 및 숫자들을 계산하는 함수
  makeResult = () => {
    const basicMathSigns = ['/', 'X', '-', '+'];
    const number = useSelector((state) => state);
    //현재 화면에 나온 문자들의 마지막이 기호로 끝난다면
    if (basicMathSigns.includes(numberAndSigns[number.length - 1])) {
      alert('완성되지 않은 수식입니다!');
      return;
    }
    //화면의 숫자들을 기호들을 기준으로 쪼갭니다.
    const stringNumbers = numberAndSigns.split(/[+, \-, X, /]/);
    for (let i = 0; i < stringNumbers.length; i++) {
      //기호들을 기준으로 쪼갠후에 숫자뒤에 %가 붙어있다면 실수로 바꿔줍니다.
      if (stringNumbers[i].includes('%')) {
        let percentNumber = stringNumbers[i].slice(0, -1);
        stringNumbers.splice(i, 1, Number(percentNumber) / 100);
      }
    }
    const numbers = stringNumbers.map((each) => Number(each));
    let signs = [];
    let newSigns = [];
    let i = 0;
    let decreaseIndex = 0;
    let result = 0;

    for (i = 0; i < numberAndSigns.length; i++) {
      if (basicMathSigns.includes(numberAndSigns[i])) {
        signs.push(numberAndSigns[i]);
      }
    }

    for (i = 0; i < signs.length; i++) {
      //나누기는 우선순위상 먼저 계산합니다.
      if (signs[i] === '/') {
        let intermediateResult =
          numbers[i - decreaseIndex] / numbers[i - decreaseIndex + 1];
        numbers.splice(i - decreaseIndex, 2);
        numbers.splice(i - decreaseIndex, 0, intermediateResult);
        decreaseIndex++;
        continue;
      } //곱하기는 우선순위상 먼저 계산합니다.
      else if (signs[i] === 'X') {
        let intermediateResult =
          numbers[i - decreaseIndex] * numbers[i - decreaseIndex + 1];
        numbers.splice(i - decreaseIndex, 2);
        numbers.splice(i - decreaseIndex, 0, intermediateResult);
        decreaseIndex++;
        continue;
      }
      newSigns.push(signs[i]);
    }

    result = numbers[0];
    for (i = 0; i < newSigns.length; i++) {
      //빼기를 계산합니다.
      if (newSigns[i] === '-') {
        result = result - numbers[i + 1];
      } //더하기를 계산합니다.
      else if (newSigns[i] === '+') {
        result = result + numbers[i + 1];
      }
    }
    this.setState({
      number: result.toString(),
    });
  };

  //이전에 .이 찍혔는지 확인하는 메서드
  checkPastDots = () => {
    const number = useSelector((state) => state);
    let length = number.length;
    let index = length - 1;
    const pastMathSigns = [')', '%', '/', 'X', '-', '+'];
    while (1) {
      // 이전에 .이 한번도 없었다면
      if (index === -1 || pastMathSigns.includes(number[index])) {
        this.setState({
          number: number + '.',
        });
        return;
      } //.이 있는데 또 . 찍으려는 경우니깐 무시합니다.
      else if (number[index] === '.') {
        return;
      }
      index--;
    }
  };

  makeParenthesis = () => {
    const number = useSelector((state) => state);
    let length = number.length;
    const allNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  };

  //.버튼을 누른경우 실행되는 메서드
  makeDot = () => {
    const dotNextPositionSigns = ['.', '(', ')', '%', '/', 'X', '-', '+'];
    const number = useSelector((state) => state);
    let length = number.length;
    if (dotNextPositionSigns.includes(number[length - 1])) {
      return;
    } else if (number === '0') {
      this.setState({
        number: '0.',
      });
      return;
    }
    this.checkPastDots();
  };

  //0버튼을 눌렀을 때 실행되는 메서드
  makeZero = () => {
    const number = useSelector((state) => state);
    let length = number.length;
    let i = length - 1;
    let isActualNumber = false;
    const basicMathSigns = ['/', 'X', '-', '+'];
    const naturalNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    //기호뒤에는 0 가능
    if (basicMathSigns.includes(number[length - 1])) {
      this.setState({
        number: number + '0',
      });
      return;
    }
    while (1) {
      //기호를 만나거나 인덱스를 벗어나면 반복문을 끝낸다.
      if (i === 0 || basicMathSigns.includes(number[i])) {
        break;
      } //.을 만나면 소수다.
      else if (number[i] === '.') {
        isActualNumber = true;
        break;
      }
      i--;
    }
    // 기호를 만나거나 인덱스를 벗어나기 전까지 가장 첫번째 요소가 1~9 사이라면 2000000이 가능해야한다.
    if (
      naturalNumbers.includes(number[i]) ||
      naturalNumbers.includes(number[i + 1])
    ) {
      this.setState({
        number: number + '0',
      });
      return;
    }
    //실수아니면 0000불가능.
    if (!isActualNumber) {
      return;
    }
    this.setState({
      number: number + '0',
    });
  };

  //1~9까지 숫자 눌렀을 때 실행되는 메서드
  makeNaturalNumbers = (val) => {
    const number = useSelector((state) => state);
    let length = number.length;
    const basicMathSigns = ['/', 'X', '-', '+'];
    if (number === '0') {
      this.setState({
        number: val,
      });
      return;
    } else if (
      number[length - 1] === '0' &&
      basicMathSigns.includes(number[length - 2])
    ) {
      let newNumber = '';
      for (let i = 0; i < length - 1; i++) {
        newNumber += number[i];
      }
      this.setState({
        number: number + val,
      });
      return;
    } else if (number[length - 1] === '%') {
      this.setState({
        number: number + 'X' + val,
      });
      return;
    }
    this.setState({
      number: number + val,
    });
  };

  //기본적인 수학 기호들 눌렀을 때 실행되는 메서드
  makeBasicMathSigns = (val) => {
    const number = useSelector((state) => state);
    let length = number.length;
    const basicMathSigns = ['/', 'X', '-', '+'];
    if (number[length - 1] === '(' || number[length - 1] === '.') {
      return;
    } else if (basicMathSigns.includes(number[length - 1])) {
      let newSentence = number.substring(0, length - 1);
      newSentence += val;
      this.setState({
        number: newSentence,
      });
      return;
    }
    this.setState({
      number: number + val,
    });
  };

  //AC눌렀을 때 실행되는 메서드
  executeAC = () => {
    this.setState({
      number: '0',
    });
  };

  //%눌렀을 때 실행되는 메서드
  makePercent = (val) => {
    const number = useSelector((state) => state);
    let length = number.length;
    const dotNextPositionSigns = ['.', '(', ')', '%', '/', 'X', '-', '+'];

    if (!isNaN(parseInt(number[length - 1]))) {
      this.setState({
        number: number + val,
      });
      return;
    } else if (dotNextPositionSigns.includes(number[length - 1])) {
      alert('완성되지 수식입니다!');
      return;
    }
  };

  render() {
    const number = useSelector((state) => state);
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={styles.upperPlace}>
            <Text style={styles.calculatedNumber}>{number}</Text>
          </View>
          <View style={styles.downPlace}>
            <View style={styles.buttons}>
              <AllButton title="AC" onClick={this.executeAC}></AllButton>
              <AllButton title="()" onClick={this.makeExpression}></AllButton>
              <AllButton title="%" onClick={this.makePercent}></AllButton>
              <AllButton
                title="/"
                onClick={this.makeBasicMathSigns}
              ></AllButton>
            </View>
            <View style={styles.buttons2}>
              <AllButton
                title="7"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="8"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="9"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="X"
                onClick={this.makeBasicMathSigns}
              ></AllButton>
            </View>
            <View style={styles.buttons3}>
              <AllButton
                title="4"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="5"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="6"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="-"
                onClick={this.makeBasicMathSigns}
              ></AllButton>
            </View>
            <View style={styles.buttons4}>
              <AllButton
                title="1"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="2"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="3"
                onClick={this.makeNaturalNumbers}
              ></AllButton>
              <AllButton
                title="+"
                onClick={this.makeBasicMathSigns}
              ></AllButton>
            </View>
            <View style={styles.buttons5}>
              <AllButton title="+/-" onClick={this.makeExpression}></AllButton>
              <AllButton title="0" onClick={this.makeZero}></AllButton>
              <AllButton title="." onClick={this.makeDot}></AllButton>
              <AllButton title="=" onClick={this.makeResult}></AllButton>
            </View>
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperPlace: {
    flex: 0.3,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  downPlace: {
    flex: 0.8,
    backgroundColor: 'black',
  },
  buttons: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  buttons2: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  buttons3: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  buttons4: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  buttons5: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  calculatedNumber: {
    fontSize: 50,
  },
});

export default App;
