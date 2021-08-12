import { useEffect, useState } from 'react';
import { Home } from './Container/Index';

import { useNotification, notificationTypes } from './Context/GlobalNotificationContext';

import { CSSTransition } from 'react-transition-group';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Classes from './App.module.css';

function App() {
  const { type, message, setNotificationHandler } = useNotification();
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    setNotificationHandler({
      type: notificationTypes.error,
      message:
        'The API do not have Quotes Field for the Characters! And Making Api call for each character is point less.',
    });
  }, [setNotificationHandler]);

  useEffect(() => {
    if (message && message.length > 0) {
      setNotify(true);
    }
  }, [type, message]);

  useEffect(() => {
    let timer;

    if (notify) {
      timer = setTimeout(() => {
        setNotify(false);
      }, 1500);
    } else {
      timer = setTimeout(() => {}, 100);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [notify]);

  return (
    <div>
      <CSSTransition in={notify} classNames={'show'} unmountOnExit mountOnEnter timeout={{ enter: 50, exit: 200 }}>
        <div className={type === notificationTypes.error ? Classes.errorBox : Classes.successBox}>
          <div className={`place-center`}>
            <div className={`${Classes.error_container}`}>
              {type === notificationTypes.error ? (
                <HighlightOffIcon className={Classes.error_icon} />
              ) : (
                <CheckCircleOutlineIcon className={Classes.success_icon} />
              )}
              <p className={type === notificationTypes.error ? Classes.error : Classes.success}>{message}</p>
            </div>
          </div>
        </div>
      </CSSTransition>
      <Home />
    </div>
  );
}

export default App;
