import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const Materialize = window.Materialize;
import { deleteClass } from '../actions/classListActions.js';
import {Modal} from 'react-materialize';

class ClassDeleteModal extends React.Component {
    delete(e) {
        e.preventDefault();
        this.props.deleteClass(this.props.classData).then((res) => {
            Materialize.toast('Successfully deleted class.', 4000, 'toast-success');
        })
        .catch((err) => {
            Materialize.toast('Error deleting class.', 4000, 'toast-error');
        });
    }

    render() {
        return (
          <div>
            <i onClick={(e) => this.delete(e)} className="material-icons right red-text">delete</i>
          </div>

        );
    }
}

ClassDeleteModal.propTypes = {
    classData: PropTypes.object.isRequired,
    deleteClass: PropTypes.func.isRequired
};
export default connect(
state => ({ classroomAppState: state.classroomAppState }),
    { deleteClass }
)(ClassDeleteModal);
