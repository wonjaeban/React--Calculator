import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        number : '0',
        previousNumber : 0,
      };
    }
    plus = () => {
      this.setState({
        previousNumber: int(this.state.number),
        number: '0'
      })
    }
    minus = () => {
      this.setState({
        number: this.state.number - 1
      })
    }
    makeNumbers = (val) => {
      let length = this.state.number.length;
      if((val === '%' || val === '/' || val === 'X' || val === '-' || val === '+') 
        && (this.state.number[length - 1] === '%' || this.state.number[length - 1] === '/' || this.state.number[length - 1] === 'X' || this.state.number[length - 1] === '-' || this.state.number[length - 1] === '+')) {
        let newSentence = this.state.number.substring(0, length - 1);
        newSentence += val;
        this.setState({
          number: newSentence
        })
      }
      else if(this.state.number === '0' && val === '.' || this.state.number != '0') {
        this.setState({
          number: this.state.number + val
        })
      }
      else if(this.state.number === '0' && val != '%' && val != '/' && val != 'X' && val != '-' && val != '+') {
        this.setState({
          number: val
        })
      }
    }
    allClear = () => {
      this.setState({
        number: '0'
      })
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.upperPlace}><Text style={styles.calculatedNumber}>{this.state.number}</Text></View>
          <View style={styles.downPlace}>
          <View style={styles.buttons}>
              <Text onPress={this.allClear} style={styles.calculatedNumber}>AC</Text>
              <Text style={styles.calculatedNumber}>+/-</Text>
              <Text onPress={() => this.makeNumbers('%')} style={styles.calculatedNumber}>%</Text>
              <Text onPress={() => this.makeNumbers('/')} style={styles.calculatedNumber}>/</Text>
          </View>
          <View style={styles.buttons}>
            <Text onPress={() => this.makeNumbers('7')} style={styles.calculatedNumber}>7</Text>
            <Text onPress={() => this.makeNumbers('8')} style={styles.calculatedNumber}>8</Text>
            <Text onPress={() => this.makeNumbers('9')} style={styles.calculatedNumber}>9</Text>
            <Text onPress={() => this.makeNumbers('X')} style={[styles.calculatedNumber, styles.multiply]}>X</Text>
          </View>
          <View style={[styles.buttons, styles.buttons_3]}>
            <Text onPress={() => this.makeNumbers('4')} style={styles.calculatedNumber}>4</Text>
            <Text onPress={() => this.makeNumbers('5')} style={styles.calculatedNumber}>5</Text>
            <Text onPress={() => this.makeNumbers('6')} style={styles.calculatedNumber}>6</Text>
            <Text onPress={() => this.makeNumbers('-')} style={[styles.calculatedNumber, styles.minus]}>-</Text>
          </View>
          <View style={styles.buttons}>
            <Text onPress={() => this.makeNumbers('1')} style={styles.calculatedNumber}>1</Text>
            <Text onPress={() => this.makeNumbers('2')} style={styles.calculatedNumber}>2</Text>
            <Text onPress={() => this.makeNumbers('3')} style={styles.calculatedNumber}>3</Text>
            <Text onPress={() => this.makeNumbers('+')} style={styles.calculatedNumber}>+</Text>
          </View>
          <View style={styles.buttons}>
            <Text onPress={() => this.makeNumbers('0')} style={styles.calculatedNumber}>0</Text>
            <Text onPress={() => this.makeNumbers('.')} style={styles.calculatedNumber}>.</Text>
            <Text style={styles.calculatedNumber}>=</Text>
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
      backgroundColor:"gray",
      justifyContent: "flex-end",
      alignItems: "flex-end"
  },
  downPlace: {
      flex: 0.8,
      backgroundColor:"yellow",
  },
  buttons:{
    flexDirection:"row",
    marginTop: 30,
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 23
  },
  calculatedNumber: {
    fontSize: 50,
  },
  multiply:{
    fontSize: 40
  },
  minus:{
    fontSize: 30
  },
  numbers: {
    fontSize: 50,
  },
  buttons_3: {
    marginRight: 40
  }
});

export default App;