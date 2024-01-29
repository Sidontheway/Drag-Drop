// DroppableArea.js
import React from 'react';

const DroppableArea = ({ children, onDrop }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const imageUrl = e.dataTransfer.getData('text/plain');
    onDrop(imageUrl);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ border: '1px dashed black', width: '300px', height: '200px', marginTop: '10px' }}
    >
      {children}
    </div>
  );
};

export default DroppableArea;
