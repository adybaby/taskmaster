import { createBrowserHistory } from 'history';
import { URLS } from './constants/Constants';

export const history = createBrowserHistory();

export const writeToHistory = (currentJsonConfig, stateConfiguration) => {
  if (typeof stateConfiguration !== 'undefined' && stateConfiguration !== null) {
    if (Object.values(stateConfiguration).length === 0) {
      history.push(`/${URLS.BROWSE}/`);
    } else {
      const newJsonConfig = JSON.stringify(stateConfiguration);
      if (currentJsonConfig !== newJsonConfig) {
        history.push(encodeURIComponent(newJsonConfig));
      }
    }
  }
};
