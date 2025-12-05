import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSWRLocalStorage } from '../hooks/useSWRLocalStorage';
import { keys } from '../api/storage';
import { Table, LayoutGrid, KanbanSquare, GanttChartSquare } from 'lucide-react';


const TableView = React.lazy(() => import('../components/views/TableView'));
const GalleryView = React.lazy(() => import('../components/views/GalleryView'));
const KanbanView = React.lazy(() => import('../components/views/KanbanView'));
const TimelineView = React.lazy(() => import('../components/views/TimelineView'));

const Dashboard = () => {
    const { user } = useAuth();
    const [currentView, setCurrentView] = useState('table');

    const { data: allStudents, isLoading: studentsLoading } =
        useSWRLocalStorage(keys.STUDENTS_KEY);

    const { data: customFields, isLoading: fieldsLoading } =
        useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

    const studentsToDisplay = useMemo(() => {
        if (!allStudents) return [];
        if (user?.role === 'admin') return allStudents;
        return allStudents.filter(s => s.id === user?.id);
    }, [allStudents, user]);

    if (studentsLoading || fieldsLoading) {
        return <div className="text-center p-8">Loading dashboard data...</div>;
    }

    const renderView = () => {
        switch (currentView) {
            case 'table':
                return <TableView students={studentsToDisplay} customFields={customFields || []} />;

            case 'gallery':
                return <GalleryView students={studentsToDisplay} customFields={customFields || []} />;

            case 'kanban':
                return <KanbanView students={studentsToDisplay} />;

            case 'timeline':
                return <TimelineView students={studentsToDisplay} />;

            default:
                return <TableView students={studentsToDisplay} customFields={customFields || []} />;
        }
    };

    const ViewSwitcherButton = ({ view, icon, label }) => (
        <button
            onClick={() => setCurrentView(view)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                currentView === view
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>

                <div className="flex items-center space-x-2">
                    <ViewSwitcherButton view="table" icon={<Table size={16} />} label="Table" />
                    <ViewSwitcherButton view="gallery" icon={<LayoutGrid size={16} />} label="Gallery" />
                    <ViewSwitcherButton view="kanban" icon={<KanbanSquare size={16} />} label="Kanban" />
                    <ViewSwitcherButton view="timeline" icon={<GanttChartSquare size={16} />} label="Timeline" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <React.Suspense fallback={<div className="text-center p-8">Loading view...</div>}>
                    {renderView()}
                </React.Suspense>
            </div>
        </div>
    );
};

export default Dashboard;
