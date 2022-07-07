import { Component } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';

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
    } else if (val === 'AC') {
      this.setState({
        number: '0',
      });
    }
  };

  allButton = ({ title }) => {
    if (title === '=') {
      return (
        <TouchableOpacity
          style={styles.roundButtonEqual}
          onPress={this.makeSolution}>
          <Text style={styles.textButtons}>{title}</Text>
        </TouchableOpacity>
      );
    } else if (
      title === '()' ||
      title === '%' ||
      title === '/' ||
      title === 'X' ||
      title === '-' ||
      title === '+'
    ) {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            this.makeNumbers(title);
          }}>
          <Text style={styles.textButtonSign}>{title}</Text>
        </TouchableOpacity>
      );
    } else if (title === 'AC') {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            this.makeNumbers(title);
          }}>
          <Text style={styles.textButtonAC}>{title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => this.makeNumbers(title)}>
          <Text style={styles.textButtons}>{title}</Text>
        </TouchableOpacity>
      );
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
            <this.allButton title="AC"></this.allButton>
            <this.allButton title="()"></this.allButton>

            <this.allButton title="%"></this.allButton>
            <this.allButton title="/"></this.allButton>
          </View>
          <View style={styles.buttons2}>
            <this.allButton title="7"></this.allButton>
            <this.allButton title="8"></this.allButton>
            <this.allButton title="9"></this.allButton>
            <this.allButton title="X"></this.allButton>
          </View>
          <View style={styles.buttons3}>
            <this.allButton title="4"></this.allButton>
            <this.allButton title="5"></this.allButton>
            <this.allButton title="6"></this.allButton>
            <this.allButton title="-"></this.allButton>
          </View>
          <View style={styles.buttons4}>
            <this.allButton title="1"></this.allButton>
            <this.allButton title="2"></this.allButton>
            <this.allButton title="3"></this.allButton>
            <this.allButton title="+"></this.allButton>
          </View>
          <View style={styles.buttons5}>
            <this.allButton title="+/-"></this.allButton>
            <this.allButton title="0"></this.allButton>
            <this.allButton title="."></this.allButton>
            <this.allButton title="="></this.allButton>
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
