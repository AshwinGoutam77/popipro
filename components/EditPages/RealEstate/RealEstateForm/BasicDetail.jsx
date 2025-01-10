import React from "react";

export default function BasicDetail({ formData, updateFormData }) {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        updateFormData("featuredImage", file);
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        updateFormData("galleryImages", files.slice(0, 3)); // Limit to 3 images
    };

    return (
        <div>
            <h6>Basic Details</h6>
            <label className="modalFormLable mt-2">Featured Image</label>
            <input
                className="form-control mb-4 p-1"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
            />
            <label className="modalFormLable mt-2">Upload up to 3 Images</label>
            <input
                className="form-control mb-4 p-1"
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleGalleryChange}
            />
            <label className="modalFormLable mt-2">Title</label>
            <input
                className="form-control mb-4 mt-1"
                type="text"
                value={formData.title}
                placeholder="Real Estate Title"
                onChange={(e) => updateFormData("title", e.target.value)}
            />
            <label className="modalFormLable mt-2">Property Type</label>
            <select
                value={formData.propertyType}
                onChange={(e) => updateFormData("propertyType", e.target.value)}
                style={{
                    height: "45px",
                    padding: "6px 18px",
                    background: "#f7f9fa",
                    appearance: "auto",
                }} className="form-control mb-4 mt-1"
            >
                <option value="">Select Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
            </select>
            <label className="modalFormLable mt-2">Video URL</label>
            <input
                className="form-control mb-4 mt-1"
                type="url"
                value={formData.youTubeLink}
                placeholder="https://www.youtube.com/"
                onChange={(e) => updateFormData("youTubeLink", e.target.value)}
            />
        </div>
    );
}
