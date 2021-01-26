import React from 'react';

import './image-list-item.css';

const ImageListItem = ({ image, setImageId }) => {
  const { id, cropped_picture } = image;
  return (
    <div className="mx-auto image-list-item" onClick={ () => setImageId(id) }>
      <img src={ cropped_picture } className="rounded img-fluid" alt={ id }/>
    </div>
  );
};

export default ImageListItem;
