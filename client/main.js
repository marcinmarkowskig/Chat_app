import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../imports/ui/App.js';
import SignIn from '../imports/ui/SignIn.js';

Meteor.startup(() => {
  render(
     <BrowserRouter>
        <div>
          <Switch>
            <Route path="/account" component={App} />
            <Route path="/" component={SignIn}/>
          </Switch>
        </div>
      </BrowserRouter>, document.getElementById('render-target'));
});
