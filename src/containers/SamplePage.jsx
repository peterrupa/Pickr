// This is an example page. Use this as your guideline when you make your own page.

// Import dependencies
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

// Import actions associated to this page
import { sampleIncrease, sampleDecrease } from '../actions/sampleActions';

// Be sure to rename your class name
class SamplePage extends React.Component {
    // the componentDidMount function will be performed after the component has been rendered.
    // useful for Materialize or DOM-related functions
    componentDidMount() {
    }
    // the render function describes the view of the page. it should return a JSX.
    render() {
        const { sampleAppState, sampleIncrease, sampleDecrease } = this.props;
        
        let pages = [];
        
        for(let i = 0; i < sampleAppState.sampleCounter; i++) {
            pages.push(
                <p key={i}>{i + 1}</p>
            );
        }
        
        let students = [
            {
                name: 'Peter'
            },
            {
                name: 'Bernard'
            },
            {
                name: 'Rupa'
            }
        ];

        return (
            <div>
                <h1>The Simple Counter Page</h1>
                <p>You can see, increment, and decrement the sample value in the redux store.</p>
                <p>Value: {sampleAppState.sampleCounter}</p>
                <button onClick={() => sampleIncrease(1)}>Increase</button>
                <button onClick={() => sampleDecrease(1)}>Decrease</button>
                {pages}
                {students.map((student) => {
                    return (
                        <p>{student.name}</p>
                    );
                })}
            </div>
        );
    }
}

// this is where you will set required props
SamplePage.propTypes = {
    sampleAppState: PropTypes.object.isRequired,
    sampleIncrease: PropTypes.func.isRequired,
    sampleDecrease: PropTypes.func.isRequired,
    sampleToggle: PropTypes.func.isRequired
};

// connect to redux store
export default connect(
    state => ({ sampleAppState: state.sampleAppState }),
    { sampleIncrease, sampleDecrease }
)(SamplePage);