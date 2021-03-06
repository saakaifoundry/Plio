import { Mongo } from 'meteor/mongo';

import { LessonsSchema } from './lessons-schema.js';

const LessonsLearned = new Mongo.Collection('LessonsLearned');
LessonsLearned.attachSchema(LessonsSchema);

export { LessonsLearned };
