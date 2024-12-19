'use client';
import { showToast } from "@components/Dashboard/Toast";
import { faPlus } from "@node_modules/@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { SavePhoneBook } from "@services/Routes";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

export default function Scanner({ GetContactData, setShow }) {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [fields, setFields] = useState({ name: "", contact: "", email: "", occupation: "", address: "" });
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const processImage = () => {
        if (!image) return;

        setLoading(true);
        Tesseract.recognize(image, "eng", {
            logger: (info) => console.log(info),
        })
            .then(async ({ data: { text } }) => {
                setText(text);
                const extractedFields = parseFields(text);
                setFields(extractedFields);
                // console.log(extractedFields);

                let payload = {
                    full_name: extractedFields.name,
                    contact_number: extractedFields.contact,
                    email_address: extractedFields.email,
                    type: "scanner",
                };

                try {
                    const response = await Api(SavePhoneBook, payload);

                    if (response?.data?.status) {
                        setLoading(false);
                        GetContactData()
                        showToast(response?.data?.message, 'success')
                        setShow(false);
                    } else {
                        showToast(response?.data?.message, 'error')
                    }
                } catch (error) {
                    showToast(error.response?.data?.message, 'error')
                } finally {
                    setLoading(false);
                }

            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const parseFields = (text) => {
        const nameRegex = /(?:Name|Mr\.|Ms\.|Dr\.|Mrs\.)?\s*([A-Z][a-zA-Z\s]+)$/m;
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
        const occupationRegex = /\b(CEO|Manager|Engineer|Developer|Designer|Director|Consultant|Specialist|Founder|Analyst)\b/i;
        const addressRegex = /(\d+\s[A-Za-z]+\s(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Boulevard|Blvd|Drive|Dr)\b.*)/i;

        return {
            name: (text.match(nameRegex) || [])[1] || "Not found",
            email: (text.match(emailRegex) || [])[0] || "Not found",
            contact: (text.match(phoneRegex) || [])[0] || "Not found",
            occupation: (text.match(occupationRegex) || [])[0] || "Not found",
            address: (text.match(addressRegex) || [])[0] || "Not found",
        };
    };

    return (
        <div className="px-2">
            <p>Upload Business Card</p>
            <div>
                <label htmlFor="card-uploader" className="card-uploader">
                    <FontAwesomeIcon icon={faPlus} />
                    <input type="file" id="card-uploader" accept="image/*" className="form-control mb-2" onChange={handleFileChange} />
                </label>
                {image && <img src={image} alt="Uploaded Card" className="my-4" style={{ maxWidth: "100%" }} />}
                {image && !text && <button onClick={processImage} disabled={loading} className="contact-btn w-auto mt-2">
                    {loading ? "Processing..." : "Add Contact"}
                </button>}
            </div>
        </div>
    );
}
