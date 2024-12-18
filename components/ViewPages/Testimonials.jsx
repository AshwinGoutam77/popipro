"use client";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { AddTestimonials } from "@services/Routes";
import Api from "@services/Api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import Image from "next/image";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleBackdrop from "./SimpleBackDrop";
import localforage from "localforage";
import LoadingText from "./LoadingText";
import LockedSection from "./LockedSection";

const Testimonials = ({
  InquiryModal,
  InquiryPopup,
  card,
  subscription,
  card_testimonials,
  Titles,
  company_setting,
  profile,
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [Imagee, setImagee] = useState("");
  const [Name, setName] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [Number, setNumber] = useState("");
  const [Description, setDescription] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [Loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    if (Name == "") {
      toast.error("Name is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Description == "") {
      toast.error("Message is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    // setShowLoader(true);
    setLoader(true);
    try {
      let payload = {
        testimonial_image: Imagee,
        card_url: profile,
        name: Name,
        company_name: SubTitle,
        description: Description,
        phone: Number,
        latitude: await localforage.getItem("latitude"),
        longitude: await localforage.getItem("longitude"),
        fb_token: await localforage.getItem("fcm_token"),
      };
      const response = await Api(AddTestimonials, payload);
      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowLoader(false);
        setLoader(false);
        handleClose();
        setName("");
        setNumber("");
        setDescription("");
        setImagee("");
        setSubTitle("");
      }
    } catch (error) {
      setShowLoader(false);
      setLoader(false);
      toast.error(error?.response?.data?.message, {
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

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 15) {
      setNumber(value);
    }
  };

  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Leave A Review
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label className="modalFormLable">
                Upload Image (*Preferred size in ratio of 100x100)
              </label>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/png, image/jpeg"
                onChange={(e) => setImagee(e.target.files[0])}
              />
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name*"
                required="required"
                autoComplete="on"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Sub-Title"
                required="required"
                autoComplete="on"
                value={SubTitle}
                onChange={(e) => setSubTitle(e.target.value)}
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
                value={Number}
                onChange={handleChange}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-3">
              <textarea
                className="textarea form-control"
                placeholder="Your message*"
                rows="4"
                required="required"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              {!Loader ? (
                <button
                  type="submit"
                  className="contact-btn mt-0 w-auto"
                  onClick={handleSubmit}
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

      {Titles?.card_testimonials?.is_locked !== 0 &&
        <LockedSection name="card_testimonials" Title={Titles.card_testimonials?.visible_name}
          profile={profile} />
      }

      {Titles?.card_testimonials.source !== 0 &&
        card?.card_testimonials?.length !== 0 &&
        Titles?.card_testimonials.is_active !== 0 &&
        Titles?.card_testimonials?.in_subscription && Titles?.card_testimonials?.is_locked == 0 ? (
        <div className="box-content boxxx" id="card_testimonials">
          {/* <!-- Testimonials --> */}
          {Titles &&
            Titles.card_testimonials.is_active &&
            card_testimonials?.length !== 0 ? (
            <div className="mt-0">
              <div className="d-flex align-items-start justify-content-between">
                <h2 className="title title--h1 first-title title__separate">
                  {Titles &&
                    Titles.card_testimonials.visible_name === "card_testimonials"
                    ? "Card Testimonials"
                    : Titles.card_testimonials.visible_name}
                </h2>
              </div>
              <SwiperComponent
                className="mySwiper cursor-pointer"
                pagination={{
                  clickable: true,
                }}
                spaceBetween={10}
                modules={[Pagination, Navigation]}
              >
                {card_testimonials.map((items, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="swiper-slide review-item position-relative review-item-testimonials d-block">
                        <div className="d-flex align-items-center">
                          {items?.image?.path ? (
                            <img
                              className="case-item__icon"
                              src={
                                process.env.NEXT_PUBLIC_MODE == "development"
                                  ? "https://dev.popipro.com/" +
                                  items.image.path
                                  : "https://admin.popipro.com/" +
                                  items.image.path
                              }
                              alt="testimonials"
                            />
                          ) : (
                            <div className="no-image-testimonia-div">
                              <FontAwesomeIcon
                                icon={faUser}
                                className="text-white"
                              />
                            </div>
                          )}
                          <div className="pt-0">
                            <h4
                              className="title title--h5 text-align-start ml-3 mb-0"
                              style={{ textAlign: "start" }}
                            >
                              {items.name}
                            </h4>
                            <p className="text-left ml-3 font-weight-bold m-0">
                              {items.company_name}
                            </p>
                          </div>
                        </div>
                        <div className="review-item__textbox">
                          <div
                            id="p_wrap"
                            className="review-item__caption text-left mt-3"
                            dangerouslySetInnerHTML={{
                              __html: items.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </SwiperComponent>
              {company_setting.show_testimonial_button == 0 ? (
                ""
              ) : (
                <div className="d-flex justify-content-center">
                  <button
                    className="contact-btn w-auto m-0 d-flex align-items-center mt-3"
                    data-toggle="modal"
                    data-target="#AddTestimonialsModal"
                    onClick={handleShow}
                  >
                    Leave A Review
                  </button>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Testimonials;
