// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { fetchAvailableVolunteers } from '../actions/controlpanelActions';

// Be sure to rename your class name
class ControlPanel extends React.Component {

    componentWillMount() {
        this.props.fetchAvailableVolunteers('cmsc128');
    }

    get() {
        //{JSON.stringify(this.props.availableStudentsState.availableVolunteers)}
        let selectedVolunteer = this.props.availableStudentsState.availableVolunteers[Math.floor(Math.random() * this.props.availableStudentsState.availableVolunteers.length)];
        alert(selectedVolunteer.studentLName + ", " + selectedVolunteer.studentFName);
        console.log(selectedVolunteer);
        fetch('/api/volunteer/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                activityID: 'sampleactivity1',
                studentID: selectedVolunteer.studentId,
                classCode: selectedVolunteer.ClassClassCode,
                note: ''
            })
        }).then((res) => {
            console.log(res);
        });
        return (
        <div> {selectedVolunteer.studentLName},  {selectedVolunteer.studentFName} </div>
        );
    }


    render() {
        const { availableStudentsState } = this.props;

        return (
            <div>
            <h1>Control Panel</h1>
            <button onClick={() => this.get()}>Select Volunteer</button>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    availableStudentsState: PropTypes.object.isRequired,
    fetchAvailableVolunteers: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ availableStudentsState: state.availableStudentsState }),
    { fetchAvailableVolunteers }
)(ControlPanel);