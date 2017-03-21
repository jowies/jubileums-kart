import { Meteor } from 'meteor/meteor';
import { Glass } from '../glass.js';

Meteor.publish('glass.public', () => {
  return Glass.find({ publish: true }, { fields: Glass.publicFields });
});
