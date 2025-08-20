'use client'
import RedirectComponent from '@app/RedirectComponent/page';
import { showToast } from '@components/Dashboard/Toast';
import SimpleBackdrop from '@components/ViewPages/Backdrop';
import { useAuthContext } from '@context/AuthContext';
import { faAngleLeft, faChevronRight, faCopy, faEnvelope } from '@node_modules/@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome'
import Link from '@node_modules/next/link'
import React, { useEffect, useRef, useState } from 'react';
import "../../styles/about.css";
import "../styles/style.css";
import './page.css';

export default function EmailSignature() {
    const { APIDATA, UserData } = useAuthContext();
    useEffect(() => {
        APIDATA();
    }, []);

    const [formData, setFormData] = useState({
        first_name: "",
        card_profession: "",
        card_email: "",
        card_address: "",
        card_contact: "",
    });

    useEffect(() => {
        if (UserData?.card) {
            setFormData({
                first_name: UserData.card.first_name || "",
                card_profession: UserData.card.card_profession || "",
                card_email: UserData.card.card_email || "",
                card_address: UserData.card.card_address || "",
                card_contact: UserData.card.card_contact || "",
            });
        }
    }, [UserData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const signatureRef = useRef(null);

    const copyToClipboard = (type) => {
        const signatureElement = type.current;
        if (signatureElement) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(signatureElement);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("copy");
            selection.removeAllRanges();
            showToast("Your email signature is copied to clipboard", "success")
        }
    };

    return (
        <>
            {UserData ? <div className='email-ginature-section bg-white'>
                <div
                    className="login-header p-3 text-center d-flex align-items-center justify-content-between"
                    style={{ background: "black" }}
                >
                    <h5 className="text-white m-0">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-white mr-2"
                            width="20"
                        />{" "}
                        Email Signature
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

                <div className="container d-flex align-items-center justify-content-center w-100">
                    <div className="row align-items-center w-100 row-gap-4">
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <div className="d-flex flex-column" style={{ gap: "20px" }}>
                                <div>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Profession</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="card_profession"
                                        value={formData.card_profession}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="card_email"
                                        value={formData.card_email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="card_address"
                                        value={formData.card_address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Contact</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        maxLength='16'
                                        name="card_contact"
                                        value={formData.card_contact}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <table
                                ref={signatureRef}
                                border="0"
                                style={{
                                    padding: "16px",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    // width: "500px",
                                    border: '1px solid #ccc',
                                    borderRadius: '16px',
                                }}
                            >
                                <tbody style={{ maxWidth: '50%' }}>
                                    <tr>
                                        <td style={{ padding: '0' }}>
                                            {UserData?.card?.profile_picture?.path ? <img
                                                src={
                                                    process.env.NEXT_PUBLIC_MODE == "development"
                                                        ? "https://dev.popipro.com/" +
                                                        UserData?.card?.profile_picture?.path
                                                        : "https://admin.popipro.com/" +
                                                        UserData?.card?.profile_picture?.path
                                                }
                                                alt="photograph"
                                                style={{
                                                    border: "1px solid white",
                                                    height: "100px",
                                                    width: "100px",
                                                    borderRadius: "100%",
                                                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                                                }}
                                            /> : <div class="no-image-testimonia-div"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></div>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                color: "black",
                                                display: 'block',
                                                padding: "0",
                                                marginTop: "10px",
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            {formData?.first_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                color: "black",
                                                display: 'block',
                                                padding: "0",
                                                // lineHeight: 'normal'
                                            }}
                                        >
                                            {formData?.card_profession}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                color: "black",
                                                display: 'block',
                                                padding: "0",
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            {formData?.card_email}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                color: "black",
                                                display: 'block',
                                                padding: "0",
                                                lineHeight: 'normal',
                                                marginTop: "20px"
                                            }}
                                        >
                                            {formData?.card_address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                color: "black",
                                                display: 'block',
                                                padding: "0",
                                                lineHeight: 'normal',
                                            }}
                                        >
                                            {formData?.card_contact}
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody style={{ maxWidth: '50%' }}>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                color: "black",
                                                display: 'block',
                                                padding: "0",
                                                lineHeight: 'normal',
                                                marginBottom: '10px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            Connect With Me
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                color: "black",
                                                display: 'block',
                                                padding: "0",
                                                lineHeight: 'normal',
                                                border: '1px solid #ccc',
                                                borderRadius: '16px',
                                                padding: '0px'
                                            }}
                                        >
                                            <img
                                                // src={
                                                //     process.env.NEXT_PUBLIC_MODE == "development"
                                                //         ? "https://dev.popipro.com/" +
                                                //         UserData?.card?.profile_picture?.path
                                                //         : "https://admin.popipro.com/" +
                                                //         UserData?.card?.profile_picture?.path
                                                // }
                                                // src={
                                                //     process.env.NEXT_PUBLIC_MODE === "development"
                                                //         ? `https://quickchart.io/qr?text=https://front.popipro.com/prafull-gupta&size=160`
                                                //         : 'https://chart.googleapis.com/chart?chs=160x160&cht=qr&chl=https://app.popipro.com/prafull-gupta&choe=UTF-8'
                                                // }
                                                src={`https://quickchart.io/qr?text=${UserData?.card?.base_url}${UserData?.card?.vcard_url}&size=160`}
                                                className="qr-img"
                                                alt="qr"
                                                style={{ borderRadius: '20px' }}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: 'center', padding: '0', paddingTop: '10px' }}>
                                            <img src="../../static/img/dark-logo.png" alt="logo" width='100' style={{ textAlign: 'center' }} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className='d-flex align-items-center justify-content-between mt-2'>
                                <button className='contact-btn w-auto m-0' onClick={() => copyToClipboard(signatureRef)}><FontAwesomeIcon icon={faCopy} className='mr-2' />Copy to Clipboard</button>
                                <a href="https://www.popipro.com/email-signature/" target='_blank' className='font-weight-bold d-flex align-items-center'>How it Works <FontAwesomeIcon icon={faChevronRight} className='mx-2' /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <SimpleBackdrop visible={true} />}
        </>
    )
}
