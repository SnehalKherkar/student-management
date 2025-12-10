import React, { useState, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSWRLocalStorage } from "../hooks/useSWRLocalStorage";
import { keys } from "../api/storage";

import Drawer from "../components/common/Drawer";
import StudentDetailsModal from "../components/students/StudentDetailsModal";

import TableView from "../components/views/TableView";
import GalleryView from "../components/views/GalleryView";
import KanbanView from "../components/views/KanbanView";
import TimelineView from "../components/views/TimelineView";

const Dashboard = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState("table");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data: allStudents, update: updateStudents } = useSWRLocalStorage(
    keys.STUDENTS_KEY
  );

  const { data: customFields } = useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

  const studentsToDisplay = useMemo(() => {
    if (!allStudents) return [];
    if (user?.role === "admin") return allStudents;
    return allStudents.filter((s) => s.id === user?.id);
  }, [allStudents, user]);

  const handleStatusChange = (updatedStudent) => {
    const updated = allStudents.map((s) =>
      s.id === updatedStudent.id ? updatedStudent : s
    );
    updateStudents(updated);
  };

  const renderView = () => {
    switch (currentView) {
      case "gallery":
        return (
          <GalleryView
            students={studentsToDisplay}
            customFields={customFields || []}
          />
        );

      case "kanban":
        return (
          <KanbanView
            students={studentsToDisplay}
            onStatusChange={handleStatusChange}
          />
        );

      case "timeline":
        return <TimelineView students={studentsToDisplay} />;

      default:
        return (
          <TableView
            students={studentsToDisplay}
            customFields={customFields || []}
            onStudentClick={setSelectedStudent}
          />
        );
    }
  };

  return (
    <div className="space-y-4 w-full">

      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h1 className="text-xl font-bold">Dashboard</h1>

        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
          {["table", "gallery", "kanban", "timeline"].map((v) => (
            <button
              key={v}
              onClick={() => setCurrentView(v)}
              className={`px-4 py-2 rounded-md text-sm capitalize transition-all
                ${currentView === v
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-200 hover:bg-gray-300"
                }
              `}
            >
              {v}
            </button>
          ))}
        </div>

      </div>

      <div className="bg-white p-4 rounded-lg shadow-md w-full overflow-x-auto">
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
            customFields={customFields || []}
            onEdit={() => {}}
          />
        )}
      </Drawer>
    </div>
  );
};

export default Dashboard;
