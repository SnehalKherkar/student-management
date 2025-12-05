import React, { useState } from 'react';
import { useSWRLocalStorage } from '../../hooks/useSWRLocalStorage';
import { keys } from '../../api/storage';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import ConfirmModal from '../../components/common/ConfirmModal';

const CustomFields = () => {
    const { data: fields, update: updateFields, isLoading } = useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

    const [newField, setNewField] = useState({
        label: '',
        type: 'text',
        required: false,
        options: []
    });

    const [editingField, setEditingField] = useState(null);


    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [confirmTitle, setConfirmTitle] = useState('');

 
    const processSave = () => {
        if (editingField) {
            const updatedFields = fields.map(f =>
                f.id === editingField.id ? { ...editingField, ...newField } : f
            );
            updateFields(updatedFields);
        } else {
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


    const handleSave = () => {
        if (!newField.label.trim()) return alert("Label is required");

        setConfirmTitle(editingField ? "Update Custom Field" : "Add Custom Field");
        setConfirmMessage(editingField ? "Save changes to this field?" : "Add this new custom field?");
        setConfirmAction(() => () => {
            processSave();
            setConfirmOpen(false);
        });

        setConfirmOpen(true);
    };

  
    const handleDelete = (id) => {
        setConfirmTitle("Delete Field");
        setConfirmMessage("Are you sure? This action cannot be undone.");
        setConfirmAction(() => () => {
            updateFields((fields || []).filter(f => f.id !== id));
            setConfirmOpen(false);
        });
        setConfirmOpen(true);
    };

    if (isLoading) return <div>Loading...</div>;

    const formTitle = editingField ? 'Edit Custom Field' : 'Add New Custom Field';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="md:col-span-1">
                <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
                    <CardHeader className="pb-3 border-b dark:border-gray-600">
                        <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                            <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                            {formTitle}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-5">

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Label</label>
                                <input
                                    type="text"
                                    value={newField.label}
                                    onChange={e => setNewField({ ...newField, label: e.target.value })}
                                    placeholder="e.g. Gender, Department"
                                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Type</label>
                                <select
                                    value={newField.type}
                                    onChange={e => setNewField({ ...newField, type: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
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
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">Dropdown Options</label>
                                    <input
                                        type="text"
                                        value={(newField.options || []).join(',')}
                                        onChange={e => setNewField({ ...newField, options: e.target.value.split(',') })}
                                        placeholder="Example: Male, Female, Other"
                                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
                                    />
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={newField.required}
                                    onChange={e => setNewField({ ...newField, required: e.target.checked })}
                                    className="h-5 w-5 rounded border focus:ring-indigo-500"
                                />
                                <label className="text-sm">Required Field</label>
                            </div>
                            <div className="space-y-2">
                                <button
                                    onClick={handleSave}
                                    className="w-full flex justify-center gap-2 items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition font-semibold"
                                >
                                    <Plus size={18} />
                                    {editingField ? 'Update Field' : 'Add Field'}
                                </button>

                                {editingField && (
                                    <button
                                        onClick={() => {
                                            setEditingField(null);
                                            setNewField({ label: '', type: 'text', required: false, options: [] });
                                        }}
                                        className="w-full px-4 py-2 text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg"
                                    >
                                        Cancel Editing
                                    </button>
                                )}
                            </div>
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
                                <li key={field.id} className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{field.label} </p>
                                       
                                    </div>

                                    <div className="flex gap-3">
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

            <ConfirmModal
                open={confirmOpen}
                title={confirmTitle}
                message={confirmMessage}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={confirmAction}
            />
        </div>
    );
};

export default CustomFields;
