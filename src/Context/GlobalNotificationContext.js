import React, { createContext, useCallback, useContext, useState } from 'react';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export const notificationTypes = {
  error: 'error',
  success: 'success',
};

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    type: 'Success',
    message: null,
  });

  const setNotificationHandler = useCallback(({ type, message }) => {
    if (message === '' || !message) {
      return;
    }
    const typeOfMsg = notificationTypes[type];
    if (!typeOfMsg) {
      return;
    }
    setNotification({
      type: typeOfMsg,
      message: message,
    });
  }, []);

  const value = {
    type: notification.type,
    message: notification.message,
    setNotificationHandler,
  };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
