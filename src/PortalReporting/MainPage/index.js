// React imports
import React, { Component } from 'react';

// Custom imports
import NavBar from '../../components/NavBar/NavBar';
import { LineGraph, BarGraph } from './components/Charts';
import { OptionsList } from './components/OptionsList';
import { getGraphic, getOptions } from './API';

import Loading from '../../components/old/Loading/Loading';
// CSS imports
import './css/main.css';

export default class MainPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: "KPI's I&M",
      graphicData: '',
      lineData: [],
      barData: [],
      barChart: false,
      lineChart: false,
      radialChart: false,
      permission: 'admin',
      options: [],
      loading: true
    };
    this.getGraph = this.getGraph.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getGraph (e) {
    getGraphic(e).then(Response => {
      const bar = Response.data.filter((e) => e.type === 'bar');
      const line = Response.data.filter((e) => e.type === 'line');
      const radial = Response.data.filter((e) => e.type === 'radial');
      this.setState({
        graphicData: Response.data,
        lineData: line,
        barData: bar,
        barChart: Boolean(bar.length > 0),
        lineChart: Boolean(line.length > 0),
        radialChart: Boolean(radial.length > 0),
        loading: false
      });
    }).catch(err => {
      alert(`${err}`);
    });
  }

  componentWillMount () {
    this.setState({loading: true});
    getOptions().then(Response => {
      this.setState({
        options: Response.data,
        loading: false
      });
    }).catch(err => {
      alert(`${err}`);
    });
  }

  componentDidMount () {
  }

  componentDidUpdate () {
    this.sortChildrenDivsById('graph-div');
  }

  // Order Div components by ascendant order number
  sortChildrenDivsById (parentId) {
    var main = document.getElementById(parentId);
    Array.prototype.map.call(main.children, Object).sort(function (a, b) {
      return +a.id.match(/\d+/) - +b.id.match(/\d+/);
    }).forEach(function (elem) {
      main.appendChild(elem);
    });
  }
  handleSearch (e) {
    this.setState({loading: true});
    this.getGraph(e);
  }
  render () {
    const lineGraph = this.state.lineChart
      ? <LineGraph data={this.state.lineData} />
      : null;

    const barGraph = this.state.barChart
      ? <BarGraph data={this.state.barData} />
      : null;

    return (
      <div className='main-div'>
        <NavBar />
        <h1>{this.state.title}</h1>
        <div className='options-div'>
          <OptionsList
            className={{
              li: 'options-li',
              ul: 'options-ul',
              a: 'options-a'
            }}
            data={this.state.options}
            action={this.handleSearch}
          />
          <br />
          <br />
          {this.state.loading ? <Loading /> : null}
        </div>
        <div id='graph-div' style={{display: 'inline-grid'}}>
          {lineGraph}
          {barGraph}
        </div>
      </div>
    );
  }
}
