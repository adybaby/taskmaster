import { ACTION_TYPES } from './ActionTypes';

export const setTags = (tags) => ({
  type: ACTION_TYPES.SET_TAGS,
  tags,
});
