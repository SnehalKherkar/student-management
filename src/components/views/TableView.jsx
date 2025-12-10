import React from "react";

const TableView = ({ students = [], customFields = [], onRowClick }) => {
  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-GB") : "-";
  const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "-";

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left bg-white">
            <th className="px-6 py-4 text-sm font-semibold">Name</th>
            <th className="px-6 py-4 text-sm font-semibold hidden sm:table-cell">Email</th>
            <th className="px-6 py-4 text-sm font-semibold">Status</th>
            <th className="px-6 py-4 text-sm font-semibold hidden md:table-cell">Profile Bio</th>
            <th className="px-6 py-4 text-sm font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="bg-white hover:shadow-md transition" onClick={() => onRowClick?.(s)}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {s.name?.split(" ").map(n => n[0]).slice(0,2).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-gray-400 sm:hidden">{s.email}</div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 hidden sm:table-cell text-sm text-gray-600">{s.email}</td>

              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  s.status==="active" ? "bg-green-100 text-green-800" :
                  s.status==="inactive" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {capitalize(s.status)}
                </span>
              </td>

              <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-700">{s.customFields?.bio ? (s.customFields.bio.length>70 ? s.customFields.bio.slice(0,70)+"..." : s.customFields.bio) : "-"}</td>

              <td className="px-6 py-4 text-sm">
                <button onClick={(e)=>{ e.stopPropagation(); onRowClick?.(s); }} className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-700">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
