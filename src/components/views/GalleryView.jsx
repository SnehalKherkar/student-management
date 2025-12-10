import React from "react";

const GalleryView = ({ students = [], customFields = [], onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map(s => (
        <article key={s.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition" onClick={() => onCardClick?.(s)}>
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold">
                {s.name?.split(" ").map(x => x[0]).slice(0,2).join("")}
              </div>
              <div>
                <h3 className="text-lg font-bold">{s.name}</h3>
                <p className="text-sm text-gray-400">{s.email}</p>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Status</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  s.status==="active" ? "bg-green-100 text-green-800" :
                  s.status==="inactive" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                }`}>{s.status}</div>
              </div>

              <div className="mt-3 text-sm text-gray-700">
                {s.customFields?.bio ? (s.customFields.bio.length>120 ? s.customFields.bio.slice(0,120)+"..." : s.customFields.bio) : "-"}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default GalleryView;
