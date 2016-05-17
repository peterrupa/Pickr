import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const Materialize = window.Materialize;
import { deleteStudent } from '../actions/classroomActions.js';
import {Modal} from 'react-materialize';

class StudentDeleteModal extends React.Component {
    delete(e) {
        e.preventDefault();
        if(!window.confirm("Are you sure?")) return;	
        this.props.deleteStudent(this.props.student).then((res) => {
            Materialize.toast('Successfully deleted student.', 4000, 'toast-success');
        })
        .catch((err) => {
            Materialize.toast('Error deleting student.', 4000, 'toast-error');
        });
    }

    render() {
        return (
          <div>
            <a href="#" onClick={(e) => this.delete(e)}>
                <i className="material-icons right grey-text">delete</i>
            </a>
          </div>
        );
    }
}

StudentDeleteModal.propTypes = {
    student: PropTypes.object.isRequired,
    deleteStudent: PropTypes.func.isRequired
};
export default connect(
state => ({ classroomAppState: state.classroomAppState }),
    { deleteStudent }
)(StudentDeleteModal);
