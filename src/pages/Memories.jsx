import React, { useState, useEffect } from "react";
import { MemoryCard } from "../components/MemoryCard";
import { MemoryForm } from "../components/MemoryForm";
import { Container } from "../components/ui/Container";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  createMemory,
  deleteMemory,
  getMemories,
  updateMemories,
} from "../Services/memoriesApi";

import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { Skeleton } from "@/Components/ui/skeleton";

const Memories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const content = useSelector((state) => state.brain.memories || []);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.brain.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getMemories(token, navigate));
    } else {
      navigate("/");
    }
  }, [token, dispatch, navigate]);

  const handleFormSubmit = (newMemory) => {
    if (newMemory.title && newMemory.content) {
      // Dispatch the action to create a new memory
      dispatch(createMemory(token, newMemory));

      // Close the form after submission
      setShowForm(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar onNewMemory={() => setShowForm(true)} />
      {showForm && (
        <MemoryForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />
      )}

      <main className="py-8">
        <Container>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

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
              : content?.map((memory) => (
                  <Link to={`/memory/${memory._id}`}>
                    <MemoryCard
                      
                      memory={memory}
                     
                    />
                  </Link>
                ))}
          </div>

          {content?.length === 0 && !loading && (
            <div className="text-center text-gray-400 mt-12">
              {searchTerm ? "No memories found" : "Add your first memory"}
            </div>
          )}
        </Container>
      </main>

    
    </div>
  );
};

export default Memories;
