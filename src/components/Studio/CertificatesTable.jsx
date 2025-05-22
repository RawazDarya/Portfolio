import React, { useState } from 'react';
import Modal from './Modal';

const initialCertificateFormState = {
  title: '',
  organization: '',
  date: '',
  link: '',
  image: '', // Optional image URL - consider renaming to imageUrl if ProjectsTable uses imageUrl
  is_visible: true, // Default to true
};

function CertificatesTable({ certificates, onAdd, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState(null); // For editing
  const [formData, setFormData] = useState(initialCertificateFormState);

  const openModal = (certificate = null) => {
    if (certificate) {
      setCurrentCertificate(certificate);
      setFormData({
        ...initialCertificateFormState, 
        title: certificate.title || '',
        organization: certificate.organization || '',
        date: certificate.date_issued || certificate.date || '',
        link: certificate.credential_url || certificate.link || '',
        image: certificate.image_url || certificate.image || '',
        is_visible: certificate.hasOwnProperty('is_visible') ? certificate.is_visible : true,
      });
    } else {
      setCurrentCertificate(null);
      setFormData(initialCertificateFormState);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCertificate(null);
    setFormData(initialCertificateFormState);
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
    const dataToSave = {
      title: formData.title,
      organization: formData.organization,
      date_issued: formData.date,
      credential_url: formData.link,
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Manage Certificates</h2>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          + Add New Certificate
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Organization</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {certificates && certificates.length > 0 ? (
              certificates.map(cert => (
                <tr key={cert.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                     <div className="flex items-center">
                      {(cert.image_url || cert.image) && <img src={cert.image_url || cert.image} alt={cert.title} className="w-10 h-10 rounded-md mr-3 object-contain"/>}
                      <span className="font-medium">{cert.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">{cert.organization}</td>
                  <td className="py-3 px-6 text-left">{cert.date_issued || cert.date}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <button onClick={() => openModal(cert)} className="text-indigo-600 hover:text-indigo-900 font-medium focus:outline-none">Edit</button>
                      <button onClick={() => handleDelete(cert.id)} className="text-red-600 hover:text-red-900 font-medium focus:outline-none">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 px-6 text-center text-gray-500">No certificates found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentCertificate ? 'Edit Certificate' : 'Add New Certificate'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
            <input type="text" name="organization" id="organization" value={formData.organization} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date (e.g., YYYY-MM-DD or Month YYYY)</label>
            <input type="text" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">Certificate Link/URL</label>
            <input type="url" name="link" id="link" value={formData.link} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Optional Image URL (e.g., badge)</label>
            <input type="url" name="image" id="image" value={formData.image} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://example.com/badge.png" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="is_visible" id="is_visible_cert" checked={formData.is_visible} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="is_visible_cert" className="ml-2 block text-sm text-gray-900">Visible on portfolio</label>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {currentCertificate ? 'Save Changes' : 'Add Certificate'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CertificatesTable; 