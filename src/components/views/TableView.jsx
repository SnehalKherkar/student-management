import React from "react";

const TableView = ({ students, customFields, onStudentClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "-";

  const yesNo = (value) => (value ? "Yes" : "No");

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium hidden md:table-cell">
              Profile Bio
            </th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {students.map((student) => (
            <tr
              key={student.id}
              onClick={() => onStudentClick(student)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 text-sm font-medium">{student.name}</td>
              <td className="px-6 py-4 text-sm">{student.email}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-2 inline-flex text-xs font-semibold rounded-full
          ${
            student.status === "active"
              ? "bg-green-100 text-green-800"
              : student.status === "inactive"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }
        `}
                >
                  {capitalize(student.status)}
                </span>
              </td>

              <td className="px-6 py-4 text-sm hidden md:table-cell truncate max-w-[200px]">
                {student.customFields?.bio || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
