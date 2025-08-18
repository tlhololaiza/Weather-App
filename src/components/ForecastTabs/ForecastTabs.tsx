import type { ForecastType } from '../../types/weather';
import TabButton from '../TabButton/TabButton';
import type { TabOption } from '../TabButton/TabButton';
import './ForecastTabs.css';

interface ForecastTabsProps {
  activeTab: ForecastType;
  onTabChange: (tab: ForecastType) => void;
}

const ForecastTabs: React.FC<ForecastTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabOption<ForecastType>[] = [
    { id: 'hourly', label: 'Hourly' },
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
  ];

  return (
    <TabButton
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
};

export default ForecastTabs;