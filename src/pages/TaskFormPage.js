import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id,data);
    } else {
      createTask(data);
    }
    navigate("/tasks");
  });

  useEffect(() => {
    const getEditTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    };
    getEditTask();
  }, []);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
          {...register("title")}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows="3"
          placeholder="Description"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          id="description"
          {...register("description")}
        ></textarea>

        <button 
        className="bg-indigo-500 px-3 py-2 rounded-md"
        >Save</button>
      </form>
    </div>
    </div>
  );
};

export default TaskFormPage;
