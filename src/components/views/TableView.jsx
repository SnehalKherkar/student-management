import React from 'react';

const TableView = ({ students, customFields }) => {

    // Helper to format dates as dd/mm/yyyy
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-GB'); // dd/mm/yyyy
    };

    // Helper to capitalize first letter
    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '-';

    // Helper to convert boolean to Yes/No
    const yesNo = (value) => value ? 'Yes' : 'No';

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                        </th>

                        {customFields.map(field => (
                            <th
                                key={`header-${field.id}`}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                {field.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {students.map(student => (
                        <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {student.name}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {student.email}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${
                                            student.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : student.status === 'inactive'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {capitalize(student.status)}
                                </span>
                            </td>

                            {customFields.map(field => {
                                let value = student.customFields?.[field.key];

                                // Apply formatting for DOB (date type) and scholarship (checkbox type)
                                if (field.type === 'date') value = formatDate(value);
                                if (field.type === 'checkbox' && field.key.toLowerCase().includes('scholarship')) value = yesNo(value);

                                return (
                                    <td
                                        key={`${student.id}-${field.id}`}
                                        className="px-6 py-4 whitespace-nowrap text-sm"
                                    >
                                        {String(value ?? 'N/A')}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableView;
