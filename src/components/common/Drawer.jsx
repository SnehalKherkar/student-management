import React from 'react';
import { X } from 'lucide-react';

const Drawer = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
            
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="relative w-screen max-w-md">
                    
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                            type="button"
                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white" id="slide-over-title">
                                {title}
                            </h2>
                        </div>

                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Drawer;
