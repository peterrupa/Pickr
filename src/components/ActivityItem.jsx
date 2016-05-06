import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ActivityControlPanelLink from '../components/ActivityControlPanelLink.jsx';
import ActivityDeleteModal from '../components/ActivityDeleteModal.jsx';

//import ClassListDefaultItem from './ClassListDefaultItem.jsx';

class ActivityItem extends React.Component {
    render() {
        return (
            <li key={this.props.activity.id} className="collection-item dismissable" style={{touchAction: 'pan-y'}}>
              <label htmlFor="task1" style={{textDecoration: 'none'}}>
                <Link to="/presentation">
                  {this.props.activity.activityName}
                </Link>
              </label>
              <div className="right">
                <ActivityDeleteModal activity={this.props.activity}/>
                <ActivityControlPanelLink activityID={this.props.activity.id}/>
                <Link to="/presentation">
                    <i className="mdi-image-color-lens"></i>
                </Link>
              </div>
            </li>
        );
    }
}

ActivityItem.propTypes = {
    activity: PropTypes.object.isRequired
};

export default ActivityItem;
