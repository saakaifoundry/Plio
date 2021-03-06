import { Mongo } from 'meteor/mongo';

import { NonConformitiesSchema } from './non-conformities-schema.js';

const NonConformities = new Mongo.Collection('NonConformities');
NonConformities.attachSchema(NonConformitiesSchema);

export { NonConformities };
