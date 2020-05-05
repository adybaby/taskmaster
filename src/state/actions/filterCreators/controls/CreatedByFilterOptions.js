const createExecute = (userId) => (tasks) =>
  tasks.filter((task) => task.createdBy === userId);

export const createCreatedByFilterOptions = (users, currentUser) => [
  {
    id: "ANY_AUTHOR",
    label: "any author",
  },
  {
    id: "ME",
    label: "me",
    execute: createExecute(currentUser.id),
  },
  ...users
    .map((user) => ({
      id: `${user.id}`,
      label: `${user.firstName} ${user.lastName}`,
      execute: createExecute(user.id),
    }))
    .sort(),
];
