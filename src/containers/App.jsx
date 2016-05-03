// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import NavBar from '../components/NavBar.jsx';
import { getAccountId } from '../actions/sessionActions';

class App extends React.Component {
    componentWillMount() {
        this.props.getAccountId(); //Gets the current key and sets it into the state.
    }

    render() {
        return (
            <div>
                <NavBar />
                {this.props.children}
            </div>
        );
    }

}

App.propTypes = {
    children: PropTypes.node,
    sessionAppState: PropTypes.object.isRequired,
    getAccountId: PropTypes.func.isRequired
};

export default connect(state => ({
    sessionAppState: state.sessionAppState
}), { getAccountId })(App);
