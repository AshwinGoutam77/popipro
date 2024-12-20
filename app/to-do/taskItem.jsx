'use client'
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Modal } from "react-bootstrap";
import Api from '@services/Api';
import { UpdateTodoStatus } from '@services/Routes';
import { showToast } from '@components/Dashboard/Toast';
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faExpand } from '@node_modules/@fortawesome/free-solid-svg-icons';

const TaskItem = ({ tasks, onDelete, onEdit, onToggleTimer, userData, APIDATA }) => {
    const [Show, setShow] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [AdditionalInfo, setAdditionalInfo] = useState("")
    const [Hours, setHours] = useState("")
    const [Minutes, setMinutes] = useState("");
    const [TaskID, setTaskID] = useState("")
    const [expandedRow, setExpandedRow] = useState(null);
    const toggleRow = (key) => {
        setExpandedRow((prevKey) => (prevKey === key ? null : key));
    };


    const handleCheckboxChange = (task) => {
        setSelectedTask(task);
        setEditTitle(task.detail)
        setShow(!task?.is_done && true);
        setTaskID(task?.id);
    };

    const handleUpdateTask = async () => {
        let data = {
            todo_id: TaskID,
            status: "done",
            extra_notes: AdditionalInfo,
            hours: Hours,
            minutes: Minutes
        }
        const response = await Api(UpdateTodoStatus, data)
        if (response?.data?.status) {
            showToast(response?.data?.message, 'success')
            APIDATA()
            setShow(false)
            setAdditionalInfo("")
            setHours("")
            setMinutes("")
        } else {
            showToast(response?.data?.message, 'error')
        }
    }

    return (
        <div>
            <Modal show={Show} onHide={() => setShow(false)} centered>
                <Modal.Header>
                    <Modal.Title>
                        <h5 className="title title--h1 first-title title__separate mb-1 mb-0">
                            Update Task
                        </h5>
                    </Modal.Title>
                    <button
                        type="button"
                        className="close"
                        onClick={() => setShow(false)}
                    >
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close alert</span>
                    </button>
                </Modal.Header>
                <Modal.Body style={{ padding: "10px" }}>
                    <div className="p-2">
                        {selectedTask && (
                            <div>
                                <label>Additional Detail:</label>
                                <textarea
                                    type="text"
                                    className='form-control'
                                    defaultValue={AdditionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                />
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div>
                                        <label>Hours</label>
                                        <input
                                            type="number"
                                            defaultValue={Hours}
                                            className='form-control'
                                            onChange={(e) => setHours(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>Minutes</label>
                                        <input
                                            type="number"
                                            defaultValue={Minutes}
                                            className='form-control'
                                            onChange={(e) => setMinutes(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button className='contact-btn w-auto mt-2' onClick={() => handleUpdateTask()}>Save</button>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>

            <div className="w-100">
                <div className="box-shadow-leads mb-4 mt-3">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th><FontAwesomeIcon icon={faExpand} /></Th>
                                <Th>Status</Th>
                                <Th>Task</Th>
                                <Th>Time</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userData?.map((task, index) => {
                                const uniqueKey = `${index}`;
                                const isExpanded = expandedRow === uniqueKey;
                                return (
                                    <>
                                        <Tr key={index} className={task?.is_done && "todo-table-row"} onClick={() => toggleRow(uniqueKey)}>
                                            <Td><FontAwesomeIcon icon={!isExpanded ? faChevronDown : faChevronUp} /></Td>
                                            <Td>
                                                <input
                                                    type="checkbox"
                                                    checked={task?.is_done}
                                                    onChange={() => handleCheckboxChange(task)}
                                                />
                                            </Td>
                                            <Td>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{task.detail}</span>
                                                )}
                                            </Td>
                                            {task?.is_done ? <Td>{task.updates.map((i, o) => {
                                                const hours = Math.floor(i?.spent_minutes / 60);
                                                const minutes = i?.spent_minutes % 60;
                                                return (i.spent_minutes > 0) ? hours + 'H: ' + minutes + 'M' : o
                                            })}</Td> : <Td>---</Td>}
                                            <Td>
                                                <p
                                                    className="font-weight-bold cursor-pointer"
                                                    onClick={() => onDelete(task.id)}
                                                >
                                                    Delete
                                                </p>
                                            </Td>
                                        </Tr>
                                        {isExpanded && (
                                            <tr>
                                                <td colSpan="4" className="expanded-row">
                                                    <strong>Additional Details:</strong>
                                                    {task.updates.map((item, index) => {
                                                        return (
                                                            <p key={index} className='mt-2'>{item?.extra_notes}</p>
                                                        )
                                                    })}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )
                            })}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
