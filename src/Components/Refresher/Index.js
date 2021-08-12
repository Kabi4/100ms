import React from 'react';

import ReplayIcon from '@material-ui/icons/Replay';

import Classes from './Index.module.css';

const Index = ({ customFunction }) => {
  const refreshHandler = () => {
    if (customFunction) {
      customFunction();
    } else {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  };
  return (
    <div className={Classes.refresher}>
      <button onClick={refreshHandler} className={Classes.refresher_icon}>
        <ReplayIcon className={Classes.refresher_icon_ico} />
      </button>
    </div>
  );
};

export default Index;
