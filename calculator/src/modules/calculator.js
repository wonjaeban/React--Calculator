/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const NEW = 'calculator/NEW';
const PLUS_SOMETHING = 'calculator/PLUS_SOMETHING';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const newNumber = (val) => ({ type: NEW, text: val });
export const plusSomething = (val) => ({ type: PLUS_SOMETHING, text: val });

/* 초기 상태 선언 */
const initialState = {
  number: '0',
};

export default function calculator(state = initialState, action) {
  switch (action.type) {
    case NEW:
      return {
        number: action.text,
      };
    case PLUS_SOMETHING:
      return {
        number: state.number + action.text,
      };
    default:
      return state;
  }
}
