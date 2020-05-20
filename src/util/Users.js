export const formatUserName = (user) =>
  [
    user.firstNames[0],
    ...[
      user.firstNames.length > 1
        ? user.firstNames
            .slice(1, user.firstNames.length)
            .map((firstName) => firstName[0])
            .join('')
        : [],
    ],
    user.lastName,
  ].join(' ');
