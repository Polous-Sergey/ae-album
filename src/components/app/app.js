import React, { useEffect, useState } from 'react';

import ImageList from '../image-list';
import ImageListPagination from '../image-list-pagination';
import Modal from '../modal';
import AgileService from '../../services/agile-service';

const agileService = new AgileService();

const initialState = {
  images: [],
  pageCount: 1,
  loading: true,
  error: null
};

function App() {
  const [page, setPage] = useState(1);
  const [imageId, setImageId] = useState(null);
  const [{ images, pageCount, loading, error }, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);

    agileService.getImages(page)
      .then(({ pictures: images, pageCount }) => setDataState({
        images,
        pageCount,
        loading: false,
        error: false
      }))
      .catch(error => setDataState({
        error,
        images: [],
        pageCount: 1,
        loading: false
      }));
  }, [page]);

  return (
    <>
      <ImageListPagination
        page={ page }
        loading={ loading }
        pageCount={ pageCount }
        setPage={ setPage }
      />
      <ImageList
        images={ images }
        loading={ loading }
        error={ error }
        setImageId={ setImageId }
      />
      {
        imageId &&
        <Modal
          images={ images }
          imageId={ imageId }
          agileService={ agileService }
          setImageId={ setImageId }
        />
      }
    </>
  );
}

export default App;
