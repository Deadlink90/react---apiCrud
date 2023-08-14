import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  console.log(tasks);

  if(tasks.lengt === 0) return <h1>No Tasks</h1>

  return (
    <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-2">
      {tasks.map((task) => (
       <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  );
};

export default TasksPage;
