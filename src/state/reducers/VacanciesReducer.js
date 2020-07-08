import { ACTION_TYPES } from '../actions/ActionTypes';

export const vacanciesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_VACANCIES: {
      return action.vacancies;
    }
    case ACTION_TYPES.UPDATE_VACANCY_IN_STATE: {
      return [...state, action.vacancy];
    }
    case ACTION_TYPES.DELETE_VACANCY_FROM_STATE: {
      return state.filter((vacancy) => vacancy.id !== action.id);
    }
    default:
      return state;
  }
};
