import React, { useState } from 'react';
import { useSWRLocalStorage } from '../../hooks/useSWRLocalStorage';
import { keys } from '../../api/storage';
import Drawer from '../../components/common/Drawer';
import StudentForm from '../../components/students/StudentForm';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';

const StudentManagement = () => {
    const { data: students, update: updateStudents, isLoading: studentsLoading } =
        useSWRLocalStorage(keys.STUDENTS_KEY);

    const { data: customFields, isLoading: fieldsLoading } =
        useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState('create'); // 'create' | 'edit' | 'view'
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleOpenDrawer = (mode, student) => {
        setDrawerMode(mode);
        setSelectedStudent(student || null);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedStudent(null);
    };

    const handleSaveStudent = (studentData) => {
        if (drawerMode === 'create') {
            const newStudent = {
                ...studentData,
                id: `student-${Date.now()}`,
                createdAt: new Date().toISOString(),
            };

            updateStudents([...(students || []), newStudent]);
        } else if (drawerMode === 'edit' && selectedStudent) {
            const updatedStudents = (students || []).map(s =>
                s.id === selectedStudent.id
                    ? { ...selectedStudent, ...studentData }
                    : s
            );
            updateStudents(updatedStudents);
        }

        handleCloseDrawer();
    };

    const handleDeleteStudent = (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            const updatedStudents = (students || []).filter(s => s.id !== studentId);
            updateStudents(updatedStudents);
        }
    };

    if (studentsLoading || fieldsLoading) return <div>Loading...</div>;

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Student Management</CardTitle>

                <button
                    onClick={() => handleOpenDrawer('create')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    <Plus size={16} /> Add Student
                </button>
            </CardHeader>

            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {(students || []).map(student => (
                                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {student.name}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {student.email}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {student.phone}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                student.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : student.status === 'inactive'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {student.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {new Date(student.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => handleOpenDrawer('view', student)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleOpenDrawer('edit', student)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <Edit size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteStudent(student.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>

            <Drawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                title={
                    drawerMode === 'create'
                        ? 'Add New Student'
                        : drawerMode === 'edit'
                        ? 'Edit Student'
                        : 'View Student Details'
                }
            >
                {drawerMode !== 'view' ? (
                    <StudentForm
                        student={selectedStudent}
                        customFields={customFields || []}
                        onSave={handleSaveStudent}
                        onCancel={handleCloseDrawer}
                    />
                ) : (
                    <div className="text-gray-800 dark:text-gray-200">
                        <p><strong>Name:</strong> {selectedStudent?.name}</p>
                        <p><strong>Email:</strong> {selectedStudent?.email}</p>
                        <p><strong>Phone:</strong> {selectedStudent?.phone}</p>
                        <p><strong>Status:</strong> {selectedStudent?.status}</p>
                        <p><strong>Created:</strong> {selectedStudent && new Date(selectedStudent.createdAt).toLocaleString()}</p>

                        <h4 className="font-bold mt-4">Custom Info:</h4>
                        {(customFields || []).map(field => (
                            <p key={field.id}>
                                <strong>{field.label}:</strong>{' '}
                                {selectedStudent?.customFields?.[field.key]?.toString() || '-'}
                            </p>
                        ))}
                    </div>
                )}
            </Drawer>
        </Card>
    );
};

export default StudentManagement;
