/* eslint-disable @next/next/no-img-element */
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
  faSpinner,
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
// import QRCode from "qrcode.react";
import ShareUi from "./ShareUi";
import { saveAs } from "file-saver";
import localforage from "localforage";
import ExchangeContact from "./ExchangeContact";
import LoadingText from "./LoadingText";
import AddContact from "@components/Dashboard/AddContact";
import QRCode from "qrcode.react";

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
  const [ShowLoader, setShowLoader] = useState(false);
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
  const [showQr, setShowQr] = useState(false);
  const handleCloseQr = () => setShowQr(false);
  const [time, setTime] = useState(new Date().getTime() / 1000);
  const [ShowProfileQr, setShowProfileQr] = useState(false);
  const [ShowDownloadQr, setShowDownloadQr] = useState(true);
  const [Loader, setLoader] = useState(false);
  const [Downloading, setDownloading] = useState(false);

  useEffect(() => {
    setTime(new Date().getTime() / 1000);
  }, [card]);

  const handleReviewSubmit = async () => {
    if (ReviewName == "") {
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
    } else if (ReviewDescription == "") {
      toast.error("Message is required", {
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
    try {
      // setShowLoader(true);
      setLoader(true);
      let payload = {
        testimonial_image: Imagee,
        card_url: profile,
        name: ReviewName,
        company_name: ReviewSubTitle,
        description: ReviewDescription,
        phone: ReviewNumber,
        latitude: await localforage.getItem("latitude"),
        longitude: await localforage.getItem("longitude"),
        fb_token: await localforage.getItem("fcm_token"),
      };
      const response = await Api(AddTestimonials, payload);
      if (response.data.status) {
        setShowLoader(false);
        setLoader(false);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
      setLoader(false);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
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
    setDownloading(true);
    let text = card?.card_description?.replace(/(<([^>]+)>)/gi, "");
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: "contact-download",
      latitude: await localforage.getItem("latitude"),
      longitude: await localforage.getItem("longitude"),
      fb_token: await localforage.getItem("fcm_token"),
    };
    const response = await Api(HitClickApi, payload);
    if (
      response.data.status ||
      response?.data?.message == "Can not count this hit."
    ) {
      setProfileImage(response.data.data.base_image);
      setDownloading(false);

      var contact = {
        website: card?.card_website,
        address: card?.card_address,
        Imagee: response.data.data.base_image?.replace(
          "data:image/png;base64,",
          ""
        ),
        name: card?.first_name,
        phone:
          (card.contact_country_code ? card.contact_country_code : "") +
          (card?.card_contact ? card?.card_contact : "") +
          (card?.contact_extension ? card?.contact_extension : ""),
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
      //  (contact);
      // return;
      // create a vcard file
      var vcard = "BEGIN:VCARD\nVERSION:3.0\nN:";
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
      vcard += contact.website
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
      vcard += contact.links["Instagram"]
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
      // setModalShow("ExchangeContact");
    }
  };

  const handleSaveQr = async () => {
    setShowQr(true);
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: "contact-download",
      fb_token: await localforage.getItem("fcm_token"),
    };
    const response = await Api(HitClickApi, payload);
    if (
      response.data.status ||
      response?.data?.message == "Can not count this hit."
    ) {
      setImageSrc(
        `https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A3.%0AN%3A${
          card?.first_name
        }%20%0AORG%3A${card?.card_profession}%0ATITLE%3A%0AADR%3A%3B%3B${
          card?.card_address ? card?.card_address : ""
        }%0ATEL%3BWORK%3BVOICE%3A${
          (card.contact_country_code ? card.contact_country_code : "") +
          (card?.card_contact ? card?.card_contact : "") +
          (card?.contact_extension ? card?.contact_extension : "")
        }%0AEMAIL%3BWORK%3BINTERNET%3A${card?.card_email}%0AWEBSITE%3A${
          "app.popipro.com/" + profile
        }${
          card?.card_website !== null
            ? "%0AURL%3A" + "app.popipro.com/" + profile + "%2F"
            : ""
        }%0AEND%3AVCARD`
      );
      // imageSrc;
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
      latitude: await localforage.getItem("latitude"),
      longitude: await localforage.getItem("longitude"),
      fb_token: await localforage.getItem("fcm_token"),
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };

  if (sharePopup == false && card?.landing_mode === "share-contact") {
    setShow(true);
    setsharePopup(true);
    setModalShow("ExchangeContact");
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
    handleHitClick("qr-download");
    saveAs(imageSrc, "image.jpg");
  };

  const DownloadProfile = () => {
    const canvas = document.getElementById("qr-code");
    const qrCodeURL = canvas?.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = qrCodeURL;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShowContactQr = () => {
    setShowDownloadQr(true);
    setShowProfileQr(false);
  };

  const handleShowProfileQr = () => {
    setShowProfileQr(true);
    setShowDownloadQr(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 15) {
      setReviewNumber(value);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

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
      <ExchangeContact
        card={card}
        active={modalShow == "ExchangeContact" ? true : false}
        handleClose={setModalShow}
        profile={profile}
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

      {/* <Story isOpen={isOpen} /> */}

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
                placeholder="Company Name"
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
                placeholder="Phone Number"
                required="required"
                autoComplete="on"
                value={ReviewNumber}
                onChange={handleChange}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-3">
              <textarea
                className="textarea form-control"
                placeholder="Your Message*"
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
              {!Loader ? (
                <button
                  type="submit"
                  className="contact-btn mt-0 w-auto"
                  onClick={handleReviewSubmit}
                >
                  Send Review
                </button>
              ) : (
                <button class="contact-btn mt-0 w-auto" disabled>
                  <FontAwesomeIcon icon={faSpinner} className="spinner-fa" />
                  <LoadingText />
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Qr Modal */}
      <Modal show={showQr} onHide={handleCloseQr} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              {ShowDownloadQr
                ? "Share your profile via QR"
                : "Add Contact Via QR"}
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleCloseQr}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div
              className="d-flex align-items-center mb-4"
              style={{ gap: "10px" }}
            >
              <button
                className={
                  ShowDownloadQr ? "filter-btns bg-varcolor" : "filter-btns"
                }
                onClick={() => handleShowContactQr()}
              >
                Profile QR Code
              </button>
              <button
                className={
                  ShowProfileQr ? "filter-btns bg-varcolor" : "filter-btns"
                }
                onClick={() => handleShowProfileQr()}
              >
                Contact QR Code
              </button>
            </div>

            {ShowProfileQr ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                {"https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0A" +
                imageSrc +
                "END%3AVCARD%0A" ? (
                  <img
                    src={
                      "https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0A" +
                      imageSrc +
                      "END%3AVCARD%0A"
                    }
                    className="qr-img w-250"
                    alt="we"
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center w-250">
                    <h6 className="color-black">Loading...</h6>
                  </div>
                )}
                <button
                  onClick={downloadImage}
                  className="contact-btn w-auto mt-4 scanner-a"
                >
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="user-select-auto mr-2 fs-16 text-white cursor-pointer"
                  />
                  Download QR
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          {ShowDownloadQr ? (
            <div>
              <div className="d-flex flex-column justify-content-center align-items-center profile-qr-code">
                {profile ? (
                  // <img
                  //   src={
                  //     process.env.NEXT_PUBLIC_MODE === "development"
                  //       ? `https://chart.googleapis.com/chart?cht=qr&chl=${
                  //           "front.popipro.com/" + profile
                  //         }&chs=160x160&chld=L|0`
                  //       : `https://chart.googleapis.com/chart?cht=qr&chl=${
                  //           "app.popipro.com/" + profile
                  //         }&chs=160x160&chld=L|0`
                  //   }
                  //   className="qr-img w-250"
                  //   alt="qr"
                  // />
                  <QRCode
                    id="qr-code"
                    value={
                      process.env.NEXT_PUBLIC_MODE === "development"
                        ? "front.popipro.com/" + profile
                        : "app.popipro.com/" + profile
                    }
                    fgColor="#000"
                    // imageSettings={{
                    //   src: "../../static/img/brand.png",
                    //   excavate: true,
                    //   height: "30",
                    //   width: "30",
                    //   borderRadius: "10",
                    // }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center w-250">
                    <h6 className="color-black">Loading...</h6>
                  </div>
                )}
                <button
                  onClick={DownloadProfile}
                  className="contact-btn w-auto mt-4 scanner-a"
                >
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="user-select-auto mr-2 fs-16 text-white cursor-pointer"
                  />
                  Download QR
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
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
            className="user-select-auto mr-2 VarColor cursor-pointer fs-18"
          />
        </button>
        <button
          className="edit-header mr-5"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => handleSaveQr()}
        >
          <FontAwesomeIcon
            icon={faQrcode}
            className="user-select-auto mr-2 VarColor fs-20 cursor-pointer"
          />
          {/* <img
            src="../static/img/qr.svg"
            alt="image"
            width={20}
          /> */}
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
              onClick={() => toggleSlider()}
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
            <div className="d-flex sm-class header-btn-gap">
              <button
                className="contact-btn web-contact-btn"
                onClick={shareContact}
              >
                Add Contact
              </button>
              <AddContact
                shareContact={shareContact}
                data={card}
                ShowLoader={Downloading}
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
                profile={profile}
                text="Add Contact"
              />
              <button
                className="contact-btn web-contact-btn"
                onClick={() => setModalShow("ExchangeContact")}
              >
                Share Contact
              </button>
              <AddContact
                shareContact={shareContact}
                data={card}
                ShowLoader={Downloading}
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
                profile={profile}
                text="Share Contact"
              />
            </div>
            <div className="d-flex sm-class header-btn-gap">
              {company_setting?.show_testimonial_button == 0 ||
              PlanData?.is_expired !== false ? (
                ""
              ) : (
                <button
                  className="delete-button w-100 mt-2"
                  data-toggle="modal"
                  data-target="#AddTestimonialsModal"
                  onClick={handleShowReview}
                >
                  Add Reviews
                </button>
              )}
              {Titles?.card_booking?.is_active == 0 ||
              PlanData?.is_expired !== false ? (
                ""
              ) : (
                <button
                  className="delete-button w-100 mt-2"
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
                    {/* <FontAwesomeIcon
                      icon={faEnvelope}
                      className="user-select-auto mr-2 w-15 fs-15 transform-180 margin-l"
                    /> */}
                    <img
                      src="../static/img/mail-dark.svg"
                      alt="image"
                      width={14}
                      className="mr-1"
                    />
                    <span className="overhead_a text-dark text-decoration-none getCard-a">
                      {" "}
                      {card.card_email}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2 w-15 fs-15"
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
                        : ""
                    } ${card?.card_contact} ${
                      card?.contact_extension
                        ? "- " + card?.contact_extension
                        : ""
                    }`}
                    className="d-flex align-items-center justify-content-between getCard-a"
                    onClick={() => handleHitClick("call")}
                  >
                    <div className="align-div">
                      {/* <FontAwesomeIcon
                        icon={faPhoneAlt}
                        className="user-select-auto mr-2 transform-180 w-15 fs-15"
                      /> */}
                      <img
                        src="../static/img/phone-dark.svg"
                        alt="image"
                        width={14}
                        className="mr-1"
                      />
                      <span className="overhead_a text-dark text-decoration-none margin-l-5">
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
                      className="user-select-auto mr-2 w-15 fs-15"
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
                    {/* <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="user-select-auto mr-1 transform-180 w-15 fs-15"
                    /> */}
                    <img
                      src="../static/img/location-dark.svg"
                      alt="image"
                      width={16}
                      className="mr-1"
                    />
                    <span className="overhead_a text-dark text-decoration-none margin-l-7">
                      {card.card_address}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2 w-15 fs-15"
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
                    className="user-select-auto mr-2 transform-180 w-15 fs-15"
                  />
                  <p className="text-dark m-0">{card?.card_name}</p>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="user-select-auto mr-2 w-15 fs-15"
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
                    {/* <FontAwesomeIcon
                      icon={faLink}
                      className="user-select-auto mr-2 w-15 fs-15 transform-180"
                    /> */}
                    <img
                      src="../static/img/website.svg"
                      alt="image"
                      width={14}
                      className="mr-1"
                    />
                    <span className="overhead_a text-dark text-decoration-none getCard-a margin-l-4">
                      {card.card_website &&
                      (card.card_website?.includes("http://") ||
                        card.card_website?.includes("https://"))
                        ? card.card_website
                        : card.card_website}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="user-select-auto mr-2 w-15 fs-15"
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
        <div className="d-flex flex-wrap align-items-center gap-15">
          <div className="d-flex flex-wrap align-items-center gap-15">
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
