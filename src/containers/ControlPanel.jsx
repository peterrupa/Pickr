// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { getVolunteer, fetchAvailableVolunteers } from '../actions/controlpanelActions';

// Be sure to rename your class name
class ControlPanel extends React.Component {

    componentWillMount() {
        this.props.fetchAvailableVolunteers('cmsc128');
    }

    get() {
      {JSON.stringify(this.props.availableStudentsState.availableVolunteers)}
      var selectedVolunteer = this.props.availableStudentsState.availableVolunteers[Math.floor(Math.random() * this.props.availableStudentsState.availableVolunteers.length)];
        alert(JSON.stringify(selectedVolunteer));
        return (
          <div> (JSON.stringify(selectedVolunteer) </div>
        );
    }


    render() {
        const { availableStudentsState, getVolunteer } = this.props;

        return (
            <div>
            <h1>Control Panel</h1>
            <button onClick={() => this.get().bind(this)}>Select "Volunteer"</button>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    availableStudentsState: PropTypes.object.isRequired,
    getVolunteer: PropTypes.func.isRequired,
    fetchAvailableVolunteers: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ availableStudentsState: state.availableStudentsState }),
    { getVolunteer, fetchAvailableVolunteers }
)(ControlPanel);