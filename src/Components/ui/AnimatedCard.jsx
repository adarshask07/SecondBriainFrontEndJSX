import React from 'react';

export const AnimatedCard = ({ children, className = '' }) => (
  <div
    className={`
      opacity-0 animate-fadeIn
      transform transition-all duration-300 ease-out
      hover:scale-105 hover:shadow-xl
      rounded-3xl overflow-hidden
      ${className}
    `}
  >
    {children}
  </div>
);
