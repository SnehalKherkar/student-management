import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/Card";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useCustomFields } from "../../hooks/useCustomFields";
import { toast } from "react-toastify";

const CustomFields = () => {
  const { fields = [], addField, updateField, deleteField, isLoading } =
    useCustomFields();

  const [form, setForm] = useState({
    label: "",
    type: "text",
    required: false,
    options: [],
  });

  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const [error, setError] = useState("");


  useEffect(() => {
    const watcher = () => {
      setShowForm(window.innerWidth > 768); 
    };
    watcher();
    window.addEventListener("resize", watcher);
    return () => window.removeEventListener("resize", watcher);
  }, []);

  if (isLoading) return <div className="text-center p-6">Loading...</div>;

  const resetForm = () =>
    setForm({ label: "", type: "text", required: false, options: [] });

  const validateAndSave = () => {
    if (!form.label.trim()) {
      setError("Label is required");
      return;
    }

    if (
      form.type === "dropdown" &&
      (!form.options.length || form.options.every((o) => !o.trim()))
    ) {
      setError("At least one option is required");
      return;
    }

    setError("");

    if (editing) {
      updateField(editing.id, {
        ...form,
        key: form.label.toLowerCase().replace(/\s+/g, "_"),
      });
      toast.success("Field updated!");
    } else {
      addField({
        ...form,
        key: form.label.toLowerCase().replace(/\s+/g, "_"),
      });
      toast.success("Field added!");
    }

    resetForm();
    setEditing(null);
  };

  const confirmDelete = (id) => {
    setConfirmTitle("Delete Field");
    setConfirmMessage("Are you sure you want to delete this field?");
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

        <button
          onClick={() => setShowForm(!showForm)}
          className="md:hidden w-full py-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
        >
          {showForm ? <ChevronUp /> : <ChevronDown />}
          {showForm ? "Close Form" : "Add New Field"}
        </button>

        {showForm && (
          <Card className="border-none shadow-xl mt-3 bg-white/70 backdrop-blur-xl rounded-2xl">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                {editing ? "Edit Field" : "Add New Custom Field"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <div>
                <label className="text-sm font-medium text-gray-700">Label</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="e.g. Gender"
                  className="w-full px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Field Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="date">Date</option>
                  <option value="time">Time</option>
                </select>
              </div>

              {form.type === "dropdown" && (
                <div>
                  <label className="text-sm font-medium">Dropdown Options</label>
                  <input
                    type="text"
                    value={(form.options || []).join(",")}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        options: e.target.value
                          .split(",")
                          .map((o) => o.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="Male, Female, Other"
                    className="w-full px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.required}
                  onChange={(e) =>
                    setForm({ ...form, required: e.target.checked })
                  }
                  className="h-5 w-5 accent-indigo-600"
                />
                <span className="text-sm">Required Field</span>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="space-y-2">
                <button
                  onClick={validateAndSave}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow hover:opacity-90"
                >
                  {editing ? "Update Field" : "Add Field"}
                </button>

                {editing && (
                  <button
                    onClick={() => {
                      setEditing(null);
                      resetForm();
                    }}
                    className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="md:col-span-2">
        <Card className="shadow-xl bg-white/70 backdrop-blur-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Existing Fields
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {fields.map((f) => (
                <div
                  key={f.id}
                  className="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{f.label}</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditing(f);
                        setForm({ ...f });
                        setShowForm(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Edit size={20} />
                    </button>

                    <button
                      onClick={() => confirmDelete(f.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
