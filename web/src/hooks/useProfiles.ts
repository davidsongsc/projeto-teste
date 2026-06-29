import { useState, useEffect } from 'react';
import { api } from '@/src/services/api';
import { notification } from '@/src/components/Notification/notification';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<any[]>([]); // Inicializado como array vazio
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await api('/profiles');

        if (response && Array.isArray(response.results)) {
          setProfiles(response.results);
        } else {
          setProfiles([]);
        }
      } catch (error) {
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return { profiles, loading };
};