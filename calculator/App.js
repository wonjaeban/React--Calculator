import { Component, PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class AllButton extends Component {
  render() {
    console.log('유재석');
    const mathSigns = ['()', '%', '/', 'X', '-', '+'];
    if (title === '=') {
      return (
        <TouchableOpacity
          style={styles.roundButtonEqual}
          onPress={App.makeSolution}>
          <Text style={styles.textButtons}>{title}</Text>
        </TouchableOpacity>
      );
    } else if (mathSigns.includes(title)) {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            App.makeNumbers(title);
          }}>
          <Text style={styles.textButtonSign}>{title}</Text>
        </TouchableOpacity>
      );
    } else if (title === 'AC') {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            App.makeNumbers(title);
          }}>
          <Text style={styles.textButtonAC}>{title}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => App.makeNumbers(title)}>
        <Text style={styles.textButtons}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '0',
    };
  }

  //최종적으로 화면에 있는 문자 및 숫자들 출력하는 함수
  makeSolution = () => {
    const basicMathSigns = ['/', 'X', '-', '+'];
    const numberAndSigns = this.state.number;
    //현재 화면에 나온
    if (basicMathSigns.includes(numberAndSigns[this.state.number.length - 1])) {
      alert('완성되지 않은 수식입니다!');
      return;
    }
    const stringNumbers = numberAndSigns.split(/[+, \-, X, /]/);
    for (let i = 0; i < stringNumbers.length; i++) {
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
      if (signs[i] === '/') {
        let intermediateResult =
          numbers[i - decreaseIndex] / numbers[i - decreaseIndex + 1];
        numbers.splice(i - decreaseIndex, 2);
        numbers.splice(i - decreaseIndex, 0, intermediateResult);
        decreaseIndex++;
        continue;
      } else if (signs[i] === 'X') {
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
      if (newSigns[i] === '-') {
        result = result - numbers[i + 1];
      } else if (newSigns[i] === '+') {
        result = result + numbers[i + 1];
      }
    }
    this.setState({
      number: result.toString(),
    });
  };

  checkPastDots = () => {
    let length = this.state.number.length;
    let nowNumber = this.state.number;
    let index = length - 1;
    const pastMathSigns = [')', '%', '/', 'X', '-', '+'];
    while (1) {
      // 이전에 .이 한번도 없었다면
      if (index === -1 || pastMathSigns.includes(nowNumber[index])) {
        this.setState({
          number: nowNumber + '.',
        });
        return;
      } else if (nowNumber[index] === '.') {
        return;
      }
      index--;
    }
  };

  makeNumbers = (val) => {
    let length = this.state.number.length;
    const dotNextPositionSigns = ['.', '(', ')', '%', '/', 'X', '-', '+'];
    const basicMathSigns = ['/', 'X', '-', '+'];
    const naturalNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let nowNumber = this.state.number;

    if (val === '.') {
      if (dotNextPositionSigns.includes(nowNumber[length - 1])) {
        return;
      } else if (nowNumber === '0') {
        this.setState({
          number: '0.',
        });
        return;
      }
      this.checkPastDots();
    } else if (val === '0') {
      let i = length - 1;
      let isActualNumber = false;
      //기호뒤에는 0 가능
      if (basicMathSigns.includes(nowNumber[length - 1])) {
        this.setState({
          number: nowNumber + '0',
        });
        return;
      }
      while (1) {
        //기호를 만나거나 인덱스를 벗어나면 반복문을 끝낸다.
        if (i === 0 || basicMathSigns.includes(nowNumber[i])) {
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
        naturalNumbers.includes(nowNumber[i]) ||
        naturalNumbers.includes(nowNumber[i + 1])
      ) {
        this.setState({
          number: nowNumber + '0',
        });
        return;
      }
      //실수아니면 0000불가능.
      if (!isActualNumber) {
        return;
      }
      this.setState({
        number: nowNumber + '0',
      });
    } else if (!isNaN(parseInt(val))) {
      if (nowNumber === '0') {
        this.setState({
          number: val,
        });
        return;
      } else if (
        nowNumber[length - 1] === '0' &&
        basicMathSigns.includes(nowNumber[length - 2])
      ) {
        let newNumber = '';
        for (let i = 0; i < length - 1; i++) {
          newNumber += nowNumber[i];
        }
        this.setState({
          number: newNumber + val,
        });
        return;
      } else if (nowNumber[length - 1] === '%') {
        this.setState({
          number: nowNumber + 'X' + val,
        });
        return;
      }
      this.setState({
        number: nowNumber + val,
      });
    } else if (basicMathSigns.includes(val)) {
      if (nowNumber[length - 1] === '(' || nowNumber[length - 1] === '.') {
        return;
      } else if (basicMathSigns.includes(nowNumber[length - 1])) {
        let newSentence = nowNumber.substring(0, length - 1);
        newSentence += val;
        this.setState({
          number: newSentence,
        });
        return;
      }
      this.setState({
        number: nowNumber + val,
      });
    } else if (val === 'AC') {
      this.setState({
        number: '0',
      });
    } else if (val === '%') {
      if (!isNaN(parseInt(nowNumber[length - 1]))) {
        this.setState({
          number: nowNumber + val,
        });
        return;
      } else if (dotNextPositionSigns.includes(nowNumber[length - 1])) {
        alert('완성되지 수식입니다!');
        return;
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperPlace}>
          <Text style={styles.calculatedNumber}>{this.state.number}</Text>
        </View>
        <View style={styles.downPlace}>
          <View style={styles.buttons}>
            <AllButton title="AC"></AllButton>
            <AllButton title="()"></AllButton>

            <AllButton title="%"></AllButton>
            <AllButton title="/"></AllButton>
          </View>
          <View style={styles.buttons2}>
            <AllButton title="7"></AllButton>
            <AllButton title="8"></AllButton>
            <AllButton title="9"></AllButton>
            <AllButton title="X"></AllButton>
          </View>
          <View style={styles.buttons3}>
            <AllButton title="4"></AllButton>
            <AllButton title="5"></AllButton>
            <AllButton title="6"></AllButton>
            <AllButton title="-"></AllButton>
          </View>
          <View style={styles.buttons4}>
            <AllButton title="1"></AllButton>
            <AllButton title="2"></AllButton>
            <AllButton title="3"></AllButton>
            <AllButton title="+"></AllButton>
          </View>
          <View style={styles.buttons5}>
            <AllButton title="+/-"></AllButton>
            <AllButton title="0"></AllButton>
            <AllButton title="."></AllButton>
            <AllButton title="="></AllButton>
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
  roundButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#292929',
  },
  roundButtonEqual: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'green',
  },
  textButtons: {
    color: 'white',
    fontSize: 30,
  },
  textButtonSign: {
    color: 'green',
    fontSize: 30,
  },
  textButtonAC: {
    color: 'red',
    fontSize: 30,
  },
});

export default App;
