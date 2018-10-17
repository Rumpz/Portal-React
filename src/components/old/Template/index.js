import React, {Component} from 'react';
import {Select} from '../Inputs/Inputs.js';
import {DefaultBtn, RemoveBtn, SubmitBtn} from '../Buttons/Buttons.js';
import {findOptions, newTemplate, updateTemplate, deleteTemplate} from './API.js';
import Modal from 'react-modal';

const SAVEBTNCONFIG = {
  size: 2,
  tooltip: 'Salvar',
  style: {color: 'grey'},
  icon: 'fa-floppy-o',
  name: 'save'
};

let modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  content: {
    position: 'absolute',
    top: 'auto',
    left: 'auto',
    bottom: 'auto',
    right: 'auto',
    width: '250px',
    marginLeft: 'calc(50% - 125px)',
    marginTop: '20%',
    padding: '5px',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: '#1b1c29'

  }
};

export default class Templates extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectName: 'Templates',
      templatePage: props.templatePage,
      saveBtnVisibility: false,
      selectedTemplate: -1,
      className: props.className || '',
      options: '',
      saveIsActive: false,
      templateIsActive: true
    };
    this.actions = {
      onSelectChange: props.actions.onSelectChange,
      onSaveChanges: props.actions.onSaveChanges
    };
    this.options = [];
  }

  componentWillMount () {
    this.getOptions({page: this.state.templatePage});
  }

  componentWillReceiveProps (props) {
    this.setState({saveIsActive: props.saveIsActive});/*, templateIsActive: props.templateIsActive */
  }

  getOptions (data) {
    findOptions(data)
      .then(res => {
        let options = res.data.map(e => {
          return {
            name: e.name,
            value: JSON.stringify(e)
          };
        });
        this.setState({options: options});
      })
      .catch(() => this.setState({options: []}));
  }

  saveTemplate () {
    let {selectedTemplate, templatePage} = this.state;
    let id = JSON.parse(selectedTemplate).id;
    this.actions.onSaveChanges((err, data) => {
      if (err) console.log(err);
      data.page = templatePage;
      data.id = id;
      let promisse = data.insert
      ? newTemplate(data)
      : updateTemplate(data);
      promisse
        .then(res => this.getOptions({page: this.state.templatePage}))
        .catch(err => alert(err));
    });
  }

  onTemplateSelect (e) {
    let value = e.target.value;
    this.setState({selectedTemplate: value}, this.actions.onSelectChange(value));
  }

  onTemplateDelete () {
    let {selectedTemplate} = this.state;
    let id = JSON.parse(selectedTemplate).id;
    if (!id) return;
    deleteTemplate(id)
      .then(res => {
        this.closeModal();
        this.getOptions({page: this.state.templatePage});
      });
  }

  openModal () {
    let {selectedTemplate} = this.state;
    let id = JSON.parse(selectedTemplate).id;
    if (!id) return;
    this.setState({modalIsOpen: true});
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }

  render () {
    let {selectedTemplate, className, options, saveIsActive, templateIsActive} = this.state;

    return (
      <div className={className} >
        <ul className='flex-list'>
          {templateIsActive
            ? (<li>
              <Select
                label='Templates'
                placeholder='Novo'
                options={options}
                value={selectedTemplate}
                action={this.onTemplateSelect.bind(this)}
              />
            </li>)
            : null}
          {
            saveIsActive
            ? (<li>
              <br />
              <DefaultBtn
                size={SAVEBTNCONFIG.size}
                tooltip={SAVEBTNCONFIG.tooltip}
                style={SAVEBTNCONFIG.style}
                icon={SAVEBTNCONFIG.icon}
                name={SAVEBTNCONFIG.name}
                action={this.saveTemplate.bind(this)}
              />
            </li>)
            : null
          }
          <li><br /><RemoveBtn action={this.openModal.bind(this)} /></li>
        </ul>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          contentLabel='Example Modal'
          style={modalStyle}
        >
          <label className='text-center'>Tens a certeza que queres apagar o item?</label>
          <ul className='flex-list'>
            <li><RemoveBtn action={this.closeModal.bind(this)} tooltip='Não' /></li>
            <li><SubmitBtn action={this.onTemplateDelete.bind(this)} tooltip='Sim' /></li>
          </ul>
        </Modal>
      </div>
    );
  }
}
