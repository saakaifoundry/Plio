import { Template } from 'meteor/templating';

import { Organizations } from '/imports/api/organizations/organizations.js';

Template.DashboardPage.viewmodel({
  share: 'organization',
  autorun() {
    this.templateInstance.subscribe('currentUserOrganizations');
  },
  organization() {
    return Organizations.findOne({ serialNumber: this.orgSerialNumber() });
  }
});
