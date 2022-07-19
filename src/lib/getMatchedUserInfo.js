const getMatchedUserInfo = (users, userLoggedInfo) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedInfo];

  const [id, user] = Object.entries(newUsers).flat();
  return { id, ...user };
}

export default getMatchedUserInfo;