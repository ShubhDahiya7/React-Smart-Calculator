import './App.css';
import {useReducer} from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import ImportantFacts from "./components/ImportantFacts";


// let's create a js object which stores all the actions as by var names
// variables stores strings
// to access any variable we write ACTIONS.var-name
export const ACTIONS = {
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
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false,
                }
            }
            // if we gave already added a 0 and we're trying to add more zeroes then it
            // doesn't make sense so in that case we just return the initial state
            if(payload.digit === "0" && state.currentOperand === "0") {
                return state
            }
            if(payload.digit === "." && state.currentOperand.includes(".")) {
                return state
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            // we just return an empty container
            return {}
        case ACTIONS.CHOOSE_OPERATION:
            // if we don't have any operand(no) then we shouldn't add operations(+,_)
            if(state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            // to switch to a different operation
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }
            if(state.previousOperand == null) {
                return {
                    // our currentOperand is passed to previousOperand and CurrentOperand is set to null to take next input after operation
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            return {
                // if we have something like 55+55 then we are passing this whole state into previous operand
                ...state,
                operation: payload.operation,
                // using eval function instead of evaluate was causing the error Objects are not valid as a React child
                previousOperand: evaluate(state),
                currentOperand: null,
            }
        case ACTIONS.EVALUATE:
            if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
                return state
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                currentOperand: evaluate(state),
                operation: null
            }
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }
            if (state.currentOperand == null) {
                return state
            }
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null
                }
            }
            // default return case
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0,-1)

            }

        default:
        return state;
    }
}

function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break
        case "/":
            computation = prev / current
            break
    }

    return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})

// to add , after a thousand , lakhs and so on
function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split('.')
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function App() {

    // our state variable consists of multiple variables
    const [{currentOperand, previousOperand, operation},dispatch] = useReducer(reducer,{})
    //   dispatch function is used to call any action
    // dispatch({type: ACTIONS.ADD_DIGIT,payload: {digit: 1}})

  return (
  <>
    <ImportantFacts/>
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={() =>dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() =>dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      {/*<DigitButton digit="/" dispatch={dispatch}/>*/}

    <OperationButton operation="/" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        {/*<DigitButton digit="." dispatch={dispatch}/>*/}
    <OperationButton operation="*" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
    <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
    <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={() =>dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  </>
  );
}

export default App;
