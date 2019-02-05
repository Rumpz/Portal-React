import React from 'react';
import ReactModal from 'react-modal';

// Import CSS
import './css/modal.css';

const FormModal = ({ el, isOpen, action, children }) => {
  return (
    <ReactModal
      appElement={el}
      className='Modal'
      isOpen={isOpen}
      overlayClassName='Overlay'>
      <div className='modal-body'>
        {children}
      </div>
      <div className='modal-buttons'>
        <button
          style={{marginBottom: '10px'}}
          className='btn btn-default'
          onClick={action.close}>
          Fechar
        </button>
      </div>
    </ReactModal>
  );
};

export default FormModal;
