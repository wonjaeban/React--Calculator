import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function App() {
  let [counter, setCounter] = useState(0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.fonts}>카운터 : {counter}</Text>
        <View style={styles.fixToText}>
          <Button  title='-1' onPress={() => setCounter(counter - 1)} />
          <Button  title='+1' onPress={() => setCounter(counter + 1)}/>
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
    fontSize:40
  },
  fixToText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
