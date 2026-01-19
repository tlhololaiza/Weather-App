import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useAlert, type Alert as AlertType } from '../../contexts/AlertContext';
import './Alert.css';

const Alert: React.FC<{ alert: AlertType }> = ({ alert }) => {
  const { removeAlert } = useAlert();

  const getIcon = () => {
    const iconProps = { size: 20 };
    switch (alert.type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'error':
        return <XCircle {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
    }
  };

  return (
    <div className={`alert alert-${alert.type}`}>
      <div className="alert-icon">{getIcon()}</div>
      <div className="alert-message">{alert.message}</div>
      <button
        className="alert-close"
        onClick={() => removeAlert(alert.id)}
        aria-label="Close alert"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Alert;
