import React, { Component } from 'react';
import './App.css';

function Extra (props) {
  return (
    <tr className='extra'>
      <td colSpan='11'>
        <ul>
          <li>
            <ObsCTL row={props.row} />
          </li>
          <li>
            <ObsNos row={props.row} />
          </li>
          <li>
            <Inc inc={props.selected.inc} action={props.action.displayInc} />
          </li>
          <li>
            <Chamada calls={props.selected.calls} action={props.action.displayCalls} />
          </li>
          <li>
            <Obs action={{updateObs: props.action.updateObs, displayObs: props.action.displayObs}} obs={props.selected.obs} />
          </li>
          <li>
            <LastOts sum={props.selected.sum} />
          </li>
        </ul>
        <div className='extra-btns-div'>
          <ul>
            <li className='extra-btns' onClick={props.action.close}>Voltar</li>
            <li className='extra-btns' onClick={props.action.clean}>Arquivar</li>
          </ul>
        </div>
      </td>
    </tr>
  );
}

function ObsCTL (props) {
  return (
    <div>
      <div style={props.row.ERRO_CANCELAMENTO ? {width: '50%', float: 'left'} : null}>
        <label>Observações Control</label>
        <p>{props.row.OBS_CTL}</p>
      </div>
      {props.row.ERRO_CANCELAMENTO
        ? <div style={{width: '50%', float: 'right'}}>
          <label>Erro de cancelamento</label>
          <p>{props.row.ERRO_CANCELAMENTO}</p>
        </div>
        : null
      }
    </div>
  );
}

function ObsNos (props) {
  return (
    <div>
      <label>Observações da OT</label>
      <p>{props.row.COMENTARIO}</p>
    </div>
  );
}

function Inc (props) {
  return (
    <div>
      <label>Inc</label>
      {props.inc
        ? props.inc.map((inc) => {
          return (
            <a
              className='extra-btns'
              key={inc.inc}
              onClick={props.action.bind(null, inc)}>
              {inc.inc}
            </a>
          );
        })
        : null}
    </div>
  );
}

function Chamada (props) {
  return (
    <div>
      <label>Chamada</label>
      {props.calls
      ? <a
        className='extra-btns'
        onClick={props.action.bind(null, props.calls)}>
        Ver Historico
      </a>
      : null}
    </div>
  );
}

function Obs (props) {
  return (
    <div>
      <label>Observações</label>
      <Input
        click={props.action.updateObs}
        button={props.obs
          ? <a
            className='extra-btns'
            style={{width: 'calc(50% - 42px)', float: 'right'}}
            onClick={props.action.displayObs.bind(null, props.obs)}>
            Ver Historico
          </a>
        : null}
        />
    </div>
  );
}

function LastOts (props) {
  return (
    <div>
      <label>OTs Anteriores</label>
      <table>
        <thead>
          <tr>
            <th style={{backgroundColor: '#1b1c29'}}>Tipo</th>
            <th style={{backgroundColor: '#1b1c29'}}>{'< 1s'}</th>
            <th style={{backgroundColor: '#1b1c29'}}>1 a 2s</th>
            <th style={{backgroundColor: '#1b1c29'}}>3 a 6s</th>
          </tr>
        </thead>
        <tbody>
          {props.sum[1].map((row, i) => {
            return (
              <tr key={row.TypeOt + i}>
                <td>{row.TypeOt}</td>
                <td>{row.oneWeek}</td>
                <td>{row.twoWeeks}</td>
                <td>{row.twoPlusWeeks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    };
    this.currentValue = this.currentValue.bind(this);
  }
  currentValue (e) {
    this.setState({value: e.target.value});
  }
  render () {
    return (
      <div>
        <textarea
          className='form-control'
          rows='4'
          onChange={this.currentValue}
        />
        <a
          className='extra-btns'
          style={this.props.button ? {width: 'calc(50% - 42px)', float: 'left'} : null}
          onClick={this.props.click.bind(null, this.state.value)}>
          Update
        </a>
        {this.props.button ? this.props.button : null}
      </div>
    );
  }
}

export default Extra;
