import { initialUsers, initialStudents, initialCustomFields } from '../utils/data';

const USERS_KEY = 'users';
const STUDENTS_KEY = 'students';
const CUSTOM_FIELDS_KEY = 'customFields';
const AUTH_USER_KEY = 'authUser';

export const storage = {
  get: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage`, error);
    }
  },

  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  },
};

export const seedInitialData = () => {
  if (!storage.get(USERS_KEY)) {
    storage.set(USERS_KEY, initialUsers);
  }
  if (!storage.get(STUDENTS_KEY)) {
    storage.set(STUDENTS_KEY, initialStudents);
  }
  if (!storage.get(CUSTOM_FIELDS_KEY)) {
    storage.set(CUSTOM_FIELDS_KEY, initialCustomFields);
  }
};

export const keys = {
  USERS_KEY,
  STUDENTS_KEY,
  CUSTOM_FIELDS_KEY,
  AUTH_USER_KEY,
};
