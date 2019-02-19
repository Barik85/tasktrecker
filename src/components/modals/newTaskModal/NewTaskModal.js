import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import Modal from 'react-modal';
import Close from '../../icons/Close';
import ColorPicker from '../../colorPicker/ColorPicker';
import SimpleButton from '../../shared/SimpleButton';
import styles from './NewTaskModal.module.scss';
import './datetime.css';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '25px',
  },
};

const initialState = {
  displayColorPicker: false,
  title: '',
  description: '',
  deadline: '',
  notificationTime: '',
  color: 'Без цвета',
};

class NewTaskModal extends Component {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
  };

  state = {
    ...initialState,
  };

  colorPickerOpener = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      displayColorPicker: !prevState.displayColorPicker,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, deadline, notificationTime, color } = this.state;
    const newTask = {
      title,
      description,
      deadline,
      reminder: notificationTime,
      color,
    };
    const { createTask, closeModal } = this.props;

    createTask(newTask)
      .then(() => {
        closeModal();
      });
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleDateChange = (datemoment) => {
    this.setState({
      deadline: datemoment.format('DD/MM/YYYY'),
    });
  };

  handleTimeChange = (time) => {
    this.setState(prevState => ({
      task: {
        ...prevState.task,
        notificationTime: time.format('HH:mm  DD/MM/YYYY'),
      },
    }));
  };

  selectColor = (color) => {
    this.setState(prevState => ({
      displayColorPicker: !prevState.displayColorPicker,
      color,
    }));
  };

  render() {
    const { isModalOpen, closeModal } = this.props;
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className={styles.title}>Новая задача</h2>
        <button onClick={closeModal} className={styles.close}>
          <Close className={styles.closesvg} />
        </button>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <textarea placeholder="Ввести название ..." className={styles.name} name="title" onChange={this.handleInputChange} />
          <textarea placeholder="Добавить комментарий ..." className={styles.name} name="description" onChange={this.handleInputChange} />
          <div className={styles.wrapper}>
            <p className={styles.label}>Выполнить до</p>
            <Datetime
              timeFormat={false}
              dateFormat="DD/MM/YYYY"
              defaultValue={new Date()}
              className={styles.datewrapper}
              inputProps={{ className: styles.dateinput }}
              onChange={this.handleDateChange}
            />
          </div>
          <div className={styles.wrapper}>
            <p className={styles.label}>Установить напоминание</p>
            <Datetime
              timeFormat="HH:mm"
              dateFormat="DD/MM/YYYY"
              defaultValue={new Date()}
              className={styles.datewrapper}
              inputProps={{ className: styles.dateinput }}
              onChange={this.handleTimeChange}
            />
          </div>
          <div className={styles.wrapper}>
            <p className={styles.label}>Присвоить цвет</p>
            <div className={styles.colorwrap}>
              <button className={styles.buttonColor} onClick={this.colorPickerOpener}>
                {(this.state.color !== 'Без цвета') ?
                  <span
                    className={styles.buttonColorIcon}
                    style={{ background: this.state.color }}
                  /> :
                  <span className={styles.buttonColorIcon} />
                }
                {this.state.color}
              </button>
              {this.state.displayColorPicker ?
                <ColorPicker onSelectColor={this.selectColor} />
                : null}
            </div>
          </div>
          <SimpleButton text="Сохранить" className={styles.saveButton} />
        </form>
      </Modal>
    );
  }
}

export default NewTaskModal;
