import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ClassEditModal from './ClassEditModal.jsx';
import ClassDeleteModal from './ClassDeleteModal.jsx';
import ClassNoteModal from './ClassNoteModal.jsx';

class ClassListDefaultItem extends React.Component {
    render() {
        return (
            <div className="card-panel cyan darken-3 class-card">
              <Link to={'/classroom/' + this.props.classItem.id}>
                <div style={{
                    minHeight: '200px'
                }}>
                      <div>
                          <h5>
                              {this.props.classItem.classCode}
                          </h5>
                          <h6>
                              {this.props.classItem.className}
                          </h6>
                      </div>
                </div>
              </Link>
              <ClassNoteModal id={this.props.classItem.id+"notes"} classData={this.props.classItem}/>
              <ClassEditModal id={this.props.classItem.id+"edit"} classData={this.props.classItem}/>
              <ClassDeleteModal id={this.props.classItem.id+"delete"}  classData={this.props.classItem}/>
            </div>
        );
    }
}

ClassListDefaultItem.propTypes = {
    classItem: PropTypes.object.isRequired
};

export default ClassListDefaultItem;
