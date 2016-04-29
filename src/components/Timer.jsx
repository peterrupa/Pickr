import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { truncate } from '../businessLogic/stringHelper';

class Timer extends React.Component {
    secondsTimeSpanToHMS(m) {
        let h = Math.floor(m/60); 
        m -= h*60;
        return (h < 10 ? '0'+h : h)+":"+(m < 10 ? '0'+m : m); //zero padding on hours and minutes
    }
    
    close(e) {
        e.preventDefault();
        
        this.props.removeTimer(this.props.studentId);
    }

    render() {   
        const style = {
            'fontSize': '1.2em',
            'height': '30px',
            'lineHeight': '30px',
            'position':'relative'
        };
        const nameStyle = {
            'fontSize': '0.6em',
            'position':'absolute',
            'top':'-2em'
        };
        
        return (
            <div>
                <div className="chip" style={style}>
                    <span style={nameStyle}>{truncate(this.props.name, 15)}</span>
                    <img src={this.props.img}/> {this.secondsTimeSpanToHMS(this.props.timer)}
                    <a href="#" onClick={(e) => this.close(e)}>
                        <i className="mdi-content-clear"></i>
                    </a>
                </div>
            </div>
        );
    }
}

Timer.propTypes = {
    studentId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    timer: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    removeTimer: PropTypes.func.isRequired
};

export default Timer;