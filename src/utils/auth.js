// src/utils/auth.js

export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const registerUser = (userData) => {
  const users = getUsers();

  const alreadyExists = users.find(
    (u) => u.email === userData.email
  );

  if (alreadyExists) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  const newUser = {
    id: Date.now(),
    ...userData,
    addresses: [],
  };

  users.push(newUser);

  saveUsers(users);

  return {
    success: true,
    user: newUser,
  };
};

export const loginUser = (email, password) => {
  const users = getUsers();

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );

  return {
    success: true,
    user,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  return JSON.parse(
    localStorage.getItem("currentUser")
  );
};

export const updateCurrentUser = (updatedUser) => {

  localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
  );

  const users = getUsers();

  const updatedUsers = users.map((u) =>
    u.id === updatedUser.id
      ? updatedUser
      : u
  );

  saveUsers(updatedUsers);
};