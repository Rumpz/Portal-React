import React from 'react';

// Recharts imports
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const LineGraph = (props) => {
  let titleIndex = 0;
  const { data } = props;
  const values = data.map(e => e.data);
  const LineComponent = () => values.map((element, index) => {
    titleIndex = index;
    let colors = data[index].cores ? data[index].cores.split('|') : null;
    let keys = Object.keys(element[index]);
    const lines = element.map((e, index) => {
      return (
        <Line
          key={`item-${index}`}
          dataKey={keys[index + 1]}
          yAxisId='left'
          type='monotone'
          activeDot={{r: 8}}
          colorInterpolation='#94CFDD'
          stroke={colors ? colors[index] : '#5A8099'}
        />
      );
    });
    return (
      <div id={data[index].order} style={{paddingTop: '30px'}}>
        <h4>{data[titleIndex].title}</h4>
        <LineChart key={`item-${index}`} width={1000} height={300} data={element}
          margin={{top: 5, bottom: 5}}>
          <CartesianGrid strokeDasharray='10 10' />
          <XAxis dataKey={keys[0]} />
          <YAxis yAxisId='left' />
          <Tooltip />
          <Legend content={renderLegend} />
          {lines}
        </LineChart>
      </div>
    );
  });
  return (
    <LineComponent key={`item-${titleIndex}`} />
  );
};

const BarGraph = (props) => {
  let titleIndex = 0;
  const { data } = props;
  const values = data.map(e => e.data);
  const BarComponent = () => values.map((element, index) => {
    titleIndex = index;
    let colors = data[index].cores ? data[index].cores.split('|') : null;
    let keys = Object.keys(element[index]);
    const bars = element.map((e, index) => {
      return (
        <Bar
          key={`item-${index}`}
          dataKey={keys[index + 1]}
          fill={colors ? colors[index] : '#5A8099'}
          barSize={1000}
        />
      );
    });
    return (
      <div id={data[index].order} style={{paddingTop: '30px'}}>
        <h4>{data[titleIndex].title}</h4>
        <BarChart key={`item-${index}`} width={1000} height={300} data={element} >
          <CartesianGrid />
          <XAxis dataKey={keys[0]} />
          <YAxis />
          <Tooltip />
          <Legend content={renderLegend} />
          {bars}
        </BarChart>
      </div>
    );
  });
  return (
    <BarComponent key={`item-${titleIndex}`} />
  );
};

const renderLegend = (props) => {
  const { payload } = props;
  let key = 0;
  return (
    <ul
      key={key++}
      style={{
        listStyle: 'none',
        display: 'inline-flex',
        background: 'linear-gradient(#B2B3B7, #D3D3D3)',
        borderRadius: '3px'
      }}>
      {
        payload.map((entry, index) => (
          <strong>
            <li
              style={{
                color: `${payload[index].color}`,
                paddingLeft: '20px',
                textAlign: 'center',
                fontSize: 'large'
              }}
              key={`item-${index}`}>{entry.value}
            </li>
          </strong>
        ))
      }
    </ul>
  );
};

/* const RadialGraph = (props) => {
  const values = props.data.filter((el) => el['type'] === 'radial');
  const colors = values.map(e => e.cores)[0].split('|');
  let domain = values.map(e => e.domain)[0].split('|');
  let axis = values.axis ? values.axios[0].split('|') : null;
  const keys = Object.keys(values[0].data[0]);
  const graph = values[0].data.map((e, index) => {
    return (
      <RadialBar minAngle={15} label={{ position: 'insideStart', fill: `${colors[index]}` }} background clockWise dataKey={keys[index]} />
    );
  });
  return (
    <div><h4>{values[0].title}</h4>
      <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={values[0].data}>
        {graph}
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
      </RadialBarChart>
    </div>
  );
}; */

export {
  LineGraph,
  BarGraph
};
