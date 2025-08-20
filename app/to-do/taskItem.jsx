'use client'
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Modal } from "react-bootstrap";
import Api from '@services/Api';
import { deleteSection, LoadMoreApi, UpdateTodoStatus } from '@services/Routes';
import { showToast } from '@components/Dashboard/Toast';
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faExpand } from '@node_modules/@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const TaskItem = ({ tasks, onDelete, onEdit, onToggleTimer, userData, APIDATA, data }) => {
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

    const handleDelteServices = async (id, type, DataId) => {
        let data = {
            type: type,
            base: id,
            id: DataId,
        };
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgb(99 171 187)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api(deleteSection, data);
                if (response.data.status) {
                    Swal.fire("Deleted!", "", "success");
                    APIDATA();
                }
            }
        });
    };



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
                                <Th>Created Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userData && userData?.map((task, index) => {
                                const uniqueKey = `${index}`;
                                const isExpanded = expandedRow === uniqueKey;
                                const hours = Math.floor(task?.spent_minutes / 60);
                                const minutes = task?.spent_minutes % 60;
                                return (
                                    <>
                                        <Tr key={index} className={task?.is_done && "todo-table-row"}>
                                            <Td onClick={() => toggleRow(uniqueKey)} className="cursor-pointer"><FontAwesomeIcon icon={!isExpanded ? faChevronDown : faChevronUp} /></Td>
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
                                            {/* {task?.is_done ? <Td>{task.updates.map((i, o) => {
                                                const hours = Math.floor(i?.spent_minutes / 60);
                                                const minutes = i?.spent_minutes % 60;
                                                return (i.spent_minutes > 0) ? hours + 'H: ' + minutes + 'M' : o
                                            })}</Td> : <Td>---</Td>} */}
                                            <Td>{(task.spent_minutes > 0) ? hours + 'H: ' + minutes + 'M' : ""}</Td>
                                            <Td>{task?.initiation_date && task?.initiation_date}</Td>
                                            <Td>
                                                <p
                                                    className="font-weight-bold cursor-pointer"
                                                    // onClick={() => onDelete(task.id)}
                                                    onClick={() =>
                                                        handleDelteServices(
                                                            task.id,
                                                            12,
                                                            data?.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </p>
                                            </Td>
                                        </Tr>
                                        {isExpanded && (
                                            <tr>
                                                <td colSpan="4" className="expanded-row">
                                                    <strong>Additional Details:</strong>
                                                    <p key={index} className='mt-2'>{task?.extra_notes}</p>
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
