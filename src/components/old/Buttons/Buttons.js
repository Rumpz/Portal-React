import React from 'react';
import ReactTooltip from 'react-tooltip';
const sizes = [
  'fa-lg',
  'fa-2x',
  'fa-3x',
  'fa-4x',
  'fa-5x'
];
function RemoveBtn (props) {
  let style = {
    color: 'red'
  };
  let size = sizes[props.size] || 'fa-2x';
  let tooltip = props.tooltip || 'Remover';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='remove' className={`fa fa-times ${size}`} style={style} />
      <ReactTooltip id='remove' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
}

function SubmitBtn (props) {
  let style = {
    color: '#6ca32e'
  };
  let size = sizes[props.size] || 'fa-2x';
  let tooltip = props.tooltip || 'Submeter';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='submit' className={`fa fa-check ${size}`} style={style} />
      <ReactTooltip id='submit' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
}

function AlertBtn (props) {
  let style = {
    color: 'yellow'
  };
  let size = sizes[props.size] || 'fa-2x';
  let tooltip = props.tooltip || 'Alerta';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='alert' className={`fa fa-exclamation-triangle ${size}`} style={style} />
      <ReactTooltip id='alert' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
}

function BackBtn (props) {
  let style = {
    color: 'steelblue'
  };
  let size = sizes[props.size] || 'fa-2x';
  let tooltip = props.tooltip || 'Voltar';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='back' className={`fa fa-undo ${size}`} style={style} />
      <ReactTooltip id='back' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
}

function SubBtn (props) {
  let style = {
    color: 'steelblue'
  };
  return props.closeTooltip
    ? (
      <a onClick={props.action}>
        <i className='fa fa-minus fa-2x' style={style} />
      </a>
    )
  : (
    <a onClick={props.action}>
      <i data-tip data-for='sub' className='fa fa-minus fa-2x' style={style} />
      <ReactTooltip id='sub' type='light'>
        <span>{props.tooltip || 'Remover'}</span>
      </ReactTooltip>
    </a>
  );
}

function AddBtn (props) {
  let style = {
    color: 'steelblue'
  };
  return props.closeTooltip
    ? (
      <a onClick={props.action}>
        <i className='fa fa-plus fa-2x' style={style} />
      </a>
    )
  : (
    <a onClick={props.action}>
      <i data-tip data-for='add' className='fa fa-plus fa-2x' style={style} />
      <ReactTooltip id='add' type='light'>
        <span>{props.tooltip || 'Adicionar'}</span>
      </ReactTooltip>
    </a>
  );
}

function VerifyBtn (props) {
  let style = {
    color: 'orange'
  };
  let tooltip = !props.turnOnTooltip
  ? null
  : (
    <ReactTooltip id='verify' type='light'>
      <span>{props.tooltip || 'Verificar'}</span>
    </ReactTooltip>
  );
  return (
    <a onClick={props.action} style={{margin: 'auto'}}>
      <i data-tip data-for='verify' className='fa fa-exclamation-triangle fa-2x' style={style} />
      {tooltip}
    </a>
  );
}

function NextBtn (props) {
  let style = {
    color: '#6ca32e'
  };
  let tooltip = props.tooltip || 'Proximo';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='next' className='fa fa-chevron-right fa-2x' style={style} />
      <ReactTooltip id='next' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
}

function PreviousBtn (props) {
  let style = {
    color: '#6ca32e'
  };
  let tooltip = props.tooltip || 'Anterior';
  return (
    <div>
      <a onClick={props.action}>
        <i data-tip data-for='previous' className='fa fa-chevron-left fa-2x' style={style} />
        <ReactTooltip id='previous' type='light'>
          <span>{tooltip}</span>
        </ReactTooltip>
      </a>
    </div>
  );
}

