import React, { Component } from 'react';
import './TotalSum.css';
import moment from 'moment';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const columName = [' ', ' ', '8h~11h', '11h~14h', '14h~15h30', '15h30~17h', '17h~18h', '18h~20h', '20h~21h', '21h30~24h', ' '];

class TotalSum extends Component {
  constructor (props) {
    super(props);
    this.state = {
      table: false
    };
    this.search = this.search.bind(this);
  }

  search () {
    let url = `/totalSum/find`;
    axios.get(url).then((res) => {
      this.setState(() => {
        return {
          table: res.data
        };
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount () {
    this.search();
    this.refresh = setInterval(
      () => this.search(),
      10000
    );
  }

  render () {
    return (
      <div className='container'>
        <Navbar />
        <h1>Total Diário</h1>
        <Table
          columName={columName}
          table={this.state.table}
          />
        <p className='text-right' style={{color: '#c2c1c7'}}>Atualizado às {moment().format('HH:mm:ss')}</p>
      </div>
    );
  }
}

function Table (props) {
  if (!props.table) return <div className='spinner' />;

  let table = props.table[1];
  let sumStatus = props.table[2];
  let sumSlot = props.table[3];
  let tableDefault = {
    Captada: {
      IR: [],
      AS: [],
      M: []
    },
    Emitida: {
      IR: [],
      AS: [],
      M: []
    },
    execucao: {
      IR: [],
      AS: [],
      M: []
    },
    realizada: {
      IR: [],
      AS: [],
      M: []
    },
    incumprimento: {
      IR: [],
      AS: [],
      M: []
    },
    cancelada: {
      IR: [],
      AS: [],
      M: []
    }
  };

  for (let i in table) {
    let temp = [];
    for (let j in table[i]) {
      temp.push(table[i][j]);
    }
    tableDefault[temp[0]][temp[1]] = temp;
  }

  let defaultSum = [
    {
      STATUS: 'Captada',
      SUM: 0
    },
    {
      STATUS: 'Emitida',
      SUM: 0
    },
    {
      STATUS: 'execução',
      SUM: 0
    },
    {
      STATUS: 'realizada',
      SUM: 0
    },
    {
      STATUS: 'incumprimento',
      SUM: 0
    }
  ];

  let sumOrder = ['Captada', 'Emitida', 'execucao', 'realizada', 'incumprimento'];

  for (let i in sumStatus) {
    let index = sumOrder.indexOf(sumStatus[i].STATUS);
    defaultSum[index].SUM = sumStatus[i].SUM;
  }

  return (
    <div>
      <table className='table' key='table'>
        <thead>
          <tr className='thead' key='thread'>
            {props.columName.map((name, i) => {
              return (
                <th key={name + i} className={'th' + i}>{name}</th>
              );
            })}
          </tr>
        </thead>
        <Body
          table={tableDefault}
          sumStatus={defaultSum}
          sumSlot={sumSlot}
        />
      </table>
    </div>
  );
}

function Body (props) {
  return (
    <tbody>
      <Row
        row={props.table.Captada}
        sum={props.sumStatus[0].SUM}
        name='Captada'
      />
      <Row
        row={props.table.Emitida}
        sum={props.sumStatus[1].SUM}
        name='Emitida'
      />
      <Row
        row={props.table.execucao}
        sum={props.sumStatus[2].SUM}
        name='execucao'
      />
      <Row
        row={props.table.realizada}
        name='realizada'
        sum={props.sumStatus[3].SUM}
      />
      <Row
        row={props.table.incumprimento}
        name='incumprimento'
        sum={props.sumStatus[4].SUM}
      />
      <Extra
        tr={props.sumSlot}
        name='TotalSlot'
      />
      <Row
        row={props.table.cancelada}
        name='cancelada'
      />
    </tbody>
  );
}

function Row (props) {
  let table2 = [2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <tr key={props.name}>
      <td>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</td>
      <Table2
        ir='I+R'
        as='AS'
        m='M'
        name={props.name + 1}
      />
      {table2.map((each) => {
        return (
          <Table2
            ir={props.row.IR[each]}
            as={props.row.AS[each]}
            m={props.row.M[each]}
            name={props.name + each}
            key={'t' + props.name + each}
          />
        );
      })}
      <td className={props.sum ? null : 'empty-td'}>{props.sum ? props.sum : ' '}</td>
    </tr>
  );
}

function Extra (props) {
  let sum = 0;
  let tr = [' ', ' '];

  for (let i in props.tr) {
    tr.push(props.tr[i].sumSlot);
    sum += props.tr[i].sumSlot;
  }
  tr.push(sum);

  return (
    <tr key={props.name}>
      {tr.map((td, i) => {
        return <td key={'extra' + i} className={'extra' + i}>{td}</td>;
      })}
    </tr>
  );
}

function Table2 (props) {
  return (
    <td key={props.name}>
      <table className='table-2'>
        <tbody>
          <tr>
            <td>{props.ir ? props.ir : ' '}</td>
          </tr>
          <tr>
            <td>{props.as ? props.as : ' '}</td>
          </tr>
          <tr>
            <td>{props.m ? props.m : ' '}</td>
          </tr>
        </tbody>
      </table>
    </td>
  );
}

export default TotalSum;
