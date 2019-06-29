import './Calculator.css';

import React, { Component } from 'react';

import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentIndexValues: 0
};

export default class Calculator extends Component {
  
  state = { ...initialState };

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
      const isEquals = operation === "="
      let newDisplayValue = this.state.displayValue
      console.log('newDisplayValue', newDisplayValue);

      const lastCharDisplayValue =  newDisplayValue[newDisplayValue.length - 1];
      if(isNaN(lastCharDisplayValue) && !isEquals) {
        const newDisplayValueLength = newDisplayValue.length - 1;
        newDisplayValue = newDisplayValue.substr(0, newDisplayValueLength)
      }

      if (isEquals) {
        // Calcular resultado
        let result;
        try {
          result = eval(`${newDisplayValue}`);
          this.setState({
            displayValue: result
          })
        } catch (error) {
          this.clearMemory();
        } 
      } else {
        // Mostrar operador no display
        const showOperation = `${newDisplayValue}${operation}`
        this.setState({
          displayValue: showOperation
        })
      }
    }
  

  addDigit(n) {

    if (n === '.' && this.state.displayValue.includes('.')) {
        return
    }

    const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if(n !== '.'){
      const i = this.state.currentIndexValues
      const newValue = parseFloat(displayValue)
      const values = [this.state.values]
      values[i] = newValue
      this.setState({ values })
      console.log(values)
    }
  }

  render() {
    const addDigit = n => this.addDigit(n);
    const setOperation = op => this.setOperation(op);

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={() => this.clearMemory()} triple />
        <Button label="/" click={setOperation} operation />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label="*" click={setOperation} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label="-" click={setOperation} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={addDigit} double />
        <Button label="." click={addDigit} />
        <Button label="=" click={setOperation} />
      </div>
    );
  }
}
