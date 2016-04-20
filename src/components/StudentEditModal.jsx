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
            ClassId: this.props.student.ClassId,
            image: $('#eimage'+this.props.student.id)[0].files[0]
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
                              <span>
                                <label>Last Name</label>
                              </span>
                              <br/>
                              <input id={"elastName"+this.props.student.id} type="text" className="validate" defaultValue={this.props.student.lname}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <span>
                                <label>First Name</label>
                              </span>
                              <br/>
                              <input id={"efirstName"+this.props.student.id} type="text" className="validate" defaultValue={this.props.student.fname}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <span>
                                <label>Middle Name</label>
                              </span>
                              <br/>
                              <input id={"emiddleName"+this.props.student.id} type="text" className="validate" defaultValue={this.props.student.mname}/>
                          </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <span>Image (Optional)</span>
                        </div>
                        <div className="file-field input-field col s12">
                            <div className="btn">
                                <span>File</span>
                                <input id={"eimage"+this.props.student.id} type="file"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
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
