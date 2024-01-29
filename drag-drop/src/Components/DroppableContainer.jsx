// components/DroppableContainer.js
import { useDrop } from 'react-dnd';

const DroppableContainer = ({ onDrop, children }) => {
  const [, drop] = useDrop(() => ({
    accept: 'item',
    drop: onDrop,
  }));

  return <div ref={drop}>{children}</div>;
};

export default DroppableContainer;
