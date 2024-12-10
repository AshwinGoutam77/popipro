'use client'
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";

export default function Scanner() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState(""); // For debugging OCR output
    const [fields, setFields] = useState({ name: "", contact: "", email: "" });
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
        // Debug by logging the text input
        console.log("Parsing Text:", text);

        // Updated regular expressions
        const nameRegex = /^(?:Name|Mr\.|Ms\.|Dr\.)?\s*([A-Z][a-zA-Z\s]+)$/m;
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

        return {
            name: (text.match(nameRegex) || [])[1] || "Not found",
            email: (text.match(emailRegex) || [])[0] || "Not found",
            contact: (text.match(phoneRegex) || [])[0] || "Not found",
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

                {/* Debug: Show Raw Extracted Text */}
                {text && (
                    <div>
                        <h4>Extracted Data</h4>
                        <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
                    </div>
                )}

                {/* {fields && (
                    <div>
                        <h2>Extracted Fields</h2>
                        <p><strong>Name:</strong> {fields.name}</p>
                        <p><strong>Contact:</strong> {fields.contact}</p>
                        <p><strong>Email:</strong> {fields.email}</p>
                    </div>
                )} */}
            </div>
        </div>
    )
}
