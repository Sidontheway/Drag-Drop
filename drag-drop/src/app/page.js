"use client"

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from '../components/DraggableItem';

import DraggableImage from '@/Components/DragableImage';
import ImageSelector from '@/Components/ImageSelector';
import DroppableContainer from '@/Components/DroppableContainer';
import DroppableArea from '@/Components/DroppableAreaImage';

const Home = () => {
  const [draggableItems, setDraggableItems] = useState([]);
  const [draggedItems, setDraggedItems] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };


  const handleDrop = (droppedItem) => {
    setDraggableItems(prevItems => prevItems.filter(item => item.id !== droppedItem.id));
    setDraggedItems(prevItems => [...prevItems, droppedItem]);
  };

  const getValue = () => {
    console.log((Boolean(inputValue)))
    if (Boolean(inputValue)) {
      setDraggableItems([{ id: 4, text: inputValue }]);
      setInputValue('');
    }
  };

  // FOR IMAGE FIELD
  const [images, setImages] = useState([]);

  const handleImageSelect = (imageUrl) => {
    setImages([...images, imageUrl]);
  };

  const handleImageDrop = (imageUrl) => {
    const updatedImages = images.filter((img) => img !== imageUrl);
    setImages(updatedImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-items-center bg-slate-600 gap-20 ">
        <div className="w-1/6 text-lg text-white font-semibold gap-3">
          <h2>Draggable Content</h2>

          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="text-black font-semibold"
          />
          <button onClick={getValue} className="p-2 rounded-full bg-green-600">Add Value</button>

          {draggableItems.map(item => (
            <DraggableItem key={item.id} id={item.id} text={item.text} left={true} />
          ))}


          <div>
            <ImageSelector onImageSelect={handleImageSelect} />
            <DroppableArea onDrop={handleImageDrop}>
              {/* {images.map((imageUrl, index) => (
                <DraggableImage key={index} imageUrl={imageUrl} onDragStart={(e, url) => e.dataTransfer.setData('text/plain', url)} />
              ))} */}
            </DroppableArea>
          </div>

        </div>

        <div className="w-full h-100vh border border-slate-900  text-white text-2xl justify-center items-center">
          <DroppableContainer onDrop={handleDrop} >
            <h2>Dragged Content</h2>
            <div className="items-center">
              {draggedItems.map(item => (
                <>
                  <DraggableItem key={item.id} id={item.id} text={item.text} left={false} />
                </>
              ))}

              {/* For image field ==> DO like done for text field  */}
              {/* <DroppableArea onDrop= */}
                {images.map((imageUrl, index) => (
                  <DraggableImage key={index} imageUrl={imageUrl} onDragStart={(e, url) => e.dataTransfer.setData('text/plain', url)} />
                ))}
              {/* </DroppableArea> */}

            </div>
          </DroppableContainer>
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
