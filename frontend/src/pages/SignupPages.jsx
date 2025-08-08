import { useState } from 'react';
import { UserPlus, User, Mail, Lock, Loader } from 'lucide-react';
import { authUser } from '../api/authApi.js';

function SignupPages() {
  const { signup, loading } = authUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);
    if (success) {
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-2xl w-full grid md:grid-cols-2 gap-6 p-6 bg-gray-800 rounded-xl shadow-lg">
        
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-blue-500">E-Commerce Store</h1>
          <p className="mt-2 text-sm text-gray-400">Create your account to start shopping.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-500 text-center mb-6">Register Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 w-full py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 w-full py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="********"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
              {loading ? <Loader className="h-5 w-5 animate-spin" /> : <UserPlus className="h-5 w-5 text-white" />}
              {loading ? "Registering..." : "Register Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPages;
