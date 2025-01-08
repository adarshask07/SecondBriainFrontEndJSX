import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2, Save, X, Calendar, ArrowLeft } from "lucide-react";

import { AnimatedCard } from "@/Components/ui/AnimatedCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteMemory, getMemory, updateMemories } from "@/Services/memoriesApi";
import { Skeleton } from "@/Components/ui/skeleton";


const MemoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [memory, setMemory] = useState(null); // change initial state to null
  const [editedMemory, setEditedMemory] = useState(null); // change initial state to null
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  //   const memory =
  //     {
  //         "_id": "6777f955fcd84a939e13e4f2",
  //         "title": "My First Marathon",
  //         "content": "Running my first marathon was an incredible experience. The physical and mental endurance it took to complete it taught me the value of perseverance. Crossing that finish line was a moment of triumph for me.",
  //         "tags": [
  //             "Marathon",
  //             "Fitness",
  //             "Achievement",
  //             "Endurance"
  //         ],
  //         "createdAt": "2025-01-03T14:51:01.990Z",
  //         "updatedAt": "2025-01-03T14:51:01.990Z",

  //     }

  async function fetchMemory() {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await getMemory(token, id);
      setMemory(response); // Set fetched memory to state
      setEditedMemory(response); // Set the same data to editedMemory for editing
      console.log(memory);
    } catch (error) {
      setError(error.message); // Set error state if any
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  }

  useEffect(() => {
    fetchMemory();
  }, []); // This will run when token or id changes

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedMemory) return; // Exit early if there's nothing to save
  
    setIsEditing(false);
    setLoading(true);
  
    try {
      const response = await updateMemories(token, editedMemory);
      console.log(response); 
  
      if (response) {
        setMemory(response); // Update memory only if the API call is successful
      } else {
        console.error("Failed to update memory.");
      }
    } catch (error) {
      console.error("Error saving memory:", error);
    } finally {
      setLoading(false); // Ensure loading is turned off in all cases
    }
  };
  

  const handleDelete = async (memoryId) => {
    try {
      // Show confirmation to the user before deletion
     
    //   const confirmed = window.confirm("Are you sure you want to delete this memory?");
    //   if (!confirmed) return;
      setLoading(true);
      // Dispatch delete action or make API call
      const response = await deleteMemory(token, memoryId); // Assuming deleteMemory is an async action
      console.log(response)
  
      if (response?.success) {
        console.log("Memory deleted successfully:");
        navigate("/memories"); // Navigate to the memories page
      } 
      
    } catch (error) {
      console.error("Error occurred while deleting memory:", error);
    }
    setLoading(false)

  };
  

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMemory({ ...memory });
  };

  // Handle tag input changes
  const handleTagChange = (index, event) => {
    const newTags = [...editedMemory.tags];
    newTags[index] = event.target.value;
    setEditedMemory({ ...editedMemory, tags: newTags });
  };

  // Add a new tag
  const handleAddTag = () => {
    setEditedMemory({ ...editedMemory, tags: [...editedMemory.tags, ""] });
  };

  // Remove a tag
  const handleRemoveTag = (index) => {
    const newTags = editedMemory.tags.filter((_, i) => i !== index);
    setEditedMemory({ ...editedMemory, tags: newTags });
  };

  // Avoid rendering until memory is fetched
  if (loading)
    return (
      <div className="p-4 h-screen  bg-gray-800 shadow-md">
        <Skeleton className="h-48 rounded-md mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-start justify-center">
      <AnimatedCard className="w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
        <button
          onClick={() => window.history.back()} // Navigates to the previous page
          className="mb-4 text-gray-400 hover:text-white bg-gradient-to-br to-gray-900 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-semibold text-white">
              {isEditing ? (
                <input
                  type="text"
                  value={editedMemory?.title || ""}
                  onChange={(e) =>
                    setEditedMemory({
                      ...editedMemory,
                      title: e.target.value,
                    })
                  }
                  className="bg-transparent text-2xl font-semibold text-white w-full"
                />
              ) : (
                memory?.title || "Loading..."
              )}
            </h3>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="p-3 hover:bg-gray-700/50 rounded-full transition-colors"
                    aria-label="Save memory"
                  >
                    <Save className="w-6 h-6 text-gray-400 hover:text-green-400" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-3 hover:bg-gray-700/50 rounded-full transition-colors"
                    aria-label="Cancel edit"
                  >
                    <X className="w-6 h-6 text-gray-400 hover:text-yellow-400" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className="p-3 hover:bg-gray-700/50 rounded-full transition-colors"
                    aria-label="Edit memory"
                  >
                    <Pencil className="w-6 h-6 text-gray-400 hover:text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(memory?._id)}
                    className="p-3 hover:bg-gray-700/50 rounded-full transition-colors"
                    aria-label="Delete memory"
                  >
                    <Trash2 className="w-6 h-6 text-gray-400 hover:text-red-400" />
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            {isEditing ? (
              <textarea
                value={editedMemory?.content || ""}
                onChange={(e) =>
                  setEditedMemory({
                    ...editedMemory,
                    content: e.target.value,
                  })
                }
                className="w-full h-48 bg-transparent text-gray-300 p-4 border border-gray-600 rounded-md"
              />
            ) : (
              memory?.content || "Loading..."
            )}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {isEditing ? (
              <>
                {editedMemory?.tags?.map((tag, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleTagChange(index, e)}
                      className="px-4 py-2 bg-gray-700 text-white text-lg rounded-full hover:bg-gray-600/50 transition-colors"
                    />
                    <button
                      onClick={() => handleRemoveTag(index)}
                      className="ml-3 text-gray-400 hover:text-red-400"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddTag}
                  className="text-blue-400 text-lg mt-3"
                >
                  + Add Tag
                </button>
              </>
            ) : (
              editedMemory?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-700 text-white text-lg rounded-full hover:bg-gray-600/50 transition-colors"
                >
                  {tag}
                </span>
              ))
            )}
          </div>
          <div className="flex items-center text-lg text-gray-400">
            <Calendar className="w-5 h-5 mr-3" />
            {new Date(memory?.createdAt).toLocaleDateString() || "Loading..."}
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default MemoryPage;
