import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AllButton from './AllButton';
import { connect } from 'react-redux';

let countParenthesis = 0;
const NEW = 'new';
const PLUS_Something = 'plusSomething';
const BASIC_MATH_SIGN = ['/', 'X', '-', '+'];
const NATURAL_NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ALL_MATH_SIGN = ['.', '(', ')', '%', '/', 'X', '-', '+'];
const PLUS_MINUS = ['-', '+'];

class Calculator extends Component {
  //최종적으로 화면에 있는 문자 및 숫자들을 계산하는 함수
  makeResult = () => {
    const numberAndSigns = this.props.number;
    let signs = [];
    let newSigns = [];
    let i = 0;
    let decreaseIndex = 0;
    let result = 0;
    let percentNumber = '';
    let intermediateResult = [];

    //현재 화면에 나온 문자들의 마지막이 기호로 끝난다면
    if (BASIC_MATH_SIGN.includes(numberAndSigns[numberAndSigns.length - 1])) {
      alert('완성되지 않은 수식입니다!');
      return;
    }
    //화면의 숫자들을 기호들을 기준으로 쪼갭니다.
    const stringNumbers = numberAndSigns.split(/[+, \-, X, /]/);
    for (let i = 0; i < stringNumbers.length; i++) {
      //기호들을 기준으로 쪼갠후에 숫자뒤에 %가 붙어있다면 실수로 바꿔줍니다.
      if (stringNumbers[i].includes('%')) {
        percentNumber = stringNumbers[i].slice(0, -1);
        stringNumbers.splice(i, 1, Number(percentNumber) / 100);
      }
    }
    const numbers = stringNumbers.map((each) => Number(each));

    for (i = 0; i < numberAndSigns.length; i++) {
      if (BASIC_MATH_SIGN.includes(numberAndSigns[i])) {
        signs.push(numberAndSigns[i]);
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

    this.props.new(result.toString());
  };

  //이전에 .이 찍혔는지 확인하는 메서드
  checkPastDots = () => {
    const length = this.props.number.length;
    const nowNumber = this.props.number;
    let index = length - 1;
    const pastMathSigns = [')', '%', '/', 'X', '-', '+'];

    while (1) {
      // 이전에 .이 한번도 없었다면
      if (index === -1 || pastMathSigns.includes(nowNumber[index])) {
        this.props.plusSomething('.');

        return;
      } //.이 있는데 또 . 찍으려는 경우니깐 무시합니다.
      else if (nowNumber[index] === '.') {
        return;
      }
      index--;
    }
  };

  //.버튼을 누른경우 실행되는 메서드
  makeDot = () => {
    const nowNumber = this.props.number;
    const length = this.props.number.length;
    if (ALL_MATH_SIGN.includes(nowNumber[length - 1])) {
      return;
    } else if (nowNumber === '0') {
      this.props.plusSomething('.');

      return;
    }
    this.checkPastDots();
  };

  //0버튼을 눌렀을 때 실행되는 메서드
  makeZero = () => {
    const length = this.props.number.length;
    let i = length - 1;
    let isActualNumber = false;

    const nowNumber = this.props.number;
    //기호뒤에는 0 가능
    if (BASIC_MATH_SIGN.includes(nowNumber[length - 1])) {
      this.props.plusSomething('0');

      return;
    }
    while (1) {
      //기호를 만나거나 인덱스를 벗어나면 반복문을 끝낸다.
      if (i === 0 || BASIC_MATH_SIGN.includes(nowNumber[i])) {
        break;
      } //.을 만나면 소수다.
      else if (nowNumber[i] === '.') {
        isActualNumber = true;
        break;
      }
      i--;
    }
    // 기호를 만나거나 인덱스를 벗어나기 전까지 가장 첫번째 요소가 1~9 사이라면 2000000이 가능해야한다.
    if (
      NATURAL_NUMBER.includes(nowNumber[i]) ||
      NATURAL_NUMBER.includes(nowNumber[i + 1])
    ) {
      this.props.plusSomething('0');

      return;
    }
    //실수아니면 0000불가능.
    if (!isActualNumber) {
      return;
    }
    this.props.plusSomething('0');
  };

  //1~9까지 숫자 눌렀을 때 실행되는 메서드
  makeNaturalNumbers = (val) => {
    const nowNumber = this.props.number;
    const length = this.props.number.length;
    let newNumber = '';
    let i = 0;
    if (nowNumber === '0') {
      this.props.new(val);

      return;
    } else if (
      nowNumber[length - 1] === '0' &&
      BASIC_MATH_SIGN.includes(nowNumber[length - 2])
    ) {
      for (i = 0; i < length - 1; i++) {
        newNumber += nowNumber[i];
      }
      this.props.plusSomething(val);

      return;
    } else if (nowNumber[length - 1] === '%') {
      this.props.plusSomething('X' + val);

      return;
    }
    this.props.plusSomething(val);
  };

  //기본적인 수학 기호들 눌렀을 때 실행되는 메서드
  makeBasicMathSigns = (val) => {
    const nowNumber = this.props.number;
    const length = this.props.number.length;
    let newSentence = '';

    if (nowNumber[length - 1] === '.') {
      return;
    } else if (BASIC_MATH_SIGN.includes(nowNumber[length - 1])) {
      newSentence = nowNumber.substring(0, length - 1);
      newSentence += val;
      this.props.new(newSentence);

      return;
    } else if (nowNumber[length - 1] === '(' && !PLUS_MINUS.includes(val)) {
      return;
    }
    this.props.plusSomething(val);
  };

  //괄호 눌렀을 때
  makeParenthesis = () => {
    let nowNumber = this.props.number;
    let length = this.props.number.length;
    //숫자로 끝나거나 %로 끝날때
    if (
      !isNaN(parseInt(nowNumber[length - 1])) ||
      nowNumber[length - 1] === '%' ||
      nowNumber[length - 1] === '.'
    ) {
      //이전에 괄호가 있었다면
      if (countParenthesis > 0) {
        this.props.plusSomething(')');
        countParenthesis--;
        return;
      }
      //이전에 괄호가 없었다면
      this.props.plusSomething('X(');
      countParenthesis++;
      return;
    } else if (nowNumber[length - 1] === ')') {
      if (countParenthesis > 0) {
        this.props.plusSomething(')');
        countParenthesis--;
        return;
      }
      this.props.plusSomething('X(');
      countParenthesis++;
      return;
    } else if (nowNumber[length - 1] === '(') {
      this.props.plusSomething('(');
      countParenthesis++;
      return;
    }

    this.props.plusSomething('(');
  };

  //AC눌렀을 때 실행되는 메서드
  executeAC = () => {
    this.props.new('0');
    countParenthesis = 0;
  };

  //%눌렀을 때 실행되는 메서드
  makePercent = (val) => {
    let nowNumber = this.props.number;
    let length = this.props.number.length;

    if (!isNaN(parseInt(nowNumber[length - 1]))) {
      this.props.plusSomething(val);

      return;
    } else if (ALL_MATH_SIGN.includes(nowNumber[length - 1])) {
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
            <AllButton title="+/-" onClick={this.makeExpression}></AllButton>
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

//store에 있는 값이 업데이트 될때마다 호출됩니다. return값은 props가 됩니다.
const mapStateToProps = (state) => {
  return {
    number: state,
  };
};

//store에 대한 dispatch기능을 제공합니다. 이를 통해 component에서 store에 대한 dispatch를 매번 할 필요가 없어집니다.
const mapDispatchToProps = (dispatch) => {
  return {
    new: (newSentence) => {
      dispatch({ type: NEW, text: newSentence });
    },
    plusSomething: (something) => {
      dispatch({ type: PLUS_Something, text: something });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
