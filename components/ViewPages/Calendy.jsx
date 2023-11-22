"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const CalendlyComponent = () => {
  const [Show, setShow] = useState(false);
  useEffect(() => {
    // Inject the Calendly script when the component mounts
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Modal show={Show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-0">
              Book Appointment
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShow(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/devdevgoutam/test"
          style={{height: "101vh" }}
        ></div>
        </Modal.Body>
      </Modal>
      <div className="box-content boxxx mb-3 mt-0" id="">
        <div className="pb-0 pb-sm-2">
          <div className="flex-header">
            <h2 className="title title--h1 first-title title__separate">
              Calendy
            </h2>
            <button
              className="contact-btn w-auto"
              onClick={() => setShow(true)}
            >
              Book Appointment via Calendy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendlyComponent;
