import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class GlassCollection extends Mongo.Collection {
  insert(person, callback) {
    return super.insert(person, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }

}

export const Glass = new GlassCollection('glass');

Glass.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Glass.schema = new SimpleSchema({
  code: { type: String },
  active: { type: Boolean },
  email: { type: String, optional: true },
  long: { type: Number, decimal: true },
  lat: { type: Number, decimal: true },
  number: { type: Number },
  label: { type: String },
  award_big: { type: Boolean },
  award_granted: { type: Boolean },
  publish: { type: Boolean },
});

Glass.attachSchema(Glass.schema);

Glass.publicFields = {
  active: 1,
  long: 1,
  lat: 1,
  number: 1,
  label: 1,
  publish: 1,
};

/*
Glass.helpers({
});
*/
