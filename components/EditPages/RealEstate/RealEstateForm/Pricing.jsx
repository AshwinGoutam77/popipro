import React from 'react'

export default function Pricing({ ShowModal, ModalHeading, setShowModal, Data }) {
    return (
        <>
            <h6 className="mb-3 color-black pl-1">Price Details</h6>
            <div className="d-flex align-items-center mb-3 mt-1 ml-2">
                <div className="d-flex align-items-center">
                    <input
                        type="radio"
                        value={formData.BuiltUpArea}
                        checked={PriceRadio}
                        onChange={(e) => handleRadioBTN(e.target.value)}
                    />{" "}
                    <label htmlFor="price" className="ml-2 mb-0">
                        Show Price
                    </label>
                </div>
                <div className="d-flex align-items-center ml-3">
                    <input
                        type="radio"
                        id="css"
                        name="product"
                        value={1}
                        onChange={(e) => handleLabelRadio(e.target.value)}
                        checked={EditRadioBtn == 1 ? true : false}
                    />{" "}
                    <label htmlFor="css" className="ml-2 mb-0">
                        Show Text
                    </label>
                </div>
            </div>
        </>
    )
}
