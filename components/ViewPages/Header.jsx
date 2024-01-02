"use client";
import {
  faArrowRight,
  faBuilding,
  faDownload,
  faEnvelope,
  faLink,
  faMapMarkerAlt,
  faPhoneAlt,
  faQrcode,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
// import Share from "./Share";
import "../../styles/header.css";
import Link from "next/link";
import { AddTestimonials, HitClickApi, contactUs } from "@services/Routes";
import Api from "@services/Api";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Share from "./Share";
import Image from "next/image";
import SimpleBackdrop from "./SimpleBackDrop";
import QRCode from "qrcode.react";
import ShareUi from "./ShareUi";
import { saveAs } from "file-saver";

const Header = ({
  profile,
  card,
  company_setting,
  Titles,
  CardLinks,
  PlanData,
  MainData,
}) => {
  const [ProfileImage, setProfileImage] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showReview, setShowReview] = useState(false);
  const handleShowReview = () => setShowReview(true);
  const handleCloseReview = () => setShowReview(false);
  const [FirstName, setFirstName] = useState("");
  const [Number, setNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [SendWhatsaap, setSendWhatsaap] = useState(false);
  const [modalShow, setModalShow] = useState("");
  const [modalShowUiModal, setModalShowUiModal] = useState("");
  const [sharePopup, setsharePopup] = useState(false);
  const [Imagee, setImage] = useState("");
  const [ReviewName, setReviewName] = useState("");
  const [ReviewSubTitle, setReviewSubTitle] = useState("");
  const [ReviewNumber, setReviewNumber] = useState("");
  const [ReviewDescription, setReviewDescription] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [Latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [ShowBtn, setShowBtn] = useState(true);

  const [showQr, setShowQr] = useState(false);
  const handleCloseQr = () => setShowQr(false);

  const [time, setTime] = useState(new Date().getTime() / 1000);

  useEffect(() => {
    setTime(new Date().getTime() / 1000);
  }, [card]);

  const handleReviewSubmit = async () => {
    if (ReviewName == "") {
      toast.error("Name is requried", {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
      return;
    } else if (ReviewDescription == "") {
      toast.error("Message is requried", {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
      return;
    } else if (ReviewSubTitle == "") {
      toast.error("SubTitle is requried", {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
      return;
    } else if (ReviewNumber == "") {
      toast.error("Phone Number is requried", {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
      return;
    }
    try {
      setShowLoader(true);
      let payload = {
        testimonial_image: Imagee,
        card_url: profile,
        name: ReviewName,
        company_name: ReviewSubTitle,
        description: ReviewDescription,
        phone: ReviewNumber,
        latitude: Latitude,
        longitude: Longitude,
      };
      const response = await Api(AddTestimonials, payload);
      if (response.data.status) {
        setShowLoader(false);
        toast.success(response.data.message, {
          position: "top-right",
          autoclose: 2000,
          hideprogressbar: "false",
          closeonclick: "true",
          pauseonhover: "true",
          draggable: "true",
          progress: "undefined",
          theme: "light",
        });
        handleCloseReview();
        setReviewName("");
        setReviewNumber("");
        setReviewDescription("");
        setImage("");
        setReviewSubTitle("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoclose: 2000,
        hideprogressbar: "false",
        closeonclick: "true",
        pauseonhover: "true",
        draggable: "true",
        progress: "undefined",
        theme: "light",
      });
    }
  };

  const handleCanclebtn = () => {
    handleClose();
  };

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
      latitude: Latitude,
      longitude: Longitude,
    };
    try {
      setShowLoader(true);
      console.log(payloadData);
      // return;
      const response = await Api(contactUs, payloadData);
      handleCanclebtn();
      if (response.data.status) {
        setShowLoader(false);
        // HitClick();
        toast(response.data.message, {
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
            `text=Popipro Inquiry %0a Name =${FirstName} ${
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
        toast.success(response?.data?.message, {
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
      toast.error(error.response.data.message, {
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

  let links = [];
  const shareContact = async () => {
    let text = card?.card_description?.replace(/(<([^>]+)>)/gi, "");
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: "contact-download",
      latitude: Latitude,
      longitude: Longitude,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
      setProfileImage(response.data.data.base_image);

      var contact = {
        website: card?.card_website,
        address: card?.card_address,
        Imagee: response.data.data.base_image?.replace(
          "data:image/png;base64,",
          ""
        ),
        name: card?.first_name,
        phone: card?.card_contact,
        email: card.card_email,
        url: "app.popipro.com/" + profile,
        location: card.card_address,
        links: links,
        title: card?.card_profession,
        about: text,
        alternate_no: card?.card_alternate_phone?.map((item) => {
          return item.country_code
            ? item.title + item.country_code + " " + item.number
            : item.title + item.number + " ";
        }),
      };
      // console.log(contact);
      // return;
      // create a vcard file
      var vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:";
      vcard +=
        contact.name +
        "\nTEL;TYPE=work,voice:" +
        contact.phone +
        "\nEMAIL;CHARSET=UTF-8;type=Email,INTERNET:" +
        contact.email +
        "\nURL;TYPE=Popipro - Digital Business Card:" +
        contact.url;

      vcard += contact.Imagee
        ? "\nPHOTO;ENCODING=b;TYPE=JPEG:" + contact.Imagee
        : "";
      vcard += contact.card_website
        ? "\nURL;Website URL=UTF-8:" + contact.website
        : "";
      let alt_str = card?.card_alternate_phone?.map((item) => {
        return item.country_code
          ? `\nTEL;TYPE=${item.title},voice:` +
              item.country_code +
              " " +
              item.number +
              ""
          : `\nTEL;TYPE=${item.title},voice:` + item.number + "";
      });
      vcard += alt_str.join("");
      vcard += contact.address ? "\nADR;CHARSET=UTF-8:" + contact.address : "";
      vcard += contact.links["instagram"]
        ? "\nURL;type=Instagram;Instagram=UTF-8:" + contact.links["Instagram"]
        : "";
      vcard += contact.links["Facebook"]
        ? "\nURL;type=Facebook;Facebook=UTF-8:" + contact.links["Facebook"]
        : "";
      vcard += contact.links["Linkedin"]
        ? "\nURL;type=Linkedin;Linkedin=UTF-8:" + contact.links["Linkedin"]
        : "";
      vcard += contact.links["Youtube"]
        ? "\nURL;type=Youtube;Youtube=UTF-8:" + contact.links["Youtube"]
        : "";
      vcard += contact.links["Twitter"]
        ? "\nURL;type=Twitter;Twitter=UTF-8:" + contact.links["Twitter"]
        : "";
      vcard += contact.links["Pinterest"]
        ? "\nURL;type=Pinterest;Pinterest=UTF-8:" + contact.links["Pinterest"]
        : "";
      vcard += contact.title ? "\nTITLE:" + contact.title : "";

      vcard += contact.about ? "\nNOTE:" + contact.about : "";
      vcard += "\nEND:VCARD";
      // console.log(vcard);
      // return;

      var blob = new Blob([vcard], { type: "text/vcard" });
      var url = URL.createObjectURL(blob);

      const newLink = document.createElement("a");
      newLink.download = contact.name + ".vcf";
      newLink.textContent = contact.name;
      newLink.href = url;

      newLink.click();

      setImageSrc(contact.name + contact.phone);
      // setModalShowUiModal("shareUiModal");
      handleShow();
    }
  };

  const handleSaveQr = async () => {
    setShowQr(true);
    let text = card?.card_description?.replace(/(<([^>]+)>)/gi, "");
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: "contact-download",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
      setProfileImage(response.data.data.base_image);

      var contact = {
        website: card?.card_website,
        address: card?.card_address,
        Imagee: response.data.data.base_image?.replace(
          "data:image/png;base64,",
          ""
        ),
        name: card?.first_name,
        phone: card?.card_contact,
        email: card.card_email,
        url: "app.popipro.com/" + profile,
        location: card.card_address,
        links: links,
        title: card?.card_profession,
        about: text,
        alternate_no: card?.card_alternate_phone?.map((item) => {
          return item.country_code
            ? item.title + item.country_code + " " + item.number
            : item.title + item.number + " ";
        }),
      };

      let fnVal = "FN%3A" + contact.name + "%0A";
      let posTitleVal = "TITLE%3A" + contact.title + "%0A";
      let phoneMobileVal = "TEL%3BCELL%3A" + contact.phone + "%0A";
      let emailPersonalVal =
        "EMAIL%3BHOME%3BINTERNET%3A" + contact.email + "%0A";
      let websiteVal = "URL%3A" + contact.website + "%0A";
      let addyStreetVal = "ADR%3A%3B%3B" + contact.address + "%3B";
      let qrImage = "PHOTO;ENCODING=b;TYPE=JPEG%3A" + contact.Imagee + "%0A";

      setImageSrc(
        `https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3AGupta%3BAshwin%0AFN%3A${card?.first_name}%20%0AORG%3A${card?.card_profession}%0ATITLE%3A%0AADR%3A%3B%3BVaishali%20Nagar%3BJaipur%3BRajasthan%3B302012%3BIndia%0ATEL%3BWORK%3BVOICE%3A${card?.card_contact}%0ATEL%3BCELL%3A${card?.card_contact}%0AEMAIL%3BWORK%3BINTERNET%3A${card?.card_email}%0%0AWEBSITE%3A${card?.card_website}%0AURL%3Ahttps%3A%2F%2Fwww.qr-code-generator.com%2F%0AEND%3AVCARD`
      );
      console.log(imageSrc);
    }
  };

  const handleAppointment = () => {
    var elem = document.getElementById("card_booking");
    elem?.scrollIntoView();
  };

  const handleHitClick = async (type) => {
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: type,
      latitude: Latitude,
      longitude: Longitude,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  if (sharePopup == false && card?.landing_mode === "share-contact") {
    setShow(true);
    setsharePopup(true);
  }

  const [Show, setShowModal] = useState(false);

  const handleShowCalendly = () => {
    setShowModal(true);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  };

  const downloadImage = () => {
    saveAs(imageSrc, "image.jpg");
  };
  const DownloadProfile = () => {
    saveAs(
      `https://chart.googleapis.com/chart?cht=qr&chl=${
        "app.popipro.com/" + profile
      }&chs=160x160&chld=L|0`,
      "image.jpg"
    );
  };
  const handleAllowNotif = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(() => {
    handleAllowNotif();
  }, []);

  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
      <Share
        Data={card}
        card={profile}
        active={modalShow == "share" ? true : false}
        handleClose={setModalShow}
      />
      <ShareUi
        Data={card}
        profile={profile}
        active={modalShowUiModal == "shareUiModal" ? true : false}
        handleCloseUiModal={setModalShowUiModal}
        CardLinks={CardLinks}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Share Modal */}
      <Modal show={show} onHide={handleClose} centered>
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
            *<b>{card.first_name}</b> will receive the information via Email or
            Whatsapp.
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
                Do you want to send message on whatsaap also?
              </p>
            </div>
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              {/* <button
                className="contact-btn mt-0 w-auto mr-2"
                onClick={handleAllowNotif}
              >
                Allow Notification
              </button> */}
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

      {/* Review Modal */}
      <Modal show={showReview} onHide={handleCloseReview} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Leave A Review
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleCloseReview}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label className="modalFormLable">
                Upload Image (*Prefered size in ration of 100x100)
              </label>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/png, image/gif, image/jpeg"
                style={{ border: "1px solid #ccc" }}
                // ref={aRef}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name*"
                required="required"
                autoComplete="on"
                value={ReviewName}
                onChange={(e) => {
                  setReviewName(e.target.value);
                }}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Sub-Title*"
                required="required"
                autoComplete="on"
                value={ReviewSubTitle}
                onChange={(e) => {
                  setReviewSubTitle(e.target.value);
                }}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-12 col-md-6 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number*"
                required="required"
                autoComplete="on"
                value={ReviewNumber}
                onChange={(e) => {
                  setReviewNumber(e.target.value);
                }}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-3">
              <textarea
                className="textarea form-control"
                placeholder="Your message*"
                rows="4"
                required="required"
                value={ReviewDescription}
                onChange={(e) => {
                  setReviewDescription(e.target.value);
                }}
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              <button
                type="submit"
                className="contact-btn mt-0 w-auto"
                onClick={handleReviewSubmit}
              >
                Send Review
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Qr Modal */}
      <Modal show={showQr} onHide={handleCloseQr} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Add Contact Via QR
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleCloseQr}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src={
                "https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0A" +
                imageSrc +
                "END%3AVCARD%0A"
              }
              className="qr-img"
              alt="we"
            />
            <button
              onClick={downloadImage}
              className="contact-btn w-auto mt-4 scanner-a"
            >
              <FontAwesomeIcon
                icon={faDownload}
                className="user-select-auto mr-2"
                style={{
                  fontSize: "16px",
                  color: "white",
                  cursor: "pointer",
                }}
              />
              Download QR
            </button>
          </div>
          <p className="text-center mb-3 underline-or my-4">
            <span>OR</span>
          </p>
          <h5 className="title title--h1 first-title title__separate mb-1 text-left mb-4 font-weight-bold">
            Share your profile via QR
          </h5>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src={`https://chart.googleapis.com/chart?cht=qr&chl=${
                "app.popipro.com/" + profile
              }&chs=160x160&chld=L|0`}
              className="qr-img"
              alt="we"
              style={{ width: "250px", height: "250px" }}
            />
            <button
              onClick={DownloadProfile}
              className="contact-btn w-auto mt-4 scanner-a"
            >
              <FontAwesomeIcon
                icon={faDownload}
                className="user-select-auto mr-2"
                style={{
                  fontSize: "16px",
                  color: "white",
                  cursor: "pointer",
                }}
              />
              Download QR
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={Show} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-0">
              Book Appointment
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModal(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div
            className="calendly-inline-widget"
            data-url={MainData?.company_setting?.appointment_calendly_url}
            style={{ height: "101vh" }}
          ></div>
        </Modal.Body>
      </Modal>

      <header className="header header-box mb-3">
        <button
          className="edit-header"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => setModalShow("share")}
        >
          <FontAwesomeIcon
            icon={faShareSquare}
            className="user-select-auto mr-2"
            style={{
              fontSize: "16px",
              color: "var(--color)",
              cursor: "pointer",
            }}
          />
        </button>
        <button
          className="edit-header mr-5"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => handleSaveQr()}
          // onClick={() => setModalShowUiModal("shareUiModal")}
        >
          <FontAwesomeIcon
            icon={faQrcode}
            className="user-select-auto mr-2"
            style={{
              fontSize: "16px",
              color: "var(--color)",
              cursor: "pointer",
            }}
          />
        </button>
        <div className="header__left position-relative">
          <div className="header__photo">
            <Image
              className="header__photo-img"
              value={"image"}
              src={
                process.env.NEXT_PUBLIC_MODE == "development"
                  ? card?.profile_picture?.path
                    ? "https://dev.popipro.com/" +
                      card?.profile_picture?.path +
                      "?ver=" +
                      time
                    : "https://avatars.githubusercontent.com/u/8152403?v=4"
                  : card?.profile_picture?.path
                  ? "https://admin.popipro.com/" +
                    card?.profile_picture?.path +
                    "?ver=" +
                    time
                  : "https://avatars.githubusercontent.com/u/8152403?v=4"
              }
              alt="images"
              width={0}
              height={0}
            />
          </div>
          <div className="header__base-info">
            <h2 className="title titl--h4">
              {card.first_name == null ? "Name" : card.first_name}
            </h2>
            <div className="status">
              <p>
                {" "}
                {card.card_profession == null
                  ? "Profession"
                  : card.card_profession}
              </p>
            </div>
            <div className="d-flex sm-class" style={{ gap: "8px" }}>
              <button className="contact-btn" onClick={shareContact}>
                Add Contact
              </button>
              <button
                className="contact-btn"
                data-toggle="modal"
                data-target="#exampleModalLong"
                onClick={handleShow}
              >
                Share Contact
              </button>
            </div>
            <div className="d-flex sm-class" style={{ gap: "8px" }}>
              {company_setting?.show_testimonial_button == 0 ||
              PlanData?.is_expired !== false ? (
                ""
              ) : (
                <button
                  className="contact-btn-header mt-2"
                  data-toggle="modal"
                  data-target="#AddTestimonialsModal"
                  onClick={handleShowReview}
                >
                  Get Reviews
                </button>
              )}
              {Titles?.card_booking?.is_active == 0 ||
              PlanData?.is_expired !== false ? (
                ""
              ) : (
                <button
                  className="contact-btn-header mt-2"
                  onClick={
                    MainData?.company_setting?.appointment_enquiry_method ==
                    "form"
                      ? handleAppointment
                      : handleShowCalendly
                  }
                >
                  Appointment
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="header__right">
          <ul className="header__contact row">
            {card.card_email ? (
              <li className="col-sm-6 col-12">
                <a
                  href={"mailto:" + card.card_email}
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => handleHitClick("email")}
                  target="_blank"
                >
                  <div className="align-div">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="user-select-auto mr-2"
                      style={{
                        width: "15px",
                        fontSize: "15px",
                        transform: "rotateY(180deg)",
                      }}
                    />
                    <span className="overhead_a text-dark text-decoration-none getCard-a">
                      {" "}
                      {card.card_email}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2"
                    style={{
                      width: "15px",
                      fontSize: "15px",
                    }}
                  />
                </a>
              </li>
            ) : (
              ""
            )}
            {card.card_contact !== null ? (
              <>
                <li className="col-sm-6 col-12">
                  <a
                    href={`tel: ${
                      card.contact_country_code
                        ? card?.contact_country_code + "-"
                        : card?.contact_country_code
                    } ${card?.card_contact} ${
                      card?.contact_extension
                        ? "- " + card?.contact_extension
                        : ""
                    }`}
                    className="d-flex align-items-center justify-content-between getCard-a"
                    onClick={() => handleHitClick("call")}
                  >
                    <div className="align-div">
                      <FontAwesomeIcon
                        icon={faPhoneAlt}
                        className="user-select-auto mr-2"
                        style={{
                          width: "15px",
                          fontSize: "15px",
                          transform: "rotateY(180deg)",
                        }}
                      />
                      <span
                        className="overhead_a text-dark text-decoration-none"
                        style={{ marginLeft: "5px" }}
                      >
                        {card &&
                        card.contact_country_code &&
                        card.contact_extension !== null
                          ? card?.contact_country_code +
                            "-" +
                            card?.card_contact +
                            "-" +
                            card?.contact_extension
                          : card?.contact_country_code
                          ? card?.contact_country_code +
                            "-" +
                            card?.card_contact
                          : card?.card_contact}
                      </span>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="user-select-auto mr-2"
                      style={{
                        width: "15px",
                        fontSize: "15px",
                      }}
                    />
                  </a>
                </li>
              </>
            ) : (
              ""
            )}
            {card.card_address !== null ? (
              <li className="col-sm-6 col-12">
                <a
                  href={
                    card.card_address &&
                    (card.card_address?.includes("http://") ||
                      card.card_address?.includes("https://"))
                      ? card.card_address.replace(/<[^>]*>?/gm, "")
                      : "http://maps.google.com/?q=" +
                        card.card_address.replace(/<[^>]*>?/gm, "")
                  }
                  target="_blank"
                  className="d-flex align-items-center justify-content-between getCard-a"
                  onClick={() => handleHitClick("location")}
                >
                  <div className="align-div">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="user-select-auto mr-1"
                      style={{
                        width: "15px",
                        fontSize: "15px",
                        transform: "rotateY(180deg)",
                      }}
                    />
                    <span
                      className="overhead_a text-dark text-decoration-none"
                      style={{ marginLeft: "7px" }}
                    >
                      {card.card_address}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2"
                    style={{
                      width: "15px",
                      fontSize: "15px",
                    }}
                  />
                </a>
              </li>
            ) : (
              ""
            )}
            {Titles?.card_name?.source == 1 ? (
              <li className="web-li d-flex align-items-center justify-content-between col-sm-6 col-12">
                <div>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="user-select-auto mr-2"
                    style={{
                      width: "15px",
                      fontSize: "15px",
                      transform: "rotateY(180deg)",
                    }}
                  />
                  <p className="text-dark m-0">{card?.card_name}</p>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="user-select-auto mr-2"
                  style={{
                    width: "15px",
                    fontSize: "15px",
                  }}
                />
              </li>
            ) : (
              ""
            )}
            {card.card_website !== null ? (
              <li className="col-sm-6 col-12">
                <a
                  href={
                    card.card_website &&
                    (card.card_website?.includes("http://") ||
                      card.card_website?.includes("https://"))
                      ? card.card_website
                      : "https://" + card.card_website
                  }
                  target="_blank"
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => handleHitClick("website")}
                >
                  <div className="align-div">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="user-select-auto mr-2"
                      style={{
                        width: "15px",
                        fontSize: "15px",
                        transform: "rotateY(180deg)",
                      }}
                    />
                    <span
                      className="overhead_a text-dark text-decoration-none getCard-a"
                      style={{ marginLeft: "7px" }}
                    >
                      {card.card_website &&
                      (card.card_website?.includes("http://") ||
                        card.card_website?.includes("https://"))
                        ? card.card_website
                        : card.card_website}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2"
                    style={{
                      width: "15px",
                      fontSize: "15px",
                    }}
                  />
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </header>
      {/* LINKS SECTION */}
      <div className="box-content boxxx mb-3 mt-0 d-none">
        <h2 className="title title--h1 first-title title__separate">
          {Titles?.card_social_links?.visible_name}
        </h2>
        <div
          className="d-flex flex-wrap align-items-center"
          style={{ gap: "15px" }}
        >
          <div
            className="d-flex flex-wrap align-items-center"
            style={{ gap: "15px" }}
          >
            {CardLinks &&
              CardLinks.map((item, i) => {
                links[item?.parent?.platform_name] = item.link;
                return item?.link !== null ? (
                  <div key={i}>
                    {!item.link?.includes("https://") ? (
                      <Link
                        href={item.parent.target_url + item.link}
                        target="_blank"
                        key={i}
                      >
                        <div className="media-icon-div">
                          <span className="social-media-icons">
                            <img
                              src={
                                "./static/img/" +
                                item.parent.platform_name.toLowerCase() +
                                ".png"
                              }
                              alt={item.parent.platform_name}
                              style={{
                                width: "50px",
                                borderRadius: "100%",
                              }}
                            />
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <Link href={item.link} target="_blank" key={i}>
                        <div className="media-icon-div">
                          <span className="social-media-icons">
                            <img
                              src={
                                "./static/img/" +
                                item.parent.platform_name.toLowerCase() +
                                ".png"
                              }
                              alt={item.parent.platform_name}
                              style={{
                                width: "50px",
                                borderRadius: "100%",
                              }}
                            />
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                ) : (
                  ""
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
