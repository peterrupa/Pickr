import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const Materialize = window.Materialize;
import { editStudent } from '../actions/classroomActions.js';
import {Modal} from 'react-materialize';

class StudentEditModal extends React.Component {
    edit(e) {
        e.preventDefault();
        let newStudent = {
            id: this.props.student.id,
            fname: $('#efirstName'+this.props.student.id).val(),
            lname: $('#elastName'+this.props.student.id).val(),
            mname: $('#emiddleName'+this.props.student.id).val(),
            ClassId: this.props.student.ClassId
        };
        this.props.editStudent(newStudent).then((res) => {
            Materialize.toast('Successfully edited student.', 4000, 'toast-success');
        })
        .catch((err) => {
            Materialize.toast('Error editing student.', 4000, 'toast-error');
        });
    }

    render() {
        return (
          <Modal trigger={<i className="material-icons right">mode_edit</i>} header="Edit Student">
                <form onSubmit={(e) => this.edit(e)}>
                    <div className="modal-content">
                      <div className="row">
                          <div className="input-field col s12">
                              <input id={"elastName"+this.props.student.id} type="text" className="validate" defaultValue={this.props.student.lname}/>
                              <label htmlFor="lastName">Last Name</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <input id={"efirstName"+this.props.student.id} type="text" className="validate" defaultValue={this.props.student.fname}/>
                              <label htmlFor="firstName">First Name</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <input id={"emiddleName"+this.props.student.id} type="text" className="validate" defaultValue={this.props.student.mname}/>
                              <label htmlFor="middleName">Middle Name</label>
                          </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                        <Link to="#" className="waves-effect waves-red btn-flat modal-action modal-close">Cancel</Link>
                        <button type="submit" className="waves-effect waves-green btn-flat modal-action modal-close">Edit Student</button>
                    </div>
                </form>
          </Modal>
        );
    }
}

StudentEditModal.propTypes = {
    student: PropTypes.object.isRequired,
    editStudent: PropTypes.func.isRequired
};
export default connect(
state => ({ classroomAppState: state.classroomAppState }),
    { editStudent }
)(StudentEditModal);
