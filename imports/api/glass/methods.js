import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Glass } from './glass.js';
import { Click } from '../click/click.js';


export const insert = new ValidatedMethod({
  name: 'glass.insert',
  validate: new SimpleSchema({
    code: { type: String },
    long: { type: Number, decimal: true },
    lat: { type: Number, decimal: true },
    number: { type: Number },
    label: { type: String },
  }).validator(),
  run({ code, long, lat, label, number }) {
    const newGlass = {
      code,
      long,
      lat,
      label,
      number,
      email: '',
      active: true,
      award_big: false,
      award_granted: false,
      publish: true,
    };

    Glass.insert(newGlass);
  },
});

export const submit = new ValidatedMethod({
  name: 'glass.submit',
  validate: new SimpleSchema({
    code: { type: String },
    email: { type: String },
  }).validator(),
  run({ code, email }) {
    Click.insert({
      date: new Date(),
      email,
      code,
    });
    console.log(code);
    console.log(email);
    const glass = Glass.findOne({ code });
    console.log(glass);
    if (!!glass) {
      if (!glass.email || glass.email.length < 1) {
        Glass.update({ code }, { $set: { email, active: false } });
        if (glass.award_big) {
          return {
            error: false,
            message: 'Gratulerer!!! Du har vunnet en av hovedpremiene. Kom til Abakuskontoret mellom 14:00 og 16:00 for å motta premien, hvis du ikke har mulighet send en mail til koskom@abakus.no',
          };
        }
        return {
          error: false,
          message: 'Gratulerer med å ha funnet et glass! I tillegg til glasset venter en kul, liten premie deg på kontoret til Abakus, kom en tur mellom 14:00 og 16:00 for å motta premien. Spørsmål kan sendes til koskom@abakus.no',
        };
      }
      return {
        error: true,
        message: 'Denne koden er allerede registrert',
      };
    }
    return {
      error: true,
      message: 'Koden var ikke gyldig, hvis du mener den er riktig send en mail på koskom@abakus.no',
    };
  },
});

const PEOPLE_METHODS = _.pluck([
  insert,
  submit,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PEOPLE_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
