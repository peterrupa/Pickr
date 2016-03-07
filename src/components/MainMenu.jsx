import React from 'react';
import { Link } from 'react-router';

class MainMenu extends React.Component {
    render() {
        return (
            <ul>
                <li>Menu:</li>
                <li><Link to="/">Root</Link></li>
                <li><Link to="/sample">Sample App</Link></li>
            </ul>
        );
    }
}

export default MainMenu;
