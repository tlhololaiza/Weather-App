import type { SavedLocation } from '../types/weather';

const STORAGE_KEY = 'weather-app-locations';

export const storage = {
  getSavedLocations: (): SavedLocation[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  saveLocation: (location: SavedLocation): void => {
    const saved = storage.getSavedLocations();
    const exists = saved.find(loc => loc.id === location.id);
    
    if (!exists) {
      saved.push(location);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
  },

  removeLocation: (locationId: string): void => {
    const saved = storage.getSavedLocations();
    const filtered = saved.filter(loc => loc.id !== locationId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};