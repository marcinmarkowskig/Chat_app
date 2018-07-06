import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Metor from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Tasks } from '../api/tasks.js';
import { Rooms } from '../api/tasks.js';

import Task from './Task.js';
import Room from './Room.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {nick: '', message: '', roomName: ''};

      this.handleChangeNick = this.handleChangeNick.bind(this);
      this.handleChangeMessage = this.handleChangeMessage.bind(this);
      this.handleChangeRoom = this.handleChangeRoom.bind(this);
      this.handleSubmitRooms = this.handleSubmitRooms.bind(this);
      this.handleSubmitMessages = this.handleSubmitMessages.bind(this);
    }

    handleChangeNick(event) {
      this.setState({nick: event.target.value});
    }

    handleChangeMessage(event) {
      this.setState({message: event.target.value});
    }

    handleChangeRoom(event) {
      this.setState({roomName: event.target.value});
    }

    handleSubmitMessages(event) {
      event.preventDefault();
      Tasks.insert({
        nick: this.state.nick,
        message: this.state.message,
      });
    }

    handleSubmitRooms(event) {
      event.preventDefault();
      Rooms.insert({
        roomName: this.state.roomName,
      });
    }


  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  renderRooms() {
    return this.props.rooms.map((room) => (
      <Room key={room._id} room={room} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h2>Chat</h2>
        </header>
        <div>
          <form onSubmit={this.handleSubmitMessages}>
            <label>
              Nick:
              <input type="text" value={this.state.nick} onChange={this.handleChangeNick} />
            </label>
            <label>
              Message:
              <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        <ul>
          {this.renderTasks()}
        </ul>
        </div>

        <div>
        <form onSubmit={this.handleSubmitRooms}>
          <label>
            Name:
            <input type="text" value={this.state.roomName} onChange={this.handleChangeRoom} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {this.renderRooms()}
        </ul>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  console.log(Meteor.subscribe('tasks').ready())
  if (!Meteor.subscribe('tasks').ready() || !Meteor.subscribe('rooms').ready()){
    return {
      tasks: [],
      rooms: []
    }
  }


  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    rooms: Rooms.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
