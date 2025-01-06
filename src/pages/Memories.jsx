import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { MemoryCard } from '../components/MemoryCard';
import { MemoryForm } from '../components/MemoryForm';
import { SearchBar } from '../components/SearchBar';
import { Container } from '../components/ui/Container';

import { useAppDispatch, useAppSelector } from '../hooks';
import { handleGetMemories } from '../Services/memoriesApi';
import { setMemories } from '../Slices/memorySlice';

const Memories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const token = useAppSelector((state) => state.auth.token); // Access token from store
  const [content, setContent] = useState([]);

  const dispatch = useAppDispatch();

  // Fetch memories from API when token changes
  useEffect(() => {
    if (token) {
      const fetchMemories = async () => {
        try {
          const fetchedMemories = await handleGetMemories(token); // Get memories from API
          dispatch(setMemories(fetchedMemories)); // Store memories in Redux store
          setContent(fetchedMemories);
        } catch (error) {
          console.error('Error fetching memories:', error);
        }
      };

      fetchMemories();
    }
  }, [token, dispatch]); // Only run when token or dispatch changes

  useEffect(() => {
    console.log(content); // Log the updated content when state changes
  }, [content]); // This effect runs every time the content in state changes

  const handleCreateMemory = async (newMemory) => {
    try {
      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMemory),
      });
      const savedMemory = await response.json();
      setMemories((prev) => [...prev, savedMemory]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating memory:', error);
    }
  };

  const handleUpdateMemory = async (updatedMemory) => {
    try {
      const response = await fetch(`/api/memories/${updatedMemory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMemory),
      });
      const savedMemory = await response.json();
      setMemories((prev) =>
        prev.map((memory) =>
          memory.id === savedMemory.id ? savedMemory : memory
        )
      );
      setEditingMemory(null);
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  const handleDeleteMemory = async (id) => {
    try {
      await fetch(`/api/memories/${id}`, {
        method: 'DELETE',
      });
      setMemories((prev) => prev.filter((memory) => memory.id !== id));
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar onNewMemory={() => setShowForm(true)} />

      <main className="py-8">
        <Container>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((memory) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onEdit={setEditingMemory}
                onDelete={handleDeleteMemory}
              />
            ))}
          </div>

          {content.length === 0 && (
            <div className="text-center text-gray-400 mt-12">
              {searchTerm ? 'No memories found' : 'Add your first memory'}
            </div>
          )}
        </Container>
      </main>

      {(showForm || editingMemory) && (
        <MemoryForm
          memory={editingMemory || undefined}
          onSubmit={editingMemory ? handleUpdateMemory : handleCreateMemory}
          onClose={() => {
            setShowForm(false);
            setEditingMemory(null);
          }}
        />
      )}
    </div>
  );
};

export default Memories;
