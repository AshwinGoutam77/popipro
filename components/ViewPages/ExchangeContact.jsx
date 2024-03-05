"use client";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SimpleBackdrop from "./SimpleBackDrop";
import localforage from "localforage";
import { toast } from "react-toastify";
import { contactUs } from "@services/Routes";
import Api from "@services/Api";

export default function ExchangeContact({
  profile,
  active,
  handleClose,
  card,
}) {
  const [FirstName, setFirstName] = useState("");
  const [Number, setNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [SendWhatsaap, setSendWhatsaap] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);

  const handleSendWhatsaapMessage = () => {
    setSendWhatsaap(true);
    if (SendWhatsaap) {
      setSendWhatsaap(false);
    }
  };
  const handleSaveData = async () => {
    if (FirstName === "") {
      toast.error("Name is required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Number === "") {
      toast.error("Mobile/Phone is required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    let payloadData = {
      full_name: FirstName,
      contact_number: Number,
      email: Email,
      message: Message,
      card_url: profile,
      latitude: localStorage.getItem("latitude"),
      longitude: localStorage.getItem("longitude"),
      fb_token: await localforage.getItem("fcm_token"),
    };
    try {
      setShowLoader(true);
      payloadData;
      // return;
      const response = await Api(contactUs, payloadData);
      handleClose();
      if (response.data.status) {
        setShowLoader(false);
        // HitClick();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        window.location.href = SendWhatsaap
          ? "https://api.whatsapp.com/send?phone=" +
            card?.card_contact +
            "&" +
            `text=Popipro Enquiry %0a Name =${FirstName} ${
              Email ? `%0a Email = ${Email}` : ""
            } %0a Number =${Number} ${
              Message ? ` %0a Message = ${Message}` : ""
            }`
          : "#";
        setFirstName("");
        setNumber("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      setShowLoader(false);
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
      <Modal show={active} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Share Contact
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center pb-4">
            {/* *<b>{card.first_name}</b> will receive the information via Email or
            Whatsapp. */}
            *You are going to share your information with{" "}
            <b>{card.first_name}</b>, {card.first_name} will receive the
            information via Email or WhatsApp
          </p>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name*"
                required="required"
                autoComplete="on"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={Number}
                onChange={(e) => setNumber(e.target.value)}
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
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-3">
              <textarea
                className="textarea form-control"
                placeholder="Your message"
                rows="4"
                required="required"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 order-2 order-md-1 text-center text-md-left">
              <div id="validator-contact" className="hidden"></div>
            </div>
            <div className="col-12 mx-2 d-flex align-items-center mb-2">
              <input
                type="checkbox"
                onChange={() => handleSendWhatsaapMessage()}
              />
              <p className="ml-2">
                Do you want to send message on WhatsApp also?
              </p>
            </div>
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              <button
                type="submit"
                className="contact-btn mt-0 w-auto"
                onClick={handleSaveData}
              >
                Share Contact
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
