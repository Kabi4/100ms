import React from 'react';
import Classes from './Index.module.css';

//Alert There was no array of quotes

const Index = ({
  id,
  name = 'Joshan Gurera',
  image,
  occupation = ['Teacher', 'Student'],
  status = 'Dead',
  nickname = 'Harry',
  actor = 'Paul Wesley',
  seasons = [1, 2, 3, 4, 5],
  quotes = ['My Quotes'],
}) => {
  return (
    <div className={Classes.item}>
      <img src={image} className={Classes.image} alt={`${name}'s Profile`} />
      <div className={Classes.content}>
        <div className={Classes.content_item}>
          <p>
            Name: {name} {nickname && `(${nickname})`}{' '}
          </p>
          <p>
            Living State: <span className={`${Classes.alert}`}>{status}</span>
          </p>
        </div>
        <div className={Classes.content_item}>
          <p>Occupation: {occupation.reduce((prev, curr, i) => (i !== 0 ? prev + ', ' + curr : curr), '')}</p>
          <p>Portrayed By: {actor}</p>
        </div>
        <div className={Classes.content_item}>
          <p>Appearances(Seasons): {seasons.reduce((prev, curr, i) => (i !== 0 ? prev + ', ' + curr : curr), '')}</p>
        </div>
        {/* <div className={Classes.content_list}>
          <p>Quotes By the Character:</p>
          <ul>
            {quotes.map((ele, i) => (
              <li key={i}>{ele}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Index;
