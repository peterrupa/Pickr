import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class Tooltips extends React.Component {

    componentDidMount(){
        $('.tooltipped').tooltip({});
    }

    render() {
        return (
          <Link to={this.props.content.url}>
              <i className={this.props.content.classes + " tooltipped"} data-position="bottom" data-delay="100" data-tooltip={this.props.content.text}></i>
          </Link>
        );
    }
}

Tooltips.propTypes = {
    content: PropTypes.object.isRequired
};

export default Tooltips;
