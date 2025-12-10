import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/Card";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useCustomFields } from "../../hooks/useCustomFields";
import { toast } from "react-toastify";

const CustomFields = () => {
  const { fields = [], addField, updateField, deleteField, isLoading } = useCustomFields();

  const [form, setForm] = useState({ label: "", type: "text", required: false, options: [] });
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [error, setError] = useState("");

  if (isLoading) return <div className="text-center p-6">Loading...</div>;

  const resetForm = () => setForm({ label: "", type: "text", required: false, options: [] });

  const validateAndSave = () => {
    const label = (form.label || "").trim();
    if (!label) {
      setError("Label is required");
      return;
    }
    if (form.type === "dropdown" && (!form.options || form.options.length === 0 || form.options.every(o => !o.trim()))) {
      setError("Provide at least one dropdown option");
      return;
    }
    setError("");

    if (editing) {
      updateField(editing.id, { ...form, key: form.key || label.toLowerCase().replace(/\s+/g, "_") });
      toast.success("Field updated");
    } else {
      addField({ ...form, key: form.key || label.toLowerCase().replace(/\s+/g, "_") });
      toast.success("Field added");
    }

    resetForm();
    setEditing(null);
  };

  const confirmDelete = (id) => {
    setConfirmTitle("Delete Field");
    setConfirmMessage("Delete this custom field? This cannot be undone.");
    setConfirmAction(() => () => {
      deleteField(id);
      toast.error("Field deleted");
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="pb-3 border-b dark:border-gray-600">
            <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
              {editing ? "Edit Custom Field" : "Add New Custom Field"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Label</label>
                <input type="text" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="e.g. Gender" className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition">
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="date">Date</option>
                  <option value="time">Time</option>
                </select>
              </div>

              {form.type === "dropdown" && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Options (comma separated)</label>
                  <input type="text" value={(form.options || []).join(",")} onChange={e => setForm({ ...form, options: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} placeholder="Male, Female, Other" className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition" />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={!!form.required} onChange={e => setForm({ ...form, required: e.target.checked })} className="h-5 w-5 rounded border focus:ring-indigo-500" />
                <label className="text-sm">Required Field</label>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="space-y-2">
                <button onClick={validateAndSave} className="w-full flex justify-center gap-2 items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition font-semibold">
                  <Plus size={18} />
                  {editing ? "Update Field" : "Add Field"}
                </button>

                {editing && <button onClick={() => { setEditing(null); resetForm(); }} className="w-full px-4 py-2 text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg">Cancel</button>}
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
              {(fields || []).map(f => (
                <li key={f.id} className="p-3 rounded-md bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{f.label}</p>
                    <p className="text-xs text-gray-500">{f.type}{f.required ? " • required" : ""}</p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => { setEditing(f); setForm({ ...f, options: f.options || [] }); }} className="text-indigo-600 hover:text-indigo-900"><Edit size={18} /></button>
                    <button onClick={() => confirmDelete(f.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <ConfirmModal open={confirmOpen} title={confirmTitle} message={confirmMessage} onCancel={() => setConfirmOpen(false)} onConfirm={() => { if (confirmAction) confirmAction(); }} />
    </div>
  );
};

export default CustomFields;
