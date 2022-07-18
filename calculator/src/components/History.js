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
    const URL = 'http://10.1.2.156:3000/get';
    const controller = new AbortController();

    // 2 second timeout:
    setTimeout(() => controller.abort(), 2000);
    let historyDatas = fetch(URL, { signal: controller.signal })
      .then((response) => {
        //ok 프로퍼티가 있음
        if (!response.ok) {
          // 응답이 제대로 오지 않을 때
          throw Error('could not fetch the data that resource');
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });

    return historyDatas;
  };

  callHistory = async () => {
    let allHistory = await this.connectGet();
    const fail = {
      result: '서버에 문제가 발생했습니다! 히스토리를 불러오지 못했습니다!',
    };

    if (!allHistory || allHistory.result === fail.result) {
      alert('서버가 응답하지 않습니다!');
    } else if (allHistory.length === 0) {
      alert('히스토리가 존재하지 않습니다!');
    }
    console.log(allHistory);
    this.setAllHistory(allHistory);
  };

  render() {
    const { modalVisible, allHistory } = this.state;
    let historys = [];
    let count = 0;
    if (allHistory) {
      let i = allHistory.length - 1;
      //최근 10개 히스토리만 보여줍니다.
      while (i >= 0 && count <= 9) {
        historys.push(allHistory[i]);
        i--;
        count++;
      }
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
              {historys.map((history, index) => (
                <Texts style={styles.modalText} history={history} key={index} />
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
