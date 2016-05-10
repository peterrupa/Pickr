import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ClassEditModal from './ClassEditModal.jsx';
import ClassDeleteModal from './ClassDeleteModal.jsx';

class ClassListDefaultItem extends React.Component {
    render() {
        return (
            <div>
              <Link to={'/classroom/' + this.props.classItem.id}>
                <div className="card-panel cyan class-card"
                    style={{
                        minHeight: '170px',
                        padding: '0px',
                        borderRadius: '2px'
                    }}>
                    <div style={{
                        height:'100px',
                        backgroundImage: 'url(' + '/img/bg.jpg' + ')'
                    }}></div>
                    <div className="row">
                        <div className="col s9 text-white"
                            style={{
                                height:'60px',
                                paddingLeft: '10px'
                            }}>
                            <span style={{fontSize: '195\%'}}>
                                {this.props.classItem.classCode}
                            </span>
                            <br/>
                            <small>
                                {this.props.classItem.className}
                            </small>
                        </div>
                        <div className="col s3"
                            style={{
                                paddingTop: '10px',
                                paddingLeft: '10px'
                            }}>
                            <ClassEditModal id={this.props.classItem.id+"edit"} classData={this.props.classItem}/>
                            <ClassDeleteModal id={this.props.classItem.id+"delete"}  classData={this.props.classItem}/>
                        </div>
                    </div>
                </div>
              </Link>
            </div>
        );
    }
}

ClassListDefaultItem.propTypes = {
    classItem: PropTypes.object.isRequired
};

export default ClassListDefaultItem;
