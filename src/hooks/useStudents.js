import { useSWRLocalStorage } from "./useSWRLocalStorage";
import { keys } from "../api/storage";
import { createStudent } from "../types";


export const useStudents = () => {
  const { data: students = [], update, isLoading, error } =
    useSWRLocalStorage(keys.STUDENTS_KEY);

  const addStudent = (form) => {
    const newStudent = createStudent({
      id: `student-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      status: form.status || "active",
      createdAt: new Date().toISOString(),
      customFields: form.customFields || {},
    });

    update([...(students || []), newStudent]);
    return newStudent;
  };

  const updateStudent = (id, newData) => {
    const updated = (students || []).map((s) =>
      s.id === id
        ? {
            ...s,
            ...newData,
            customFields: {
              ...(s.customFields || {}),
              ...(newData.customFields || {}),
            },
          }
        : s
    );
    update(updated);
  };

  const deleteStudent = (id) => {
    update((students || []).filter((s) => s.id !== id));
  };

  const getById = (id) => (students || []).find((s) => s.id === id);

  return {
    students,
    isLoading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    getById,
  };
};
