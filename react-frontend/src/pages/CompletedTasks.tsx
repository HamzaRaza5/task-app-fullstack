import React from "react";
import NavBar from "../components/NavBar";
import { getLoginInfo } from "../utils/LoginInfo";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { toast } from "react-toastify";
import CompletedTaskList from "../components/CompletedTaskList";

interface TaskModel {
  title: string;
  date: string;
  id: number;
}

const CompletedTasks = () => {
  const [tasks, setTasks] = React.useState<TaskModel[]>([]);

  const getAllCompletedTasks = async () => {
    const userId = getLoginInfo()?.userId;

    if (userId != null) {
      const response = await custom_axios.get(
        ApiConstants.TASK.FIND_COMPLETED(userId),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        },
      );

      setTasks(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  React.useEffect(() => {
    getAllCompletedTasks();
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="text-center text-5xl p-4">Completed Tasks</h1>

      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          {tasks.map((task) => (
            <CompletedTaskList
              key={task.id}
              dateTime={task.date}
              deleteTodo={async () => {
                await custom_axios.delete(ApiConstants.TASK.DELETE(task.id), {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                });

                getAllCompletedTasks();
                toast.success("Task Deleted Successfully!!");
              }}
              id={task.id}
              todo={task.title}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompletedTasks;
