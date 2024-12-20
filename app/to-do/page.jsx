'use client'
import React, { useEffect, useState } from 'react';
import TaskItem from './taskItem';
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome';
import { faAngleLeft, faPlus, faSquareCheck } from '@node_modules/@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import "../../styles/about.css";
import { Modal } from "react-bootstrap";
import './page.css'
import Api from '@services/Api';
import { CreateTodo } from '@services/Routes';
import { useAuthContext } from "@context/AuthContext";
import { ToastContainer } from "react-toastify";

function Todo() {
    const { token, APIDATA, UserData } = useAuthContext();
    useEffect(() => {
        APIDATA();
    }, []);


    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [Show, setShow] = useState(false);

    // Add a task
    const addTask = async () => {
        if (newTask.trim()) {
            const newTaskObj = {
                initiation_date: new Date().toISOString().split('T')[0],
                detail: newTask,
                // timeSpent: 0,
                type: "daily",
                // isTimerRunning: false
            };
            setTasks([...tasks, newTaskObj]);
            const response = await Api(CreateTodo, newTaskObj)
            // if (response?.data?.status) {
            //     APIDATA()
            // }
            setNewTask("");
            setShow(false)
        }
    };

    // Delete a task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Edit a task
    const editTask = (id, updatedTitle) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, title: updatedTitle } : task
        );
        setTasks(updatedTasks);
    };

    // Toggle timer (start/stop)
    const toggleTimer = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        isTimerRunning: !task.isTimerRunning,
                    };
                }
                return task;
            })
        );
    };

    // Increment time for running timers
    const incrementTime = () => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.isTimerRunning
                    ? { ...task, timeSpent: task.timeSpent + 1 }
                    : task
            )
        );
    };

    // Timer Effect
    React.useEffect(() => {
        const timer = setInterval(() => incrementTime(), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Modal show={Show} onHide={() => setShow(false)} centered>
                <Modal.Header>
                    <Modal.Title>
                        <h5
                            class="title title--h1 first-title title__separate mb-1 mb-0"
                            id="BlogModalTitle"
                        >
                            Add Tasks
                        </h5>
                    </Modal.Title>
                    <button
                        type="button"
                        class="close"
                        onClick={() => setShow(false)}
                    >
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">Close alert</span>
                    </button>
                </Modal.Header>
                <Modal.Body style={{ padding: "10px 5px" }}>
                    <div className='p-2'>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter task title..."
                            className='form-control mb-2'
                        />
                        <button onClick={addTask} className='contact-btn w-auto'>Save Task</button>
                    </div>
                </Modal.Body>
            </Modal>
            <div
                className="login-header p-3 text-center d-flex align-items-center justify-content-between"
                style={{ background: "black" }}
            >
                <h5 className="text-white m-0">
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        className="text-white mr-2"
                        width="20"
                    />{" "}
                    To Do Managment
                </h5>
                <Link href="/dashboard">
                    <h6 className="text-white m-0">
                        {" "}
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="text-white mr-2"
                            width="10"
                        />
                        Back
                    </h6>
                </Link>
            </div>
            <div style={{ margin: "20px" }}>
                <div className="contact-btns" onClick={() => {
                    setShow(true);
                }}>
                    <FontAwesomeIcon icon={faPlus} className="text-dark cursor-pointer" />
                    <p>Add Task</p>
                </div>


                <TaskItem
                    tasks={tasks}
                    userData={UserData?.card?.card_todo}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    onToggleTimer={toggleTimer}
                    APIDATA={APIDATA}
                />
            </div>
        </>
    );
}

export default Todo;