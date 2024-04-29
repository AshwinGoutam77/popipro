import {
  faCross,
  faShareAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function ShareContact() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="share-modal-section">
        <button onClick={toggleNavbar}>Toggle Navbar</button>
        <div className={`share-modal-navbar ${isOpen ? "open" : ""}`}>
          <div className="d-flex align-items-center justify-content-between">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-white"
              onClick={() => setIsOpen(false)}
            />
            <h6 className="text-white m-0">Share Contact</h6>
            <FontAwesomeIcon icon={faShareAlt} className="text-white" />
          </div>

          <div className="form-section mt-5">
            <input
              type="text"
              placeholder="Enter name"
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Enter email"
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="form-control mb-3"
            />
            <textarea
              type="text"
              placeholder="Message"
              className="form-control mb-3"
            />

            <button className="bg-white contact-btn">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
