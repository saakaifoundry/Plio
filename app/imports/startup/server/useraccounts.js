import { Roles } from 'meteor/alanning:roles';

import OrganizationService from '/imports/api/organizations/organization-service.js';
import { OrgOwnerRoles } from '/imports/api/constants.js';


function postSignUpHook(userId, info) {
  const organizationName = info.profile.organizationName || 'My Organization';

  let orgId;
  try {
    orgId = OrganizationService.insert({
      name: organizationName,
      ownerId: userId
    });
  } catch(err) {
    Meteor.users.remove({ _id: userId });
    throw err;
  }

  Roles.addUsersToRoles(userId, OrgOwnerRoles, orgId);
}

AccountsTemplates.configure({
  postSignUpHook
});
