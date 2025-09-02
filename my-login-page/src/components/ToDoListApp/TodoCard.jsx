// import React, { useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";

// const TodoCard = () => {
//   const [boxes, setBoxes] = useState([{ id: 1, isPlus: true }]);
//   const [menuOpen, setMenuOpen] = useState(null);

//   const addBox = () => {
//     const newBox = {
//       id: boxes.length + 1,
//       isPlus: false,
//       title: "",
//       description: "",
//       isCreated: false,
//       isEditing: false,
//       isNew: true,
//     };
//     setBoxes([
//       ...boxes.slice(0, -1),
//       newBox,
//       { id: boxes.length + 2, isPlus: true },
//     ]);
//   };

//   const handleInputChange = (id, field, value) => {
//     if (field == "title" && value.length > 20) return;
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => (box.id === id ? { ...box, [field]: value } : box))
//     );
//   };

//   const createTask = (id) => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) =>
//         box.id === id ? { ...box, isCreated: true, isEditing: false } : box
//       )
//     );
//   };

//   const deleteTask = (id) => {
//     setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
//   };

//   const editTask = (id) => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) =>
//         box.id === id ? { ...box, isEditing: true } : box
//       )
//     );
//     setMenuOpen(null);
//   };

//   return (
//     <div className="h-full w-screen min-h-screen overflow-x-hidden overflow-scroll p-2 flex flex-col items-center">
//       <div
//         className={`w-full pb-[30px] ${
//           boxes.length === 1
//             ? "flex justify-center items-center"
//             : "grid grid-cols-1 px-5 mt-2 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-10 xl:grid-cols-4 xl:px-30 gap-3 2xl:grid-cols-5"
//         }`}
//       >
//         {boxes.map((box) => (
//           <div
//           key={box.id}
//           className={`w-full sm:w-72 min-h-[300px] p-4 flex flex-col items-center rounded-lg shadow-md relative bg-[#ffd4a9] ${
//             box.isNew ? "bg-[#ffd4a9]" : "bg-gray-200"
//           }`}
//             onClick={(e) => {
//               if (box.isPlus) {
//                 addBox();
//               }
//               setMenuOpen(null);
//             }}
//           >
//             {box.isPlus ? (
//               <span className="text-8xl font-[200] cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 +
//               </span>
//             ) : (
//               <div className="text-center w-full relative">
//                 <div className="flex items-center justify-between w-full">
//                   {box.isCreated && !box.isEditing ? (
//                     <h3 className="text-lg font-extrabold">{box.title}</h3>
//                   ) : (
//                     <input
//                       className={`w-full font-extrabold px-1 text-xl focus:outline-none ${
//                         box.isEditing ? "border border-gray-400 outline-none" : "border-none"
//                       }`}
//                       type="text"
//                       placeholder="Enter Task heading"
//                       value={box.title}
//                       onChange={(e) =>
//                         handleInputChange(box.id, "title", e.target.value)
//                       }
                      
