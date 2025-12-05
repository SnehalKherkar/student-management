import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({ open, title, message, onCancel, onConfirm }) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-[9999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm sm:max-w-md"
                        initial={{ scale: 0.85, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.85, opacity: 0, y: 40 }}
                        transition={{ type: "spring", duration: 0.35 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="text-red-500" size={26} />
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {title}
                            </h2>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                            {message}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={onCancel}
                                className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onConfirm}
                                className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
