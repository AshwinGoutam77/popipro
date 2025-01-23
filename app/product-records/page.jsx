'use client';
import { faAngleLeft, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Api from '@services/Api';
import { GetProductsOrder } from '@services/Routes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/about.css";
import { showToast } from '@components/Dashboard/Toast';
import { useAuthContext } from '@context/AuthContext';
import RedirectComponent from '@app/RedirectComponent/page';

export default function OrderRecord() {
    const { UserData } = useAuthContext();
    const [OrderData, setOrderData] = useState("");
    let d = new Date();
    const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
    const [EndDate, setEndDate] = useState(new Date());
    const [ShowLoader, setShowLoader] = useState();

    const handleGetOrderProducts = async () => {
        const res = await Api(GetProductsOrder, {})
        if (res.status) {
            setOrderData(res.data.data.orders);
        }
    }

    useEffect(() => {
        handleGetOrderProducts();
    }, []);

    function pad(n, width, z) {
        z = z || "0";
        n = n + "";
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    const handleSearchData = async (e) => {
        try {
            setShowLoader(true);

            const formatDate = (date) =>
                date
                    ? `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}`
                    : "";
            const startDt = formatDate(new Date(StartDate));
            const endDt = formatDate(new Date(EndDate));

            const response = await Api(GetProductsOrder, {}, `?start_date=${startDt}&end_date=${endDt}`);

            if (response.data.status) {
                showToast(response.data.message, "success");
                setOrderData(response.data.data?.orders);
            }
        } catch (error) {
            if (error.request?.status === 401) {
                ["token", "url"].forEach((item) => localStorage.removeItem(item));
                window.location.href = "/login";
            } else {
                showToast(error.response?.data?.message || "Something went wrong", "error");
            }
        } finally {
            setShowLoader(false);
        }
    };

    return (
        <>
            <RedirectComponent />
            <div className="bg-lightGrey">
                <div
                    className="login-header p-3 text-center d-flex align-items-center justify-content-between"
                    style={{ background: "black" }}
                >
                    <h5 className="text-white m-0">
                        <FontAwesomeIcon
                            icon={faBagShopping}
                            className="text-white mr-2"
                            width="20"
                        />{" "}
                        Order Summary
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
                <div className="container-fluid mb-4">
                    <div className='w-100 bg-custom'>
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
                                        onClick={handleSearchData}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 box-shadow-leads">
                            <table className="insight-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Order ID</th>
                                        <th>Customer ID</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {OrderData &&
                                        OrderData?.map((items, index) => {
                                            return (
                                                items?.product_details?.map((i, o) => {
                                                    const uniqueKey = `${index}-${o}`;
                                                    return (
                                                        <tr key={uniqueKey}>
                                                            <td>{i?.productable?.name || "----"}</td>
                                                            <td>
                                                                {i?.productable?.price
                                                                    ? i?.productable?.price
                                                                    : "-----"}
                                                            </td>
                                                            <td>{i?.quantity}</td>
                                                            <td>{i?.order_id ? i?.order_id : "--"}</td>
                                                            <td>{i?.customer_id ? i?.customer_id : "--"}</td>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}