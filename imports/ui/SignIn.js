import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import App from './App'

// App component - represents the whole app
class SignIn extends Component {
  constructor(props) {
      super(props);
      this.state = {nick: '', password: '', nickSignIn: '', passwordSignIn: ''};

      this.handleChangeNick = this.handleChangeNick.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
      this.handleChangeNickSignIn = this.handleChangeNickSignIn.bind(this);
      this.handleChangePasswordSignIn = this.handleChangePasswordSignIn.bind(this);
      this.handleSubmitLoginSignIn = this.handleSubmitLoginSignIn.bind(this);
    }

    handleChangeNick(event) {
      this.setState({nick: event.target.value});
    }

    handleChangePassword(event) {
      this.setState({password: event.target.value});
    }

    handleChangeNickSignIn(event) {
      this.setState({nickSignIn: event.target.value});
    }

    handleChangePasswordSignIn(event) {
      this.setState({passwordSignIn: event.target.value});
    }

    handleSubmitLogin(event) {
      event.preventDefault();

      Accounts.createUser({username: this.state.nick, password: this.state.password})
    }

    handleSubmitLoginSignIn(event) {
      event.preventDefault();

      Meteor.loginWithPassword(this.state.nickSignIn, this.state.passwordSignIn,

      this.props.history.push('/account')
    );
    }

  render() {
    return (
      <div className="container">
          <h1>Sign up</h1>
          <form onSubmit={this.handleSubmitLogin}>
            <label>
              Nick:
              <input type="text" value={this.state.nick} onChange={this.handleChangeNick} />
            </label>
            <label>
              Password:
              <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <br></br>
          <h1>Sign In</h1>
          <form onSubmit={this.handleSubmitLoginSignIn}>
            <label>
              Nick:
              <input type="text" value={this.state.nickSignIn} onChange={this.handleChangeNickSignIn} />
            </label>
            <label>
              Password:
              <input type="text" value={this.state.passwordSignIn} onChange={this.handleChangePasswordSignIn} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
    );
  }
}

export default withTracker(() => {
  return {
    logins: Meteor.users.find({}, { sort: { createdAt: -1 } }).fetch(),
    loginsSignIn: Meteor.users.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(SignIn);
