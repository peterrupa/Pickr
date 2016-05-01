import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const Materialize = window.Materialize;
import { deleteActivity } from '../actions/classroomActions.js';
import {Modal} from 'react-materialize';

class ClassNoteModal extends React.Component {
    render() {
        let noteList = [];

        if(this.props.classData.notes.length == 0)
            noteList.push(<p> No Notes! </p>);
        else{
            this.props.classData.notes.forEach((note) => {
                noteList.push(<li key={note}> {note} </li> );
            });
        }

        return (
          <Modal trigger={<i className="right">speaker_notes</i>} header="Notes">
            <div>
                {noteList}
            </div>  	
          </Modal>
        );
    }
}

ClassNoteModal.propTypes = {
    classData: PropTypes.object.isRequired
};

export default ClassNoteModal;
