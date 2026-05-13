import React from "react";
import NavBar from "../components/NavBar";
import ActiveTaskList from "../components/ActiveTaskList";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
interface TaskModel {
  title: string;
  date: string;
  id: number;
}
function ActiveTasks() {
  const [tasks, setTasks] = React.useState<TaskModel[]>([]);
  const title: any = React.useState();

  // get all todos not completed with respect to userid
  const getAllNotCompletedTasks = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.get(
        ApiConstants.TASK.FIND_NOT_COMPLETED(userId),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setTasks(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  const saveTask = async () => {
    if (title.current.value == "") {
      toast.info("Please Provide Title");
      return;
    }
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.post(
        ApiConstants.TASK.ADD(userId),
        {
          title: title.current.value,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      getAllNotCompletedTasks();
      title.current.value = "";
      toast.success("Task Added Scuessfully!!");
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  React.useEffect(() => {
    if (tasks.length == 0) getAllNotCompletedTasks();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          <span className="text-black text-2xl ">Enter Task : </span>
          <input ref={title} className="mt-2 p-2  rounded-xl "></input>
          <button
            onClick={saveTask}
            className="w-36 px-2 py-4 text-white mx-auto mb-12 mt-2 bg-green-400 rounded-xl hover:bg-green-500 text-2xl"
          >
            Save
          </button>

          {tasks.map((task) => {
            return (
              <ActiveTaskList
                key={task.id}
                dateTime={task.date}
                deleteTask={async () => {
                  const response = await custom_axios.delete(
                    ApiConstants.TASK.DELETE(task.id),
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  getAllNotCompletedTasks();
                  toast.success("Task Deleted Sucessfully!!");
                }}
                markCompelte={async () => {
                  const response = await custom_axios.patch(
                    ApiConstants.TASK.MARK_COMPLETE(task.id),
                    {},
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  getAllNotCompletedTasks();
                  toast.success("Task Marked Completed");
                }}
                id={task.id}
                task={task.title}
              ></ActiveTaskList>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ActiveTasks;
