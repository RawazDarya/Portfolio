import React, { useState } from 'react';
import Modal from './Modal';

const initialTechFormState = {
  name: '',
  icon: '', // URL or path to icon/SVG string. Consider renaming to iconUrlOrSvg for consistency
  category: '', // e.g., Frontend, Backend, Database, Tool
  is_visible: true, // Default to true
};

function TechStackTable({ techStack, onAdd, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTech, setCurrentTech] = useState(null);
  const [formData, setFormData] = useState(initialTechFormState);

  const openModal = (tech = null) => {
    if (tech) {
      setCurrentTech(tech);
      setFormData({
        ...initialTechFormState, 
        ...tech,
        // Supabase has 'icon_url_or_svg'
        icon: tech.icon_url_or_svg || tech.icon || '',
        is_visible: tech.hasOwnProperty('is_visible') ? tech.is_visible : true,
      });
    } else {
      setCurrentTech(null);
      setFormData(initialTechFormState);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTech(null);
    setFormData(initialTechFormState);
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
    let dataToSave = { ...formData }; 
    dataToSave.is_visible = Boolean(dataToSave.is_visible);

    // If Supabase has 'icon_url_or_svg', rename form's 'icon' before saving
    if (dataToSave.hasOwnProperty('icon')) {
        dataToSave.icon_url_or_svg = dataToSave.icon;
        delete dataToSave.icon;
    }

    if (currentTech) {
      onEdit({ ...dataToSave, id: currentTech.id });
    } else {
      onAdd(dataToSave);
    }
    closeModal();
    alert(`Tech stack item ${currentTech ? 'updated' : 'added'} successfully!`);
  };

  const handleDelete = (techId) => {
    if (window.confirm('Are you sure you want to delete this tech stack item?')) {
      onDelete(techId);
      alert('Tech stack item deleted successfully!');
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Manage Tech Stack</h2>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          + Add New Tech
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-center">Icon Preview</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {techStack && techStack.length > 0 ? (
              techStack.map(tech => (
                <tr key={tech.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className="font-medium">{tech.name}</span>
                  </td>
                  <td className="py-3 px-6 text-left">{tech.category}</td>
                  <td className="py-3 px-6 text-center">
                    {(tech.icon_url_or_svg || tech.icon) && (
                      (tech.icon_url_or_svg || tech.icon).trim().startsWith('<svg') ? (
                        <div 
                          dangerouslySetInnerHTML={{ __html: (tech.icon_url_or_svg || tech.icon) }} 
                          className="w-8 h-8 inline-block align-middle [&_svg]:h-full [&_svg]:w-full"
                        />
                      ) : (
                        <img 
                          src={(tech.icon_url_or_svg || tech.icon)} 
                          alt={tech.name} 
                          className="w-8 h-8 object-contain inline-block align-middle"
                        />
                      )
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <button onClick={() => openModal(tech)} className="text-indigo-600 hover:text-indigo-900 font-medium focus:outline-none">Edit</button>
                      <button onClick={() => handleDelete(tech.id)} className="text-red-600 hover:text-red-900 font-medium focus:outline-none">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 px-6 text-center text-gray-500">No tech stack items found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentTech ? 'Edit Tech' : 'Add New Tech'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon (Image URL or SVG code)</label>
            <textarea name="icon" id="icon" value={formData.icon} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://example.com/icon.svg or <svg>...</svg>"></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Frontend, Backend, Tool" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="is_visible" id="is_visible_tech" checked={formData.is_visible} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="is_visible_tech" className="ml-2 block text-sm text-gray-900">Visible on portfolio</label>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {currentTech ? 'Save Changes' : 'Add Tech'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default TechStackTable; 