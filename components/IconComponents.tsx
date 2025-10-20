import React from 'react';

export const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CrossIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const WindowsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h8.5v8.5H3V3m9.5 0H21v8.5h-8.5V3M3 12.5h8.5V21H3v-8.5m9.5 0H21V21h-8.5v-8.5z"/>
    </svg>
);

export const AndroidIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6,18H4V16.5A2.5,2.5 0 0,1 6.5,14H7.5V12.5A2.5,2.5 0 0,1 10,10H14A2.5,2.5 0 0,1 16.5,12.5V14H17.5A2.5,2.5 0 0,1 20,16.5V18H18V16.5C18,16.2 17.8,16 17.5,16H6.5C6.2,16 6,16.2 6,16.5V18M10,10A1,1 0 0,0 9,9V7A1,1 0 0,0 10,6H14A1,1 0 0,0 15,7V9A1,1 0 0,0 14,10H10M10.5,9H13.5V7H10.5V9M7,9.5A1.5,1.5 0 0,1 5.5,8A1.5,1.5 0 0,1 7,6.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 7,9.5M17,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,6.5A1.5,1.5 0 0,1 18.5,8A1.5,1.5 0 0,1 17,9.5Z" />
    </svg>
);