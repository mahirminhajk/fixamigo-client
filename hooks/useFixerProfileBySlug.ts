'use client';

import { useEffect, useState } from 'react';
import { IFixerProfilePublic } from '@/types/fixerProfile';
import { fetchFixerProfileBySlug } from '@/lib/fixerProfileApi';

export const useFixerProfileBySlug = (slug: string | null) => {
  const [profile, setProfile] = useState<IFixerProfilePublic | null>(null);
  const [isLoading, setIsLoading] = useState(!!slug);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchFixerProfileBySlug(slug);
        
        if (data) {
          setProfile(data);
        } else {
          setError('Fixer profile not found or unavailable');
          setProfile(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load fixer profile');
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  return { profile, isLoading, error };
};
