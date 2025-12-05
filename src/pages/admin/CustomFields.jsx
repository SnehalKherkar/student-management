import React, { useState } from 'react';
import { useSWRLocalStorage } from '../../hooks/useSWRLocalStorage';
import { keys } from '../../api/storage';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';

const CustomFields = () => {
    const { data: fields, update: updateFields, isLoading } = useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

    const [newField, setNewField] = useState({
        label: '',
        type: 'text',
        required: false,
        options: []
    });

    const [editingField, setEditingField] = useState(null);

    const handleSave = () => {
        if (editingField) {
            const updatedFields = (fields || []).map(f =>
                f.id === editingField.id
                    ? { ...editingField, ...newField }
                    : f
            );
            updateFields(updatedFields);
        } else {
            if (!newField.label || !newField.type) {
                alert('Label and Type are required.');
                return;
            }

            const fieldToSave = {
                id: `cf-${Date.now()}`,
                label: newField.label,
                key: newField.label.toLowerCase().replace(/\s+/g, '_'),
                type: newField.type,
                required: newField.required || false,
                options: newField.type === 'dropdown' ? newField.options : undefined,
            };

            updateFields([...(fields || []), fieldToSave]);
        }

        setNewField({ label: '', type: 'text', required: false, options: [] });
        setEditingField(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure? This will remove the field from all student records.')) {
            updateFields((fields || []).filter(f => f.id !== id));
        }
    };

    if (isLoading) return <div>Loading...</div>;

    const formTitle = editingField ? 'Edit Field' : 'Add New Custom Field';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>{formTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            
                            <div>
                                <label className="block text-sm font-medium">Label</label>
                                <input
                                    type="text"
                                    value={newField.label}
                                    onChange={e => setNewField({ ...newField, label: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Type</label>
                                <select
                                    value={newField.type}
                                    onChange={e => setNewField({ ...newField, type: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm"
                                >
                                    <option value="text">Text</option>
                                    <option value="textarea">Textarea</option>
                                    <option value="dropdown">Dropdown</option>
                                    <option value="checkbox">Checkbox</option>
                                    <option value="date">Date</option>
                                    <option value="time">Time</option>
                                </select>
                            </div>

                            {newField.type === 'dropdown' && (
                                <div>
                                    <label className="block text-sm font-medium">Options (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={(newField.options || []).join(',')}
                                        onChange={e => setNewField({ ...newField, options: e.target.value.split(',') })}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm"
                                    />
                                </div>
                            )}

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={newField.required}
                                    onChange={e => setNewField({ ...newField, required: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label className="ml-2 block text-sm">Required</label>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                            >
                                <Plus size={16} />
                                {editingField ? 'Update Field' : 'Add Field'}
                            </button>

                            {editingField && (
                                <button
                                    onClick={() => {
                                        setEditingField(null);
                                        setNewField({ label: '', type: 'text', required: false, options: [] });
                                    }}
                                    className="w-full mt-2 px-4 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Existing Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {(fields || []).map(field => (
                                <li
                                    key={field.id}
                                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {field.label}{' '}
                                            <span className="text-xs text-gray-500">({field.type})</span>
                                        </p>
                                        <p className="text-xs text-gray-400">Key: {field.key}</p>
                                    </div>

                                    <div className="space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingField(field);
                                                setNewField(field);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <Edit size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(field.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CustomFields;
