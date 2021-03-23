import { useState, useEffect } from "react";
import "../Styles/App.scss";
import StatusLine from "./StatusTrack";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasksFromLocal();
    }, []);

    function addEmptyTask(status) {
        const lastTask = tasks[tasks.length - 1];
        let newTaskId = 1;

        if (lastTask !== undefined) {
            newTaskId = lastTask.id + 1
        }

        setTasks(tasks => [
            ...tasks,
            {
                id: newTaskId,
                title: "",
                description: "",
                priority: "",
                status: status,
            },
        ]);
    }

    function addTask(taskToAdd) {
        let filteredTasks = tasks.filter(task => {
            return task.id !== taskToAdd.id
        });
        let newTaskList = [...filteredTasks, taskToAdd];

        setTasks(newTaskList);
        saveTasksToLocal(newTaskList);
    }

    function deleteTask(taskId) {
        let filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        });

        setTasks(filteredTasks);
        saveTasksToLocal(filteredTasks);
    }

    function moveTask(id, newStatus) {
        let task = tasks.filter(task => {
            return task.id === id
        })[0];
        let filteredTasks = tasks.filter(task => {
            return task.id !== id
        });

        task.status = newStatus;
        let newTaskList = [...filteredTasks, task]

        setTasks(newTaskList);
        saveTasksToLocal(newTaskList);
    }

    function saveTasksToLocal(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocal() {
        let loadedTasks = localStorage.getItem("tasks");
        let tasks = JSON.parse(loadedTasks);

        if (tasks) {
            setTasks(tasks);
        }
    }

    return (
        <div className="App">
            <h1>BootCampDI</h1>
            <h2>Bootcamp Project Manager</h2>
            <main>
                <section>
                    <StatusLine
                        tasks={tasks}
                        addEmptyTask={addEmptyTask}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        status="Identified"
                    /><StatusLine
                        tasks={tasks}
                        addEmptyTask={addEmptyTask}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        status="Shelved"
                    />
                    <StatusLine
                        tasks={tasks}
                        addEmptyTask={addEmptyTask}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        status="In Progress"
                    />
                     <StatusLine
                        tasks={tasks}
                        addEmptyTask={addEmptyTask}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        moveTask={moveTask}
                        status="Completed"
                    />
                </section>
            </main>
        </div>
    )

}

export default App;