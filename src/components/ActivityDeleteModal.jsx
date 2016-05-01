import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const Materialize = window.Materialize;
import { deleteActivity } from '../actions/classroomActions.js';
import {Modal} from 'react-materialize';

class ActivityDeleteModal extends React.Component {
    delete(e) {
        e.preventDefault();
        this.props.deleteActivity(this.props.activity).then((res) => {
            Materialize.toast('Successfully deleted activity.', 4000, 'toast-success');
        })
        .catch((err) => {
            Materialize.toast('Error deleting activity.', 4000, 'toast-error');
        });
    }

    render() {
        return (
          <div>
            <i onClick={(e) => this.delete(e)} className="mdi-action-delete right"></i>
          </div>
        );
    }
}

ActivityDeleteModal.propTypes = {
    activity: PropTypes.object.isRequired,
    deleteActivity: PropTypes.func.isRequired
};
export default connect(
state => ({ classroomAppState: state.classroomAppState }),
    { deleteActivity }
)(ActivityDeleteModal);
