import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import defaultAvatar from "../../public/images/proxy-image.jpg";
import { authUser } from '../api/authApi';

function ProfileNavbar() {
  const { logout, user } = authUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();

  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative bg-gra inline-block text-left' ref={dropDownRef}>
      <button
        onClick={toggleDropDown}
        className='flex items-center gap-3 px-3 py-2 rounded-full border border-cyan-500 bg-white shadow-md hover:shadow-lg transition-all duration-300'
      >
        <img
          src={user?.profileImage || defaultAvatar}
          alt='Profile'
          className='w-6 h-6 rounded-full object-cover border border-cyan-400'
        />
        <span className='text-sm font-medium text-gray-800'>{user?.name || 'User'}</span>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl z-50 overflow-hidden animate-fadeInUp'>
          <Link to='/profile' className='block px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 transition'>
            Profile
          </Link>
          
          <Link to='/sellerForm' className='block px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 transition'>
            Register Seller
          </Link>
          
          <Link to='/rider' className='block px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 transition'>
            Register Rider
          </Link>
          
          <Link to='/purchase' className='block px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 transition'>
            Purchase status
          </Link>

          <Link to='/settings' className='block px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 transition'>
            Settings
          </Link>
          
          <button onClick={logout} className='flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-200'>
            <LogOut size={18} className='mr-2' /> Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileNavbar;
