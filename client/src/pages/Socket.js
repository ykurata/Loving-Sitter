import React, { Component } from "react";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');


function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

class Socket extends Component {
    constructor(props) {
        super(props);
        subscribeToTimer((err, timestamp) => this.setState({ 
          timestamp 
        }));
    }

    state = {
        timestamp: 'no timestamp yet'
    };

    render() {
        return (
            <div className="App">
                <h1 className="App-intro">
                    This is the timer value: {this.state.timestamp}
                </h1>
            </div>
        );
    }
};


export default Socket;