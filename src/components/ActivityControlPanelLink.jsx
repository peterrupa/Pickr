import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ActivityControlPanelLink extends React.Component {
    redirect(e){
        let activityID = this.props.activityID;
        fetch('/api/account/class/setAID', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:activityID})
        })
        .catch((err) => {
            throw err;
        });
    }

    render() {
        return (
                <Link to="/controlPanel" onClick={(e) => this.redirect(e)}>
                    <i className="small mdi-action-settings"></i>
                </Link>

        );
    }
}

ActivityControlPanelLink.propTypes = {
    activityID: PropTypes.number.isRequired
};

export default ActivityControlPanelLink;