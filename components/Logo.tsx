import React from 'react';

export const Logo: React.FC<{className?: string}> = ({ className }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-cyan-400"
            >
                <path
                    d="M16.882 7.118C15.938 6.174 14.632 5.657 13.29 5.657H8V8.657H12.5C13.21 8.657 13.894 8.926 14.414 9.445C14.933 9.965 15.201 10.648 15.201 11.357C15.201 12.067 14.933 12.75 14.414 13.27C13.894 13.789 13.21 14.057 12.5 14.057H10.5V17.057H13.29C14.632 17.057 15.938 16.54 16.882 15.596C17.826 14.652 18.343 13.346 18.343 12C18.343 10.654 17.826 9.348 16.882 7.118Z"
                    fill="currentColor"
                />
                <path
                    d="M7.118 16.882C8.062 17.826 9.368 18.343 10.71 18.343H16V15.343H11.5C10.79 15.343 10.106 15.074 9.586 14.555C9.067 14.035 8.799 13.352 8.799 12.643C8.799 11.933 9.067 11.25 9.586 10.73C10.106 10.211 10.79 9.943 11.5 9.943H13.5V6.943H10.71C9.368 6.943 8.062 7.46 7.118 8.404C6.174 9.348 5.657 10.654 5.657 12C5.657 13.346 6.174 14.652 7.118 16.882Z"
                    fill="currentColor"
                />
            </svg>
            <span className="text-2xl font-bold tracking-tighter">
                <span className="text-cyan-400">System</span>
                <span className="text-white">Sync</span>
            </span>
        </div>
    );
};
