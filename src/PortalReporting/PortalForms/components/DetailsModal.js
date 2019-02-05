import React, { Component } from 'react';
import FormModal from './FormModal';

// Import CSS
import './css/modal.css';

class DetailsModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      el: props.el,
      isOpen: props.isOpen,
      action: props.action,
      data: props.data,
      validations: props.validations
    };
  }
  
  componentDidMount () {
    this.sortChildrenDivsById('details-div');
    // this.sortChildrenDivsById('details-div');
  }
  // Order Div components by ascendant order number
  sortChildrenDivsById (parentId) {
    var main = document.getElementById(parentId);
    Array.prototype.map.call(main.children, Object).sort(function (a, b) {
      return +a.id.match(/\d+/) - +b.id.match(/\d+/);
    }).forEach(function (elem) {
      console.log(elem)
      main.appendChild(elem);
    });
  }

  render () {
    const { validations, data } = this.state;
    const keys = validations.map(e => Object.keys(e));
    return (
      <div>
        <h4>Detalhes do Item</h4>
        <div id='details-div' className='col-md-auto'>
          {validations.map((e, index) => {
            return (
              e[keys[index]]['detail']
                ? <div id={e[keys[index]]['detailOrder']} className='row' key={`div-${index}`}>
                  <label>{`${e[keys[index]]['label']}: `}</label>
                  <div style={{marginLeft: '4px'}} dangerouslySetInnerHTML={{ __html: data[keys[index]] }} />
                </div>
                : null
            );
          })}
        </div>
      </div>
    );
  }
}
 
  /* componentWillMount () {
    console.log(this.state.data);
    const a = document.getElementById('details-div').innerHTML;
    console.log(a);
  } */
  /**/

  
/* const DetailsModal = ({el, isOpen, action, data, validations}) => {
  const keys = validations.map(e => Object.keys(e));
  return (
    <FormModal
      el={el}
      className='Detail-Modal-Wrapper'
      isOpen={isOpen}
      action={action}
      children={
        <div id='details-div' className='col-md-auto'>
          <h4>Detalhes do Item</h4>
          {validations.map((e, index) => {
            return (
              e[keys[index]]['detail']
                ? <div id={e[keys[index]]['detailOrder']} className='row' key={`div-${index}`}>
                  <label>{`${e[keys[index]]['label']}: `}</label>
                  <span style={{marginLeft: '4px'}} dangerouslySetInnerHTML={{ __html: data[keys[index]] }} />
                </div>
                : null
            );
          })}
        </div>
      }
      overlayClassName='Overlay' />
  );
}; */

export default DetailsModal;
