import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function Counter({ number, onIncrease, onDecrease, onReset }) {
  
  return (
  <View style={styles.container}>
    <Text style={styles.fonts}>{number}</Text>
      <View style={styles.fixToText}>
        <TouchableOpacity style={styles.appButtonMinus} onPress={onDecrease}>
          <Text style={styles.appButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.appButtonContainer} onPress={onReset}>
          <Text style={styles.appButtonText}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.appButtonPlus} onPress={onIncrease}>
          <Text style={styles.appButtonText}>+</Text>
        </TouchableOpacity>
      </View>
  </View>
  );
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

export default Counter;