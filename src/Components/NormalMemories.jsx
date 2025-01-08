import React from "react";
import { Link } from "react-router-dom";
import { MemoryCard } from "./MemoryCard";
import { Skeleton } from "@/Components/ui/skeleton";

export const NormalMemories = ({ content, loading }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {loading
      ? Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-800 shadow-md"
          >
            <Skeleton className="h-48 rounded-md mb-4" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ))
      : content.map((memory) => (
          <Link to={`/memory/${memory._id}`} key={memory._id}>
            <MemoryCard memory={memory} />
          </Link>
        ))}
    {!loading && content.length === 0 && (
      <div className="text-center text-gray-400 mt-12">
        Add your first memory.
      </div>
    )}
  </div>
);
