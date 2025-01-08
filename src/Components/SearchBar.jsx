import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="relative mb-8 group flex items-center">
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400
                      transition-colors group-focus-within:text-blue-400"
    />
    <input
      type="text"
      placeholder="Search memories..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-grow pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur-lg rounded-xl
                text-white placeholder-gray-400 border border-gray-700/50
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                transition-all duration-300"
    />
    <button
      onClick={onSearch}
      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg
                 hover:bg-blue-600 focus:outline-none focus:ring-2
                 focus:ring-blue-500/50 focus:ring-offset-1
                 transition-all duration-300"
    >
      Search
    </button>
  </div>
);

export default SearchBar;
