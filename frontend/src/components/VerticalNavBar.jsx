import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import Burger from './Burger.jsx';

function VerticalNavBar({ isOpen, setIsOpen }) {
  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex-col justify-start p-4 z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {!isOpen && <Burger onClick={openNav} />}

      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button onClick={closeNav}>
          <X size={28} />
        </button>
      </div>

      {/* Search */}
      <div className="p-2 mb-8 flex items-center rounded-md px-4 bg-gray-900">
        <input
          type="text"
          className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          placeholder="Search"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link to="#">Order List</Link>
        <Link to="/form">Product Form</Link>
        <Link to="/list">Product List</Link>
        <Link to="#">Product Analytics</Link>
        <Link to="#">Register Staff</Link>
        <Link to="#">Company Staff</Link>
        <Link to="#">Global Riders</Link>
      </nav>
    </div>
  );
}

export default VerticalNavBar;
