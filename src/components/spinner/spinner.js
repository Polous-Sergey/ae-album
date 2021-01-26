import React from 'react';

const Spinner = () => {
  return (
    <div className="m-auto">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
