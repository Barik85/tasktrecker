import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './note.module.scss';
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
      completed: PropTypes.bool.isRequired,
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
        updatedAt: ''
      },
    },
    onEdit: () => {},
    onDelete: () => {},
  }

  state = {
    isChecked: false
  }

  handleCeck = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }))
  }

  render() {
    const {note, onDelete, onEdit} = this.props;
    const {isChecked} = this.state;

    return (
      <div className={styles.note_wrapper}>
        <div className={styles.row}>
          <button className={styles.checkbox} onClick={this.handleCeck}>
            <input type="checkbox" name="completed" checked={isChecked} />
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
          <button onClick={onDelete}>
            <Bin className={styles.bin} />
          </button>
        </div>
        <div className={styles.corner} style={{backgroundColor: `${note.color}`}}/>
      </div>
    )
  }
}

// Note.propTypes = {
//   note: PropTypes.shape({
//     userId: PropTypes.string,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     color: PropTypes.string,
//     deadline: PropTypes.string,
//     completed: PropTypes.bool.isRequired,
//     reminder: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     timestamps: PropTypes.shape({
//       createdAt: PropTypes.string,
//       updatedAt: PropTypes.string,
//     }),
//   }),
//   onEdit: PropTypes.func,
//   onDelete: PropTypes.func,
// };

// Note.defaultProps = {
//   note: {
//     userId: '',
//     title: '',
//     description: '',
//     color: '#fff',
//     deadline: '',
//     reminder: '',
//     timestamps: {
//       createdAt: '',
//       updatedAt: ''
//     },
//   },
//   onEdit: () => {},
//   onDelete: () => {},
// };

export default Note;
