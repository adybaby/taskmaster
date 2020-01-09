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

const items = [
  ...makeList(TYPES.DRIVER, 5, true),
  ...makeList(TYPES.ENABLER, 30, true),
  ...makeList(TYPES.INITIATIVE, 100, true)
];

const getSearchResults = (type, searchTerm) => {
  let results = items;

  if (type != null) {
    results = results.filter(item => item.type === type);
  }
  if (searchTerm != null) {
    results = results.filter(item => item.title.includes(searchTerm));
  }
  return results;
};

export default getSearchResults;
