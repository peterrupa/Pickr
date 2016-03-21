// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

// Be sure to rename your class name
class ControlPanel extends React.Component {
    render() {
        return (
            <div>
            <h1>Control Panel</h1>
            <button>Select "Volunteer"</button>
            </div>
        );
    }
}

// connect to redux store
export default ControlPanel;
