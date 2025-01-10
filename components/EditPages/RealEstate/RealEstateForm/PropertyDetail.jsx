import React from "react";

export default function PropertyDetail({ formData, updateFormData, Data }) {
    return (
        <div>
            <h6>Property Details</h6>
            <label className="modalFormLable mt-2">Address</label>
            <input
                className="form-control mb-4 mt-1"
                type="text"
                value={formData.address}
                placeholder="Locality/Address"
                onChange={(e) => updateFormData("address", e.target.value)}
            />
            <div className="row">
                <div className="col-6">
                    <label className="modalFormLable mt-2">City</label>
                    <input
                        className="form-control mb-4 mt-1"
                        type="text"
                        value={formData.city}
                        placeholder="Enter City"
                        onChange={(e) => updateFormData("city", e.target.value)}
                    />
                </div>
                <div className="col-6">
                    <label className="modalFormLable mt-2">State</label>
                    <input
                        className="form-control mb-4 mt-1"
                        type="text"
                        value={formData.state}
                        placeholder="Enter State"
                        onChange={(e) => updateFormData("state", e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <label className="modalFormLable mt-2">Zip Code</label>
                    <input
                        className="form-control mb-4 mt-1"
                        type="number"
                        value={formData.zipCode}
                        placeholder="Enter Zip Code"
                        onChange={(e) => updateFormData("zipCode", e.target.value)}
                    />
                </div>
                <div className="col-6">
                    <label className="modalFormLable mt-2">Country*</label>
                    <input
                        type="text"
                        className="form-control mb-4 mt-1 w-100"
                        value={formData.zipCode}
                        placeholder="Enter Country "
                        onChange={(e) => updateFormData("country", e.target.value)}
                    ></input>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <label className="modalFormLable">
                        Built Up Area* (SQM/ Yard/ Feet)
                    </label>
                    <input
                        type="text"
                        className="form-control  mb-4 mt-1 w-100"
                        value={formData.BuiltUpArea}
                        placeholder="Area"
                        onChange={(e) => updateFormData("area", e.target.value)}
                    ></input>
                </div>
                <div className="col-6">
                    <label className="modalFormLable">
                        Land Size (SQM/ Yard/ Feet)
                    </label>
                    <input
                        type="text"
                        className="form-control  mb-4 mt-1 w-100"
                        value={formData.InternalBuildUp}
                        placeholder="Land Size in SQM/Yard/Feet"
                        onChange={(e) => updateFormData("landSize", e.target.value)}
                    ></input>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <label className="modalFormLable">
                        Property Size (SQM/ Yard/ Feet)
                    </label>
                    <input
                        type="text"
                        className="form-control mt-1 w-100"
                        value={formData.ExternalBuildUp}
                        placeholder="Area"
                        onChange={(e) => updateFormData("BuildUp", e.target.value)}
                    ></input>
                </div>
                <div className="col-6">
                    <label className="modalFormLable">Furnish Type</label>
                    <select
                        style={{
                            height: "49px",
                            padding: "6px 18px",
                            background: "#f7f9fa",
                            appearance: "auto",
                        }}
                        onChange={(e) => updateFormData("FurnishType", e.target.value)}
                        defaultValue={formData.FurnishType || ""}
                        className="mt-1"
                    >
                        <option value="">Select furnish type</option>
                        {Data?.furnish_type &&
                            Data?.furnish_type?.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>
        </div>
    );
}
