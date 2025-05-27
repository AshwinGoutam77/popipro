'use client'
import React, { useEffect, useState } from 'react';
import './page.css';
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome';
import { faAddressBook, faAngleLeft, faDownload, faEnvelope, faExpand, faFileExport, faPhone, faPlug, faPlus } from '@node_modules/@fortawesome/free-solid-svg-icons';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../styles/about.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Scanner from '@components/ViewPages/Scanner';
import Api from '@services/Api';
import { GetPhoneBook, SavePhoneBook } from '@services/Routes';
import { showToast } from '@components/Dashboard/Toast';
import Link from "next/link";
import { CSVLink } from "react-csv";

export default function Contact() {
    let d = new Date();
    const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
    const [EndDate, setEndDate] = useState(new Date());
    const [ShowLoader, setShowLoader] = useState(true);
    const [Show, setShow] = useState(false);
    const [UploadScanner, setUploadScanner] = useState(true);
    const [FormData, setFormData] = useState({
        full_name: "",
        contact_number: "",
        email_address: "",
        type: "direct"
    })
    const [PhoneData, setPhoneData] = useState("");
    const [SelectId, setSelectId] = useState("");

    function pad(n, width, z) {
        z = z || "0";
        n = n + "";
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    const handleSearchData = async (e) => {
        try {
            setShowLoader(true);
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
                GetPhoneBook,
                {},
                "?type[0]=" + SelectId + "&start_date=" + startDt +
                "&end_date=" +
                endDt +
                "&search=" +
                ""
            );
            if (response.data.status) {
                setPhoneData(response?.data?.data?.data);
                setShowLoader(false);
            }
        } catch (error) {
            if (error.request.status == "401") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            setShowLoader(false);
            showToast(error.response.data.message, 'error')
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await Api(SavePhoneBook, FormData);
        console.log(response);

        if (response?.data?.status) {
            showToast(response?.data?.message, 'success')
            GetContactData()
            setShow(false)
            setFormData({
                full_name: "",
                contact_number: "",
            })
        }
    }

    const GetContactData = async () => {
        const response = await Api(GetPhoneBook, {});
        if (response?.data?.status) {
            setPhoneData(response?.data?.data?.data)
        }
    }

    useEffect(() => {
        GetContactData()
    }, []);

    const headers = [
        { label: "Name", key: "full_name" },
        { label: "Contact Number", key: "contact_number" },
        { label: "Email", key: "email_address" },
        { label: "tag", key: "type" },
    ];

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
                            Create Contact
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
                    {!UploadScanner ? <form onSubmit={handleSubmit} className="px-2">
                        <div className="mb-2">
                            <label htmlFor="full_name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={FormData?.full_name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="contact_number" className="form-label">
                                Contact Number
                            </label>
                            <input
                                type="number"
                                id="contact_number"
                                name="contact_number"
                                value={FormData?.contact_number}
                                onChange={handleChange}
                                placeholder="Contact"
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="contact_number" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email_address"
                                name="email_address"
                                value={FormData?.email_address}
                                onChange={handleChange}
                                placeholder="Email"
                                className="form-control"
                            />
                        </div>


                        {/* <div className="mb-2">
                            <label htmlFor="tag" className="form-label">
                                Tag
                            </label>
                            <input
                                type="text"
                                id="tag"
                                placeholder="Tag"
                                className="form-control"
                            />
                        </div> */}

                        <button type="submit" className="contact-btn w-auto mb-2">
                            Create Contact
                        </button>
                    </form> : <Scanner GetContactData={GetContactData} setShow={setShow} />}
                </Modal.Body>
            </Modal>

            <div
                className="login-header p-3 text-center d-flex align-items-center justify-content-between"
                style={{ background: "black" }}
            >
                <h5 className="text-white m-0">
                    <FontAwesomeIcon
                        icon={faAddressBook}
                        className="text-white mr-2"
                        width="20"
                    />{" "}
                    Address Book
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

            <div className="container-fluid">
                <div className='address-contact-btn-section'>
                    <div className="contact-btns" onClick={() => {
                        setShow(true);
                        setUploadScanner(false);
                    }}>
                        <FontAwesomeIcon icon={faPlus} className="text-dark cursor-pointer" />
                        <p>Add Contact</p>
                    </div>
                    <div className="contact-btns" onClick={() => {
                        setShow(true);
                        setUploadScanner(true);
                    }}>
                        <FontAwesomeIcon icon={faExpand} className="text-dark cursor-pointer" />
                        <p>AI Scan Business Card</p>
                    </div>
                    <CSVLink
                        data={PhoneData}
                        filename={"contacts.csv"}
                        headers={headers}
                    >
                        <div className="contact-btns">
                            <FontAwesomeIcon icon={faFileExport} className="text-dark cursor-pointer" />
                            <p>Export Contacts</p>
                        </div>
                    </CSVLink>

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
                            <label className="ml-1">Tag</label>
                            <select className="form-control"
                                onChange={(e) => setSelectId(e.target.value)}
                                style={{
                                    appearance: "auto",
                                    height: "35px",
                                    padding: "0 10px",
                                }}>
                                <option value="orders">Direct</option>
                                <option value="orders">Scanner</option>
                            </select>
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

                <div className="w-100">
                    <div className="box-shadow-leads mb-4 mt-3">
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Contact</Th>
                                    <Th>Email</Th>
                                    <Th>Tags</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {PhoneData && PhoneData?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.full_name}</td>
                                        <td>{item.contact_number}</td>
                                        <td>{item.email_address ? item.email_address : "---"}</td>
                                        <td>{item.type}</td>
                                        <td>
                                            <div
                                                className="d-flex align-items-center justify-content-left"
                                                style={{ gap: "20px" }}
                                            >
                                                <a href={'tel:' + item.contact_number}> <FontAwesomeIcon icon={faPhone} className="text-dark cursor-pointer" /></a>
                                                {item.email_address && <a href={'mailto:' + item.email_address}> <FontAwesomeIcon icon={faEnvelope} className="text-dark cursor-pointer" /></a>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}
