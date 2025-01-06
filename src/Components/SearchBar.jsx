import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => (
  <div className="relative mb-8 group">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400
                      transition-colors group-focus-within:text-blue-400" />
    <input
      type="text"
      placeholder="Search memories..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur-lg rounded-xl
                text-white placeholder-gray-400 border border-gray-700/50
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                transition-all duration-300"
    />
  </div>
);

export default SearchBar;
