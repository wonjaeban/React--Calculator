import { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  Pressable,
} from 'react-native';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      allHistory: [],
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible, allHistory: this.state.allHistory });
  };

  setAllHistory = (data) => {
    this.setState({ modalVisible: this.state.modalVisible, allHistory: data });
  };

  connectGet = () => {
    // const URL = 'http://10.1.2.156:3000/get';
    const URL = 'http://172.20.10.4:3000/get';
    let historyDatas = fetch(URL).then((response) => response.json());

    return historyDatas;
  };

  callHistory = async () => {
    let allHistory = await this.connectGet();
    this.setAllHistory(allHistory);
  };

  render() {
    const { modalVisible, allHistory } = this.state;
    let historys = [];
    let count = 0;
    let i = allHistory.length - 1;
    while (i >= 0 && count <= 15) {
      historys.push(allHistory[i]);
      i--;
      count++;
    }

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //이전버튼 클릭시
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {historys.map((history) => (
                <Texts style={styles.modalText} history={history} />
              ))}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            this.callHistory();
            this.setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.textButtonAC}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Texts extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.history.mathExpression} = </Text>

        <Text>{this.props.history.value}</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 400,
    height: 700,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: 200,
    height: 70,
    marginLeft: 60,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 300,
    textAlign: 'center',
  },
});

export default History;
