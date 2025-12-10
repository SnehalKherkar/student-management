import React, { useState } from "react";
import { useSWRLocalStorage } from "../../hooks/useSWRLocalStorage";
import { keys } from "../../api/storage";

import Drawer from "../../components/common/Drawer";
import StudentForm from "../../components/students/StudentForm";
import StudentDetailsModal from "../../components/students/StudentDetailsModal";

import { Plus, Edit, Eye, Trash2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/common/Card";

import ConfirmModal from "../../components/common/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentManagement = () => {
  const {
    data: students = [],
    update: updateStudents,
    isLoading: studentsLoading,
  } = useSWRLocalStorage(keys.STUDENTS_KEY);

  const { data: customFields = [] } = useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");

  const openDrawer = (mode, student = null) => {
    setDrawerMode(mode);
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedStudent(null);
  };

  const processStudentSave = (studentData) => {
    if (drawerMode === "create") {
      const newStudent = {
        ...studentData,
        id: `student-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      updateStudents([...(students || []), newStudent]);
      toast.success("Student added");
    } else if (drawerMode === "edit" && selectedStudent) {
      const updated = students.map((s) =>
        s.id === selectedStudent.id ? { ...s, ...studentData } : s
      );
      updateStudents(updated);
      toast.success("Student updated");
    }
    closeDrawer();
  };

  const handleSaveStudent = (studentData) => {
    setConfirmTitle(drawerMode === "create" ? "Add Student" : "Save Changes");
    setConfirmMessage(
      drawerMode === "create"
        ? "Are you sure you want to add this student?"
        : "Are you sure you want to update this student?"
    );
    setConfirmAction(() => () => {
      processStudentSave(studentData);
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleDeleteStudent = (id) => {
    setConfirmTitle("Delete Student");
    setConfirmMessage("Are you sure you want to delete this student?");
    setConfirmAction(() => () => {
      const updated = students.filter((s) => s.id !== id);
      updateStudents(updated);
      setConfirmOpen(false);
      toast.success("Student deleted");
      closeDrawer();
    });
    setConfirmOpen(true);
  };

  if (studentsLoading) return <div>Loading...</div>;

  return (
    <Card className="border-none shadow-xl rounded-2xl w-full overflow-hidden">
      <ToastContainer position="top-right" />

      <CardHeader className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-5 sm:p-6 rounded-t-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <CardTitle className="text-xl sm:text-2xl font-bold drop-shadow">
          Student Management
        </CardTitle>

        <button
          onClick={() => openDrawer("create")}
          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition shadow w-full sm:w-auto"
        >
          <Plus size={16} /> Add Student
        </button>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">

        <div className="hidden md:block overflow-x-auto rounded-xl shadow-md border bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-700 bg-gray-50 font-semibold">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{student.name}</td>
                  <td className="px-6 py-4 break-all">{student.email}</td>
                  <td className="px-6 py-4">{student.phone}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === "active"
                          ? "bg-green-100 text-green-700"
                          : student.status === "inactive"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {student.status.charAt(0).toUpperCase() +
                        student.status.slice(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(student.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => openDrawer("view", student)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => openDrawer("edit", student)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 mt-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{student.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    student.status === "active"
                      ? "bg-green-100 text-green-700"
                      : student.status === "inactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {student.status.charAt(0).toUpperCase() +
                    student.status.slice(1)}
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-1 break-all">
                {student.email}
              </p>
              <p className="text-gray-600 text-sm">{student.phone}</p>

              <div className="flex justify-between mt-4 pt-3 border-t">
                <button
                  onClick={() => openDrawer("view", student)}
                  className="text-blue-600"
                >
                  <Eye size={20} />
                </button>

                <button
                  onClick={() => openDrawer("edit", student)}
                  className="text-indigo-600"
                >
                  <Edit size={20} />
                </button>

                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={
          drawerMode === "create"
            ? "Add New Student"
            : drawerMode === "edit"
            ? "Edit Student"
            : "Student Details"
        }
      >
        {drawerMode !== "view" ? (
          <StudentForm
            student={selectedStudent}
            customFields={customFields}
            onSave={handleSaveStudent}
            onCancel={closeDrawer}
          />
        ) : (
          <StudentDetailsModal
            student={selectedStudent}
            customFields={customFields}
            onEdit={() => openDrawer("edit", selectedStudent)}
            onDelete={() => handleDeleteStudent(selectedStudent.id)}
          />
        )}
      </Drawer>

      <ConfirmModal
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmAction}
      />
    </Card>
  );
};

export default StudentManagement;
