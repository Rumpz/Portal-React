import React, { Component } from 'react';
// import custom CSS
import '../css/columns.css';

const style = {
  textAlign: 'center',
  display: 'flex',
  backgroundColor: 'rgb(124, 172, 167)',
  borderRadius: '6px',
  marginTop: '10px'
};

export default class Columns extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: '',
      inputs: props.inputs,
      outputs: props.outputs,
      previousState: props.previousState,
      selectedDisplay: '',
      inputOptions: [],
      isInputOpen: false,
      selectedOutput: [],
      selectedInput: [],
    };
    this.handleDisplay = this.handleDisplay;
    this.handleInputs = this.handleInputs;
  }
  
  componentDidMount() {
    console.log('mounted', this.state)
  }

  componentWillUpdate (props) {
    console.log('update', props)
  }

  componentWillReceiveProps (props) {
    if(this.state.inputs !== props.inputs) {
      this.setState({
        inputs: props.inputs,
        outputs: props.outputs
      })
    }
  }

  handleOutputs = event => {
    let selectedOutputs = this.state.selectedOutput;
    selectedOutputs[event] = !selectedOutputs[event];
    this.setState({selectedOutput: selectedOutputs});
    console.log(this.state)
  }

  handleInputs = event => {
    let { selectedInput } = this.state;
    let index = 0;
    // event.value = event.type === 'select' ? event : event;
    this.setState({selectedInput: selectedInput});
    console.log('aaaaaaaa', this.state)
    if (event.label !== this.state.inputOptions.label) {
      console.log(event)
      this.setState({ 
        inputOptions: [event],
        isInputOpen: !this.state.isInputOpen
      })  
    } 
  }

  handleDisplay (e) {
    console.log(this.state)
    const content = e.target.textContent;
    this.setState({ selectedDisplay: content });
  }

  handleReactSelect (e) {
    console.log(e)
  }

  render () {
    const { inputs, outputs, selectedDisplay } = this.state;
    return (
      <div className='li-container'>
        <li><a role='button' onClick={this.handleDisplay}>Inputs</a></li>
        <li><a role='button' onClick={this.handleDisplay}>Outputs</a></li>
        <div>
          <InputsToRender
            action={this.handleInputs}
            selectedDisplay={selectedDisplay} 
            values={inputs} 
          />
          <OutputsToRender 
            action={this.handleOutputs} 
            selectedDisplay={selectedDisplay} 
            values={outputs} 
          />
        </div>
        <button onClick={() => {console.log(this.state)}} className='btn btn-danger'>Search & Download</button>
      </div>
    );
  }
}

const InputsToRender = ({ selectedDisplay, values, action }) => {
  
  const inputStyle = selectedDisplay === 'Inputs' ? style : {display: 'none'};
  if (!values) { return null }
  const vals = values.map((e, index) => {
    return (
      <li key={e.value + index}>
        <label>{e.label}</label>
        <input onChange={action.bind(this, e)} type='checkbox' value={e.value} />
      </li>
    );
  });
  return (
    <div style={inputStyle}>
      <ul>{vals}</ul>
    </div>
  );
};

const OutputsToRender = ({ selectedDisplay, values, action }) => {
  const outputStyle = selectedDisplay === 'Outputs' ? style : { display: 'none' };
  if (!values) { return }
  const vals = values.map((e, index) => {
    return (
      <li key={e + index}>
        <label>{e}</label>
        <input onChange={action.bind(null, e)} type='checkbox' value={e} />
      </li>
    );
  });
  return (
    <div style={outputStyle}>
      <ul>{vals}</ul>
    </div>
  );
};
