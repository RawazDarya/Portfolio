import React from 'react';

function Sidebar({ activeTab, setActiveTab, onLogout, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navItems = ['Projects', 'Certificates', 'Tech Stack'];

  const handleTabClick = (item) => {
    setActiveTab(item);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-64 bg-gray-800 text-white p-6 space-y-6 flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <h2 className="text-2xl font-semibold text-center hidden lg:block">Admin Studio</h2>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleTabClick(item)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium 
                              ${activeTab === item 
                                ? 'bg-gray-900 text-white' 
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                              focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {/* Optional: Export/Import buttons can go here */}
          {/* <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2">
            Export Data (JSON)
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4">
            Import Data (JSON)
          </button> */} 
          <button
            onClick={onLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar; 