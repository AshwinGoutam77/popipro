'use client'
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const TaskItem = ({ tasks, onDelete, onEdit, onToggleTimer }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState();

    const handleEdit = () => {
        onEdit(task.id, editTitle);
        setIsEditing(false);
    };

    return (
        <div>
            <div className="w-100">
                <div className="box-shadow-leads mb-4 mt-3">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Task</Th>
                                <Th>Time</Th>
                                <Th>Clocker</Th>
                                <Th>Edit</Th>
                                <Th>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tasks.map((task, index) => (<Tr key={index}>
                                <Td >
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                    ) : (
                                        <span>{task.title}</span>
                                    )}
                                </Td>
                                <Td>{task.timeSpent}s</Td>
                                <Td><button
                                    className='contact-btn w-auto'
                                    onClick={() => onToggleTimer(task.id)}
                                >
                                    {task.isTimerRunning ? "Stop Timer" : "Start Timer"}
                                </button></Td>
                                <Td>{isEditing ? (
                                    <button className='contact-btn w-auto' onClick={handleEdit}>Save</button>
                                ) : (
                                    <button className='contact-btn w-auto' onClick={() => setIsEditing(true)}>Edit</button>
                                )}</Td>
                                <Td> <button className='contact-btn w-auto' onClick={() => onDelete(task.id)}>
                                    Delete
                                </button></Td>
                            </Tr>))}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
