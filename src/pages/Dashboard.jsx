import React, { useState, useMemo } from "react";
import { useSWRLocalStorage } from "../hooks/useSWRLocalStorage";
import { keys } from "../api/storage";

import Drawer from "../components/common/Drawer";
import StudentDetailsModal from "../components/students/StudentDetailsModal";
import StudentForm from "../components/students/StudentForm";

import TableView from "../components/views/TableView";
import GalleryView from "../components/views/GalleryView";
import KanbanView from "../components/views/KanbanView";
import TimelineView from "../components/views/TimelineView";

const Dashboard = () => {
  const [view, setView] = useState("table");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  const { data: students = [], update: updateStudents } = useSWRLocalStorage(
    keys.STUDENTS_KEY
  );

  const { data: customFields = [] } = useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

  const handleStatusChange = (updatedStudent) => {
    const updated = students.map((s) =>
      s.id === updatedStudent.id ? updatedStudent : s
    );
    updateStudents(updated);
  };

  const handleSaveEdit = (updatedStudent) => {
    const updated = students.map((s) =>
      s.id === updatedStudent.id ? updatedStudent : s
    );

    updateStudents(updated);

    setSelectedStudent(updatedStudent); 
    setEditStudent(null);
  };

  const renderView = () => {
    switch (view) {
      case "gallery":
        return (
          <GalleryView
            students={students}
            customFields={customFields}
            onCardClick={setSelectedStudent}
          />
        );

      case "kanban":
        return (
          <KanbanView
            students={students}
            onStatusChange={handleStatusChange}
            onCardClick={setSelectedStudent}
          />
        );

      case "timeline":
        return <TimelineView students={students} />;

      default:
        return (
          <TableView
            students={students}
            customFields={customFields}
            onRowClick={setSelectedStudent}
          />
        );
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {["table", "gallery", "kanban", "timeline"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                view === v
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-inner p-5">
        {renderView()}
      </div>

      <Drawer
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title="Student Details"
      >
        {selectedStudent && (
          <StudentDetailsModal
            student={selectedStudent}
            customFields={customFields}
            onEdit={(student) => {
              setSelectedStudent(null);
              setEditStudent(student);
            }}
          />
        )}
      </Drawer>

      <Drawer
        isOpen={!!editStudent}
        onClose={() => setEditStudent(null)}
        title="Edit Student"
      >
        {editStudent && (
          <StudentForm
            student={editStudent}
            customFields={customFields}
            onSave={handleSaveEdit}
            onCancel={() => setEditStudent(null)}
          />
        )}
      </Drawer>
    </div>
  );
};

export default Dashboard;
