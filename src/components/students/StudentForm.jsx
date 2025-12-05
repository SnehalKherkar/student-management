import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, customFields, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'active',
        customFields: {}
    });

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                email: student.email,
                phone: student.phone,
                status: student.status,
                customFields: student.customFields || {}
            });
        } else {
            const defaultCustomFields = customFields.reduce((acc, field) => {
                if (field.type === 'checkbox') {
                    acc[field.key] = false;
                } else {
                    acc[field.key] = '';
                }
                return acc;
            }, {});

            setFormData({
                name: '',
                email: '',
                phone: '',
                status: 'active',
                customFields: defaultCustomFields
            });
        }
    }, [student, customFields]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                customFields: { ...prev.customFields, [name]: checked }
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCustomFieldChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            customFields: {
                ...prev.customFields,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const renderField = (field) => {
        const value = formData.customFields[field.key] ?? (field.type === 'checkbox' ? false : '');

        switch (field.type) {
            case 'text':
            case 'date':
            case 'time':
                return (
                    <input
                        type={field.type}
                        name={field.key}
                        value={value}
                        onChange={handleCustomFieldChange}
                        required={field.required}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        name={field.key}
                        value={value}
                        onChange={handleCustomFieldChange}
                        required={field.required}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                );
            case 'dropdown':
                return (
                    <select
                        name={field.key}
                        value={value}
                        onChange={handleCustomFieldChange}
                        required={field.required}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                        focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Select an option</option>
                        {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        name={field.key}
                        checked={value}
                        onChange={handleCustomFieldChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on-hold">On Hold</option>
                </select>
            </div>

            {customFields.map((field) => (
                <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && '*'}
                    </label>
                    {renderField(field)}
                </div>
            ))}
            <div className="flex justify-end space-x-2 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default StudentForm;
