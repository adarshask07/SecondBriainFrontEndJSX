import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { AnimatedCard } from "@/Components/ui/AnimatedCard";
import { login, signup } from "@/Services/authApi";
import { useDispatch, useSelector } from "react-redux";
import boy from "@/assets/boy1.png";
import Mylogo from "@/Components/ui/Mylogo";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.auth.token); // Get token directly from Redux state

  const error = useSelector((state) => state.auth.error); // Get error directly from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      dispatch(login(email, password, navigate)); // Dispatch login action
    } else {
      dispatch(signup(email, username, password, navigate)); // Dispatch signup action
      setIsLogin(true);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/memories");
    }
  }, []);

  return (

    
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col p-4">
  
  <div className="my-4 mx-auto w-full max-w-lg px-6 py-4 bg-gray-800/40 backdrop-blur-lg border border-gray-600 rounded-lg shadow-md text-center">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">
      Your memories, now in your language
    </h2>
    <p className="text-sm text-gray-300 mt-2 italic">
      Because emotions feel best expressed in your mother tongue. ❤️
    </p>
  </div>

  <AnimatedCard className="max-w-md w-full">
    <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 shadow-xl">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-80 animate-pulse"></div>
          <Mylogo className="relative h-20 w-20 text-blue-500 mx-auto" />
        </div>
        <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white tracking-wide">
          SecondBrain
        </h2>
        <p className="mt-2 text-gray-400 italic">
          Because even geniuses need a backup brain.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-500 text-center text-sm bg-red-500/10 py-2 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label htmlFor="email" className="text-gray-300 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-xl relative block w-full px-4 py-3 mt-1 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="username" className="text-gray-300 text-sm">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 mt-1 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="text-gray-300 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-xl relative block w-full px-4 py-3 mt-1 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 shadow-lg transform "
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    </div>
  </AnimatedCard>

  {/* Footer at the bottom */}
  <footer className="text-center mt-4 text-gray-500">
    Made with Love <span className="text-red-500">❤️</span> by Adarsh
  </footer>
</div>


  );
};

export default Auth;
