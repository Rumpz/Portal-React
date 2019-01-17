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
  let axisIndex = 0;
  const { data } = props;
  const values = data.map(e => e.data);
  const axis = data.map(e => e.axis);
  // const resumo = data.map(e => e.resumo);
  const LineComponent = () => values.map((element, index) => {
    titleIndex = index;
    let colors = data[index].cores ? data[index].cores.split('|') : null;
    let keys = Object.keys(element[0]);
    let dataKeys = keys.slice(1, keys.length);
    let lineAxis = axis[index] ? axis[index].split('|') : ['left'];
    let renderAxis = [...new Set(lineAxis)];
    const lines = keys.map((key, keyIndex) => {
      if (keyIndex < lineAxis.length) { axisIndex = keyIndex; }
      return (
        <Line
          key={`item-${keyIndex}`}
          dataKey={dataKeys[keyIndex]}
          type='monotone'
          strokeWidth={2}
          activeDot={{r: 8}}
          colorInterpolation='#94CFDD'
          stroke={colors ? colors[keyIndex] : '#5A8099'}
          yAxisId={lineAxis[axisIndex]}
          strokeDasharray={lineAxis[axisIndex] === 'right' ? '5 5' : null}
        />
      );
    });
    return (
      <div key={`div-${index}`} id={data[index].order} style={{paddingTop: '30px'}}>
        <h4><strong>{data[titleIndex].title}</strong></h4>
        <LineChart key={`item-${index}`} width={1000} height={300} data={element}
          margin={{top: 5, bottom: 5}}>
          <CartesianGrid strokeDasharray='10 10' />
          <XAxis dataKey={keys[0]} />
          <Tooltip />
          {renderAxis.map((el, index) => {
            return (
              <YAxis key={`axis-${index}`} yAxisId={el} orientation={el} />
            );
          })}
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
    let keys = Object.keys(element[0]);
    const bars = keys.map((key, keyIndex) => {
      return (
        <Bar
          key={`item-${keyIndex}`}
          dataKey={keys[keyIndex + 1]}
          fill={colors ? colors[keyIndex] : '#5A8099'}
          barSize={1000}
        />
      );
    });
    return (
      <div key={`div-${index}`} id={data[index].order} style={{paddingTop: '30px'}}>
        <h4><strong>{data[titleIndex].title}</strong></h4>
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
      key={`legend-${key++}`}
      style={{
        listStyle: 'none',
        display: 'inline-flex',
        paddingLeft: '20px'
      }}>
      {
        payload.map((entry, index) => (
          entry.value
            ? <strong key={`item-${index}`}>
              <li
                style={{
                  textAlign: 'center',
                  paddingRight: '20px'
                }}
                key={`item-${index}`}>
                <i style={{
                  color: `${payload[index].color}`,
                  marginTop: '10px',
                  fontSize: '30px',
                  verticalAlign: '-3px',
                  marginRight: '2px'
                }}>-</i>
                {entry.value}
              </li>
            </strong>
            : null
        ))
      }
    </ul>
  );
};

export {
  LineGraph,
  BarGraph
};
