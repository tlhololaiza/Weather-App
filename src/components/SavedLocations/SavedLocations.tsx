import { useState } from 'react';
import type { SavedLocation } from '../../types/weather';
import { storage } from '../../utils/storage';
import { MapPin, Check, Menu } from 'lucide-react';
import { useAlert } from '../../contexts/AlertContext';
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
  const { showAlert } = useAlert();

  const handleSaveLocation = () => {
    storage.saveLocation(currentLocation);
    setSavedLocations(storage.getSavedLocations());
    showAlert('success', `${currentLocation.name} saved to locations`);
  };

  const handleRemoveLocation = (locationId: string, locationName: string) => {
    storage.removeLocation(locationId);
    setSavedLocations(storage.getSavedLocations());
    showAlert('info', `${locationName} removed from saved locations`);
  };

  const handleLocationClick = (location: SavedLocation) => {
    onLocationSelect(location.name);
    setIsExpanded(false);
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
          {isCurrentLocationSaved ? (
            <>
              <Check size={14} />
              Saved
            </>
          ) : (
            <>
              <MapPin size={14} />
              Save Location
            </>
          )}
        </button>
        
        {savedLocations.length > 0 && (
          <div className="saved-dropdown">
            <button 
              className="toggle-saved-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="Saved locations"
            >
              <Menu size={20} />
              <span className="saved-count">{savedLocations.length}</span>
            </button>
            
            {isExpanded && (
              <div className="saved-list">
                {savedLocations.map((location) => (
                  <div key={location.id} className="saved-item">
                    <button 
                      className="location-btn"
                      onClick={() => {
                        handleLocationClick(location);
                        setIsExpanded(false);
                      }}
                    >
                      <MapPin size={14} />
                      <span className="location-name">{location.name}</span>
                    </button>
                    <button 
                      className="remove-location-btn"
                      onClick={() => handleRemoveLocation(location.id, location.name)}
                      title="Remove location"
                      aria-label="Remove location"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedLocations;