import React from 'react';

import ImageListItem from '../image-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const ImageList = ({ images, setImageId }) => {
  return (
    <div className="container mb-3">
      <div className="row">
        {
          images.map((image) => {
            return (
              <div className="mt-4 d-flex col-12 col-sm-6 col-md-4 col-xl-3" key={ image.id }>
                <ImageListItem
                  image={ image }
                  setImageId={ setImageId }
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

const ImageListContainer = ({ images, loading, error, setImageId }) => {
  if (loading) {
    return (
      <div className="m-auto d-flex">
        <Spinner/>
      </div>
    );
  }

  if (error) {
    return <ErrorIndicator/>;
  }

  return <ImageList
    images={ images }
    setImageId={ setImageId }
  />;
};

export default ImageListContainer;
