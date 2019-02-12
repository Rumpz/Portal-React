import React from 'react';
import ReactModal from 'react-modal';
import pasteAndGo from '../../../../assets/img/pasteAndGo.png';
import './css/modal.css';

const Modal = (props) => {
  const link = props.reportUrl.includes('http')
    ? <LinkedLink link={props.reportUrl} />
    : <PhisicalLink link={props.reportUrl} />;

  return (
    <div className='container'>
      <ReactModal
        appElement={props.body}
        isOpen={props.isOpen}
        className='Modal'
        overlayClassName='Overlay'>
        <div className='modal-body'>
          <h4>Relatório disponivel no link abaixo indicado</h4>
          <p>Os relatórios procurados podem ser extraidos através do link em baixo, excepto relatórios localizados na rede</p>
        </div>
        {link}
        <div className='modal-buttons'>
          <button
            className='btn btn-default'
            onClick={props.closeModal}>
            Close
          </button>
        </div>
      </ReactModal>
    </div>
  );
};
/* <ModalTable
header={props.modalHeader}
values={props.modalBody}
/> */
const LinkedLink = (props) => {
  return (
    <a href={props.link} target='_blank'>Download Link</a>
  );
};

const PhisicalLink = (props) => {
  return (
    <div>
      <strong>
        <p style={{fontSize: '12px'}}>
          Relatório encontra-se na share
          por motivos de segurança por favor
          copie o link e abra em outra janela
          <img alt='' style={{width: '50%', height: '50%'}}src={pasteAndGo} />
        </p>
      </strong>
      <strong>
        <p style={{fontSize: '12px'}}>Link:<br />
          <a>{props.link}</a>
        </p>
      </strong>
    </div>
  );
};

export default Modal;
