import { useSWRLocalStorage } from "./useSWRLocalStorage";
import { keys } from "../api/storage";
import { createCustomField } from "../types";

export const useCustomFields = () => {
  const { data: fields = [], update, isLoading, error } =
    useSWRLocalStorage(keys.CUSTOM_FIELDS_KEY);

  const addField = (payload) => {
    const obj = createCustomField({
      id: `cf-${Date.now()}`,
      label: payload.label,
      key: payload.key || payload.label.toLowerCase().replace(/\s+/g, "_"),
      type: payload.type,
      required: !!payload.required,
      options: payload.options || undefined,
    });

    update([...(fields || []), obj]);
  };

  const updateField = (id, payload) => {
    const updated = (fields || []).map((f) => (f.id === id ? { ...f, ...payload } : f));
    update(updated);
  };

  const deleteField = (id) => {
    update((fields || []).filter((f) => f.id !== id));
  };

  return { fields, isLoading, error, addField, updateField, deleteField };
};
