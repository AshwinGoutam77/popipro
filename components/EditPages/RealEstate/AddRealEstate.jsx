'use client'
import React, { useState } from 'react';
import './realestate.css';
import { Modal, ProgressBar } from "react-bootstrap";
import BasicDetail from './RealEstateForm/BasicDetail';
import PropertyDetail from './RealEstateForm/PropertyDetail';

export default function AddRealEstate({ ShowModal, ModalHeading, setShowModal, Data }) {
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        featuredImage: null,
        galleryImages: [],
        title: "",
        propertyType: "",
        description: "",
        youTubeLink: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        builtUpArea: "",
        landSize: "",
        propertySize: "",
        furnishType: "",
        googleMapLink: "",
    });

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const steps = [
        <BasicDetail formData={formData} updateFormData={updateFormData} />,
        <PropertyDetail formData={formData} updateFormData={updateFormData} Data={Data} />,
    ];

    const handleNext = () => {
        if (activeStep < steps.length) setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        if (activeStep > 1) setActiveStep(activeStep - 1);
    };

    const HandleEmptyFeilds = () => {
        setShowModal(false)
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
                    <div className="step-content">{steps[activeStep - 1]}</div>

                    {/* Navigation Buttons */}
                    <div className={`navigation-buttons mt-4 d-flex justify-content-${activeStep === 1?'end':'between'}`}>
                        {activeStep !== 1 && <button
                            className="contact-btn w-auto"
                            onClick={handleBack}
                            disabled={activeStep === 1}
                        >
                            Back
                        </button>}
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
