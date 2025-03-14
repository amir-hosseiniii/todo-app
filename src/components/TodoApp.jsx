import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Trash, Edit } from "lucide-react";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    if (editId) {
      setTasks(tasks.map(task => task.id === editId ? { ...task, text: input } : task));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    }
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, text) => {
    setInput(text);
    setEditId(id);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">🔥 Todo List</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 p-2 rounded-lg text-black text-white border focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between bg-gray-700 p-2 rounded-lg"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}
              >
                {task.text}
              </span>

              <div className="flex gap-2">
                <button onClick={() => editTask(task.id, task.text)} className="text-yellow-400 hover:text-yellow-500">
                  <Edit size={20} />
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-500">
                  <Trash size={20} />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
