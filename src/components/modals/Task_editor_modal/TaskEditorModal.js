import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import Modal from 'react-modal';
import Close from '../../icons/Close';
import ColorPicker from '../../colorPicker/ColorPicker';
import SimpleButton from '../../shared/SimpleButton';
import styles from './TaskEditorModal.module.scss';
import './datetime.css';
import getFormatDate from '../../../utils/formatDate';

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
  deadline: new Date(),
  notificationTime: '',
  color: 'Без цвета',
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
      notificationTime: PropTypes.string,
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
      notificationTime,
      color,
    } = this.state;

    const newTask = {
      title,
      description,
      deadline,
      reminder: notificationTime,
      color,
    };
    const { createTask, taskToEdit, updateTask } = this.props;
    if (taskToEdit) {
      newTask.id = taskToEdit._id // eslint-disable-line
      updateTask(newTask)
        .then(() => {
          this.handleCloseModal();
        });
    } else {
      createTask(newTask)
        .then(() => {
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
      deadline: datemoment.format('YYYY-MM-DD'),
    });
  };

  handleTimeChange = (time) => {
    this.setState({
      notificationTime: time.format('YYYY-MM-DDTHH:MM:SSZ'),
    });
  };

  selectColor = (color) => {
    this.setState(prevState => ({
      displayColorPicker: !prevState.displayColorPicker,
      color,
    }));
  };

  render() {
    const { isModalOpen, taskToEdit } = this.props;
    const {
      // displayColorPicker,
      title,
      description,
      deadline,
      // notificationTime,
      // color,
    } = this.state;

    const deadlineString = getFormatDate(deadline);

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className={styles.title}>Новая задача</h2>
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
              dateFormat="DD/MM/YYYY"
              defaultValue={new Date()}
              className={styles.datewrapper}
              inputProps={{ className: styles.dateinput }}
              onChange={this.handleDateChange}
              value={taskToEdit ? deadlineString : deadline}
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

export default TaskEditorModal;
