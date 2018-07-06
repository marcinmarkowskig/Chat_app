import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Tasks = new Mongo.Collection('tasks');
if (Meteor.isServer) {
  Meteor.publish('tasks', function() {
    return Tasks.find({})
  })
}
export const Rooms = new Mongo.Collection('rooms');
if (Meteor.isServer) {
  Meteor.publish('rooms', function() {
    return Rooms.find({})
  })
}
