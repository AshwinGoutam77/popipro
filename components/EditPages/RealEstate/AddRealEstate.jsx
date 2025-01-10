'use client'
import React, { useState } from 'react';
import './realestate.css';
import { Modal, ProgressBar } from "react-bootstrap";

export default function AddRealEstate({ ShowModal, ModalHeading }) {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        { id: 1, label: "Basic Details" },
        { id: 2, label: "Property Details" },
        { id: 3, label: "Confirmation" },
    ];

    const handleNext = () => {
        if (activeStep < steps.length) setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        if (activeStep > 1) setActiveStep(activeStep - 1);
    };

    const HandleEmptyFeilds = () => {

    };
    return (
        <Modal
            size="md"
            show={ShowModal}
            onHide={HandleEmptyFeilds}
            centered
            className="pl-0"
        >
            <Modal.Header>
                <Modal.Title>
                    <h5
                        className="title title--h1 first-title title__separate mb-1 mb-0"
                        id="BlogModalTitle"
                    >
                        {ModalHeading}
                    </h5>
                </Modal.Title>
                <button type="button" className="close" onClick={HandleEmptyFeilds}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close alert</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="wizard-form">
                    <ProgressBar
                        now={(activeStep / steps.length) * 100}
                    />

                    {/* Step Content */}
                    <div className="step-content mt-4">
                        {activeStep === 1 && <div>Basic Details Form Content</div>}
                        {activeStep === 2 && <div>Property Details Form Content</div>}
                        {activeStep === 3 && <div>Confirmation Step Content</div>}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons mt-4 d-flex justify-content-between">
                        <button
                            className="contact-btn w-auto"
                            onClick={handleBack}
                            disabled={activeStep === 1}
                        >
                            Back
                        </button>
                        <button
                            className="contact-btn w-auto"
                            onClick={handleNext}
                            disabled={activeStep === steps.length}
                        >
                            {activeStep === steps.length ? "Finish" : "Next"}
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    )
}
