/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, createRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBuilding,
  faChevronRight,
  faEnvelope,
  faLink,
  faMapMarkerAlt,
  faPencil,
  faPhoneAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardData, GetCardData } from "@services/Routes";
import Api from "@services/Api";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import LoadingText from "@components/ViewPages/LoadingText";

function EditHeader({
  Data,
  setData,
  TitleData,
  PlanData,
  card,
  APIDATA,
  updateImage,
  MainData,
}) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState("");
  const [Profession, setProfession] = useState();
  const [Phone, setPhone] = useState();
  const [Address, setAddress] = useState();
  const [WebUrl, setWebUrl] = useState("");
  const [GoogleReview, setGoogleReview] = useState("");
  const [Show, setShow] = useState(false);
  const [ProfileImage, setProfileImage] = useState("");
  const [ColorCode, setColorCode] = useState("");
  const [cardStatus, setCardStatus] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [WhatsaapNumber, setWhatsaapNumber] = useState("");
  const [TrustPilot, setTrustPilot] = useState("");
  const [image, setImage] = useState(null);
  const [CountryCode, setCountryCode] = useState("");
  const [Extension, setExtension] = useState("");
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(new Date().getTime() / 1000);
  const [ShowCropper, setShowCropper] = useState(false);
  const [ShowCropperBtn, setShowCropperBtn] = useState(false);
  const [cropDataImage, setCropDataImage] = useState("#");
  const cropperRef = createRef();
  const [Whatsapp_code, setWhatsapp_code] = useState("");

  const onChange = (e) => {
    setShowCropper(true);
    setShowCropperBtn(true);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    setShowCropperBtn(false);
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropDataImage(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      );
    }
  };

  const getBlobData = async () => {
    if (ShowCropper) {
      let info = {
        first_name: FirstName,
        last_name: LastName,
        email: TitleData.card_email?.source == 1 ? "" : Email,
        profession: Profession,
        phone: Phone,
        contact_country_code: CountryCode,
        address: Address,
        image: cropDataImage.replace("data:image/png;base64,", ""),
        color_code: ColorCode,
        website: WebUrl,
        google_review_url: GoogleReview,
        whatsapp_number: WhatsaapNumber,
        whatsapp_country_code: Whatsapp_code,
        trustpilot_url: TrustPilot,
      };
      setShowLoader(true);
      try {
        const response = await Api(CardData, info);
        setShowLoader(false);
        if (response.data?.status) {
          setShowCropper(false);
          APIDATA();
          setTime(new Date().getTime() / 1000);
          setImage([]);
          handleClose();
          setShow(true);
          if (Show) {
            setShow(false);
          }
        }
      } catch (error) {
        setShowLoader(false);
        if (error.request.status == "401") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        toast(error.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      let info = {
        first_name: FirstName,
        last_name: LastName,
        email: TitleData.card_email?.source == 1 ? "" : Email,
        profession: Profession,
        phone: Phone,
        contact_country_code: CountryCode,
        contact_extension: Extension,
        address: Address,
        image: "",
        color_code: ColorCode,
        website: WebUrl,
        google_review_url: GoogleReview,
        whatsapp_number: WhatsaapNumber,
        whatsapp_country_code: Whatsapp_code,
        trustpilot_url: TrustPilot,
      };
      setShowLoader(true);
      try {
        const response = await Api(CardData, info);
        setShowLoader(true);
        if (response.data?.status) {
          APIDATA();
          setTime(new Date().getTime() / 1000);
          handleClose();
          setShow(true);
          if (Show) {
            setShow(false);
          }
        }
      } catch (error) {
        setShowLoader(false);
        if (error.request.status == "401") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        toast.error(error.response.data.message, {
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
      setShowLoader(false);
    }
  };

  const cancleChanges = () => {
    handleClose();
    setShow(true);
    if (Show) {
      setShow(false);
    }
  };

  const editHandler = async () => {
    handleShow();
    setShow(true);
    if (Show) {
      setShow(false);
    }
    const response = await Api(GetCardData, {}, "?card_url=" + card);
    if (response.data.status) {
      setFirstName(response.data.data.card.first_name);
      setLastName(response.data.data.card.last_name);
      setEmail(response.data.data.card.card_email);
      setProfession(response.data.data.card.card_profession);
      setPhone(response.data.data.card.card_contact);
      setCountryCode(response.data.data.card?.contact_country_code);
      setWhatsapp_code(response.data.data.card?.whatsapp_country_code);
      setAddress(response.data.data.card.card_address);
      setGoogleReview(response.data.data.card.card_google_review);
      setWebUrl(response.data.data.card.card_website);
      setColorCode(response.data.data.card.color_code);
      setWhatsaapNumber(response.data.data.card.whatsapp_number);
      setTrustPilot(response.data.data.card.card_trustpilot);
      setExtension(response.data.data.card.contact_extension);
    }
    setShowLoader(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Manage Informations
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 30px" }}>
          <div className="mt-3">
            <span className="overhead text-left mb-0">
              Upload profile image
            </span>
            <input
              type="file"
              placeholder="Name"
              onChange={onChange}
              accept="image/png, image/gif, image/jpeg"
              className="form-control  mt-1  w-100 text-left"
              style={{
                border: "1px solid rgb(204, 204, 204)",
                borderRadius: "20px",
              }}
            />
            {ShowCropperBtn ? (
              <div className="mt-4">
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
                <button className="contact-btn w-auto" onClick={getCropData}>
                  Save Crop Image
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3">
            <span className="overhead text-left mb-0">Name</span>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={FirstName || ""}
              className="form-control mt-2"
              autoFocus="autofocus"
              style={{
                borderBottom: "1px solid rgb(204, 204, 204);",
              }}
            />
          </div>
          <div className="mt-3">
            {TitleData?.card_profession?.source == 2 ? (
              <div className="mt-2 w-100">
                <span className="overhead text-left">Profession</span>
                <input
                  type="text"
                  placeholder="Profession"
                  onChange={(e) => setProfession(e.target.value)}
                  defaultValue={Profession || ""}
                  className="form-control mt-2"
                  style={{
                    borderBottom: "1px solid rgb(204, 204, 204);",
                  }}
                />
              </div>
            ) : (
              <div className="mt-2 w-100">
                <span className="overhead text-left">Profession</span>
                <input
                  type="text"
                  placeholder="Profession"
                  onChange={(e) => setProfession(e.target.value)}
                  defaultValue={Profession || ""}
                  className="email-input"
                  readOnly
                  style={{
                    borderBottom: "1px solid rgb(204, 204, 204);",
                    background: "#dcdcdcd9",
                  }}
                />
              </div>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_email?.source == 2 ? (
              <>
                <span className="overhead">Email</span>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={Email || ""}
                  className="form-control mt-2"
                />
              </>
            ) : (
              <>
                <span className="overhead">Email</span>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={Email || ""}
                  className="form-control mt-2"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3 ">
            {TitleData?.card_contact?.source == "2" ? (
              <>
                <span className="overhead">Phone</span>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <select
                    className="form-control mt-2"
                    onChange={(e) => setCountryCode(e.target.value)}
                    value={CountryCode}
                    style={{ height: "45px", width: "50%" }}
                  >
                    <option value="">Code</option>
                    {MainData?.countrycode_listing &&
                      MainData?.countrycode_listing?.map((item, index) => {
                        return (
                          <option value={item?.value} key={index}>
                            {item?.value + "-" + item?.name}
                          </option>
                        );
                      })}
                  </select>
                  <input
                    type="number"
                    placeholder="Phone number"
                    onChange={(e) =>
                      setPhone(e.target.value ? e.target.value : "")
                    }
                    defaultValue={Phone}
                    className="form-control mt-2"
                  />
                  <input
                    type="number"
                    placeholder="Extension"
                    onChange={(e) => setExtension(e.target.value)}
                    defaultValue={Extension}
                    className="form-control mt-2"
                    style={{ height: "45px", width: "50%" }}
                  />
                </div>
              </>
            ) : (
              <>
                <span className="overhead">Phone</span>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <select
                    className="form-control mt-2"
                    onChange={(e) => setCountryCode(e.target.value)}
                    value={CountryCode}
                    style={{ height: "45px", width: "50%" }}
                    disabled
                  >
                    <option value="">Select Country Code</option>
                    {MainData?.countrycode_listing &&
                      MainData?.countrycode_listing?.map((item, index) => {
                        return (
                          <option value={item?.value} key={index}>
                            {item?.value + "-" + item?.name}
                          </option>
                        );
                      })}
                  </select>
                  <input
                    type="number"
                    placeholder="Phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    defaultValue={Phone}
                    className="form-control mt-2"
                    readOnly
                  />
                  <input
                    type="number"
                    placeholder="Phone Extension"
                    onChange={(e) => setExtension(e.target.value)}
                    defaultValue={Extension}
                    className="form-control mt-2"
                    style={{ height: "45px", width: "50%" }}
                    readOnly
                  />
                </div>
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_contact?.source == "2" ? (
              <>
                <span className="overhead">
                  whatsapp Number{" "}
                  {/* <span style={{ color: "var(--color)", fontWeight: "normal" }}>
                    (*Please enter number with country code and without any
                    spaces)
                  </span> */}
                </span>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <select
                    className="form-control mt-2"
                    onChange={(e) => setWhatsapp_code(e.target.value)}
                    value={Whatsapp_code}
                    style={{ height: "45px", width: "34%" }}
                  >
                    <option value="">Code</option>
                    {MainData?.countrycode_listing &&
                      MainData?.countrycode_listing?.map((item, index) => {
                        return (
                          <option value={item?.value} key={index}>
                            {item?.value + "-" + item?.name}
                          </option>
                        );
                      })}
                  </select>
                  <input
                    type="number"
                    placeholder="Whatsapp number"
                    onChange={(e) => setWhatsaapNumber(e.target.value)}
                    defaultValue={WhatsaapNumber || ""}
                    className="form-control mt-2"
                  />
                </div>
              </>
            ) : (
              <>
                <span className="overhead">Whatsapp Number</span>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <select
                    className="form-control mt-2"
                    onChange={(e) => setWhatsapp_code(e.target.value)}
                    value={Whatsapp_code}
                    style={{ height: "45px", width: "34%" }}
                    disabled
                  >
                    <option value="">Code</option>
                    {MainData?.countrycode_listing &&
                      MainData?.countrycode_listing?.map((item, index) => {
                        return (
                          <option value={item?.value} key={index}>
                            {item?.value + "-" + item?.name}
                          </option>
                        );
                      })}
                  </select>
                  <input
                    type="number"
                    placeholder="Whatsapp number"
                    onChange={(e) => setWhatsaapNumber(e.target.value)}
                    defaultValue={WhatsaapNumber || ""}
                    className="form-control mt-2"
                    readOnly
                  />
                </div>
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_address?.source == "2" ? (
              <>
                <span className="overhead">Location</span>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={Address || ""}
                  className="form-control mt-2"
                />
              </>
            ) : (
              <>
                <span className="overhead">Location</span>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={Address || ""}
                  className="form-control mt-2"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_website?.source !== 1 ? (
              <>
                <span className="overhead">Website URL</span>
                <input
                  type="text"
                  placeholder="Website URL"
                  onChange={(e) => setWebUrl(e.target.value)}
                  defaultValue={WebUrl || ""}
                  className="form-control mt-2"
                />
              </>
            ) : (
              <>
                <span className="overhead">Website URL</span>
                <input
                  type="text"
                  placeholder="Website URL"
                  onChange={(e) => setWebUrl(e.target.value)}
                  defaultValue={WebUrl || ""}
                  className="form-control mt-2"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3">
            {TitleData?.card_google_review?.source !== 1 &&
              PlanData?.subscription?.plan_id !== 1 &&
              PlanData?.is_expired == false ? (
              <>
                <span className="overhead">Google review url</span>
                <input
                  type="text"
                  placeholder="Your google Review url"
                  onChange={(e) => setGoogleReview(e.target.value)}
                  defaultValue={GoogleReview || ""}
                  className="form-control mt-2"
                />
              </>
            ) : (
              <>
                <span className="overhead">Google review url</span>
                <input
                  type="text"
                  placeholder="Your google Review url"
                  onChange={(e) => setGoogleReview(e.target.value)}
                  defaultValue={GoogleReview || ""}
                  className="form-control mt-2"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div className="mt-3 mb-3">
            {TitleData?.card_trustpilot?.source !== 1 &&
              PlanData?.subscription?.plan_id !== 1 &&
              PlanData?.is_expired == false ? (
              <>
                <span className="overhead">Trust Pilot</span>
                <input
                  type="text"
                  placeholder="Your Trust Pilot url"
                  onChange={(e) => setTrustPilot(e.target.value)}
                  defaultValue={TrustPilot || ""}
                  className="form-control mt-2"
                />
              </>
            ) : (
              <>
                <span className="overhead">Trust Pilot</span>
                <input
                  type="text"
                  placeholder="Your Trust Pilot url"
                  onChange={(e) => setTrustPilot(e.target.value)}
                  defaultValue={TrustPilot || ""}
                  className="form-control mt-2"
                  style={{ background: "#dcdcdcd9" }}
                  readOnly
                />
              </>
            )}
          </div>
          <div
            className="d-flex align-items-center pb-4 mt-3"
            style={{ gap: "8px" }}
          >
            {!ShowLoader ? (
              <button
                className="contact-btn w-auto mt-0"
                onClick={getBlobData}
                defaultValue="1"
              >
                Save
              </button>
            ) : (
              <button class="contact-btn mt-0 w-auto" disabled>
                <FontAwesomeIcon icon={faSpinner} className="spinner-fa" />
                <LoadingText />
              </button>
            )}
            <button
              className="delete-button w-auto"
              onClick={cancleChanges}
              defaultValue="1"
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <header className="header header-box">
        <button
          className="edit-header"
          data-toggle="modal"
          data-target="#EditHeaderModal"
          onClick={editHandler}
        >
          <FontAwesomeIcon
            icon={faPencil}
            style={{ fontSize: "17px", cursor: "pointer", color: "black" }}
          />
        </button>
        <div className="header__left">
          <div className="header__photo">
            <Image
              className="header__photo-img"
              src={
                Data?.profile_picture?.path
                  ? `${process.env.NEXT_PUBLIC_MODE === "development"
                    ? "https://dev.popipro.com/"
                    : "https://admin.popipro.com/"}${Data.profile_picture.path}?ver=${time}`
                  : "https://avatars.githubusercontent.com/u/8152403?v=4"
              }
              alt="Profile Picture"
              width={0}
              height={0}
            />
          </div>
          <div className="header__base-info">
            <h4 className="title">{Data?.first_name || "Name"}</h4>
            <div className="status">{Data?.card_profession || ""}</div>
          </div>
        </div>
        <div className="header__right">
          <ul className="header__contact row">
            {Data?.card_email && (
              <li className="col-sm-6 col-12">
                <a
                  href={`mailto:${Data.card_email}`}
                  className="text-dark text-decoration-none d-flex align-items-center"
                >
                  <img src="../static/img/mail-dark.svg" alt="Email" width={14} className="mr-2" />
                  {Data.card_email}
                </a>
              </li>
            )}
            {Data?.card_contact && (
              <li className="col-sm-6 col-12">
                <a
                  href={`tel:${Data.contact_country_code || ""}-${Data.card_contact}-${Data.contact_extension || ""}`}
                  className="text-dark text-decoration-none d-flex align-items-center"
                >
                  <img src="../static/img/phone-dark.svg" alt="Phone" width={14} className="mr-2" />
                  {`${Data.contact_country_code || ""}-${Data.card_contact} ${Data.contact_extension ? "-" + Data.contact_extension : ""}`}
                </a>
              </li>
            )}
            {Data?.card_address && (
              <li className="col-sm-6 col-12">
                <a
                  href={`https://www.google.com/maps/place/${Data.card_address.replace(/<[^>]*>?/gm, "")}`}
                  className="text-dark text-decoration-none d-flex align-items-center"
                >
                  <img src="../static/img/location-dark.svg" alt="Address" width={15} className="mr-2" />
                  {Data.card_address}
                </a>
              </li>
            )}
            {Data?.card_website && (
              <li className="col-sm-6 col-12">
                <a
                  href={Data.card_website}
                  className="text-dark text-decoration-none d-flex align-items-center"
                >
                  <img src="../static/img/website.svg" alt="Website" width={14} className="mr-2" />
                  {Data.card_website}
                </a>
              </li>
            )}
          </ul>
        </div>
      </header>

    </>
  );
}

export default EditHeader;