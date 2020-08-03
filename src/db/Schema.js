import { TYPE } from './Type';

export const schema = {
  [TYPE.CONTRIBUTION]: [
    { fieldName: 'id', required: false },
    { fieldName: 'contributorId', required: true },
    { fieldName: 'contributeeId', required: true },
    { fieldName: 'contribution', required: true },
    { fieldName: 'createdDate', required: false },
  ],
  [TYPE.INTEREST]: [
    { fieldName: 'id', required: false },
    { fieldName: 'userId', required: true },
    { fieldName: 'vacancyId', required: true },
    { fieldName: 'status', required: true },
    { fieldName: 'comments', required: false },
    { fieldName: 'startDate', required: true },
    { fieldName: 'endDate', required: true },
    { fieldName: 'createdDate', required: false },
  ],
  [TYPE.SKILL]: [
    { fieldName: 'id', required: false },
    { fieldName: 'title', required: true },
    { fieldName: 'createdDate', required: false },
  ],
  [TYPE.TASK]: [
    { fieldName: 'id', required: false },
    { fieldName: 'title', required: true },
    { fieldName: 'type', required: true },
    { fieldName: 'shortDescription', required: false },
    { fieldName: 'moreInformation', required: false },
    { fieldName: 'relatedLinks', required: false },
    { fieldName: 'tags', required: false },
    { fieldName: 'priority', required: false },
    { fieldName: 'hypotheses', required: false },
    { fieldName: 'successfulIf', required: false },
    { fieldName: 'approach', required: false },
    { fieldName: 'startDate', required: false },
    { fieldName: 'endDate', required: false },
    { fieldName: 'cost', required: false },
    { fieldName: 'createdDate', required: false },
    { fieldName: 'createdBy', required: false },
    { fieldName: 'modifiedDate', required: false },
    { fieldName: 'modifiedBy', required: false },
  ],
  [TYPE.USER]: [
    { fieldName: 'id', required: false },
    { fieldName: 'firstNames', required: true },
    { fieldName: 'lastName', required: true },
    { fieldName: 'bio', required: false },
    { fieldName: 'skills', required: false },
    { fieldName: 'available', required: false },
    { fieldName: 'disabledHints', required: false },
    { fieldName: 'createdDate', required: false },
  ],
  [TYPE.VACANCY]: [
    { fieldName: 'id', required: false },
    { fieldName: 'taskId', required: true },
    { fieldName: 'recruiterId', required: true },
    { fieldName: 'priority', required: true },
    { fieldName: 'skillId', required: true },
    { fieldName: 'role', required: true },
    { fieldName: 'status', required: true },
    { fieldName: 'startDate', required: true },
    { fieldName: 'endDate', required: true },
    { fieldName: 'comments', required: false },
    { fieldName: 'createdDate', required: false },
  ],
};
