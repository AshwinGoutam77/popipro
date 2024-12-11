'use client';
import React, { useState } from "react";
import Tesseract from "tesseract.js";

export default function Scanner() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState(""); // For debugging OCR output
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
            .then(({ data: { text } }) => {
                console.log("Extracted Text:", text); // Debugging
                setText(text); // Display raw OCR text
                const extractedFields = parseFields(text);
                setFields(extractedFields);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const parseFields = (text) => {
        console.log("Parsing Text:", text); // Debugging

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
        <div className="box-content boxxx">
            <div className="flex-header">
                <h2 className="title title--h1 first-title title__separate">
                    AI-Powered Business Card Scanner
                </h2>
            </div>
            <div>
                <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                {image && <img src={image} alt="Uploaded Card" className="my-4" style={{ maxWidth: "100%" }} />}
                <button onClick={processImage} disabled={loading} className="contact-btn w-auto mt-4">
                    {loading ? "Processing..." : "Scan Business Card"}
                </button>

                
                {/* {text && (
                    <div>
                        <h4 className="mt-4">Extracted Data</h4>
                        <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
                    </div>
                )} */}

                {fields && (
                    <div className="mt-4">
                        <h2>Extracted Fields</h2>
                        <p><strong>Name:</strong> {fields.name}</p>
                        <p><strong>Contact:</strong> {fields.contact}</p>
                        <p><strong>Email:</strong> {fields.email}</p>
                        <p><strong>Occupation:</strong> {fields.occupation}</p>
                        <p><strong>Address:</strong> {fields.address}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