//                     />
//                   )}
//                   <div className="relative bottom-2 ">
//                     <BsThreeDotsVertical
//                       className="text-xl cursor-pointer"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setMenuOpen(menuOpen === box.id ? null : box.id);
//                       }}
//                     />
//                     {menuOpen === box.id && (
//                       <div className="absolute right-0 mt-1 w-18 bg-white rounded shadow-md">
//                         {!box.isCreated ? (
//                           <button
//                             className="block w-full text-left px-3 py-1 text-black hover:bg-gray-100 rounded"
//                             onClick={() => deleteTask(box.id)}
//                           >
//                             Delete
//                           </button>
//                         ) : (
//                           <>
//                             <button
//                               className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded"
//                               onClick={() => editTask(box.id)}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="block w-full text-left px-3 py-1 text-black hover:bg-gray-100 rounded"
//                               onClick={() => deleteTask(box.id)}
//                             >
//                               Delete
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {box.isCreated && !box.isEditing ? (
//                   <div className="text-l text-left whitespace-pre-wrap mt-5 max-h-40 overflow-y-auto">
//                     {box.description}
//                   </div>
//                 ) : (
//                   <textarea
//                     className={`w-full p-2 mt-2 resize-none h-45 text-l font-medium focus:outline-none ${
//                       box.isEditing ? "border border-gray-400 outline-none" : "border-none"
//                     } `}
//                     placeholder="Enter your task here..."
//                     value={box.description}
//                     onChange={(e) =>
//                       handleInputChange(box.id, "description", e.target.value)
//                     }
//                   />
//                 )}

//                 {!box.isCreated || box.isEditing ? (
//                   <button
//                     className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 absolute top-58 right-1"
//                     onClick={() => createTask(box.id)}
//                   >
//                     {box.isCreated ? "Update" : "Create"}
//                   </button>
//                 ) : null}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TodoCard;





import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask } from "../../features/todos/TodoSlice";
import { BsThreeDotsVertical } from "react-icons/bs";

const TodoCard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks);
  const [menuVisible, setMenuVisible] = useState(null);

  return (
    <div className=" h-full 2xl:px-26 w-screen  min-h-screen overflow-x-hidden overflow-scroll mt-13 md:px-25 flex flex-col items-center">
      <div
        className={`w-full pb-[30px] mt-1 ${
          tasks.length === 0
            ? "flex justify-center items-center"
            : " grid grid-cols-1 px-5 mt-2 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-10 xl:grid-cols-3 xl:px-20 gap-3 2xl:grid-cols-5"
        }`}
      >
        {tasks.map((box) => (
          <div
            key={box.id}
            className="w-full sm:w-70 min-h-[300px] p-4 flex flex-col items-center rounded-lg shadow-md relative bg-[#ffd4a9] "
          >
            <div className="text-center w-full relative">
              <div className="flex items-center justify-between w-full">
                {box.isCreated && !box.isEditing ? (
                  <h3 className="text-lg font-extrabold">{box.title}</h3>
                ) : (
                  <input
                    className="w-full font-extrabold px-1 text-xl focus:outline-none border-none"
                    type="text"
                    placeholder="Enter Task heading"
                    value={box.title}
                    maxLength={20} 
                    onChange={(e) =>
                      dispatch(updateTask({ id: box.id, field: "title", value: e.target.value }))
                    }
                  />
                )}
                <div className="relative bottom-2">
                  <BsThreeDotsVertical
                    className="text-xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuVisible(menuVisible === box.id ? null : box.id);
                    }}
                  />
                  {menuVisible === box.id && (
                    <div className="absolute right-0 mt-1 w-18 bg-white rounded shadow-md">
                      {!box.isCreated ? (
                        <button
                          className="block w-full text-left px-3 py-1 text-black hover:bg-gray-100 rounded"
                          onClick={() => dispatch(deleteTask(box.id))}
                        >
                          Delete
                        </button>
                      ) : (
                        <>
                          <button
                            className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded"
                            onClick={() => dispatch(updateTask({ id: box.id, field: "isEditing", value: true }))}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full text-left px-3 py-1 text-black hover:bg-gray-100 rounded"
                            onClick={() => dispatch(deleteTask(box.id))}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {box.isCreated && !box.isEditing ? (
                <div className="text-l text-left whitespace-pre-wrap mt-5 max-h-40 overflow-y-auto">
                  {box.description}
                </div>
              ) : (
                <textarea
                  className="w-full p-2 mt-2 resize-none h-45 text-l font-medium focus:outline-none border-none"
                  placeholder="Enter your task here..."
                  value={box.description}
                  onChange={(e) =>
                    dispatch(updateTask({ id: box.id, field: "description", value: e.target.value }))
                  }
                />
              )}
              {!box.isCreated || box.isEditing ? (
                <button
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 absolute top-58 right-1"
                  onClick={() => {
                    dispatch(updateTask({ id: box.id, field: "isCreated", value: true }));
                    dispatch(updateTask({ id: box.id, field: "isEditing", value: false }));
                  }}
                >
                  {box.isCreated ? "Update" : "Create"}
                </button>
              ) : null}
            </div>
          </div>
        ))}
        <div
          className="w-full sm:w-72 min-h-[300px] p-4 flex flex-col items-center rounded-lg shadow-md relative bg-gray-200 cursor-pointer"
          onClick={() => dispatch(addTask())}
        >
          <span className="text-8xl font-[200] cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;

