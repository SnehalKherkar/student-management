import React from "react";
import {
  Edit,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  User,
  Trash2,
} from "lucide-react";

const StudentDetailsModal = ({
  student,
  customFields = [],
  onEdit,
  onClose,
  onDelete,
}) => {
  if (!student) return null;

  return (
    <div className="w-full">
      <div className="relative">
        <div className="h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-t-2xl" />
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          <div className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl font-bold text-indigo-700">
            {student.name?.charAt(0)}
          </div>
        </div>
      </div>

      <div className="pt-16 px-6 text-center space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {student.name}
        </h3>

        <div className="flex items-center justify-center gap-3">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
              student.status === "active"
                ? "bg-green-100 text-green-700"
                : student.status === "inactive"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                student.status === "active"
                  ? "bg-green-500"
                  : student.status === "inactive"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            />
            {student.status?.charAt(0).toUpperCase() + student.status?.slice(1)}
          </span>

          <button
            onClick={() => onEdit(student)}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/10 hover:bg-gray-900/20 text-gray-800 dark:text-white transition"
          >
            <Edit size={14} /> Edit
          </button>

          {onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-700 transition"
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 px-4 pb-10 space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
            <User size={18} className="text-indigo-600" /> Basic Information
          </h4>

          <div className="space-y-4">
            <InfoRow
              icon={<Mail size={18} className="text-indigo-600" />}
              label="Email"
              value={student.email}
            />
            <InfoRow
              icon={<Phone size={18} className="text-indigo-600" />}
              label="Phone"
              value={student.phone}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Additional Details
          </h4>

          <div className="space-y-4">
            {customFields.map((f) => {
              const v = student.customFields?.[f.key];
              const value =
                f.type === "checkbox" ? (v ? "Yes" : "No") : v || "-";
              return (
                <InfoRow
                  key={f.id}
                  icon={<FileText size={18} className="text-indigo-600" />}
                  label={f.label}
                  value={value}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;

const InfoRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-start gap-4">
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>

    <div className="text-right max-w-[60%] break-words font-medium text-gray-800 dark:text-gray-100">
      {value || "-"}
    </div>
  </div>
);
