import React from 'react';

// Dummy data for certificates
// TODO: Replace with actual certificate data
const certificatesData = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    organization: 'freeCodeCamp',
    date: 'March 2024',
    imageUrl: 'https://via.placeholder.com/150/4A5568/FFFFFF?text=Cert+Badge', // Optional: Replace with actual image URL or remove
    link: '#', // TODO: Replace with actual certificate link
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    organization: 'Udemy',
    date: 'January 2024',
    imageUrl: 'https://via.placeholder.com/150/4A5568/FFFFFF?text=Cert+Badge', // Optional: Replace with actual image URL or remove
    link: '#', // TODO: Replace with actual certificate link
  },
  {
    id: 3,
    title: 'React - The Complete Guide',
    organization: 'Academind',
    date: 'November 2023',
    imageUrl: 'https://via.placeholder.com/150/4A5568/FFFFFF?text=Cert+Badge', // Optional: Replace with actual image URL or remove
    link: '#', // TODO: Replace with actual certificate link
  },
  {
    id: 4,
    title: 'Python for Everybody',
    organization: 'Coursera - University of Michigan',
    date: 'September 2023',
    // imageUrl: 'https://via.placeholder.com/150', // Example without image
    link: '#', // TODO: Replace with actual certificate link
  },
];

const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Certificates
          </h2>
          <p className="text-lg md:text-xl text-sky-300 mt-2">
            My achievements and credentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              className="bg-slate-800 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-sky-500/40 border border-slate-700 hover:border-sky-500 flex flex-col justify-between"
            >
              <div>
                {cert.imageUrl && (
                  <img
                    src={cert.imageUrl}
                    alt={`${cert.title} badge`}
                    className="w-20 h-20 mx-auto mb-6 rounded-full object-cover shadow-md"
                  />
                )}
                {!cert.imageUrl && (
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 text-center">
                  {cert.title}
                </h3>
                <p className="text-sky-400 text-sm mb-1 text-center">
                  {cert.organization}
                </p>
                <p className="text-gray-400 text-xs mb-4 text-center">
                  Issued: {cert.date}
                </p>
              </div>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-5 rounded-lg text-center transition duration-300 w-full"
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates; 