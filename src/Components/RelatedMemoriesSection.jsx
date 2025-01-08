import React from "react";
import { Link } from "react-router-dom";
import { MemoryCard } from "./MemoryCard";
import { Skeleton } from "./ui/skeleton";


export const RelatedMemoriesSection = ({ relatedMemories, searchTerm, loading }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-white mb-4">
      Memories Related to Your Search
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        // Skeleton loader
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-lg p-4 flex flex-col space-y-4"
          >
            <Skeleton className="h-48 rounded-md mb-4" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ))
      ) : relatedMemories.length > 0 ? (
        relatedMemories.map((memory) => (
          <Link to={`/memory/${memory._id}`} key={memory._id}>
            <MemoryCard memory={memory} />
          </Link>
        ))
      ) : (
        <p className="text-gray-400">
          No related memories found for "{searchTerm}".
        </p>
      )}
    </div>
  </div>
);
