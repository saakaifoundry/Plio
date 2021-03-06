import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import StandardsTypeService from './standards-type-service.js';
import { StandardsTypeSchema } from './standards-type-schema.js';
import { IdSchema, OrganizationIdSchema } from '../schemas.js';
import { UserRoles } from '../constants';


export const insert = new ValidatedMethod({
  name: 'StandardTypes.insert',

  validate: StandardsTypeSchema.validator(),

  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot create a standard type'
      );
    }

    const { organizationId } = doc;
    const canEditOrgSettings = Roles.userIsInRole(this.userId, UserRoles.CHANGE_ORG_SETTINGS, organizationId);

    if (!canEditOrgSettings) {
      throw new Meteor.Error(
        403,
        'User is not authorized for editing organization settings'
      );
    }

    return StandardsTypeService.insert(doc);
  }
});

export const update = new ValidatedMethod({
  name: 'StandardTypes.update',

  validate: new SimpleSchema([IdSchema, StandardsTypeSchema]).validator(),

  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot update a standard type'
      );
    }

    const { organizationId } = doc;
    const canEditOrgSettings = Roles.userIsInRole(this.userId, UserRoles.CHANGE_ORG_SETTINGS, organizationId);

    if (!canEditOrgSettings) {
      throw new Meteor.Error(
        403,
        'User is not authorized for editing organization settings'
      );
    }

    return StandardsTypeService.update(doc);
  }
});

export const remove = new ValidatedMethod({
  name: 'StandardTypes.remove',

  validate: new SimpleSchema([IdSchema, OrganizationIdSchema]).validator(),

  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot remove a standard type'
      );
    }

    const { organizationId } = doc;
    const canEditOrgSettings = Roles.userIsInRole(this.userId, UserRoles.CHANGE_ORG_SETTINGS, organizationId);

    if (!canEditOrgSettings) {
      throw new Meteor.Error(
        403,
        'User is not authorized for editing organization settings'
      );
    }

    return StandardsTypeService.remove(doc);
  }
});
