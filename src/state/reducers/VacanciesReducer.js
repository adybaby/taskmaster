import { ACTION_TYPES } from '../actions/ActionTypes';

export const vacanciesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_VACANCIES: {
      return action.vacancies;
    }
    default:
      return state;
  }
};
