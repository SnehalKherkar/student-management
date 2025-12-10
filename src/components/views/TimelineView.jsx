import React from "react";

const TimelineView = ({ students = [] }) => {
  return (
    <div className="space-y-6">
      {students.map(s => (
        <div key={s.id} className="bg-white rounded-2xl p-4 shadow-md flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
            {s.name?.split(" ").map(n => n[0]).slice(0,2).join("")}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{s.name}</h4>
              <div className="text-xs text-gray-500">{new Date(s.createdAt || Date.now()).toLocaleDateString()}</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{s.customFields?.bio || "-"}</p>
            <div className="mt-3 flex gap-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                s.status==="active" ? "bg-green-100 text-green-800" :
                s.status==="inactive" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
              }`}>{s.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView;
