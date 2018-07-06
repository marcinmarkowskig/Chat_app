import React, { Component } from 'react';

import { Rooms } from '../api/tasks.js';


export default class Room extends Component {
  render() {

    return (
      <li>

        <React.Fragment>
          {this.props.room.roomName}
        </React.Fragment>

        <span className="text">{this.props.room.text}</span>
      </li>
    );
  }
}
