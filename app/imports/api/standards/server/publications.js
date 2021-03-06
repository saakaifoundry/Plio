import { Meteor } from 'meteor/meteor';
import { Standards } from '../standards.js';
import Counter from '../../counter/server.js';

Meteor.publish('standards', function(organizationId) {
  if (this.userId) {
    return Standards.find({ organizationId, isDeleted: { $in: [false, null] } });
  } else {
    return this.ready();
  }
});

Meteor.publish('standardsDeleted', function(organizationId) {
  if (this.userId) {
    return Standards.find({ organizationId, isDeleted: true });
  } else {
    return this.ready();
  }
});

Meteor.publish('standardsCount', function(counterName, organizationId) {
  return new Counter(counterName, Standards.find({ organizationId, isDeleted: { $in: [false, null] } }));
});

Meteor.publish('standardsNotViewedCount', function(counterName, organizationId) {
  return new Counter(counterName, Standards.find({ organizationId, viewedBy: { $ne: this.userId }, isDeleted: { $in: [false, null] } }));
});
