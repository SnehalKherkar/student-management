import React from 'react';

export const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => {
    return (
        <div className={`pb-4 border-b border-gray-200 dark:border-gray-700 mb-4 ${className}`}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className = '' }) => {
    return (
        <h3 className={`text-lg font-semibold leading-6 text-gray-900 dark:text-white ${className}`}>
            {children}
        </h3>
    );
};

export const CardContent = ({ children, className = '' }) => {
    return (
        <div className={`text-sm text-gray-600 dark:text-gray-300 ${className}`}>
            {children}
        </div>
    );
};
