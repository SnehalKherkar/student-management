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
          bg-white/95 dark:bg-gray-900/95
          backdrop-blur-xl
          shadow-[0_10px_50px_rgba(0,0,0,0.4)]
          rounded-l-[28px]
          animate-slideInRight
          border-l border-white/20 dark:border-gray-700/40
          overflow-y-auto
          z-[1000]
        "
      >
        <div
          className="
            sticky top-0 z-20
            backdrop-blur-2xl bg-white/75 dark:bg-gray-900/60
            border-b border-gray-300/40 dark:border-gray-700/40
            flex items-center justify-between
            px-6 sm:px-8 py-4
          "
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full shadow-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            aria-label="Close drawer"
          >
            <X size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
        <div className="px-4 sm:px-7 md:px-9 py-6 sm:py-8">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
