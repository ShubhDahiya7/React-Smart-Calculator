import './App.css';
import {useReducer} from "react";


// let's create a js object which stores all the actions as by var names
// variables stores strings
// to access any variable we write ACTIONS.var-name
const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}
function reducer(state,{type,payload}) {
//  action is breakdown into type and payload
    switch (type) {
    //  cases stores the diff action type and their return values
        case ACTIONS.ADD_DIGIT:
            return {
                ...state,
                currentOperand: `${currentOperand || ""}${payload.digit}`
            }
    }


}

function App() {

    // our state variable consists of multiple variables
    const [{currentOperand, previousOperand, operation},dispatch] = useReducer(reducer,{})
    //   dispatch function is used to call any action
    dispatch({type: ACTIONS.ADD_DIGIT,payload: {digit: 1}})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>/</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
