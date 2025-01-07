import React, { useState } from "react";
import { X } from "lucide-react";

export const MemoryForm = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const handleCreate = (e) => {
    e.preventDefault();
    const newMemory = { title, content, tags };
    onSubmit(newMemory);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-gray-800/95 backdrop-blur-lg rounded-xl p-6 w-full max-w-md border border-gray-700/50 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Create Memory</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-400 mb-1"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter memory title"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-400 mb-1"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter memory description"
              rows={4}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Tags
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Press Enter to add a tag"
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-600 text-white text-sm px-2 py-1 rounded-md flex items-center space-x-1"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="text-gray-200 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Memory
          </button>
        </form>
      </div>
    </div>
  );
};
