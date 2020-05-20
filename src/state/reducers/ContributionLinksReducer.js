import { ACTION_TYPES } from '../actions/ActionTypes';

export const contributionLinksReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CONTRIBUTION_LINKS: {
      return action.contributionLinks;
    }
    default:
      return state;
  }
};
