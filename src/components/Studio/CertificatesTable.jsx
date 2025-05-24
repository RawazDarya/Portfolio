import React, { useState } from 'react';
import Modal from './Modal';

const initialCertificateFormState = {
  title: '',
  organization: '',
  image: '',
  is_visible: true,
};

// Popular certificate icons and their URLs
const popularCertificateIcons = [
  { name: 'AWS', url: 'https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png' },
  { name: 'Google Cloud', url: 'https://images.credly.com/images/4285669e-c703-4b9d-b7a7-9a10dfb8dc41/image.png' },
  { name: 'Microsoft Azure', url: 'https://images.credly.com/images/6a254dad-77e5-4e71-8049-94e5c7a15981/image.png' },
  { name: 'CompTIA', url: 'https://images.credly.com/images/74790a75-8451-400a-8536-92d792b5184a/image.png' },
  { name: 'Cisco', url: 'https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/image.png' },
  { name: 'Oracle', url: 'https://images.credly.com/images/f88d800c-5261-45c6-9515-0458e31c3e16/image.png' },
  { name: 'IBM', url: 'https://images.credly.com/images/5ae9bf9e-da6e-4cec-82eb-d2b4cfea9751/image.png' },
  { name: 'Salesforce', url: 'https://images.credly.com/images/d5cc83b7-7f31-4076-a8cf-a5bb566b8e6a/image.png' },
  { name: 'Docker', url: 'https://images.credly.com/images/08216781-93cb-4ba1-8110-8eb3401fa8ce/image.png' },
  { name: 'Kubernetes', url: 'https://images.credly.com/images/8b8ed108-e77d-4396-ac59-2504583b9d54/image.png' },
  { name: 'Scrum.org', url: 'https://static.scrum.org/web/tokens/token-psm-color.png' },
  { name: 'PMI', url: 'https://images.credly.com/images/260e36dc-d100-45c3-852f-9d8063fa71e8/image.png' }
];

function CertificatesTable({ certificates, onAdd, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState(null);
  const [formData, setFormData] = useState(initialCertificateFormState);
  const [showIconSelector, setShowIconSelector] = useState(false);

  const openModal = (certificate = null) => {
    if (certificate) {
      setCurrentCertificate(certificate);
      setFormData({
        ...initialCertificateFormState, 
        title: certificate.title || '',
        organization: certificate.organization || '',
        image: certificate.image_url || certificate.image || '',
        is_visible: certificate.hasOwnProperty('is_visible') ? certificate.is_visible : true,
      });
    } else {
      setCurrentCertificate(null);
      setFormData(initialCertificateFormState);
    }
    setIsModalOpen(true);
    setShowIconSelector(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCertificate(null);
    setFormData(initialCertificateFormState);
    setShowIconSelector(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleIconSelect = (iconUrl) => {
    setFormData(prev => ({ ...prev, image: iconUrl }));
    setShowIconSelector(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      title: formData.title,
      organization: formData.organization,
      is_visible: Boolean(formData.is_visible),
      image_url: formData.image || null,
    };

    if (currentCertificate) {
      onEdit({ ...dataToSave, id: currentCertificate.id });
    } else {
      onAdd(dataToSave);
    }
    closeModal();
    alert(`Certificate ${currentCertificate ? 'updated' : 'added'} successfully!`);
  };

  const handleDelete = (certificateId) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      onDelete(certificateId);
      alert('Certificate deleted successfully!');
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Manage Certificates</h2>
          <p className="text-sm text-gray-500 mt-1">Add professional certifications and achievements</p>
        </div>
        <button
          onClick={() => openModal()}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Add New Certificate</span>
        </button>
      </div>

      {/* Certificates Table - Desktop */}
      <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Certificate</th>
              <th className="py-3 px-6 text-left">Organization</th>
              <th className="py-3 px-6 text-center">Visible</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {certificates && certificates.length > 0 ? (
              certificates.map(cert => (
                <tr key={cert.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-3 flex-shrink-0">
                        {(cert.image_url || cert.image) ? (
                          <img 
                            src={cert.image_url || cert.image} 
                            alt={cert.title} 
                            className="w-full h-full rounded-lg object-contain border border-gray-200"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{cert.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="font-medium">{cert.organization}</span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cert.is_visible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cert.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <button 
                        onClick={() => openModal(cert)} 
                        className="text-indigo-600 hover:text-indigo-900 font-medium focus:outline-none px-2 py-1 rounded hover:bg-indigo-50"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(cert.id)} 
                        className="text-red-600 hover:text-red-900 font-medium focus:outline-none px-2 py-1 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-12 px-6 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                    <p className="text-lg font-medium mb-2">No certificates found</p>
                    <p className="text-sm">Start by adding your first certificate!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Certificates Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {certificates && certificates.length > 0 ? (
          certificates.map(cert => (
            <div key={cert.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 flex-shrink-0">
                  {(cert.image_url || cert.image) ? (
                    <img 
                      src={cert.image_url || cert.image} 
                      alt={cert.title} 
                      className="w-full h-full rounded-lg object-contain border border-gray-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{cert.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{cert.organization}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cert.is_visible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cert.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => openModal(cert)} 
                  className="text-indigo-600 hover:text-indigo-900 font-medium text-sm focus:outline-none"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(cert.id)} 
                  className="text-red-600 hover:text-red-900 font-medium text-sm focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
              <p className="text-lg font-medium mb-2">No certificates found</p>
              <p className="text-sm text-gray-500">Start by adding your first certificate!</p>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentCertificate ? 'Edit Certificate' : 'Add New Certificate'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Certificate Title *</label>
              <input 
                type="text" 
                name="title" 
                id="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
                placeholder="e.g., AWS Certified Solutions Architect"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
              <input 
                type="text" 
                name="organization" 
                id="organization" 
                value={formData.organization} 
                onChange={handleChange} 
                required 
                placeholder="e.g., Amazon Web Services"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
          </div>

          {/* Certificate Icon Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Icon</label>
            
            {/* Current Icon Preview */}
            {formData.image && (
              <div className="mb-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <img src={formData.image} alt="Certificate icon" className="w-12 h-12 object-contain rounded" />
                  <span className="text-sm text-gray-600">Current icon</span>
                </div>
              </div>
            )}

            {/* Icon Input Options */}
            <div className="space-y-3">
              <div>
                <input 
                  type="url" 
                  name="image" 
                  id="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  placeholder="Enter custom icon URL..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowIconSelector(!showIconSelector)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {showIconSelector ? 'Hide' : 'Choose from'} popular certificate icons
                </button>
              </div>

              {/* Popular Icons Grid */}
              {showIconSelector && (
                <div className="grid grid-cols-4 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50 max-h-60 overflow-y-auto">
                  {popularCertificateIcons.map((icon) => (
                    <button
                      key={icon.name}
                      type="button"
                      onClick={() => handleIconSelect(icon.url)}
                      className="flex flex-col items-center p-2 hover:bg-white rounded-lg transition-colors duration-200 border border-transparent hover:border-indigo-200"
                      title={icon.name}
                    >
                      <img src={icon.url} alt={icon.name} className="w-10 h-10 object-contain mb-1" />
                      <span className="text-xs text-gray-600 text-center truncate w-full">{icon.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="is_visible" 
              id="is_visible_cert" 
              checked={formData.is_visible} 
              onChange={handleChange} 
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" 
            />
            <label htmlFor="is_visible_cert" className="ml-2 block text-sm text-gray-900">
              Show this certificate on portfolio
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={closeModal} 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentCertificate ? 'Save Changes' : 'Add Certificate'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CertificatesTable; 