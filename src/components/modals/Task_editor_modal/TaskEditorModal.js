import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import Modal from 'react-modal';
import moment from 'moment';
import Close from '../../icons/Close';
import ColorPicker from '../../colorPicker/ColorPicker';
import SimpleButton from '../../shared/SimpleButton';
import styles from './TaskEditorModal.module.scss';
import './datetime.css';
import customStyles from '../modal_styles';

Modal.setAppElement('#root');

const initialState = {
  displayColorPicker: false,
  title: '',
  description: '',
  deadline: '',
  reminder: '',
  color: 'Без цвета',
  reminderShowed: false,
};

class TaskEditorModal extends Component {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    taskToEdit: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      deadline: PropTypes.string,
      reminder: PropTypes.string,
      color: PropTypes.string,
    }),
    resetTaskToEdit: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    taskToEdit: null,
  }

  state = {
    ...initialState,
  };

  componentDidMount() {
    const { taskToEdit } = this.props;
    if (taskToEdit) {
      this.setState(prevState => ({
        ...prevState,
        ...taskToEdit,
        deadline: moment(taskToEdit.deadline).format('DD.MM.YYYY'),
        reminder: taskToEdit.reminder
          ? moment(taskToEdit.reminder).format('DD.MM.YYYY hh:mm')
          : '',
      }));
    }
  }

  colorPickerOpener = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      displayColorPicker: !prevState.displayColorPicker,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      deadline,
      reminder,
      color,
      reminderShowed,
    } = this.state;

    const newTask = {
      title,
      description,
      deadline: deadline ? moment(deadline).toDate() : '',
      reminder: reminder ? moment(reminder).toDate() : '',
      color,
      reminderShowed,
    };
    const { createTask, taskToEdit, updateTask } = this.props;
    if (taskToEdit) {
      newTask.id = taskToEdit._id;
      updateTask(newTask)
        .finally(() => {
          this.handleCloseModal();
        });
    } else {
      createTask(newTask)
        .finally(() => {
          this.handleCloseModal();
        });
    }
  };

  handleCloseModal = () => {
    const { closeModal, resetTaskToEdit } = this.props;
    resetTaskToEdit();
    closeModal();
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleDateChange = (datemoment) => {
    this.setState({
      deadline: datemoment,
    });
  };

  handleTimeChange = (time) => {
    this.setState({
      reminder: time,
      reminderShowed: false,
    });
  };

  selectColor = (color) => {
    this.setState(prevState => ({
      displayColorPicker: !prevState.displayColorPicker,
      color,
    }));
  };

  validateDate = date => moment() < moment(date);

  render() {
    const { isModalOpen, taskToEdit } = this.props;
    const {
      displayColorPicker,
      title,
      description,
      deadline,
      reminder,
      color,
    } = this.state;

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className={styles.title}>
          {taskToEdit ? 'Редактировать задачу' : 'Новая задача'}
        </h2>
        <button onClick={this.handleCloseModal} className={styles.close}>
          <Close className={styles.closesvg} />
        </button>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Ввести название ..."
            className={styles.name}
            name="title"
            onChange={this.handleInputChange}
            value={title}
          />
          <textarea
            placeholder="Добавить комментарий ..."
            className={styles.name}
            name="description"
            onChange={this.handleInputChange}
            value={description}
          />
          <div className={styles.wrapper}>
            <p className={styles.label}>Выполнить до</p>
            <Datetime
              timeFormat={false}
              dateFormat="DD.MM.YYYY"
              className={styles.datewrapper}
              inputProps={{ className: styles.dateinput }}
              onChange={this.handleDateChange}
              value={deadline}
              isValidDate={this.validateDate}
              closeOnSelect
            />
          </div>
          <div className={styles.wrapper}>
            <p className={styles.label}>Установить напоминание</p>
            <Datetime
              timeFormat="hh:mm"
              dateFormat="DD.MM.YYYY"
              className={styles.datewrapper}
              inputProps={{ className: styles.dateinput }}
              value={reminder}
              onChange={this.handleTimeChange}
              isValidDate={this.validateDate}
            />
          </div>
          <div className={styles.wrapper}>
            <p className={styles.label}>Присвоить цвет</p>
            <div className={styles.colorwrap}>
              <button className={styles.buttonColor} onClick={this.colorPickerOpener}>
                {(color !== 'Без цвета') ?
                  <span
                    className={styles.buttonColorIcon}
                    style={{ background: this.state.color }}
                  /> :
                  <span className={styles.buttonColorIcon} />
                }
                {color}
              </button>
              {displayColorPicker ?
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

export default TaskEditorModal;
