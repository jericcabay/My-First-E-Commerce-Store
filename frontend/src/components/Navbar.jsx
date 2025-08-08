import { Link } from 'react-router-dom';
import { UserPlus, LogIn, ShoppingCart } from 'lucide-react';
import { authUser } from '../api/authApi';
import ProfileNavbar from './ProfileNavbar';
import { CartApi } from '../api/cartApi';
import { registerUser } from '../api/registerApi';
import { useEffect } from 'react';

function Navbar() {
  const { user } = authUser();
  const isAdmin = user?.role === "seller";
  const { profile, fetchProfile } = registerUser();
  const { cart } = CartApi();

  useEffect(() => {
    if (user?.role === "seller") {
      fetchProfile();
    }
  }, [user]);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-600 items-center space-x-2 flex">
            {profile?.titleStore || "E-commerce"}
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link to="/" className="text-purple-600 hover:text-cyan-600 transition duration-300">
              Home
            </Link>

            {isAdmin ? (
              <button>
                <Link to="/seller">Admin Dashboard</Link>
              </button>
            ) : ("")}
            
            {!isAdmin ? (<Link
                to="/cart"
                className="relative group text-gray-300 hover:text-cyan-300 transition duration-300 ease-in-out"
              >
                <span className="hidden sm:inline">Cart</span>
                <ShoppingCart className="inline-block mr-1 group-hover:text-cyan-400" size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-cyan-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-cyan-400 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>) : ("")}

            {user ? (
              <ProfileNavbar />
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} /> Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} /> Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
