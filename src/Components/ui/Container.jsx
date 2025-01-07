import React from 'react';

export const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);
