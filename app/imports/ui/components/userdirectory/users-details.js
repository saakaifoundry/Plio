import { Template } from 'meteor/templating';
import { UserRolesNames } from '../../../api/constants.js';

Template.UsersDetails.viewmodel({
  share: 'window',
  mixin: ['user', 'organization', 'modal', 'mobile'],
  phoneType(type) {
    return `${type} phone`;
  },
  isInvitationAccepted(user) {
    return !user.invitationId;
  },
  isEmailVerified(user) {
    const email = user.emails[0];
    return email.verified;
  },
  superpowersTitle(user) {
    if (this.organization()) {
      return `${this.userFullNameOrEmail(user)}'s superpowers for ${this.organization().name}`
    }
  },
  orgOwnerLabel() {
    const userId = this.user()._id;
    const organization = this.organization();

    if (userId && organization) {
      const orgName = organization.name;
      if (userId === organization.ownerId()) {
        return `Organization owner for organization "${orgName}"`;
      }
    }
  },
  superpowers(user) {
    if (this.organization()) {
      const orgId = this.organization()._id;
      const userRoles = user.roles[orgId] || [];

      const superpowers = Object.keys(UserRolesNames).map((key) => {
        return { key, value: UserRolesNames[key], flag: userRoles.indexOf(key) !== -1 };
      });

      return superpowers.sort((a, b) => {
        return b.flag - a.flag;
      });
    }
  },
  openEditUserModal(e) {
    e.preventDefault();

    this.modal().open({
      template: 'UserEdit',
      title: 'Edit User',
      userId: this.user()._id
    });
  }
});
