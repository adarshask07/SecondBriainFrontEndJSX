import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Auth from './pages/Auth';
import Hello from './pages/hello';
import { AnimatedCard } from './Components/ui/AnimatedCard';
import Memories from './pages/Memories';
import MemoryPage from './pages/MemoryPage';
import toast from 'react-hot-toast';

// import { Memories } from './pages/Memories';

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token); // Access token from the state

  if (!token) {
    // toast.error("Please log in again.");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/memories");
  //   } else {
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <AuthProvider >
      <Routes >
        <Route path="/" element={<Auth />} />
        <Route path='/memories' element={<PrivateRoute><Memories/></PrivateRoute>}/>
        <Route path='/memory/:id' element={<PrivateRoute><MemoryPage/></PrivateRoute>}/>
        {/* <Route  path='/'  element={ <AnimatedCard> <Hello/> </AnimatedCard>}></Route> */}
        {/* <Route
          path="/memories"
          element={
            <PrivateRoute>
              <Memories />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </AuthProvider>
  );
};

export default App;
