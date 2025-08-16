import { useState } from 'react';
import type { SavedLocation } from '../../types/weather';
import { storage } from '../../utils/storage';
import './SavedLocations.css';

interface SavedLocationsProps {
  currentLocation: SavedLocation;
  onLocationSelect: (locationName: string) => void;
}

const SavedLocations: React.FC<SavedLocationsProps> = ({ 
  currentLocation, 
  onLocationSelect 
}) => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(
    storage.getSavedLocations()
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSaveLocation = () => {
    storage.saveLocation(currentLocation);
    setSavedLocations(storage.getSavedLocations());
  };

  const handleRemoveLocation = (locationId: string) => {
    storage.removeLocation(locationId);
    setSavedLocations(storage.getSavedLocations());
  };

  const handleLocationClick = (location: SavedLocation) => {
    onLocationSelect(location.name);
  };

  const isCurrentLocationSaved = savedLocations.some(
    loc => loc.id === currentLocation.id
  );

  return (
    <div className="saved-locations">
      <div className="saved-header">
        <button 
          className="save-current-btn"
          onClick={handleSaveLocation}
          disabled={isCurrentLocationSaved}
        >
          {isCurrentLocationSaved ? '✅ Saved' : '📍 Save Location'}
        </button>
        
        {savedLocations.length > 0 && (
          <button 
            className="toggle-saved-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Saved ({savedLocations.length}) {isExpanded ? '▲' : '▼'}
          </button>
        )}
      </div>

      {isExpanded && savedLocations.length > 0 && (
        <div className="saved-list">
          {savedLocations.map((location) => (
            <div key={location.id} className="saved-item">
              <button 
                className="location-btn"
                onClick={() => handleLocationClick(location)}
              >
                <span className="location-name">
                  {location.name}, {location.country}
                </span>
              </button>
              <button 
                className="remove-btn"
                onClick={() => handleRemoveLocation(location.id)}
                title="Remove location"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLocations;