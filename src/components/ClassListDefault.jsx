import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ClassListDefaultItem from './ClassListDefaultItem.jsx';

class ClassListDefault extends React.Component {
    render() {        
        return (
            <div id="classCards" style={{/*{position: 'relative', top: '-400px',*/ color: 'black'}}>
                <Link className="waves-effect waves-light btn-floating btn-large modal-trigger" to="#addclass" style={{position: 'fixed', bottom:'20px',right:'20px' }}><i className="material-icons">add</i></Link>
                <div className="row">
                    <ul>
                        {this.props.classes.map((classItem) => (
                            <li key={classItem.classCode}>
                                <div className="col s12 m6 l3">
                                    <ClassListDefaultItem
                                        classItem={classItem}
                                    />
                                </div>
                            </li>
                            
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

ClassListDefault.propTypes = {
    classes: PropTypes.array.isRequired
};

export default ClassListDefault;