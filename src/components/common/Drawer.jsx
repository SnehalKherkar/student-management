import React from "react";
import { X } from "lucide-react";

const Drawer = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex">
   
      <div
        className="absolute inset-0 bg-black/60 animate-fadeIn"
        onClick={onClose}
      />

      <div
        className="
          absolute right-0 top-0 h-full w-full max-w-xl
          bg-white dark:bg-gray-900
          shadow-xl border-l border-gray-200 dark:border-gray-700
          rounded-l-2xl
          overflow-y-auto
          animate-slideInRight
          z-[1000]
        "
      >
      
        <div
          className="
            sticky top-0 z-20
            bg-white/90 dark:bg-gray-900/90
            backdrop-blur-md
            border-b border-gray-300/40 dark:border-gray-700/40
            flex items-center justify-between
            px-5 py-4
          "
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              p-2 rounded-full bg-gray-100 hover:bg-gray-200 
              dark:bg-gray-700 dark:hover:bg-gray-600 
              transition
            "
          >
            <X size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-10">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
