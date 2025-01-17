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
import { CreateTodo, LoadMoreApi } from '@services/Routes';
import { useAuthContext } from "@context/AuthContext";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showToast } from '@components/Dashboard/Toast';

function Todo() {
    const { token, APIDATA, UserData, TodoData, setTodoData } = useAuthContext();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        APIDATA();
    }, []);

    const [newTask, setNewTask] = useState("");
    const [Show, setShow] = useState(false);
    let d = new Date();
    const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
    const [EndDate, setEndDate] = useState(new Date());

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
            // setTasks([...tasks, newTaskObj]);
            const response = await Api(CreateTodo, newTaskObj)
            if (response?.data?.status) {
                APIDATA()
            }
            setNewTask("");
            setShow(false)
        }
    };

    function pad(n, width, z) {
        z = z || "0";
        n = n + "";
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    const handleSearchData = async (e) => {
        try {
            let startDateNew = new Date(StartDate);
            let startDt =
                startDateNew?.getFullYear() +
                "-" +
                pad(parseInt(startDateNew.getMonth()) + 1, 2) +
                "-" +
                pad(startDateNew.getDate(), 2);
            let endDt =
                EndDate?.getFullYear() +
                "-" +
                pad(parseInt(EndDate.getMonth()) + 1, 2) +
                "-" +
                pad(EndDate.getDate(), 2);
            const response = await Api(
                LoadMoreApi,
                {}, "?card_url=" + localStorage.getItem("url") + "&type=card_todo" + "&start_date=" + startDt + "&end_date=" + endDt
            );
            if (response.data.status) {
                setTodoData(response?.data?.data?.next_page_data?.data);
                console.log(response?.data?.data?.next_page_data?.data);
                
            }
        } catch (error) {
            console.log(error);
            if (error.request.status == "401") {
                localStorage.removeItem("token");
                localStorage.removeItem("url");
                window.location.href = "/login";
            }
            showToast(error.response.data.message, 'error')
        }
    };

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

                <div className="pt-4">
                    <div className="row w-100 m-0 mb-4 align-items-end filter-section-row bg-white">
                        <div className="col-6 col-lg-2 p-0 px-2">
                            <label className="ml-1">From</label>
                            <DatePicker
                                dateFormat="MM/dd/yyyy"
                                selected={StartDate}
                                maxDate={new Date()}
                                onChange={(date) => setStartDate(date)}
                                placeholderText={"End Date"}
                                className="form-control insight-filter w-100"
                            />
                        </div>
                        <div className="col-6 col-lg-2 p-0 px-2">
                            <label className="ml-1">To</label>
                            <DatePicker
                                dateFormat="MM/dd/yyyy"
                                selected={EndDate}
                                defaultValue={EndDate}
                                onChange={(Date) => setEndDate(Date)}
                                maxDate={new Date()}
                                minDate={StartDate}
                                placeholderText={"End Date"}
                                className="form-control insight-filter w-100"
                            />
                        </div>
                        <div className="col-6 col-lg-2 p-0 px-2">
                            <button
                                className="contact-btn w-auto mt-3"
                                onClick={() => handleSearchData()}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>


                <TaskItem
                    tasks={tasks}
                    userData={TodoData}
                    data={UserData?.card}
                    APIDATA={APIDATA}
                />
            </div>
        </>
    );
}

export default Todo;