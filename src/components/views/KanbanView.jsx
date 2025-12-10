import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const STATUS_ORDER = ["active","on-hold","inactive"];
const STATUS_META = {
  active: { label: "Active", color: "bg-green-50 text-green-700" },
  "on-hold": { label: "On Hold", color: "bg-yellow-50 text-yellow-700" },
  inactive: { label: "Inactive", color: "bg-red-50 text-red-700" },
};

const KanbanView = ({ students = [], onStatusChange, onCardClick }) => {
  const columns = useMemo(() => {
    const g = { active: [], "on-hold": [], inactive: [] };
    (students || []).forEach(s => {
      g[s.status || "active"].push(s);
    });
    return g;
  }, [students]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const student = students.find(s => s.id === draggableId);
    if (!student) return;

    onStatusChange?.({ ...student, status: destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATUS_ORDER.map(status => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}
                className={`p-4 rounded-2xl min-h-[260px] transition ${snapshot.isDraggingOver ? "ring-4 ring-indigo-200/40" : "bg-white"} shadow`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{STATUS_META[status].label}</h3>
                  <div className="text-sm text-gray-400">{columns[status].length}</div>
                </div>

                <div className="space-y-3">
                  {columns[status].map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(p,snap) => (
                        <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}
                          className={`bg-white rounded-lg p-3 flex gap-3 items-start shadow-sm cursor-grab ${snap.isDragging ? "scale-[1.02] shadow-lg" : ""}`} onClick={() => onCardClick?.(card)}>
                          <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center font-bold">
                            {card.name?.split(" ").map(x => x[0]).slice(0,2).join("")}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-semibold">{card.name}</div>
                              <div className={`text-xs px-2 py-0.5 rounded-full ${STATUS_META[card.status].color}`}>{STATUS_META[card.status].label}</div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{card.customFields?.bio ? (card.customFields.bio.length>90 ? card.customFields.bio.slice(0,90)+"..." : card.customFields.bio) : "-"}</p>
                            <div className="mt-2 text-xs text-gray-400">{card.email}</div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanView;