function UpBtn (props) {
  let style = {
    color: '#6ca32e'
  };
  let tooltip = !props.turnOnTooltip
  ? null
  : (
    <ReactTooltip id='up' type='light'>
      <span>{props.tooltip || 'Up'}</span>
    </ReactTooltip>
  );

  return (
    <a onClick={props.action} style={{margin: 'auto'}}>
      <i data-tip data-for='up' className='fa fa-chevron-up fa-2x' style={style} />
      {tooltip}
    </a>
  );
}

function DownBtn (props) {
  let style = {
    color: '#6ca32e'
  };

  let tooltip = !props.turnOnTooltip
  ? null
  : (
    <ReactTooltip id='down' type='light'>
      <span>{props.tooltip || 'Down'}</span>
    </ReactTooltip>
  );
  return (
    <a onClick={props.action} style={{margin: 'auto'}}>
      <i data-tip data-for='down' className='fa fa-chevron-down fa-2x' style={style} />
      {tooltip}
    </a>
  );
}

const SearchBtn = props => {
  let style = {
    color: '#6ca32e'
  };
  let tooltip = props.tooltip || 'Procurar';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='procurar' className='fa fa-search fa-2x' style={style} />
      <ReactTooltip id='procurar' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
};

const ImportBtn = props => {
  let style = {
    color: '#f1f2f4'
  };
  let tooltip = props.tooltip || 'Ficheiro a inserir';
  return (
    <label>
      <i data-tip data-for='import' className='fa fa-folder-open-o fa-2x' style={style} />
      <ReactTooltip id='import' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
      <input style={{display: 'none'}} id='f02' type='file' onChange={props.action} />
    </label>
  );
};

const ExpandBtn = props => {
  let style = {
    color: '#f1f2f4'
  };
  let tooltip = props.tooltip || 'Expandir';
  let icon = !props.isOpen
    ? 'fa fa-chevron-down fa-2x'
    : 'fa fa-chevron-up fa-2x';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='expand' className={icon} style={style} />
      <ReactTooltip id='expand' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
};

const UploadBtn = props => {
  let style = props.style || {
    color: '#f1f2f4'
  };
  let tooltip = props.tooltip || 'Upload';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='upload' className='fa fa-upload fa-2x' style={style} />
      <ReactTooltip id='upload' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
};

const DownloadBtn = props => {
  let style = props.style || {
    color: '#f1f2f4'
  };
  let tooltip = props.tooltip || 'Download';
  return (
    <a onClick={props.action}>
      <i data-tip data-for='download' className='fa fa-download fa-2x' style={style} />
      <ReactTooltip id='download' type='light'>
        <span>{tooltip}</span>
      </ReactTooltip>
    </a>
  );
};

function CustomBtn ({icon, tooltip, action, style}) {
  //style.cursor = 'pointer';
  return (
    <div>
      <a onClick={action} >
        <label
          data-tip
          data-for={'Custom' + tooltip}
          style={style}>
          {icon}
        </label>
        <ReactTooltip id={'Custom' + tooltip} type='light'>
          <span >{tooltip}</span>
        </ReactTooltip>
      </a>
    </div>
  );
}

function DefaultBtn ({size, tooltip, style, icon, name, action, noTooltip}) {
  let selectedStyle = style || {color: 'grey'};
  let selectedSize = sizes[size] || 'fa-2x';
  let selectedTooltip = tooltip || '';
  let reactTooltip = noTooltip
  ? null
  : (
    <ReactTooltip id={name} type='light'>
      <span>{selectedTooltip}</span>
    </ReactTooltip>
  );
  return (
    <a onClick={action}>
      <i data-tip data-for={name} className={`fa ${icon} ${selectedSize}`} style={selectedStyle} />
      {reactTooltip}
    </a>
  );
}
export {
  RemoveBtn,
  SubmitBtn,
  AddBtn,
  SubBtn,
  UpBtn,
  DownBtn,
  BackBtn,
  NextBtn,
  PreviousBtn,
  SearchBtn,
  VerifyBtn,
  ImportBtn,
  ExpandBtn,
  UploadBtn,
  DownloadBtn,
  CustomBtn,
  AlertBtn,
  DefaultBtn
};
