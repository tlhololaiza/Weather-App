import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (type: AlertType, message: string) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback((type: AlertType, message: string) => {
    const id = `alert-${Date.now()}-${Math.random()}`;
    const newAlert: Alert = { id, type, message };
    
    setAlerts(prev => [...prev, newAlert]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      removeAlert(id);
    }, 4000);
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
