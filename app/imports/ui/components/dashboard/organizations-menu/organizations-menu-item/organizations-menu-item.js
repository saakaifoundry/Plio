import { Template } from 'meteor/templating';

import { selectOrganization } from '/imports/api/users/methods.js';

Template.OrganizationsMenuItem.viewmodel({
  mixin: 'router',
  regex() {
    return `^\\/${this.serialNumber()}`;
  },
  selectOrg(e) {
    e.preventDefault();

    const selectedOrganizationSerialNumber = this.serialNumber();

    selectOrganization.call({ selectedOrganizationSerialNumber }, (err) => {
      if (err) {
        swal('Oops... Something went wrong', err.reason, 'error');
      }
    });

    this.goToDashboard(selectedOrganizationSerialNumber);
  }
});
