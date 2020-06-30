import { ACTION_TYPES } from './ActionTypes';

export const setContributionLinks = (contributionLinks) => ({
  type: ACTION_TYPES.SET_CONTRIBUTION_LINKS,
  contributionLinks,
});
