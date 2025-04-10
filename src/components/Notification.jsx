import { useEffect } from 'react';
import './Notification.css';

const Notification = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
