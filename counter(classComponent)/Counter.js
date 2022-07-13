import {Component} from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const RESET = 'RESET';

class Counter extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fonts}>{this.props.number}</Text>
          <View style={styles.fixToText}>
            <TouchableOpacity style={styles.appButtonMinus} onPress={this.props.decrease}>
              <Text style={styles.appButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appButtonContainer} onPress={this.props.reset}>
              <Text style={styles.appButtonText}>RESET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appButtonPlus} onPress={this.props.increase}>
              <Text style={styles.appButtonText}>+</Text>
            </TouchableOpacity>
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
    fontSize:100
  },
  fixToText:{
    flexDirection: 'row',
    
    
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "gray",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5
  },
  appButtonPlus: {
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5,
    width:80
  },
  appButtonMinus: {
    elevation: 8,
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5,
    width:80
  },
  appButtonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})

//store에 있는 값이 업데이트 될때마다 호출됩니다. return값은 props가 됩니다.
const mapStateToProps = (state) => {
  return {
    number: state,
  };
};

//store에 대한 dispatch기능을 제공합니다. 이를 통해 component에서 store에 대한 dispatch를 매번 할 필요가 없어집니다.
const mapDispatchToProps = (dispatch) => {
  return {
    increase: () => {
      dispatch({ type: INCREASE});
    },
    decrease: () => {
      dispatch({ type: DECREASE});
    },
    reset: () => {
      dispatch({ type: RESET});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);