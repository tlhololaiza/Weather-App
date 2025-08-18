
export interface TabOption<T = string> {
  id: T;
  label: string;
  disabled?: boolean;
}

interface TabButtonProps<T = string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}

const TabButton = <T extends string | number>({
  tabs,
  activeTab,
  onTabChange,
  className = '',
  tabClassName = '',
  activeTabClassName = ''
}: TabButtonProps<T>) => {
  return (
    <div className={`forecast-tabs ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`forecast-tab ${activeTab === tab.id ? `active ${activeTabClassName}` : ''} ${tabClassName}`}
          onClick={() => onTabChange(tab.id)}
          disabled={tab.disabled}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabButton;