import React, { useState } from 'react';
import Modal from './Modal';

const initialProjectFormState = {
  title: '',
  description: '',
  imageUrl: '', // Changed from image to imageUrl
  techStack: [], // Array of strings
  liveLink: '',
  demoLink: '',
  is_visible: true, // Default to true for new projects
};

function ProjectsTable({ projects, onAdd, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // For editing
  const [formData, setFormData] = useState(initialProjectFormState);

  const openModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        ...initialProjectFormState, // Start with defaults
        ...project, // Override with project data
        imageUrl: project.image_url || project.imageUrl || '', // Handle both snake_case and camelCase from potential DB fetch vs form state
        techStack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : (Array.isArray(project.techStack) ? project.techStack.join(', ') : ''),
        is_visible: project.hasOwnProperty('is_visible') ? project.is_visible : true, // Ensure is_visible is handled
      });
    } else {
      setCurrentProject(null);
      setFormData(initialProjectFormState);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
    setFormData(initialProjectFormState);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectDataToSave = {
      ...formData,
      // Convert techStack string back to array
      techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech !== ''),
      // Ensure is_visible is a boolean
      is_visible: Boolean(formData.is_visible),
    };

    if (currentProject) {
      onEdit({ ...projectDataToSave, id: currentProject.id });
    } else {
      onAdd(projectDataToSave);
    }
    closeModal();
    // Add toast message for success
    alert(`Project ${currentProject ? 'updated' : 'added'} successfully!`);
  };
  
  const handleDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(projectId);
      // Add toast message for success
      alert('Project deleted successfully!');
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Manage Projects</h2>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          + Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Tech Stack</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {projects && projects.length > 0 ? (
              projects.map(project => (
                <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      {project.image && <img src={project.image} alt={project.title} className="w-10 h-10 rounded-full mr-3 object-cover"/>}
                      <span className="font-medium">{project.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">{project.description.substring(0,50)}{project.description.length > 50 && '...'}</td>
                  <td className="py-3 px-6 text-left">{Array.isArray(project.techStack) ? project.techStack.join(', ') : 'N/A'}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <button onClick={() => openModal(project)} className="text-indigo-600 hover:text-indigo-900 font-medium focus:outline-none">Edit</button>
                      <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-900 font-medium focus:outline-none">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 px-6 text-center text-gray-500">No projects found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Project */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentProject ? 'Edit Project' : 'Add New Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="3" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://example.com/image.png" />
          </div>
          <div>
            <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">Tech Stack (comma-separated)</label>
            <input type="text" name="techStack" id="techStack" value={formData.techStack} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="React, Node.js, TailwindCSS" />
          </div>
          <div>
            <label htmlFor="liveLink" className="block text-sm font-medium text-gray-700">Live Link URL</label>
            <input type="url" name="liveLink" id="liveLink" value={formData.liveLink} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="demoLink" className="block text-sm font-medium text-gray-700">Demo/Code Link URL</label>
            <input type="url" name="demoLink" id="demoLink" value={formData.demoLink} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="is_visible" id="is_visible_project" checked={formData.is_visible} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="is_visible_project" className="ml-2 block text-sm text-gray-900">Visible on portfolio</label>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {currentProject ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ProjectsTable; 