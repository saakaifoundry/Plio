import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import StandardsService from './standards-service.js';
import { StandardsSchema, StandardsUpdateSchema } from './standards-schema.js';
import { Standards } from './standards.js';
import { checkUserId } from '../checkers.js';
import { IdSchema } from '../schemas.js';

const optionsSchema = new SimpleSchema({
  options: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

export const insert = new ValidatedMethod({
  name: 'Standards.insert',

  validate: StandardsSchema.validator(),

  run(...args) {
    checkUserId(
      this.userId,
      'Unauthorized user cannot create a standard'
    );

    return StandardsService.insert(...args);
  }
});

export const update = new ValidatedMethod({
  name: 'Standards.update',

  validate: new SimpleSchema([
    IdSchema, StandardsUpdateSchema, optionsSchema
  ]).validator(),

  run({_id, options, ...args}) {
    checkUserId(
      this.userId,
      'Unauthorized user cannot update a standard'
    );

    return StandardsService.update({ _id, options, ...args });
  }
});

export const remove = new ValidatedMethod({
  name: 'Standards.remove',

  validate: IdSchema.validator(),

  run({ _id }) {
    checkUserId(
      this.userId,
      'Unauthorized user cannot delete a standard'
    );

    return StandardsService.remove({ _id });
  }
});
