// components/ThemeToggle/ThemeToggle.tsx
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          <span className="theme-toggle-icon">
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;