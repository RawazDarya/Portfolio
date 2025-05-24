import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProjectsTable from './ProjectsTable';
import CertificatesTable from './CertificatesTable';
import TechStackTable from './TechStackTable';
import Auth from './Auth';
import { supabase } from '../../supabaseClient'; // Corrected path

// Helper function to convert object keys to snake_case
const toSnakeCase = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCase);
  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    acc[snakeKey] = toSnakeCase(obj[key]);
    return acc;
  }, {});
};

// Helper function to load data from Supabase tables
const loadTableData = async (tableName) => {
  try {
    const { data, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false });
    if (error) {
      throw error;
    }
    return data || []; // Return data or empty array if null
  } catch (error) {
    console.error(`Could not load data from ${tableName}:`, error.message);
    return []; 
  }
};

// Helper function to add data to Supabase tables
const addTableData = async (tableName, rowData) => {
  try {
    // Remove empty id if present, Supabase will generate it
    const { id, ...restOfData } = rowData;
    const insertData = toSnakeCase(restOfData); // Convert keys to snake_case
    const { data, error } = await supabase.from(tableName).insert([insertData]).select();
    if (error) throw error;
    return data && data[0]; // Return the newly added row, which includes the generated id
  } catch (error) {
    console.error(`Error adding data to ${tableName}:`, error.message);
    alert(`Failed to add item to ${tableName}: ${error.message}`);
    return null;
  }
};

// Helper function to update data in Supabase tables
const updateTableData = async (tableName, rowId, rowData) => {
  try {
    const { id, created_at, ...restOfData } = rowData; // Exclude id and created_at from update payload
    const updateData = toSnakeCase(restOfData); // Convert keys to snake_case
    const { data, error } = await supabase.from(tableName).update(updateData).eq('id', rowId).select();
    if (error) throw error;
    return data && data[0]; // Return the updated row
  } catch (error) {
    console.error(`Error updating data in ${tableName}:`, error.message);
    alert(`Failed to update item in ${tableName}: ${error.message}`);
    return null;
  }
};

// Helper function to delete data from Supabase tables
const deleteTableData = async (tableName, rowId) => {
  try {
    const { error } = await supabase.from(tableName).delete().eq('id', rowId);
    if (error) throw error;
    return true; // Indicate success
  } catch (error) {
    console.error(`Error deleting data from ${tableName}:`, error.message);
    alert(`Failed to delete item from ${tableName}: ${error.message}`);
    return false;
  }
};

function Studio() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('Projects');
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check current Supabase session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession) {
        fetchInitialData();
      } else {
        setIsLoading(false); // Not logged in, no data to fetch initially
      }
    });

    // Listen for auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        fetchInitialData(); // Fetch data if user logs in
      } else {
        // Clear data if user logs out
        setProjects([]);
        setCertificates([]);
        setTechStack([]);
        setIsLoading(false);
      }
    });

    return () => {
      // Cleanup listener
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []); // Empty dependency array to run only on mount and unmount

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const projectsData = await loadTableData('projects');
      const certificatesData = await loadTableData('certificates');
      const techStackData = await loadTableData('tech_stack_items'); 
      
      setProjects(projectsData);
      setCertificates(certificatesData);
      setTechStack(techStackData);
    } catch (err) {
      console.error("Failed to fetch initial data:", err);
      setError("Failed to load data. Please ensure your Supabase tables exist and RLS policies are set.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoginSuccess = () => {
    // onAuthStateChange will handle setting the session and fetching data
    // No explicit action needed here anymore other than what Auth.jsx does (calling onLoginSuccess)
    // which might be used for UI changes if any. For now, it can be an empty function or removed from props if not used.
  };

  const handleLogout = async () => {
    setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
        console.error('Error logging out:', signOutError.message);
        setError('Failed to log out. ' + signOutError.message);
    }
    // onAuthStateChange will clear the session and data
    setActiveTab('Projects'); // Reset to default tab
  };

  // --- Data Update Handlers (now using Supabase helpers) ---

  const handleAddProject = async (newProject) => {
    const added = await addTableData('projects', newProject);
    if (added) setProjects(prev => [added, ...prev]); // Add to start of list for immediate UI update
  };

  const handleEditProject = async (updatedProject) => {
    const edited = await updateTableData('projects', updatedProject.id, updatedProject);
    if (edited) setProjects(prev => prev.map(p => p.id === edited.id ? edited : p));
  };

  const handleDeleteProject = async (projectId) => {
    const success = await deleteTableData('projects', projectId);
    if (success) setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleAddCertificate = async (newCertificate) => {
    const added = await addTableData('certificates', newCertificate);
    if (added) setCertificates(prev => [added, ...prev]);
  };

  const handleEditCertificate = async (updatedCertificate) => {
    const edited = await updateTableData('certificates', updatedCertificate.id, updatedCertificate);
    if (edited) setCertificates(prev => prev.map(c => c.id === edited.id ? edited : c));
  };

  const handleDeleteCertificate = async (certificateId) => {
    const success = await deleteTableData('certificates', certificateId);
    if (success) setCertificates(prev => prev.filter(c => c.id !== certificateId));
  };

  const handleAddTech = async (newTech) => {
    const added = await addTableData('tech_stack_items', newTech);
    if (added) setTechStack(prev => [added, ...prev]);
  };

  const handleEditTech = async (updatedTech) => {
    const edited = await updateTableData('tech_stack_items', updatedTech.id, updatedTech);
    if (edited) setTechStack(prev => prev.map(t => t.id === edited.id ? edited : t));
  };

  const handleDeleteTech = async (techId) => {
    const success = await deleteTableData('tech_stack_items', techId);
    if (success) setTechStack(prev => prev.filter(t => t.id !== techId));
  };

  if (!session) { // Check for Supabase session instead of isAuthenticated state
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  if (isLoading && !projects.length && !certificates.length && !techStack.length) { // Refined loading state
    return <div className="flex justify-center items-center h-screen"><p>Loading Studio Data...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{error}</p></div>;
  }
  
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Admin Studio</h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto">
        {activeTab === 'Projects' && (
          <ProjectsTable
            projects={projects}
            onAdd={handleAddProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        )}
        {activeTab === 'Certificates' && (
          <CertificatesTable
            certificates={certificates}
            onAdd={handleAddCertificate}
            onEdit={handleEditCertificate}
            onDelete={handleDeleteCertificate}
          />
        )}
        {activeTab === 'Tech Stack' && (
          <TechStackTable
            techStack={techStack} // This prop is now tech_stack_items if we rename table
            onAdd={handleAddTech}
            onEdit={handleEditTech}
            onDelete={handleDeleteTech}
          />
        )}
      </main>
    </div>
  );
}

export default Studio; 