export const fetchUser = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`,
  });
};

export const signup = (data, user) => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data,
    contentType: false,
    processData: false,
  });
};

export const updateUser = (user) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user }
  });
};

export const login = user => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user }
  });
};

export const logout = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session"
  });
};
