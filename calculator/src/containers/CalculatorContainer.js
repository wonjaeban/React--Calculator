import React, { Component } from 'react';
import Calculator from '../components/Calculator';
import { newNumber, plusSomething } from '../modules/calculator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CalculatorContainer extends Component {
  render() {
    const { number, newNumber, plusSomething } = this.props;
    return (
      <Calculator
        // 상태와
        number={number.number}
        // 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
        onNew={newNumber}
        onPlus={plusSomething}
      />
    );
  }
}

// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의합니다.
// 현재 리덕스 상태를 파라미터로 받아옵니다.
const mapStateToProps = (state) => ({
  number: state,
});

// mapDispatchToProps 는 액션을 디스패치하는 함수를 만들어서 props로 넣어줍니다.
// dispatch 를 파라미터로 받아옵니다.
// bindActionCreators 를 사용하면, 자동으로 액션 생성 함수에 dispatch 가 감싸진 상태로 호출 할 수 있습니다.
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      newNumber,
      plusSomething,
    },
    dispatch
  );

// connect 함수에는 mapStateToProps, mapDispatchToProps 를 인자로 넣어주세요.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorContainer);
