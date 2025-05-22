import React from 'react';

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const navItems = ['Projects', 'Certificates', 'Tech Stack'];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 space-y-6 flex flex-col">
      <h2 className="text-2xl font-semibold text-center">Admin Studio</h2>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActiveTab(item)}
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
  );
}

export default Sidebar; 