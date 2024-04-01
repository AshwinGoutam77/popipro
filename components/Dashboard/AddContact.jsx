"use client";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClose,
  faContactBook,
  faCross,
} from "@fortawesome/free-solid-svg-icons";

export default function AddContact({ shareContact, src, data }) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [SaveContact, setSaveContact] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSaveContact = () => {
    shareContact();
    setSaveContact(true);
  };

  const list = () => (
    <div className="save-contact-drawer text-center">
      <FontAwesomeIcon
        icon={faClose}
        className="close-svg"
        onClick={toggleDrawer("bottom", false)}
      />

      <h5 className="color-black">How to create new contact</h5>
      <img src="https://prafullgupta.com/connectwork/assets/chat/groups/0104240558263f844ca2-4c8b-4027-aec9-29cb5d48f661.png" />
      <button
        className="contact-btn w-auto mt-4"
        onClick={() => handleSaveContact()}
      >
        <FontAwesomeIcon icon={faContactBook} className="mr-2" /> Save to
        contacts
      </button>
      <p>
        Receive card via email{" "}
        <FontAwesomeIcon icon={faArrowRight} className="mt-3 ml-1" />
      </p>
    </div>
  );

  const handleClose = () => {
    toggleDrawer("bottom", false)();
    setSaveContact(false);
  };

  const ShareModal = () => (
    <div className="save-contact-drawer share-profile-drawer">
      <FontAwesomeIcon
        icon={faClose}
        className="close-svg"
        onClick={() => handleClose()}
      />

      <h5 className="color-black text-center">Share your details</h5>

      <div className="image-section d-flex align-items-center justify-content-between gap-10 mt-4 position-relative">
        <img src={src} alt="profile" className="ml-3 " />
        <span
          id="share-details-back-floating-paper-plane"
          class="floating-paper-plane"
        >
          <svg
            class="svg-inline--fa fa-paper-plane fa-w-16 fa-xs"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="paper-plane"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
            ></path>
          </svg>
        </span>
        <h6 className="color-black ml-2">
          Share your contact information with {data.first_name}
        </h6>
      </div>

      <div className="row mt-4 mx-0">
        <div className="form-group col-lg-6 col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name*"
            required="required"
            autoComplete="on"
            // value={FirstName}
            // onChange={(e) => setFirstName(e.target.value)}
          />
          <div className="help-block with-errors"></div>
        </div>
        <div className="form-group col-lg-6 col-md-6 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Mobile/Phone*"
            required="required"
            autoComplete="on"
            // value={Number}
            // onChange={handleChange}
          />
          <div className="help-block with-errors"></div>
        </div>
        <div className="form-group col-lg-12 col-md-6 mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            required="required"
            autoComplete="on"
            // value={Email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <div className="help-block with-errors"></div>
        </div>
        <div className="form-group col-12 col-md-12 mb-3">
          <textarea
            className="textarea form-control"
            placeholder="Your message"
            rows="4"
            required="required"
            // value={Message}
            // onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className="contact-btn w-auto mt-4">Share Contact</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={toggleDrawer("bottom", true)}
        className="contact-btn w-100 mobile-contact-btn"
      >
        Add Contact
      </button>
      {!SaveContact ? (
        <SwipeableDrawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
          onOpen={toggleDrawer("bottom", true)}
        >
          {list()}
        </SwipeableDrawer>
      ) : (
        <SwipeableDrawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
          onOpen={toggleDrawer("bottom", true)}
        >
          {ShareModal()}
        </SwipeableDrawer>
      )}
    </>
  );
}
