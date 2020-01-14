/**
 * TASK
 * Type
 * Title
 * createdBy
 * createdDate
 * modifiedDate
 * ShortDescription
 * MoreInformation
 * RelatedLinks
 * Tags
 * Body
 *
 * {
 * IF ENABLER
 * Enables {Driver, Impact}
 * Initiatives
 * }
 *
 * {
 * IF INITIATIVE
 * Hypotheses
 * SuccessfulIf
 * Approach
 * ContributesTo {Enabler, Impact}
 * PlannedDate{StartDate, EndDate}
 * Vacancies {Title, StartDate, EndDate, User:ProposedStart, ProposedEnd, Acceptance}
 * }
 */

export const TYPES = {
  DRIVER: 'Driver',
  ENABLER: 'Enabler',
  INITIATIVE: 'Initiative'
};

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
  ' incididunt ut labore et dolore magna aliqua.';

const makeList = (type, length, makeObj) => {
  const list = [];
  for (let i = 0; i < length; i++) {
    const title = `${type} ${i}`;
    if (makeObj) {
      list[i] = {
        title,
        type,
        description: LOREM,
        links: makeList(type, 5, false),
        tags: makeList('TAG', 5, false)
      };
    } else {
      list[i] = title;
    }
  }
  return list;
};

const data = [
  ...makeList(TYPES.DRIVER, 5, true),
  ...makeList(TYPES.ENABLER, 30, true),
  ...makeList(TYPES.INITIATIVE, 100, true)
];

export const loadData = () => data;

export const getUser = () => ({ name: 'aalever' });

export default loadData;
