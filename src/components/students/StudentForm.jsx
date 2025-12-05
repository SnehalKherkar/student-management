import React, { useState, useEffect } from "react";
import { User, Mail, Phone, CheckCircle } from "lucide-react";

const StudentForm = ({ student, customFields, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
    customFields: {},
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        status: student.status,
        customFields: student.customFields || {},
      });
    } else {
      const defaultFields = customFields.reduce((acc, f) => {
        acc[f.key] = f.type === "checkbox" ? false : "";
        return acc;
      }, {});
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "active",
        customFields: defaultFields,
      });
    }
  }, [student, customFields]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const dynamicField = (field) => {
    const value = formData.customFields[field.key];

    switch (field.type) {
      case "text":
      case "date":
      case "time":
        return (
          <input
            type={field.type}
            name={field.key}
            value={value}
            required={field.required}
            onChange={handleCustomChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        );

      case "textarea":
        return (
          <textarea
            name={field.key}
            rows={3}
            value={value}
            required={field.required}
            onChange={handleCustomChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        );

      case "dropdown":
        return (
          <select
            name={field.key}
            value={value}
            required={field.required}
            onChange={handleCustomChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <label className="flex gap-2 items-center mt-2 cursor-pointer">
            <input
              type="checkbox"
              name={field.key}
              checked={value}
              onChange={handleCustomChange}
              className="h-4 w-4 text-indigo-600 border-gray-400 rounded-md"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{field.label}</span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 transition-all duration-300"
    >

      <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/40 p-3 rounded-lg">
        <CheckCircle size={22} className="text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {student ? "Edit Student" : "Add New Student"}
        </h2>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute top-2.5 left-3 text-gray-400" size={17} />
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            placeholder="Enter student name"
            onChange={handleFieldChange}
            className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute top-2.5 left-3 text-gray-400" size={17} />
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            placeholder="student@email.com"
            onChange={handleFieldChange}
            className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute top-2.5 left-3 text-gray-400" size={17} />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            required
            placeholder="+91 9876543210"
            onChange={handleFieldChange}
            className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          required
          onChange={handleFieldChange}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on-hold">On Hold</option>
        </select>
      </div>
      {customFields.length > 0 && (
        <>
          {customFields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {dynamicField(field)}
            </div>
          ))}
        </>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-sm hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md transition-all"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
