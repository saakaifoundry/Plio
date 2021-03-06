import { Template } from 'meteor/templating';

import { Risks } from '/imports/api/risks/risks.js';

Template.RisksCard.viewmodel({
  mixin: ['organization', 'risk'],
  risks() {
    const organizationId = this.organizationId();
    const query = { organizationId };
    const options = { sort: { title: 1 } };
    return Risks.find(query, options);
  },
  risk() {

  }
});
