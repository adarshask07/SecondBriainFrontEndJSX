import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMemory, getMemories } from "../Services/memoriesApi";
import { useNavigate } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import { MemoryForm } from "@/Components/MemoryForm";
import SearchBar from "@/Components/SearchBar";
import { AIResponseSection } from "@/Components/AIResponseSection";
import { RelatedMemoriesSection } from "@/Components/RelatedMemoriesSection";
import { NormalMemories } from "@/Components/NormalMemories";
import { Container } from "@/Components/ui/Container";
import { apiConnector } from "@/Services/apiConnector";
import { getSearch } from "@/Services/searchApi";

const Memories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aiResponse, setAIResponse] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [relatedContent, setRelatedContent] = useState([])  ;
  const [showForm, setShowForm] = useState(false);
  const content = useSelector((state) => state.brain.memories || []);
  const token = useSelector((state) => state.auth.token);
  const [loadingSearch, setLoadingSearch] = useState(false)
  const loading = useSelector((state)=> state.brain.loading)
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
      dispatch(createMemory(token, newMemory));
      setShowForm(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setAIResponse(null);
      setShowSearchResults(false);
      return;
    }


    try {
      setShowSearchResults(true);
      setLoadingSearch(true) ;
      const response = await getSearch(token, searchTerm) ;
      setAIResponse(response.data || []);
      setRelatedContent(response.relatedData)
      console.log(response)


     
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
    setLoadingSearch(false) ;
  };


  const handleSearchTermChange = (term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setAIResponse(null);
      setShowSearchResults(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar onNewMemory={() => setShowForm(true)} />
      {showForm && (
        <MemoryForm
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
      <main className="py-8">
        <Container>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchTermChange}
            onSearch={handleSearch}
          />
          {showSearchResults ? (
            <>
              <AIResponseSection aiResponse={aiResponse}  loading={loadingSearch}/>
              <RelatedMemoriesSection
                relatedMemories={relatedContent}
                searchTerm={searchTerm}
                loading={loadingSearch}
              />
            </>
          ) : (
            <NormalMemories content={content} loading={loading} />
          )}
        </Container>
      </main>
    </div>
  );
};

export default Memories;
