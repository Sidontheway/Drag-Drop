import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { HiOutlineBackspace } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md"


const DraggableItem = ({ id, text, left }) => {
    const [isdelete, setisdelete] = useState(true);
    const [isedit, setisedit] = useState(false)
    const [inputValue, setInputValue] = useState(text);
    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
    const edit_done = ()=>{
        text = inputValue;
        setisedit(false);
    }

    const handle_delete = () => {
        setisdelete(false);
    }
    const handle_edit = () => {
        setisedit(true);
    }
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { id, text },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <>
            {
                isdelete || left ? (
                    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="bg-red-600 m-4 p-2 rounded-sm flex justify-evenly">

                        <div className="flex justify-start w-3/4">
                            {
                                isedit ? (
                                    <>
                                        <input type="text"
                                            value={inputValue}
                                            onChange={handleChange}
                                            className='w-full text-black font-semibold rounded-sm mr-4 pl-3 cursor-text'
                                        />
                                        <div className='text-white font-normal rounded-lg bg-green-600 p-2 cursor-pointer' onClick={edit_done}>Done</div>
                                    </>
                                ) : inputValue
                            }
                        </div>

                        <div className="flex gap-2  place-items-center w-1/6 ">
                            <HiOutlineBackspace onClick={handle_delete} className=' cursor-pointer' />
                            <MdModeEditOutline className=' cursor-pointer' onClick={handle_edit} />
                        </div>
                    </div>
                ) : null
            }

        </>

    );
};

export default DraggableItem;
