import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { AnimatedCard } from "../Components/ui/AnimatedCard";
import { login, signup } from "../Services/authApi";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => state.auth.error); // Get error directly from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      dispatch(login(email, password, navigate)); // Dispatch login action
    } else {
      dispatch(signup(email, username, password, navigate)); // Dispatch signup action
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  flex items-center justify-center p-4"
    >
      <AnimatedCard className="max-w-md w-full">
        <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 animate-pulse"></div>
              <Brain className="relative h-16 w-16 text-blue-500 mx-auto" />
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">SecondBrain</h2>
            <p className="mt-2 text-gray-400">Store your memories securely</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-center text-sm bg-red-500/10 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-3 py-2 mt-1
                           bg-gray-700/50 border border-gray-600/50 text-white
                           placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-blue-500/50 focus:border-transparent
                           transition-all duration-300"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="username" className="text-gray-300">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none rounded-xl relative block w-full px-3 py-2 mt-1
                           bg-gray-700/50 border border-gray-600/50 text-white
                           placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-blue-500/50 focus:border-transparent
                           transition-all duration-300"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-3 py-2 mt-1
                           bg-gray-700/50 border border-gray-600/50 text-white
                           placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-blue-500/50 focus:border-transparent
                           transition-all duration-300"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-xl
                       text-white bg-blue-600 hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2
                       focus:ring-blue-500 transition-colors duration-300"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Auth;
