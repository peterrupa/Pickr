import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class Tag extends React.Component {
    render() {
        const style = {
            'fontSize': '0.9em',
            'height': '20px',
            'lineHeight': '20px'
        };
        
        return (
            <div className="chip purple white-text" style={style}>{this.props.name}</div>
        );
    }
}

Tag.propTypes = {
    name: PropTypes.string.isRequired
};

export default Tag;