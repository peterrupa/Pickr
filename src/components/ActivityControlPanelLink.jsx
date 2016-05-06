import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//import ClassListDefaultItem from './ClassListDefaultItem.jsx';

class ActivityControlPanelLink extends React.Component {
    redirect(e){
        e.preventDefault();

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
        .then((res) =>  {
            if (res.status === 200) {
                window.location.href = '/controlPanel';
            }
            else {
                window.location.href = '/*';
            }
        })
        .catch((err) => {
            throw err;
        });
    }

    render() {
        return (
                <Link to="#" onClick={(e) => this.redirect(e)}>
                    <i className="mdi-action-settings"></i>
                </Link>
        );
    }
}

ActivityControlPanelLink.propTypes = {
    activityID: PropTypes.number.isRequired
};

export default ActivityControlPanelLink;
