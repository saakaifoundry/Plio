import { Template } from 'meteor/templating';
import { Organizations } from '/imports/api/organizations/organizations.js';


Template.DashboardPage.viewmodel({
  autorun() {
    this.templateInstance.subscribe('currentUserOrganizations');
  },
  organization() {
    const serialNumber = Number(FlowRouter.getParam('orgSerialNumber'));
    return Organizations.findOne({ serialNumber });
  }
});