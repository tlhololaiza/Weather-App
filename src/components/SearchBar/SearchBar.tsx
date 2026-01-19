import { useState, useEffect, useRef } from 'react';
import { Search, Loader, Building2, Building, LandPlot, MapPin } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Popular cities for suggestions with Lucide icons
  const popularCities = [
    { name: 'Pretoria', icon: Building2 },
    { name: 'London', icon: Building },
    { name: 'Johannesburg', icon: Building2 },
    { name: 'Paris', icon: Building },
    { name: 'Cape Town', icon: MapPin },
    { name: 'Dubai', icon: LandPlot }
  ];

  const fetchCitySuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setFetchingSuggestions(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=2b886d2ea7ff4c2aeb201bf433764a44`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to fetch city suggestions:', error);
      setSuggestions([]);
    } finally {
      setFetchingSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.length === 0) {
      setSuggestions([]);
      setShowSuggestions(true);
    } else if (value.length >= 2) {
      setShowSuggestions(true);
      // Debounce API calls - wait 300ms after user stops typing
      debounceTimerRef.current = setTimeout(() => {
        fetchCitySuggestions(value);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
    if (searchTerm.length >= 2 && suggestions.length === 0) {
      fetchCitySuggestions(searchTerm);
    }
  };

  const handleSuggestionClick = (cityName: string) => {
    setSearchTerm(cityName);
    setShowSuggestions(false);
    setSuggestions([]);
    onSea

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);rch(cityName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar" ref={containerRef}>
      <form onSubmit={handleSubmit}>
        <div className={`search-input-container ${loading ? 'loading' : ''} ${searchTerm ? 'has-value' : ''}`}>
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            className="search-input"
            disabled={loading}
            autoComplete="off"
            spellCheck={false}
          />
          {loading && <Loader size={20} className="search-loading" />}
          {(searchTerm || showSuggestions) && !loading && (
            <button 
              type="submit" 
              className="search-submit-btn"
              disabled={!searchTerm.trim()}
            >
              Search
            </button>
          )}
        </div>
      </form>

      {showSuggestions && !loading && (
        <div className="search-suggestions visible">
          {fetchingSuggestions ? (
            <div className="suggestion-item">
              <Loader size={18} className="suggestion-icon" style={{ animation: 'spin 1s linear infinite' }} />
              <span>Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((city, index) => (
              <div
                key={`${city.name}-${city.country}-${index}`}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(city.name)}
              >
                <MapPin size={18} className="suggestion-icon" />
                <span>
                  {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
                </span>
              </div>
            ))
          ) : searchTerm.length === 0 ? (
            popularCities.map((city) => {
              const IconComponent = city.icon;
              return (
                <div
                  key={city.name}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(city.name)}
                >
                  <IconComponent size={18} className="suggestion-icon" />
                  <span>{city.name}</span>
                </div>
              );
            })
          ) : searchTerm.length >= 2 && !fetchingSuggestions ? (
            <div className="suggestion-item" style={{ opacity: 0.6, cursor: 'default' }}>
              <Search size={18} className="suggestion-icon" />
              <span>No cities found</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;