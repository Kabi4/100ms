import React from 'react';

import Classes from './Index.module.css';

import Image from '../../../Assets/Images/Logo.png';

const Index = () => {
  return (
    <header className={Classes.header}>
      <img className={Classes.logo} src={Image} alt="Breaking Bad's Logo" />
      <h2 className={Classes.header_heading}>Breaking Bad</h2>
    </header>
  );
};

export default Index;
