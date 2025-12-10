import React, { useMemo } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import { Plus } from "lucide-react";

const STATUS_STYLES = {
  active: {
    label: "Active",
    color: "text-green-600 bg-green-100",
    border: "border-green-300",
  },
  inactive: {
    label: "Inactive",
    color: "text-red-600 bg-red-100",
    border: "border-red-300",
  },
  "on-hold": {
    label: "On-Hold",
    color: "text-yellow-700 bg-yellow-100",
    border: "border-yellow-300",
  },
};

const KanbanView = ({ students, onStatusChange, onAddStudent }) => {
  const columns = useMemo(() => {
    const grouped = {
      active: [],
      inactive: [],
      "on-hold": [],
    };
    students.forEach((s) => grouped[s.status]?.push(s));
    return grouped;
  }, [students]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus === destStatus) return;

    const student = students.find((s) => s.id === draggableId);
    if (!student) return;

    onStatusChange({ ...student, status: destStatus });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {Object.keys(columns).map((status) => {
          const style = STATUS_STYLES[status];

          return (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`
                    rounded-xl shadow-md p-4 backdrop-blur-xl
                    min-h-[75vh] border transition-all duration-300 
                    ${
                      snapshot.isDraggingOver
                        ? "bg-indigo-50/70 border-indigo-400 shadow-lg scale-[1.01]"
                        : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                    }
                  `}
                >
                
                  <div className="flex items-center justify-between mb-4">
                    <h2
                      className={`text-lg font-bold flex items-center gap-2 ${style.color}`}
                    >
                      ● {style.label}
                    </h2>

                  </div>

                  {columns[status].length === 0 && (
                    <div className="text-center text-gray-400 py-10 text-sm">
                      No students here
                    </div>
                  )}

                  {columns[status].map((student, index) => (
                    <Draggable
                      key={student.id}
                      draggableId={student.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            p-4 mb-3 rounded-xl bg-white dark:bg-gray-800 border shadow-sm
                            transition-all duration-300 cursor-grab active:cursor-grabbing
                            flex items-center gap-3
                            ${style.border}
                            ${
                              snapshot.isDragging
                                ? "shadow-xl scale-[1.03] rotate-[1deg]"
                                : ""
                            }
                          `}
                        >
                       
                          <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                            alt="avatar"
                            className="w-12 h-12 rounded-lg"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-gray-500 text-sm">
                              {student.email}
                            </p>

                            <span
                              className={`text-xs px-2 py-1 rounded-md mt-1 inline-block ${style.color}`}
                            >
                              {style.label}
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}

      </div>
    </DragDropContext>
  );
};

export default KanbanView;
