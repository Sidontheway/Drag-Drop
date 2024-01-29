// ImageSelector.js
import React, { useRef } from 'react';
// import DragableImage from './DragableImage';

const ImageSelector = ({ onImageSelect }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onImageSelect(reader.result);
      };
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <button onClick={() => inputRef.current.click()}>Select Image</button>
    </div>
  );
};

export default ImageSelector;
