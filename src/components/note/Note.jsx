import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import styles from './note.module.scss';
import buttonStyles from '../../styles/buttons.module.scss';
import Pencil from '../icons/Pencil';
import Bin from '../icons/Bin';

class Note extends Component {
  static propTypes = {
    note: PropTypes.shape({
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
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    note: {
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
    onEdit: () => {},
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
    this.setState({
      isVisibleDeleteDialog: false,
    });
  }

  showCheckmark = () => {
    this.setState({
      isVisibleCheckmark: true,
    });
  }

  hideCheckmark = () => {
    this.setState({
      isVisibleCheckmark: false,
    });
  }

  render() {
    const { note, onEdit, onDelete } = this.props;
    const {
      isChecked,
      isVisibleDeleteDialog,
      isVisibleCheckmark,
    } = this.state;

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
          <div className={styles.date}>
            {note.deadline}
          </div>
          <button className={styles.btn_pencil} onClick={onEdit}>
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
                onClick={onDelete}
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
