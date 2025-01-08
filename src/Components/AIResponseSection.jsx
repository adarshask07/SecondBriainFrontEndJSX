import { Skeleton } from "./ui/skeleton";


export const AIResponseSection = ({ aiResponse, loading }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-white mb-4">
      AI-Generated Suggestions
    </h2>
    <div className="p-4 bg-gray-800 text-gray-300 rounded-md">
      {loading ? (
        <>
          <Skeleton className="h-8 rounded-md mb-4" />
          <Skeleton className="h-32 w-full mb-2" />
         
        </>
      ) : aiResponse ? (
        <>
          <h3 className="text-lg font-semibold text-white mb-2">{aiResponse.title}</h3>
          <p>{aiResponse.content}</p>
        </>
      ) : (
        "No suggestions available."
      )}
    </div>
  </div>
);
