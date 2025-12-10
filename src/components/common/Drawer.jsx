import React from "react";
import { X } from "lucide-react";

const Drawer = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[999] flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white rounded-l-2xl shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white/80 backdrop-blur px-5 py-4 flex items-center justify-between border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <X size={18} />
          </button>
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
