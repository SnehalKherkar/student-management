import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';

const KanbanView = ({ students }) => {
    const statuses = ['active', 'inactive', 'on-hold'];

    const groupedStudents = statuses.reduce((acc, status) => {
        acc[status] = students.filter(s => s.status === status);
        return acc;
    }, {});

    const statusColors = {
        active: 'bg-green-500',
        inactive: 'bg-red-500',
        'on-hold': 'bg-yellow-500'
    };

    return (
        <div className="flex gap-6 overflow-x-auto p-2">
            {statuses.map(status => (
                <div key={status} className="w-72 shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold capitalize flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${statusColors[status]}`}></span>
                                {status}
                            </h3>
                            <span className="text-sm font-bold bg-gray-300 dark:bg-gray-600 rounded-full px-2 py-0.5">
                                {groupedStudents[status]?.length || 0}
                            </span>
                        </div>
                    </div>

                    <div className="p-4 space-y-4 h-full overflow-y-auto">
                        {groupedStudents[status]?.map(student => (
                            <Card key={student.id}>
                                <CardHeader className="p-0 pb-2">
                                    <CardTitle className="text-base">{student.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-xs">{student.email}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default KanbanView;
