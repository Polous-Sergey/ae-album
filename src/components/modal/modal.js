import React, { useEffect, useState } from 'react';

import './modal.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const Modal = ({ children }) => {
  return (
    <div className="modal">
      <div className="window">
        { children }
      </div>
    </div>
  );
};

const ModalContent = ({ data, previousImageId, nextImageId, setImageId }) => {
  const { full_picture, tags, author, camera } = data;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(full_picture);
  };

  const imageBlock = (
    <div className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={ full_picture } className="full-image d-block img-fluid" alt={ tags }/>
        </div>
      </div>
      {
        previousImageId &&
        <button
          className="carousel-control-prev rounded"
          data-bs-slide="prev"
          onClick={ () => setImageId(previousImageId) }
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"/>
          <span className="visually-hidden">Previous</span>
        </button>
      }
      {
        nextImageId &&
        <button
          className="carousel-control-next rounded"
          data-bs-slide="next"
          onClick={ () => setImageId(nextImageId) }
        >
          <span className="carousel-control-next-icon" aria-hidden="true"/>
          <span className="visually-hidden">Next</span>
        </button>
      }
    </div>
  );

  return (
    <>
      <div className="header">
        <button
          type="button"
          className="btn-close close-button"
          aria-label="Close"
          onClick={ () => setImageId(null) }/>

      </div>
      <div className="card w-100">
        { imageBlock }
        <div className="card-body">
          <h5 className="card-title">{ author }</h5>
          <h6 className="card-subtitle mb-2 text-muted">{ tags }</h6>
          <p className="card-text">Camera: { camera }</p>
          <button className="btn btn-primary" onClick={ copyToClipboard }>Copy image URL</button>
        </div>
      </div>
    </>
  );
};

const initialState = {
  data: null,
  loading: true,
  error: null
};

const ModalContainer = ({ agileService, imageId, images, setImageId }) => {

  const imageIndex = images.findIndex(({ id }) => id === imageId);
  const previousImageId = images[imageIndex - 1] && images[imageIndex - 1].id;
  const nextImageId = images[imageIndex + 1] && images[imageIndex + 1].id;

  const [{ data, loading, error }, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);

    agileService.getImageDetails(imageId)
      .then((data) => setDataState({
        data,
        loading: false,
        error: false
      }))
      .catch(error => setDataState({
        error,
        data: null,
        loading: false
      }));
  }, [imageId, agileService]);

  if (loading) {

    return (
      <Modal>
        <div className="d-flex m-auto">
          <Spinner/>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal>
        <ErrorIndicator/>
      </Modal>
    );
  }

  return (
    <Modal>
      <ModalContent
        data={ data }
        previousImageId={ previousImageId }
        nextImageId={ nextImageId }
        setImageId={ setImageId }
      />
    </Modal>
  );
};

export default ModalContainer;
