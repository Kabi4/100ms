import React from 'react';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Classes from './ListFooter.module.css';

const ListFooter = ({ itemPerPage = 10, totalItems, page, setPage }) => {
  const increasePage = () => {
    if (!(page === Math.ceil(totalItems / itemPerPage))) {
      setPage((prev) => prev + 1);
    }
  };
  const decreasePage = () => {
    if (!(page === 1)) {
      setPage((prev) => prev - 1);
    }
  };
  return (
    <div className={Classes.pagination_footer}>
      <button className={Classes.pagination_footer_btn} disabled={page === 1} onClick={decreasePage}>
        <ChevronLeftIcon className={Classes.pagination_footer_icon} />
      </button>
      <p className={Classes.pagination_footer_text}>
        Page No: <span>{page}</span>
      </p>
      <p className={Classes.pagination_footer_text}>
        Items displayed{' '}
        {`${totalItems === 0 ? totalItems : (page - 1) * itemPerPage + 1} - ${Math.min(
          page * itemPerPage,
          totalItems
        )} Out Of ${totalItems}`}
      </p>
      <button
        className={Classes.pagination_footer_btn}
        disabled={page === Math.ceil(totalItems / itemPerPage)}
        onClick={increasePage}
      >
        <ChevronRightIcon className={Classes.pagination_footer_icon} />
      </button>
    </div>
  );
};

export default ListFooter;
