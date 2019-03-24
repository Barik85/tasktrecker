/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import styles from './note.module.scss';
import buttonStyles from '../../styles/buttons.module.scss';
import Pencil from '../icons/Pencil';
import Bin from '../icons/Bin';
import getFormatDate from '../../utils/formatDate';


class Note extends Component {
  static propTypes = {
    note: PropTypes.shape({
      _id: PropTypes.string,
      userId: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      color: PropTypes.string,
      deadline: PropTypes.string,
      completed: PropTypes.bool,
      reminder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      timestamps: PropTypes.shape({
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      }),
    }),
    setTaskToEdit: PropTypes.func,
    onDelete: PropTypes.func,
    openModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    note: {
      _id: '',
      userId: '',
      title: '',
      description: '',
      color: '',
      deadline: '',
      reminder: '',
      timestamps: {
        createdAt: '',
        updatedAt: '',
      },
      completed: false,
    },
    setTaskToEdit: () => {},
    onDelete: () => {},
  }

  state = {
    isChecked: false,
    isVisibleDeleteDialog: false,
    isVisibleCheckmark: false,
  }

  handleCeck = () => {
    this.showCheckmark();
    setTimeout(this.hideCheckmark, 500);
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }));
  }

  showDeleteDialog = () => {
    this.setState({
      isVisibleDeleteDialog: true,
    });
  }

  hideDeleteDialog = () => {
    console.log(1);
    this.setState({
      isVisibleDeleteDialog: false,
    });
  }

  showCheckmark = () => {
    this.setState({
      isVisibleCheckmark: true,
    });
  }

  deleteTask = () => {
    console.log(this.props.note._id);
    console.log(this.props.onDelete);
    const {_id} = this.props.note;
    const funDel = this.props.onDelete;
    funDel(_id);
    this.setState({
      isVisibleDeleteDialog: false,
    });
  }

  hideCheckmark = () => {
    this.setState({
      isVisibleCheckmark: false,
    });
  }

  handleEditStart = () => {
    const { note, setTaskToEdit, openModal } = this.props;
    setTaskToEdit(note);
    openModal('TASK_EDITOR_MODAL');
  }

  render() {
    const { note, onDelete } = this.props;
    const {
      isChecked,
      isVisibleDeleteDialog,
      isVisibleCheckmark,
    } = this.state;
    const date = note
      && note.deadline
      && getFormatDate(note.deadline);

    return (
      <div className={styles.note_wrapper}>
        <div className={styles.row}>
          <button className={styles.checkbox} onClick={this.handleCeck}>
            <input
              type="checkbox"
              name="completed"
              checked={isChecked}
              onChange={this.handleCeck}
            />
            <span className={styles.checkmark} />
          </button >
          <div>
            <h5 className={styles.note_title}>
              {note.title}
            </h5>
            <div className={styles.note_description}>
              {note.description}
            </div>
          </div>
        </div>
        <div className={styles.buttons_row}>
          {date ? (
            <div className={styles.date}>
              {date}
            </div>
          ) : null}
          <button className={styles.btn_pencil} onClick={this.handleEditStart}>
            <Pencil className={styles.pencil} />
          </button>
          <button onClick={this.showDeleteDialog}>
            <Bin className={styles.bin} />
          </button>
        </div>
        {isVisibleDeleteDialog && (
          <div className={styles.overlay}>
            <div>
              <button
                className={classNames(buttonStyles.btn, buttonStyles.btn_upper)}
                onClick={this.deleteTask}
              >
                Удалить
              </button>
            </div>
            <div>
              <button
                className={classNames(buttonStyles.btn, buttonStyles.btn_upper)}
                onClick={this.hideDeleteDialog}
              >
                Отмена
              </button>
            </div>
          </div>
        )}
        {isVisibleCheckmark && (
          <div className={styles.overlay}>
            <div className={styles.checkmark_box} />
          </div>
        )}
        <div className={styles.corner} style={{ backgroundColor: `${note.color}` }} />
      </div>
    );
  }
}

export default Note;
