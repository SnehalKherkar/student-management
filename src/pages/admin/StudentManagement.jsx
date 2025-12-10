import React, { useState } from "react";
import { useSWRLocalStorage } from "../../hooks/useSWRLocalStorage";
import { keys } from "../../api/storage";
import Drawer from "../../components/common/Drawer";
import StudentForm from "../../components/students/StudentForm";
import StudentDetailsModal from "../../components/students/StudentDetailsModal";
import {
  Plus,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
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

  const { data: customFields = [], isLoading: fieldsLoading } = useSWRLocalStorage(
    keys.CUSTOM_FIELDS_KEY
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create"); // create | view | edit
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
      const updatedStudents = (students || []).map((s) =>
        s.id === selectedStudent.id ? { ...s, ...studentData } : s
      );
      updateStudents(updatedStudents);
      toast.success("Student updated");
    }
    closeDrawer();
  };

  const handleSaveStudent = (studentData) => {
    setConfirmTitle(drawerMode === "create" ? "Confirm Add" : "Confirm Edit");
    setConfirmMessage(
      drawerMode === "create"
        ? "Are you sure you want to add this student?"
        : "Are you sure you want to save changes?"
    );

    setConfirmAction(() => () => {
      processStudentSave(studentData);
      setConfirmOpen(false);
    });

    setConfirmOpen(true);
  };

  const handleDeleteStudent = (studentId) => {
    setConfirmTitle("Delete Student");
    setConfirmMessage("Are you sure you want to delete this student?");
    setConfirmAction(() => () => {
      const updatedStudents = (students || []).filter((s) => s.id !== studentId);
      updateStudents(updatedStudents);
      setConfirmOpen(false);
      toast.success("Student deleted");
      closeDrawer();
    });
    setConfirmOpen(true);
  };

  if (studentsLoading || fieldsLoading) return <div>Loading...</div>;

  return (
    <Card>
      <ToastContainer position="top-right" />
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Student Management</CardTitle>

        <button
          onClick={() => openDrawer("create")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <Plus size={16} /> Add Student
        </button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {(students || []).map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.phone}</td>

                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      student.status === "active"
                        ? "bg-green-200 text-green-800"
                        : student.status === "inactive"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}>
                      {student.status?.charAt(0).toUpperCase() + student.status?.slice(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4">{student.createdAt ? new Date(student.createdAt).toLocaleDateString("en-GB") : "-"}</td>

                  <td className="px-6 py-4 space-x-3">
                    <button
                      onClick={() => openDrawer("view", student)}
                      className="text-blue-600 hover:text-blue-900"
                      aria-label={`View ${student.name}`}
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => openDrawer("edit", student)}
                      className="text-indigo-600 hover:text-indigo-900"
                      aria-label={`Edit ${student.name}`}
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-900"
                      aria-label={`Delete ${student.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            customFields={customFields || []}
            onSave={handleSaveStudent}
            onCancel={closeDrawer}
          />
        ) : (
          <StudentDetailsModal
            student={selectedStudent}
            customFields={customFields || []}
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
