// DraggableImage.js
import React from 'react';

const DraggableImage = ({ imageUrl, onDragStart }) => {
  return (
    <img
      src={imageUrl}
      alt="Draggable"
      draggable
      onDragStart={(e) => onDragStart(e, imageUrl)}
      style={{ maxWidth: '100%', cursor: 'move',marginLeft:15 }}
    />
  );
};

export default DraggableImage;
