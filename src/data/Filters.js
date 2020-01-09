const filters = [
  {
    name: 'Creation Date',
    options: ['Any Time', 'Today', 'This Week', 'This Month', 'Specify Period..']
  },
  {
    name: 'Vacancies',
    options: [
      'Relevant Vacancies',
      'UX Designer',
      'Any Developer',
      'Lean Facilitator',
      'HAK Developer',
      'TC Developer',
      '19 more..'
    ]
  },
  { name: 'Sort', options: ['Priority', 'Creation Date', 'Author', 'Planned Date', 'Other..'] },
  { name: 'Author', options: ['Anyone', 'Me', 'Specify..'] }
];

const getFilters = () => filters;

export default getFilters;
