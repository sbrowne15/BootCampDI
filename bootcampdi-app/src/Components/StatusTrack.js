import "../styles/statusTrack.scss";
import Task from "./Task";

function StatusTrack(props) {
    const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;

    let taskList, tasksForStatus;

    function handleAddEmpty() {
        addEmptyTask(status);
    }

    if (tasks) {
        tasksForStatus = tasks.filter((task) => {
            return task.status === status;
        });
    }

    if (tasksForStatus) {
        taskList = tasksForStatus.map((task) => {
            return (
                <Task
                    addTask={(task) => addTask(task)}
                    deleteTask={(id) => deleteTask(id)}
                    moveTask={(id, status) => moveTask(id, status)}
                    key={task.id}
                    task={task}
                />
            );
        });
    }

    return (
        <div className="statusTrack">
            <h3>{status}</h3>
            {taskList}
            <button onClick={handleAddEmpty} className="button addTask">
                + Add Task
            </button>
        </div>
    );
}

export default StatusTrack;