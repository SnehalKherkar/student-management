
export const Roles = {
  ADMIN: 'admin',
  STUDENT: 'student',
};


export const createUser = ({ id, role, email, password, name }) => ({
  id,
  role, 
  email,
  password,
  name,
});


export const createAuthUser = ({ id, role, email, name }) => ({
  id,
  role,
  email,
  name,
});


export const CustomFieldTypes = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  DROPDOWN: 'dropdown',
  CHECKBOX: 'checkbox',
  DATE: 'date',
  TIME: 'time',
};


export const createCustomField = ({ id, label, key, type, required, options }) => ({
  id,
  label,
  key,
  type,     
  required,
  options,   
});


export const createStudent = ({ id, name, email, phone, status, createdAt, customFields }) => ({
  id,
  name,
  email,
  phone,
  status,    
  createdAt, 
  customFields, 
});
