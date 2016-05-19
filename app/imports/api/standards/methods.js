import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import StandardsService from './standards-service.js';
import { StandardsSchema, StandardsUpdateSchema } from './standards-schema.js';
import { Standards } from './standards.js';
import {
  IdSchema,
  OrganizationIdSchema,
  optionsSchema,
  StandardIdSchema,
  UserIdSchema
} from '../schemas.js';
import { UserRoles } from '../constants';
import { canChangeStandards } from '../checkers.js';


const ensureCanChangeStandards = (userId, organizationId) => {
  if (!canChangeStandards(userId, organizationId)) {
    throw new Meteor.Error(
      403,
      'You are not authorized for creating, removing or editing standards'
    );
  }
};

const getStandardOrThrow = (standardId) => {
  const standard = Standards.findOne({ _id: standardId });
  if (!standard) {
    throw new Meteor.Error(400, 'Standard does not exist');
  }
  return standard;
};

export const insert = new ValidatedMethod({
  name: 'Standards.insert',

  validate: StandardsSchema.validator(),

  run(...args) {
    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot create a standard'
      );
    }

    const [ doc ] = args;
    const { organizationId } = doc;

    ensureCanChangeStandards(userId, organizationId);

    return StandardsService.insert(...args);
  }
});

export const update = new ValidatedMethod({
  name: 'Standards.update',

  validate: new SimpleSchema([
    IdSchema, StandardsUpdateSchema, optionsSchema, OrganizationIdSchema
  ]).validator(),

  run({_id, options, ...args, organizationId }) {
    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot update a standard'
      );
    }

    ensureCanChangeStandards(userId, organizationId);

    getStandardOrThrow(_id);

    return StandardsService.update({ _id, options, ...args });
  }
});

export const remove = new ValidatedMethod({
  name: 'Standards.remove',

  validate: new SimpleSchema([
    IdSchema, OrganizationIdSchema
  ]).validator(),

  run({ _id, organizationId }) {
    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot delete a standard'
      );
    }

    ensureCanChangeStandards(userId, organizationId);

    getStandardOrThrow(_id);

    return StandardsService.remove({ _id });
  }
});

export const addToNotifyList = new ValidatedMethod({
  name: 'Standards.addToNotifyList',

  validate: new SimpleSchema([
    StandardIdSchema,
    UserIdSchema
  ]).validator(),

  run({ standardId, userId }) {
    const currUserId = this.userId;
    if (!currUserId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot add users to notify list'
      );
    }

    const { organizationId } = getStandardOrThrow(standardId);

    ensureCanChangeStandards(currUserId, organizationId);

    return StandardsService.addNotifyUser({ standardId, userId });
  }
});

export const removeFromNotifyList = new ValidatedMethod({
  name: 'Standards.removeFromNotifyList',

  validate: new SimpleSchema([
    StandardIdSchema,
    UserIdSchema
  ]).validator(),

  run({ standardId, userId }) {
    const currUserId = this.userId;
    if (!currUserId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot remove users from notify list'
      );
    }

    const { organizationId } = getStandardOrThrow(standardId);

    ensureCanChangeStandards(currUserId, organizationId);

    return StandardsService.removeNotifyUser({ standardId, userId });
  }
});
