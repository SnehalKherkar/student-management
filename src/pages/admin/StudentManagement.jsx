import React, { useState } from "react";
import Drawer from "../../components/common/Drawer";
import StudentForm from "../../components/students/StudentForm";
import StudentDetailsModal from "../../components/students/StudentDetailsModal";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/Card";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useStudents } from "../../hooks/useStudents";
import { useCustomFields } from "../../hooks/useCustomFields";
import { toast } from "react-toastify";

const StudentManagement = () => {
  const { students, addStudent, updateStudent, deleteStudent, isLoading } = useStudents();
  const { fields: customFields, isLoading: fieldsLoading } = useCustomFields();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create"); // create | edit | view
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const openDrawer = (mode = "create", student = null) => {
    setDrawerMode(mode);
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedStudent(null);
    setDrawerMode("create");
  };

  const handleSave = (formData) => {
    setConfirmTitle(drawerMode === "create" ? "Confirm Add" : "Confirm Edit");
    setConfirmMessage(drawerMode === "create" ? "Save this new student?" : "Save changes?");
    setConfirmAction(() => () => {
      if (drawerMode === "create") {
        addStudent(formData);
        toast.success("Student added");
      } else if (drawerMode === "edit" && selectedStudent) {
        updateStudent(selectedStudent.id, formData);
        toast.success("Student updated");
      }
      setConfirmOpen(false);
      closeDrawer();
    });
    setConfirmOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmTitle("Delete Student");
    setConfirmMessage("Are you sure you want to delete this student?");
    setConfirmAction(() => () => {
      deleteStudent(id);
      toast.error("Student deleted");
      setConfirmOpen(false);
      if (selectedStudent?.id === id) closeDrawer();
    });
    setConfirmOpen(true);
  };

  if (isLoading || fieldsLoading) return <div className="text-center p-6">Loading...</div>;

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Student Management</CardTitle>

        <button onClick={() => openDrawer("create")} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          <Plus size={16} /> Add Student
        </button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {(students || []).map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">{s.name}</td>
                  <td className="px-6 py-4">{s.email}</td>
                  <td className="px-6 py-4">{s.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.status === "active" ? "bg-green-200 text-green-800" : s.status === "inactive" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}`}>
                      {s.status?.charAt(0).toUpperCase() + s.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{s.createdAt ? new Date(s.createdAt).toLocaleDateString("en-GB") : "-"}</td>
                  <td className="px-6 py-4 space-x-3">
                    <button onClick={() => openDrawer("view", s)} className="text-blue-600 hover:text-blue-900"><Eye size={18} /></button>
                    <button onClick={() => openDrawer("edit", s)} className="text-indigo-600 hover:text-indigo-900"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title={drawerMode === "create" ? "Add Student" : drawerMode === "edit" ? "Edit Student" : "Student Details"}>
        {drawerMode !== "view" ? (
          <StudentForm student={selectedStudent} customFields={customFields} onSave={handleSave} onCancel={closeDrawer} />
        ) : (
          <StudentDetailsModal student={selectedStudent} customFields={customFields} onEdit={() => setDrawerMode("edit")} onDelete={() => handleDelete(selectedStudent.id)} onClose={closeDrawer} />
        )}
      </Drawer>

      <ConfirmModal open={confirmOpen} title={confirmTitle} message={confirmMessage} onCancel={() => setConfirmOpen(false)} onConfirm={() => { if (confirmAction) confirmAction(); }} />
    </Card>
  );
};

export default StudentManagement;
