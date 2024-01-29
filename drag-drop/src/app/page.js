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
      <div className="flex justify-items-center bg-slate-600 gap-20 min-h-svh p-5 ">
        <div className="w-1/6 text-lg text-white font-semibold gap-3 mr-3">
          <h2>Website Toolbar</h2>

          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="text-black font-semibold w-full mr-5 ml-2 pl-1 rounded-sm mt-5"
          />
          <button onClick={getValue} className="p-2 rounded-full bg-green-600 mt-2 mb-5">Add Value</button>

          {draggableItems.map(item => (
            <DraggableItem key={item.id} id={item.id} text={item.text} left={true} />
          ))}


          <div>
            <ImageSelector onImageSelect={handleImageSelect} />
            <DroppableArea onDrop={handleImageDrop}>
            </DroppableArea>
          </div>

        </div>

        <DroppableContainer onDrop={handleDrop}  >
          <div className=" w-[150%] h-100vh border-l-4  border-slate-900  text-white text-2xl justify-center items-center ml-5">
            <h2 className=' mx-10'>Website Builder</h2>
            <div className="items-center">
              {draggedItems.map(item => (
                <>
                  <DraggableItem key={item.id} id={item.id} text={item.text} left={false} />
                </>
              ))}

              {images.map((imageUrl, index) => (
                <DraggableImage key={index} imageUrl={imageUrl} onDragStart={(e, url) => e.dataTransfer.setData('text/plain', url)} />
              ))}


            </div>
          </div>
        </DroppableContainer>

        <button
          className='absolute top-0 right-10 rounded-lg bg-green-600 p-2 text-lg font-semibold text-white'
          onClick={() => { window.alert("Website has been Saved") }}
        >Save</button>
      </div>
    </DndProvider>
  );
};

export default Home;
