// Layout.jsx
import React, { useState } from 'react';
import VerticalNavBar from './VerticalNavBar.jsx';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <VerticalNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main
        className={`transition-all duration-300 w-full ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
