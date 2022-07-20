import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AllButton from './AllButton';
import History from './History';

let countParenthesis = 0;

const BASIC_MATH_SIGN = ['/', 'X', '-', '+'];
const NATURAL_NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ALL_MATH_SIGN = ['.', '(', ')', '%', '/', 'X', '-', '+'];
const PLUS_MINUS = ['-', '+'];

class Calculator extends Component {
  //+, -, *, / 계산하는 메서드입니다.
  calculateBasicMathSigns = (number) => {
    let percentNumber = '';
    let signs = [];
    let intermediateResult = [];
    let decreaseIndex = 0;
    let i = 0;
    let newSigns = [];
    let result = 0;
    //화면의 숫자들을 기호들을 기준으로 쪼갭니다.
    const stringNumbers = number.split(/[+, \-, X, /]/);
    for (i = 0; i < stringNumbers.length; i++) {
      //기호들을 기준으로 쪼갠후에 숫자뒤에 %가 붙어있다면 실수로 바꿔줍니다.
      if (stringNumbers[i].includes('%')) {
        percentNumber = stringNumbers[i].slice(0, -1);
        stringNumbers.splice(i, 1, Number(percentNumber) / 100);
      }
    }
    const numbers = stringNumbers.map((each) => Number(each));

    for (i = 0; i < number.length; i++) {
      if (BASIC_MATH_SIGN.includes(number[i])) {
        signs.push(number[i]);
      }
    }

    for (i = 0; i < signs.length; i++) {
      //나누기는 우선순위상 먼저 계산합니다.
      if (signs[i] === '/') {
        intermediateResult =
          numbers[i - decreaseIndex] / numbers[i - decreaseIndex + 1];
        numbers.splice(i - decreaseIndex, 2);
        numbers.splice(i - decreaseIndex, 0, intermediateResult);
        decreaseIndex++;
        continue;
      } //곱하기는 우선순위상 먼저 계산합니다.
      else if (signs[i] === 'X') {
        intermediateResult =
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
    return result;
  };
  //최종적으로 화면에 있는 문자 및 숫자들을 계산하는 메서드
  makeResult = async () => {
    const { number, onNew } = this.props;

    let openParenthesis = 0;
    let closeParenthesis = 0;
    let result = 0;
    let numberInParenthesis = '';
    let resultInParenthesis = 0;
    let i = 0;
    let j = 0;

    //현재 화면에 나온 문자들의 마지막이 기호로 끝난다면
    if (BASIC_MATH_SIGN.includes(number[number.length - 1])) {
      alert('완성되지 않은 수식입니다!');
      return;
    }
    // //괄호가 있다면 괄호들 먼저 쭉 계산합니다.
    // while (1) {
    //   for (i = 0; i < number.length; i++) {
    //     if (number[i] === ')') {
    //       closeParenthesis = i;
    //       for (j = i; j >= 0; j--) {
    //         if (number[j] === '(') {
    //           openParenthesis = j;
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //   }
    //   for (let k = openParenthesis + 1; k <= closeParenthesis - 1; k++) {
    //     numberInParenthesis += number[k];
    //   }
    //   resultInParenthesis = this.calculateBasicMathSigns(numberInParenthesis);
    // }

    result = this.calculateBasicMathSigns(number);
    const obj = { number: number, result: result.toString() };
    let postResult = await this.connectPost(obj);
    if (!postResult) {
      alert('서버가 응답하지 않습니다!');
    }

    console.log(postResult);

    onNew(result.toString());
  };

  connectPost = (obj) => {
    const URL = 'http://10.1.2.156:3000/history';
    const controller = new AbortController();

    // 2 second timeout:
    setTimeout(() => controller.abort(), 2000);

    let result = fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(obj),
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          // 응답이 제대로 오지 않을 때(URL오류나 request 오류시에)
          throw Error(`Error! status: ${response.status} server error`);
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  //이전에 .이 찍혔는지 확인하는 메서드
  checkPastDots = () => {
    const { number, onPlus } = this.props;
    const length = number.length;
    let index = length - 1;
    const pastMathSigns = [')', '%', '/', 'X', '-', '+'];

    while (1) {
      // 이전에 .이 한번도 없었다면
      if (index === -1 || pastMathSigns.includes(number[index])) {
        onPlus('.');

        return;
      } //.이 있는데 또 . 찍으려는 경우니깐 무시합니다.
      else if (number[index] === '.') {
        return;
      }
      index--;
    }
  };

  //.버튼을 누른경우 실행되는 메서드
  makeDot = () => {
    const { number, onPlus } = this.props;
    const length = number.length;
    if (ALL_MATH_SIGN.includes(number[length - 1])) {
      return;
    } else if (number === '0') {
      onPlus('.');

      return;
    }
    this.checkPastDots();
  };

  //0버튼을 눌렀을 때 실행되는 메서드
  makeZero = () => {
    const { number, onPlus } = this.props;
    const length = number.length;
    let i = length - 1;
    let isActualNumber = false;

    //기호뒤에는 0 가능
    if (BASIC_MATH_SIGN.includes(number[length - 1])) {
      onPlus('0');

      return;
    }
    while (1) {
      //기호를 만나거나 인덱스를 벗어나면 반복문을 끝낸다.
      if (i === 0 || BASIC_MATH_SIGN.includes(number[i])) {
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
      NATURAL_NUMBER.includes(number[i]) ||
      NATURAL_NUMBER.includes(number[i + 1])
    ) {
      onPlus('0');

      return;
    }
    //실수아니면 0000불가능.
    if (!isActualNumber) {
      return;
    }
    onPlus('0');
  };

  //1~9까지 숫자 눌렀을 때 실행되는 메서드
  makeNaturalNumbers = (val) => {
    const { number, onNew, onPlus } = this.props;
    const length = number.length;
    let newNumber = '';
    let i = 0;
    if (number === '0') {
      onNew(val);

      return;
    } else if (
      number[length - 1] === '0' &&
      BASIC_MATH_SIGN.includes(number[length - 2])
    ) {
      for (i = 0; i < length - 1; i++) {
        newNumber += number[i];
      }
      onPlus(val);

      return;
    } else if (number[length - 1] === '%') {
      onPlus('X' + val);

      return;
    }
    onPlus(val);
  };

  //기본적인 수학 기호들 눌렀을 때 실행되는 메서드
  makeBasicMathSigns = (val) => {
    const { number, onNew, onPlus } = this.props;
    const length = number.length;
    let newSentence = '';

    if (number[length - 1] === '.') {
      return;
    } else if (BASIC_MATH_SIGN.includes(number[length - 1])) {
      newSentence = number.substring(0, length - 1);
      newSentence += val;
      onNew(newSentence);
      return;
    } else if (number[length - 1] === '(' && !PLUS_MINUS.includes(val)) {
      return;
    }
    onPlus(val);
  };

  //괄호 눌렀을 때
  makeParenthesis = () => {
    const { number, onPlus } = this.props;
    let length = number.length;
    //숫자로 끝나거나 %로 끝날때
    if (
      !isNaN(parseInt(number[length - 1])) ||
      number[length - 1] === '%' ||
      number[length - 1] === '.'
    ) {
      //이전에 괄호가 있었다면
      if (countParenthesis > 0) {
        onPlus(')');
        countParenthesis--;
        return;
      }
      //이전에 괄호가 없었다면
      onPlus('X(');
      countParenthesis++;
      return;
    } else if (number[length - 1] === ')') {
      if (countParenthesis > 0) {
        onPlus(')');
        countParenthesis--;
        return;
      }
      onPlus('X(');
      countParenthesis++;
      return;
    } else if (number[length - 1] === '(') {
      onPlus('(');
      countParenthesis++;
      return;
    }

    onPlus('(');
  };

  //AC눌렀을 때 실행되는 메서드
  executeAC = () => {
    const { onNew } = this.props;
    onNew('0');
    countParenthesis = 0;
  };

  //%눌렀을 때 실행되는 메서드
  makePercent = (val) => {
    const { number, onPlus } = this.props;
    let length = number.length;

    if (!isNaN(parseInt(number[length - 1]))) {
      onPlus(val);

      return;
    } else if (ALL_MATH_SIGN.includes(number[length - 1])) {
      alert('완성되지 수식입니다!');
      return;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperPlace}>
          <Text style={styles.calculatedNumber}>{this.props.number}</Text>
        </View>
        <View style={styles.downPlace}>
          <View style={styles.buttons}>
            <AllButton title="AC" onClick={this.executeAC}></AllButton>
            <AllButton title="()" onClick={this.makeParenthesis}></AllButton>
            <AllButton title="%" onClick={this.makePercent}></AllButton>
            <AllButton title="/" onClick={this.makeBasicMathSigns}></AllButton>
          </View>
          <View style={styles.buttons2}>
            <AllButton title="7" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="8" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="9" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="X" onClick={this.makeBasicMathSigns}></AllButton>
          </View>
          <View style={styles.buttons3}>
            <AllButton title="4" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="5" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="6" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="-" onClick={this.makeBasicMathSigns}></AllButton>
          </View>
          <View style={styles.buttons4}>
            <AllButton title="1" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="2" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="3" onClick={this.makeNaturalNumbers}></AllButton>
            <AllButton title="+" onClick={this.makeBasicMathSigns}></AllButton>
          </View>
          <View style={styles.buttons5}>
            <History title="HS"></History>
            <AllButton title="0" onClick={this.makeZero}></AllButton>
            <AllButton title="." onClick={this.makeDot}></AllButton>
            <AllButton title="=" onClick={this.makeResult}></AllButton>
          </View>
        </View>
      </View>
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

export default Calculator;
