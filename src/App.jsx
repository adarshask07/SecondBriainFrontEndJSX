import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import Auth from './pages/Auth';
import Hello from './pages/hello';
import { AnimatedCard } from './Components/ui/AnimatedCard';

// import { Memories } from './pages/Memories';

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token); // Directly access the token from state
  return token ? <>{children}</> : <Navigate to="/" />;
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
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
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
