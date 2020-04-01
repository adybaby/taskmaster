import * as testDb from './test/TestDb';

export const DB_STATUS = {
  NOT_INITIALISED: 'NOT_INITIALISED',
  INITIALISING: 'INITIALISING',
  INITIALISED: 'INITIALISED',
  ERROR: 'ERROR',
};

const db = testDb;

export const init = () => db.init();
