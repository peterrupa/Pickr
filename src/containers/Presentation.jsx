// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { fetchInitialSample } from '../actions/presentationActions.js';

// Be sure to rename your class name
class Presentation extends React.Component {
    
    componentWillMount() {
        // fetch data from server
        this.props.fetchInitialSample();
    }    
    
    render() {     
        const { presentationState, fetchInitialSample } = this.props;

        return (
            <div>
                <h1>Presentation</h1>
                <p>{presentationState.volunteer.studentLName}, {presentationState.volunteer.studentFName}</p>
            </div>
        );
    }
}

Presentation.propTypes = {
    presentationState: PropTypes.object.isRequired,
    fetchInitialSample: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ presentationState: state.presentationState }),
    { fetchInitialSample }
)(Presentation);
