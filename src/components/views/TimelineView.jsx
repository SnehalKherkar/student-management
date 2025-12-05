import React from 'react';
import { UserPlus } from 'lucide-react';

const TimelineView = ({ students }) => {
    const sortedStudents = [...students].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {sortedStudents.map((student, studentIdx) => (
                    <li key={student.id}>
                        <div className="relative pb-8">
                            {studentIdx !== sortedStudents.length - 1 && (
                                <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                                    aria-hidden="true"
                                />
                            )}

                            <div className="relative flex space-x-3">
                                <div>
                                    <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                                        <UserPlus className="h-5 w-5 text-white" aria-hidden="true" />
                                    </span>
                                </div>

                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            New student{' '}
                                            <a href="#" className="font-medium text-gray-900 dark:text-white">
                                                {student.name}
                                            </a>{' '}
                                            joined.
                                        </p>
                                    </div>

                                    <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                        <time dateTime={student.createdAt}>
                                            {new Date(student.createdAt).toLocaleDateString()}
                                        </time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimelineView;
