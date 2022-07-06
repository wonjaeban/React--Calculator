import { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '0',
    };
  }

  makeSolution = () => {
    let previousNumber = 0;
    let continuedNumber = '';
    let currentNumber = 0;
    let mathSign = '';
    let result = 0;
    let i = 0;
    let length = this.state.number.length;

    for (i = 0; i < length; i++) {
      if (
        this.state.number[i] === '/' ||
        this.state.number[i] === 'X' ||
        this.state.number[i] === '-' ||
        this.state.number[i] === '+'
      ) {
        if (previousNumber) {
          currentNumber = parseInt(continuedNumber);
          continuedNumber = '';
          if (mathSign === '/') {
            previousNumber /= currentNumber;
          } else if (mathSign === 'X') {
            previousNumber *= currentNumber;
          } else if (mathSign === '-') {
            previousNumber -= currentNumber;
          } else if (mathSign === '+') {
            previousNumber += currentNumber;
          }
        } else {
          previousNumber = parseInt(continuedNumber);
          continuedNumber = '';
          mathSign = this.state.number[i];
        }
      } else {
        continuedNumber += this.state.number[i];
      }

      if (i === length - 1) {
        currentNumber = parseInt(continuedNumber);
        if (mathSign === '/') {
          previousNumber /= currentNumber;
        } else if (mathSign === 'X') {
          previousNumber *= currentNumber;
        } else if (mathSign === '-') {
          previousNumber -= currentNumber;
        } else if (mathSign === '+') {
          previousNumber += currentNumber;
        }
        result = previousNumber;
      }
    }
    this.setState({
      number: result,
    });
  };

  makeNumbers = (val) => {
    let length = this.state.number.length;
    let index = length - 1;
    let countDot = 0;
    if (val === '.') {
      if (this.state.number === '0') {
        this.setState({
          number: '0.',
        });
      } else if (
        this.state.number[length - 1] === '.' ||
        this.state.number[length - 1] === '(' ||
        this.state.number[length - 1] === ')' ||
        this.state.number[length - 1] === '%' ||
        this.state.number[length - 1] === '/' ||
        this.state.number[length - 1] === 'X' ||
        this.state.number[length - 1] === '-' ||
        this.state.number[length - 1] === '+'
      ) {
        return;
      } else {
        while (1) {
          // 이전에 .이 한번도 없었다면
          if (
            index === -1 ||
            this.state.number[index] === ')' ||
            this.state.number[index] === '%' ||
            this.state.number[index] === '/' ||
            this.state.number[index] === 'X' ||
            this.state.number[index] === '-' ||
            this.state.number[index] === '+'
          ) {
            this.setState({
              number: this.state.number + '.',
            });
            return;
          } else if (this.state.number[index] === '.') {
            return;
          }
          index--;
        }
      }
    } else if (val === '0') {
      if (this.state.number === '0') {
        return;
      } else {
        this.setState({
          number: this.state.number + '0',
        });
      }
    } else if (!isNaN(parseInt(val))) {
      if (this.state.number === '0') {
        this.setState({
          number: val,
        });
        return;
      } else {
        this.setState({
          number: this.state.number + val,
        });
      }
    } else if (val === '/' || val === 'X' || val === '-' || val === '+') {
      if (
        this.state.number[length - 1] === '(' ||
        this.state.number[length - 1] === '.'
      ) {
        return;
      } else if (
        this.state.number[length - 1] === '/' ||
        this.state.number[length - 1] === 'X' ||
        this.state.number[length - 1] === '-' ||
        this.state.number[length - 1] === '+'
      ) {
        let newSentence = this.state.number.substring(0, length - 1);
        newSentence += val;
        this.setState({
          number: newSentence,
        });
      } else {
        this.setState({
          number: this.state.number + val,
        });
      }
    }
  };
  allClear = () => {
    this.setState({
      number: '0',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperPlace}>
          <Text style={styles.calculatedNumber}>{this.state.number}</Text>
        </View>
        <View style={styles.downPlace}>
          <View style={styles.buttons}>
            <Button title="AC" color="red" onPress={this.allClear}>
              AC
            </Button>
            <Button
              title="()"
              onPress={() => this.makeNumbers('()')}
              style={styles.calculatedNumber}>
              ()
            </Button>
            <Button
              title="%"
              onPress={() => this.makeNumbers('%')}
              style={styles.calculatedNumber}>
              %
            </Button>
            <Button
              title="/"
              onPress={() => this.makeNumbers('/')}
              style={styles.calculatedNumber}>
              /
            </Button>
          </View>
          <View style={styles.buttons}>
            <Button
              title="7"
              onPress={() => this.makeNumbers('7')}
              style={styles.calculatedNumber}>
              7
            </Button>
            <Button
              title="8"
              onPress={() => this.makeNumbers('8')}
              style={styles.calculatedNumber}>
              8
            </Button>
            <Button
              title="9"
              onPress={() => this.makeNumbers('9')}
              style={styles.calculatedNumber}>
              9
            </Button>
            <Button
              title="X"
              onPress={() => this.makeNumbers('X')}
              style={[styles.calculatedNumber, styles.multiply]}>
              X
            </Button>
          </View>
          <View style={[styles.buttons, styles.buttons_3]}>
            <Button
              title="4"
              onPress={() => this.makeNumbers('4')}
              style={styles.calculatedNumber}>
              4
            </Button>
            <Button
              title="5"
              onPress={() => this.makeNumbers('5')}
              style={styles.calculatedNumber}>
              5
            </Button>
            <Button
              title="6"
              onPress={() => this.makeNumbers('6')}
              style={styles.calculatedNumber}>
              6
            </Button>
            <Button
              title="-"
              onPress={() => this.makeNumbers('-')}
              style={[styles.calculatedNumber, styles.minus]}>
              -
            </Button>
          </View>
          <View style={styles.buttons}>
            <Button
              title="1"
              onPress={() => this.makeNumbers('1')}
              style={styles.calculatedNumber}>
              1
            </Button>
            <Button
              title="2"
              onPress={() => this.makeNumbers('2')}
              style={styles.calculatedNumber}>
              2
            </Button>
            <Button
              title="3"
              onPress={() => this.makeNumbers('3')}
              style={styles.calculatedNumber}>
              3
            </Button>
            <Button
              title="+"
              onPress={() => this.makeNumbers('+')}
              style={styles.calculatedNumber}>
              +
            </Button>
          </View>
          <View style={[styles.buttons, styles.buttons_5]}>
            <Button
              title="+/-"
              onPress={() => this.makeNumbers('+/-')}
              style={styles.calculatedNumber}>
              +/-
            </Button>
            <Button
              title="0"
              onPress={() => this.makeNumbers('0')}
              style={[styles.calculatedNumber, styles.zero]}>
              0
            </Button>
            <Button
              title="."
              onPress={() => this.makeNumbers('.')}
              style={styles.calculatedNumber}>
              .
            </Button>
            <Button
              title="="
              onPress={this.makeSolution}
              style={[styles.calculatedNumber, styles.equal]}>
              =
            </Button>
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
    backgroundColor: 'gray',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  downPlace: {
    flex: 0.8,
    backgroundColor: 'yellow',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 23,
  },
  calculatedNumber: {
    fontSize: 50,
  },
  multiply: {
    fontSize: 40,
  },
  minus: {
    fontSize: 30,
  },
  numbers: {
    fontSize: 50,
  },
  buttons_3: {
    marginRight: 40,
  },
  zero: {
    marginRight: 50,
  },
  equal: {
    marginRight: 10,
    marginLeft: 30,
  },
});

export default App;
