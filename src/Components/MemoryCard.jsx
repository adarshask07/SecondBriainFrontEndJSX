
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { AnimatedCard } from './ui/AnimatedCard';



export const MemoryCard = ({ memory }) => {


  return (
    <AnimatedCard>
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl h-full p-6 border border-gray-700/50">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">{memory.title}</h3>
        
        </div>
        <p className="text-gray-300 mb-4 line-clamp-3">{memory.content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {memory.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-richblack-600/50 text-gray-300 text-sm rounded-full hover:bg-gray-600/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(memory.createdAt).toLocaleDateString()}
        </div>
      </div>
    </AnimatedCard>
  );
};
