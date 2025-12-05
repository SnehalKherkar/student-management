import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';

const GalleryView = ({ students, customFields }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
                <Card key={student.id}>
                    <CardHeader>
                        <CardTitle>{student.name}</CardTitle>
                        <p className="text-sm text-gray-500">{student.email}</p>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <p>
                            <strong>Status:</strong>{' '}
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
                        </p>

                        {customFields.map((field) => (
                            <p key={field.id}>
                                <strong>{field.label}:</strong>{' '}
                                {String(student.customFields?.[field.key] ?? 'N/A')}
                            </p>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default GalleryView;
