// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, { PropTypes } from 'react';

import MainMenu from '../components/MainMenu.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <MainMenu />
                {this.props.children}
            </div>
        );
    }

}

App.propTypes = {
    children: PropTypes.node
};

export default App;
