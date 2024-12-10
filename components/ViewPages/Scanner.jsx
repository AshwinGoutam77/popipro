'use client'
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";

export default function Scanner() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: async (acceptedFiles) => {
            setError("");
            if (acceptedFiles.length > 0) {
                setLoading(true);
                const file = acceptedFiles[0];
                try {
                    const result = await Tesseract.recognize(file, "eng", {
                        logger: (info) => console.log(info), 
                    });
                    setText(result.data.text);
                } catch (err) {
                    setError("Failed to process the image. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        },
    });
    return (
        <div className="box-content boxxx">
            <div className="flex-header">
                <h2 className="title title--h1 first-title title__separate">
                    AI-Powered Business Card Scanner
                </h2>
            </div>
            <div
                {...getRootProps()}
                style={{
                    border: "2px dashed #ccc",
                    borderRadius: "10px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                }}
            >
                <input {...getInputProps()} />
                <p>Drag and drop a business card image here, or click to upload.</p>
            </div>
            {loading && <p>Processing the image... Please wait.</p>}
            {text && (
                <div className="mt-4">
                    <h3>Extracted Text:</h3>
                    <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
                </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}
