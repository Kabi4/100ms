import React, { useEffect, useState, useCallback } from 'react';
import Classes from './Index.module.css';

import { PaginationComponent, Refresher, Loader, ListItem } from '../../Components/Index';

import Api from '../../Api/Api';
import * as Routes from '../../Api/ApiRoutes';

import Image from '../../Assets/Images/No-Image.jpg';
import { useNotification, notificationTypes } from '../../Context/GlobalNotificationContext';

import SearchIcon from '@material-ui/icons/Search';

const List = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const { setNotificationHandler } = useNotification();

  const loadData = useCallback(
    async (category) => {
      setLoading(true);
      setError(false);
      const api = new Api({
        endPoint: `${Routes.GETALLCHARACTERS}${
          category
            ? `category=${category
                .split(' ')
                .reduce((prev, curr, index) => (index === 0 ? curr : prev + '+' + curr), '')}`
            : ''
        }`,
      });
      const { error, data } = await api.fetch();
      setLoading(false);
      if (error) {
        setError(error);
        setNotificationHandler({ type: notificationTypes.error, message: error });
        return;
      }
      setNotificationHandler({ type: notificationTypes.success, message: 'Data Succesfully Fetch' });
      setItems([
        ...data.map((ele) => {
          return {
            id: ele.char_id,
            image: ele.img || ele.img !== '' ? ele.img : Image,
            name: ele.name,
            actor: ele.portrayed,
            status: ele.status,
            nickname: ele.nickname,
            occupation: [...ele.occupation],
            seasons: [...ele.appearance],
          };
        }),
      ]);
    },
    [setNotificationHandler]
  );

  useEffect(() => {
    (() => {
      loadData();
    })();
  }, [loadData]);

  const onSearchHanlder = (e) => {
    if (loading) {
      return;
    }
    loadData(category);
  };

  let filteredItems = [...items];

  if (searchTerm.length > 0) {
    filteredItems = filteredItems.filter((curr) =>
      curr.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  }

  const onChangeHanlderSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onChangeHanlderCate = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <div className={Classes.list_items}>
        <div className={Classes.filters}>
          <div style={{ position: 'relative' }}>
            <input
              value={searchTerm}
              onChange={onChangeHanlderSearch}
              placeholder="Filter by Character name"
              className={Classes.filter_name}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <input
              value={category}
              onChange={onChangeHanlderCate}
              placeholder="Search By Category"
              className={Classes.filter_name}
            />
            <SearchIcon onClick={onSearchHanlder} className={Classes.filter_search} />
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Refresher customFunction={loadData} />
        ) : items.length === 0 ? (
          <p className={Classes.nullItems}>No Items To Show</p>
        ) : (
          filteredItems.slice((page - 1) * 10, page * 10).map((ele) => <ListItem key={ele.id} {...ele} />)
        )}
        <PaginationComponent totalItems={filteredItems.length} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default List;
