import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ClickCollection extends Mongo.Collection {
  insert(person, callback) {
    return super.insert(person, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }

}

export const Click = new ClickCollection('click');

Click.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Click.schema = new SimpleSchema({
  date: { type: Date },
  email: { type: String, optional: true },
  code: { type: String, optional: true },
});

Click.attachSchema(Click.schema);

Click.publicFields = {
  active: 1,
  long: 1,
  lat: 1,
  number: 1,
  label: 1,
  publish: 1,
};

/*
Click.helpers({
});
*/
