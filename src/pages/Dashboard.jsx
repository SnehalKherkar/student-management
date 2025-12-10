import React, { useState } from "react";
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

  const { data: students = [], update: updateStudents } =
    useSWRLocalStorage(keys.STUDENTS_KEY);

  const { data: customFields = [] } =
    useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

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
    <div className="space-y-6 pb-10">

      <div className="w-full">
        <div className="
          bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
          text-white p-5 rounded-2xl shadow-lg
        ">
          <h2 className="text-3xl font-bold tracking-wide">Dashboard</h2>
        </div>
      </div>

      <div className="
        flex overflow-x-auto gap-3 py-2 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
      ">
        {["table", "gallery", "kanban", "timeline"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`
              px-5 py-2 rounded-xl font-medium capitalize whitespace-nowrap
              transition-all duration-200 border backdrop-blur
              ${
                view === v
                  ? "bg-indigo-600 text-white shadow-md scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-5 min-h-[300px]">
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
