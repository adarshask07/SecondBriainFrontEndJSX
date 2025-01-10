import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2, Save, X, Calendar, ArrowLeft } from "lucide-react";

import { AnimatedCard } from "@/Components/ui/AnimatedCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteMemory, getMemory, getMoreAboutCard, updateMemories } from "@/Services/memoriesApi";
import { Skeleton } from "@/Components/ui/skeleton";

const MemoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [memory, setMemory] = useState(null);
  const [editedMemory, setEditedMemory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [getMoreLoading, setGetMoreLoading] = useState(false);
  const [moreData, setMoreData] = useState(null);
  const dispatch = useDispatch();

  const fetchMemory = async () => {
    setLoading(true);
    setGetMoreLoading(true) ;
    setError(null);

    try {
      const response = await getMemory(token, id);
      setMemory(response);
      setEditedMemory(response);
      setLoading(false) ;
      await fetchMoreInfo(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setGetMoreLoading(false);
    }
  };

  const fetchMoreInfo = async (memory) => {
    try {
      setGetMoreLoading(true);
      const response = await getMoreAboutCard(memory, token);
      if (response?.success) {
        setMoreData(response.data);
       
      }
    } catch (err) {
      console.error("Error fetching more info:", err);
    } finally {
      setGetMoreLoading(false);
    }
  };

  useEffect(() => {
    fetchMemory();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    if (!editedMemory) return;
    setLoading(true);
    try {
      const response = await updateMemories(token, editedMemory);
      if (response) {
        setMemory(response);
        setIsEditing(false);
        await fetchMoreInfo(response) ;
      }
    } catch (err) {
      console.error("Error saving memory:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (memoryId) => {
    setLoading(true);
    try {
      const response = await deleteMemory(token, memoryId);
      if (response?.success) {
        navigate("/memories");
      }
    } catch (err) {
      console.error("Error deleting memory:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMemory({ ...memory });
  };

  const handleTagChange = (index, event) => {
    const newTags = [...editedMemory.tags];
    newTags[index] = event.target.value;
    setEditedMemory({ ...editedMemory, tags: newTags });
  };

  const handleAddTag = () => {
    setEditedMemory({ ...editedMemory, tags: [...editedMemory.tags, ""] });
  };

  const handleRemoveTag = (index) => {
    const newTags = editedMemory.tags.filter((_, i) => i !== index);
    setEditedMemory({ ...editedMemory, tags: newTags });
  };

  if (loading)
    return (
      <div className="p-4 h-screen bg-gray-800 shadow-md">
        <Skeleton className="h-48 rounded-md mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-start justify-center">
      <AnimatedCard className="w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
        <button
          onClick={() => window.history.back()}
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
        <div className="mt-6  ">
            <h4 className="text-xl font-semibold text-white mb-4">More Info From AI</h4>
            {getMoreLoading ? (
             <div className="p-4  bg-gray-800 shadow-md">
             <Skeleton className="h-4 rounded-md mb-4" />
             <Skeleton className="h-2 w-1/2 mb-2" />
             <Skeleton className="h-2 w-1/3" />
           </div>
            ) : (
              <div className="text-gray-300 space-y-3 bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
                <h5 className="text-lg font-bold text-gray-200">{moreData?.title || ""}</h5>
                <ul className="list-disc list-inside space-y-2">
                  {moreData?.content?.map((item, index) => (
                    <li key={index} className="text-gray-400">{item.point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      </AnimatedCard>
    </div>
  ) 
}


export default MemoryPage ;