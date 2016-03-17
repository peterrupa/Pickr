// This is an example page. Use this as your guideline when you make your own page.

// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

// Be sure to rename your class name
class TestPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello!</h1>
                <h2>hello</h2>
            </div>
        );
    }
}

// connect to redux store
export default TestPage;
