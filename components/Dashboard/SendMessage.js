import React from "react";
import { Modal } from "react-bootstrap";

export default function SendMessage({ active, handleClose }) {
  return (
    <>
      <Modal show={active} onHide={() => handleClose("")} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-0"
              id="BlogModalTitle"
            >
              Send message to contacts
            </h5>
          </Modal.Title>

          <button
            type="button"
            className="close"
            onClick={() => handleClose("")}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body className="py-3 px-4">
          <div>
            {/* <div className="color-black mb-2 group-listing-section">
              <h5 className="color-black mb-3">Contact Groups</h5>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="font-weight-bold">1. Doctors</p>
                <input type="checkbox" />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="font-weight-bold">2. Plumbers</p>
                <input type="checkbox" />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="font-weight-bold">3. Restaurant</p>
                <input type="checkbox" />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="font-weight-bold">4. Furniture</p>
                <input type="checkbox" />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="font-weight-bold">5. Electrician</p>
                <input type="checkbox" />
              </div>
            </div> */}
            <textarea
              type="password"
              name="number"
              placeholder="Enter Message*"
              className="mt-2 form-control"
              //   value={Message}
              //   onChange={(e) => setMessage(e.target.value)}
              style={{ minHeight: "100px" }}
              required
            />
            <button className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4">
              Send Notification
            </button>
            {/* </form> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
