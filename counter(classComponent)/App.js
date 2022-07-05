import React, {Component} from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter : 0
    };
  }

  PlusCount = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  MinusCount = () => {
    this.setState({
      counter: this.state.counter - 1
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fonts}>카운터 : {this.state.counter}</Text>
          <View style={styles.fixToText}>
            <Button  title="-1" onPress={this.MinusCount} />
            <Button  title="+1" onPress={this.PlusCount} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fonts:{
    fontSize:40
  },
  fixToText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default App;