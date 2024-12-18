'use client'
import Api from '@services/Api';
import { GetProductsOrder } from '@services/Routes';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal } from "react-bootstrap";

export default function OrderSummaryModal({ active, handleClose, MainData }) {
    const [OrderData, setOrderData] = useState("");

    const handleGetOrderProducts = async () => {
        const res = await Api(GetProductsOrder, {})
        if (res.status) {
            setOrderData(res.data.data.orders);
        }
    }

    const [visibleCount, setVisibleCount] = useState(5);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    useEffect(() => {
        handleGetOrderProducts();
    }, [])

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
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {OrderData &&
                                OrderData.slice(0, visibleCount).map((items, index) => {
                                    return (
                                        items?.product_details?.map((i, o) => {
                                            const uniqueKey = `${index}-${o}`;
                                            return (
                                                <tr key={uniqueKey}>
                                                    <td>{i?.productable?.name || "----"}</td>
                                                    <td>
                                                        {i?.productable?.price
                                                            ? `${MainData?.company_setting?.currency?.currency} ${i?.productable?.price}`
                                                            : "-----"}
                                                    </td>
                                                    <td>{i?.quantity}</td>
                                                    <td
                                                        className={
                                                            items?.order_status === "pending" ? 'pending' : 'success'
                                                        }
                                                    >
                                                        {items?.order_status}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    );
                                })}
                        </tbody>
                    </table>
                    <div className='text-center my-2'>
                        {visibleCount < OrderData.length && (
                            <button onClick={loadMore} className='contact-btn w-auto'>Load More</button>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
