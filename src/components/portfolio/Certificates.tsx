import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; // Adjusted path assuming Certificates.tsx is in src/components/portfolio/
import styles from './Certificates.module.css';
import { ArrowUpRight } from 'lucide-react'; // For credential link icon

// Interface for Certificate data from Supabase
interface CertificateFromSupabase {
  id: string;
  created_at: string;
  title: string;
  organization: string | null;
  date_issued: string | null; // Supabase has date_issued
  credential_url: string | null; // Supabase has credential_url
  image_url: string | null; // Supabase has image_url
  is_visible: boolean;
}

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateFromSupabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('certificates')
          .select('*')
          .eq('is_visible', true)
          .order('date_issued', { ascending: false }); // Order by date, newest first

        if (fetchError) {
          throw fetchError;
        }
        setCertificates(data || []);
      } catch (err: any) {
        console.error("Error fetching certificates:", err);
        setError(err.message || 'Failed to load certificates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <section className={styles.certificatesSection} id="certificates">
        <div className={styles.container}><p>Loading certificates...</p></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.certificatesSection} id="certificates">
        <div className={styles.container}><p className="text-red-500">Error: {error}</p></div>
      </section>
    );
  }

  if (certificates.length === 0) {
    return (
      <section className={styles.certificatesSection} id="certificates">
        <div className={styles.container}><p>No certificates to display at the moment.</p></div>
      </section>
    );
  }

  return (
    <section className={styles.certificatesSection} id="certificates">
      <div className={styles.container}>
        <h2 className={styles.heading}>My Certificates</h2>
        <div className={styles.certificatesGrid}>
          {certificates.map((cert) => (
            <div key={cert.id} className={styles.certificateCard}>
              {cert.image_url && (
                <div className={styles.certificateImageContainer}>
                    <img src={cert.image_url} alt={`${cert.title} badge`} className={styles.certificateImage} loading="lazy" />
                </div>
              )}
              <div className={styles.cardContent}>
                <h3 className={styles.certificateTitle}>{cert.title}</h3>
                {cert.organization && <p className={styles.issuingOrg}>Issued by: {cert.organization}</p>}
                {cert.date_issued && <p className={styles.date}>Date: {new Date(cert.date_issued).toLocaleDateString()}</p>}
                {cert.credential_url && (
                  <a 
                    href={cert.credential_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.credentialLink}
                  >
                    View Credential <ArrowUpRight size={16} className={styles.linkIcon} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates; 