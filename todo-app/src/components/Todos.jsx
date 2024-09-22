import { MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, removeTodo } from "../features/todoSlice";
import { useState } from "react";

export const Todos = () => {
  const todos = useSelector((state) => state.todo.todos);
  console.log(todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newText, setNewText] = useState("");

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setNewText(todo.text); 
  };

  const handleSave = (id) => {
    dispatch(editTodo({ id, text: newText })); 
    setEditId(null); 
  };

  return (
    <>
      <div>Todo</div>
      <div className="text-white">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded w-full"
          >
            {editId === todo.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="text-lg bg-zinc-700 text-white px-2 py-1 rounded"
              />
            ) : (
              <p className="text-lg">{todo.text}</p>
            )}

            <div className="flex space-x-2">
              {editId === todo.id ? (
                <button
                  className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-xl"
                  onClick={() => handleSave(todo.id)}
                >
                  <MdCheck />
                </button>
              ) : (
                <button
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-xl"
                  onClick={() => handleEdit(todo)}
                >
                  <MdEdit />
                </button>
              )}

              <button
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-xl"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </div>
    </>
  );
};
