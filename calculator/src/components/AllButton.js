import { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class AllButton extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.title != nextProps.title;
  }

  render() {
    const mathSigns = ['()', '%', '/', 'X', '-', '+'];
    if (this.props.title === '=') {
      return (
        <TouchableOpacity
          style={styles.roundButtonEqual}
          onPress={this.props.onClick}
        >
          <Text style={styles.textButtons}>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else if (mathSigns.includes(this.props.title)) {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            this.props.onClick(this.props.title);
          }}
        >
          <Text style={styles.textButtonSign}>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else if (this.props.title === 'AC') {
      return (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => {
            this.props.onClick(this.props.title);
          }}
        >
          <Text style={styles.textButtonAC}>{this.props.title}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => this.props.onClick(this.props.title)}
      >
        <Text style={styles.textButtons}>{this.props.title}</Text>
      </TouchableOpacity>
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
});

export default AllButton;
