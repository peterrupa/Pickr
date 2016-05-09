import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ActivityControlPanelLink from '../components/ActivityControlPanelLink.jsx';
import ActivityDeleteModal from '../components/ActivityDeleteModal.jsx';

//import ClassListDefaultItem from './ClassListDefaultItem.jsx';

class ActivityItem extends React.Component {
    render() {
        return (
            <li key={this.props.activity.id} className="collection-item" style={{touchAction: 'pan-y'}}>
              <label htmlFor="task1" style={{textDecoration: 'none'}}>
                <Link to="/presentation" target="_blank">
                  {this.props.activity.activityName}
                </Link>
              </label>
              <div className="right">
                <ActivityControlPanelLink activityID={this.props.activity.id}/>
                <Link to="/presentation" style={{marginRight: '2em'}} target="_blank">
                  <i className="small mdi-image-color-lens"></i>
                </Link>
                <ActivityDeleteModal activity={this.props.activity}/>
              </div>
            </li>
        );
    }
}

ActivityItem.propTypes = {
    activity: PropTypes.object.isRequired
};

export default ActivityItem;
