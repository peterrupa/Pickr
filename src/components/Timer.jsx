import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
    secondsTimeSpanToHMS(m) {
            let h = Math.floor(m/60); 
            m -= h*60;
            return (h < 10 ? '0'+h : h)+":"+(m < 10 ? '0'+m : m); //zero padding on hours and minutes
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
                    <span style={nameStyle}>Jane Doe</span>
                    <img src="/img/defaultPP.png" alt="Jane Doe"/> {this.secondsTimeSpanToHMS(100)}                                                 
                    <i className="material-icons">close</i>
                </div>
            </div>
        );
    }
}

export default Timer;