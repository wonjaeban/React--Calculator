import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-web';
import {Ionicons} from '@expo/vector-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter : 0
    };
  }

  plusCount = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  minusCount = () => {
    this.setState({
      counter: this.state.counter - 1
    })
  }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.upperPlace}><Text style={styles.calculatedNumber}>0</Text></View>
          <View style={styles.downPlace}>
          <View style={styles.buttons}>
              <Text style={styles.calculatedNumber}>AC</Text>
              <Text style={styles.calculatedNumber}>+/-</Text>
              <Text style={styles.calculatedNumber}>%</Text>
              <Text style={styles.calculatedNumber}>/</Text>
            </View>
            <View style={styles.buttons}>
              <Text style={styles.calculatedNumber}>7</Text>
              <Text style={styles.calculatedNumber}>8</Text>
              <Text style={styles.calculatedNumber}>9</Text>
              <Text style={[styles.calculatedNumber, styles.multiply]}>X</Text>
            </View>
            <View style={[styles.buttons, styles.buttons_3]}>
              <Text style={styles.calculatedNumber}>4</Text>
              <Text style={styles.calculatedNumber}>5</Text>
              <Text style={styles.calculatedNumber}>6</Text>
              <Text style={[styles.calculatedNumber, styles.minus]}>-</Text>
            </View>
            <View style={styles.buttons}>
              <Text style={styles.calculatedNumber}>1</Text>
              <Text style={styles.calculatedNumber}>2</Text>
              <Text style={styles.calculatedNumber}>3</Text>
              <Text style={styles.calculatedNumber}>+</Text>
            </View>
            <View style={styles.buttons}>
              <Text style={styles.calculatedNumber}>0</Text>
              <Text style={styles.calculatedNumber}>.</Text>
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