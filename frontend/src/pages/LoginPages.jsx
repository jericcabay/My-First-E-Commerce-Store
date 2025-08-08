import { User, Mail, Lock, Loader } from 'lucide-react';
import { useState } from 'react';
import { authUser } from '../api/authApi.js';

function LoginPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = authUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-2xl w-full grid md:grid-cols-2 gap-6 p-6 bg-gray-800 rounded-xl shadow-lg">
        
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-blue-500">E-Commerce Store</h1>
          <p className="mt-2 text-sm text-gray-400">Welcome back! Please login to your account.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-500 text-center mb-6">Login Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 w-full py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 w-full py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-purple-600 hover:bg-cyan-500 transition rounded-md text-white font-medium disabled:opacity-50"
            >
              {loading ? <Loader className="h-5 w-5 animate-spin" /> : <User className="h-5 w-5 text-white" />}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPages;
