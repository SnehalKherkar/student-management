import { useLocalStorageState } from "./useLocalStorageState";
import { keys } from "../api/storage";
import { createUser } from "../types";

export const useUsers = () => {
  const { state: users = [], setState: setUsers } = useLocalStorageState(
    keys.USERS_KEY,
    []
  );

  const addUser = (user) => {
    const newUser = createUser(user);
    setUsers([...users, newUser]);
    return newUser;
  };

  const findUserByEmail = (email) => users.find((u) => u.email === email);

  return {
    users,
    addUser,
    findUserByEmail,
  };
};
