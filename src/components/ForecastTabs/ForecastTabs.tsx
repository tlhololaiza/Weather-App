import type { ForecastType } from '../../types/weather';
import './ForecastTabs.css';

interface ForecastTabsProps {
  activeTab: ForecastType;
  onTabChange: (tab: ForecastType) => void;
}

const ForecastTabs: React.FC<ForecastTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ForecastType; label: string }[] = [
    { id: 'hourly', label: 'Hourly' },
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
  ];

  return (
    <div className="forecast-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`forecast-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ForecastTabs;