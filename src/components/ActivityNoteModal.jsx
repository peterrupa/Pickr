import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const Materialize = window.Materialize;
import { deleteActivity } from '../actions/classroomActions.js';
import {Modal} from 'react-materialize';

class ActivityNoteModal extends React.Component {
    render() {
        let noteList = [];
        let color = 'red';
        
        if(this.props.activity.notes.length == 0){
            color = 'black';
            noteList.push(<p> No Notes! </p>);
        }else{
            this.props.activity.notes.forEach((note) => {
                noteList.push(<li key={note}> {note} </li> );
            });
        }

        return (
          <Modal trigger={<i style={{color: color}} className="small mdi-action-speaker-notes right"></i>} header="Notes">
            <div>
                {noteList}
            </div>  	
          </Modal>
        );
    }
}

ActivityNoteModal.propTypes = {
    activity: PropTypes.object.isRequired
};

export default ActivityNoteModal;
