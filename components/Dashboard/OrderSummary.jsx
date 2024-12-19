'use client'
import { faArrowDown, faArrowUp, faChevronDown, faChevronUp } from '@node_modules/@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome';
import Api from '@services/Api';
import { GetOpenOrders, GetProductsOrder } from '@services/Routes';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal } from "react-bootstrap";

export default function OrderSummaryModal({ active, handleClose, MainData, handleGetOrderProducts, OrderData }) {
    const [expandedRow, setExpandedRow] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    useEffect(() => {
        handleGetOrderProducts();
    }, [])

    const toggleRow = (key) => {
        setExpandedRow((prevKey) => (prevKey === key ? null : key));
    };


    return (
        <Modal show={active} onHide={() => handleClose()} centered>
            <Modal.Header>
                <Modal.Title>
                    <h5 className="title title--h1 first-title title__separate mb-0">
                        <img
                            src="../static/img/order-summary.png"
                            alt="image"
                            width={18}
                            className="cursor-pointer mr-2"
                            style={{ marginTop: "-5px" }}
                        />
                        Order Summary
                    </h5>
                </Modal.Title>

                <button type="button" className="close" onClick={() => handleClose()}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close alert</span>
                </button>
            </Modal.Header>

            <Modal.Body className="cart-order-summarymodal p-0">
                <div className="box-shadow-leads hits-details-modal">
                    <table className="insight-table">
                        <thead>
                            <tr>
                                <th><FontAwesomeIcon icon={faArrowUp} /></th>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {OrderData &&
                                OrderData.map((items, index) =>
                                    items?.product_details?.map((i, o) => {
                                        const uniqueKey = `${index}-${o}`;
                                        const isExpanded = expandedRow === uniqueKey;

                                        return (
                                            <React.Fragment key={uniqueKey}>
                                                <tr onClick={() => toggleRow(uniqueKey)} className={'cursor-pointer' + " " + (isExpanded && "background-primaryColor")}>
                                                    <td><FontAwesomeIcon icon={!isExpanded ? faChevronDown : faChevronUp} /></td>
                                                    <td>{items?.order_id}</td>
                                                    <td>
                                                        {i?.productable?.price
                                                            ? `${MainData?.company_setting?.currency?.currency} ${i?.productable?.price}`
                                                            : "-----"}
                                                    </td>
                                                    <td>{i?.created_at}</td>
                                                    <td
                                                        className={
                                                            items?.order_status === "pending" ? "pending" : "success"
                                                        }
                                                    >
                                                        {items?.order_status}
                                                    </td>
                                                </tr>
                                                {isExpanded && (
                                                    <tr>
                                                        <td colSpan="4" className="expanded-row">
                                                            <strong>Additional Details:</strong>
                                                            <ul className='p-0 list-style-none'>
                                                                <li className='mt-2'>
                                                                    <strong>Quantity:</strong>{" "}
                                                                    {i?.quantity || "N/A"}
                                                                </li>
                                                                <li>
                                                                    <strong>Product Name:</strong> {i?.productable?.name || "N/A"}
                                                                </li>
                                                                <li>
                                                                    <strong>Name:</strong>{" "}
                                                                    {items?.user_name}
                                                                </li>
                                                                {items?.user_email && <li>
                                                                    <strong>Email:</strong>{" "}
                                                                    {items?.user_email}
                                                                </li>}
                                                                {items?.user_phone && <li>
                                                                    <strong>Contact Number:</strong>{" "}
                                                                    {items?.user_phone}
                                                                </li>}

                                                                {items?.user_message && <li>
                                                                    <strong>Message:</strong>{" "}
                                                                    {items?.user_message}
                                                                </li>}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })
                                )}
                        </tbody>
                    </table>
                    {/* <div className='text-center my-2'>
                        {visibleCount < OrderData?.length && (
                            <button onClick={loadMore} className='contact-btn w-auto'>Load More</button>
                        )}
                    </div> */}
                </div>
            </Modal.Body>
        </Modal>
    )
}
