import { useState, useEffect, useRef } from 'react';
import { Search, Loader, Building2, Building, LandPlot, MapPin } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Popular cities for suggestions with Lucide icons
  const popularCities = [
    { name: 'Pretoria', icon: Building2 },
    { name: 'London', icon: Building },
    { name: 'Johannesburg', icon: Building2 },
    { name: 'Paris', icon: Building },
    { name: 'Cape Town', icon: MapPin },
    { name: 'Dubai', icon: LandPlot }
  ];

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
    setShowSuggestions(value.length === 0 && !loading);
  };

  const handleInputFocus = () => {
    if (searchTerm.length === 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (cityName: string) => {
    setSearchTerm(cityName);
    setShowSuggestions(false);
    onSearch(cityName);
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
          {popularCities.map((city) => {
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
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;