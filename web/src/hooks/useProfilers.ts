import { useState, useEffect } from 'react';
import { api } from '@/src/services/api';
import { notification } from '@/src/components/Notification/notification';
import { useProfileStore } from '../store/useProfilerStore';
import { CreateProfileDTO, Profile, ProfileFilters } from '../interfaces/profile';
import { profileService } from '../services/profiles.service';

export const useProfilers = () => {
  const {
    profilers,
    pagination,
    isLoading,
    setProfile,
    setLoading,
    addProfile,
    putProfile,
    removeProfile
  } = useProfileStore();

  const fetchProfilers = async (params?: ProfileFilters) => {
    setLoading(true);
    try {
      const data = await profileService.list(params);
      setProfile(data);
      return data;
    } catch (error) {
      notification.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (data: CreateProfileDTO) => {
    setLoading(true);
    try {
      const newProfile = await profileService.create(data);
      addProfile(newProfile);
      notification.success('Perfil criado com sucesso!', `O perfil ${newProfile.name} foi criado com sucesso.`);

      return newProfile;
    } catch (error) {
      notification.error(error);

    } finally {
      setLoading(false);
    }
  };
  const updateProfiler = async (id: string, data: CreateProfileDTO) => {
    setLoading(true);
    try {
      const updatedProfile = await profileService.update(id, data);
      putProfile(id, updatedProfile);
      notification.success('Perfil atualizado com sucesso!', `O perfil ${updatedProfile.name} foi atualizado com sucesso.`);

      return updatedProfile;
    } catch (error) {
      notification.error(error);
    } finally {
      setLoading(false);
    }
  }
  return {
    profilers,
    pagination,
    isLoading,
    fetchProfilers,
    createProfile,
    updateProfiler,
    removeProfile
  };
};
