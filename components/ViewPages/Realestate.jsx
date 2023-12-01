"use client";
import {
  faArrowRight,
  faCircleXmark,
  faEnvelope,
  faLocationDot,
  faMapLocation,
  faRightLong,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ButtonGroup, Dropdown, Modal } from "react-bootstrap";

export default function Realestate() {
  const [show, setShow] = useState(false);
  const [ShowInquiry, setShowInquiry] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [Search, setSearch] = useState(false);
  const [ShowXMark, setShowXMark] = useState(false);
  const [ShowXMark1, setShowXMark1] = useState(false);
  const [ShowXMark2, setShowXMark2] = useState(false);

  const handleSearch = () => {
    setSearch(true);
    if (Search) {
      setSearch(false);
    }
  };

  const handleShowDelete = () => {
    setShowXMark(true);
    if (ShowXMark) {
      setShowXMark(false);
    }
    setShowXMark1(false);
    setShowXMark2(false);
  };
  const handleShowDelete1 = () => {
    setShowXMark1(true);
    if (ShowXMark1) {
      setShowXMark1(false);
    }
    setShowXMark(false);
    setShowXMark2(false);
  };
  const handleShowDelete2 = () => {
    setShowXMark2(true);
    if (ShowXMark2) {
      setShowXMark2(false);
    }
    setShowXMark(false);
    setShowXMark1(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Real Estate
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          <SwiperComponent
            slidesPerView={1}
            spaceBetween={10}
            style={{ cursor: "pointer" }}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            <SwiperSlide>
              <div className="swiper-slide review-items position-relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/800px-Townhouses_in_Victoria_Australia.jpg"
                  alt="realestate_image"
                  className="realEstateImage w-100 object-fit-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-slide review-items position-relative">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123114455images(2).jpg"
                  alt="realestate_image"
                  className="realEstateImage w-100 object-fit-cover"
                />
              </div>
            </SwiperSlide>
          </SwiperComponent>
          <div className="mt-2 color-black mb-3">
            <h6 className="mb-0">Emerald Oasis Mansion</h6>
            <p>
              2ne Themridge Cr. Syracuse Connecticut 35524 Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.{" "}
            </p>
            <div
              className="d-flex flex-wrap mt-3"
              style={{ gap: "10px", lineHeight: "0" }}
            >
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123112440icons8-bedroom-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">4 Bedroom</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113010icons8-bathroom-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">3 Bathroom</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-garage-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">1 Garage</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-sofa-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">Semi-Furnished</p>
              </div>
            </div>
            <div
              className="mt-4 d-flex flex-wrap align-items-center justify-content-between"
              style={{ gap: "10px" }}
            >
              <p className="font-weight-bold color-black">$2000/ per month</p>{" "}
              <span className="real-estate-badge">Commercial</span>
            </div>
            <div
              className="mt-3 d-flex align-items-center justify-content-center flex-wrap"
              style={{ gap: "5px" }}
            >
              <button className="contact-btn w-auto m-0">
                <FontAwesomeIcon icon={faLocationDot} className="mr-1" /> Open
                Map
              </button>{" "}
              <button
                className="contact-btn w-auto m-0"
                onClick={() => setShowInquiry(true)}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> Enquiry
              </button>
              <button className="contact-btn w-auto m-0 d-flex align-items-center">
                <img
                  src="./static/img/whatsapp.png"
                  alt="whatsaap"
                  className="Whatsaapsvg m-0"
                  width={25}
                />{" "}
                Whatsaap Enquiry
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Enquiry Modal */}
      <Modal show={ShowInquiry} onHide={() => setShowInquiry(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Enquire on Emerald Oasis Mansion
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowInquiry(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name*"
                required="required"
                autoComplete="on"
                // value={Name}
                // onChange={(e) => setName(e.target.value)}
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
                // value={Contact}
                // onChange={(e) => setContact(e.target.value)}
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
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 order-2 order-md-1 text-center text-md-left">
              <div id="validator-contact" className="hidden"></div>
            </div>
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              <button
                type="submit"
                className="send-btnn mt-0 w-auto"
                style={{ padding: "10px 60px" }}
                // onClick={() => handleProductSubmit()}
              >
                Send
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="box-content boxxx mb-3 mt-0" id="card_realstate">
        <div className="pb-0 pb-sm-2">
          {Search ? (
            <div className="d-flex align-items-baseline position-relative">
              <input
                type="text"
                placeholder="Search..."
                className="form-control mb-4"
              />
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: "18px" }}
                className="color-black cursor-pointer mobile-search-icon"
                onClick={() => handleSearch()}
              />
            </div>
          ) : (
            <div className="flex-header">
              <h2 className="title title--h1 first-title title__separate">
                Real Estate
              </h2>
              <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: "18px" }}
                  className="color-black cursor-pointer mobile-search"
                  onClick={() => handleSearch()}
                />
                <div className="search-box">
                  <input
                    className="search-text"
                    type="text"
                    placeholder="Search"
                  />
                  <span className="search-btn">
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ fontSize: "18px" }}
                      className="color-black cursor-pointer web-search"
                    />
                  </span>
                </div>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    split
                    variant="success"
                    id="dropdown-split-basic"
                    style={{
                      background: "none",
                      color: "black",
                      boxShadow: "none",
                      padding: "0",
                      margin: "0",
                      height: "0",
                      fontSize: "22px",
                    }}
                  ></Dropdown.Toggle>

                  <Dropdown.Menu style={{ margin: "2.125rem 0 0" }}>
                    <Dropdown.Item href="">Sort By Zip Code</Dropdown.Item>
                    <Dropdown.Item href="">Sort By Location</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          )}
          <SwiperComponent
            breakpoints={{
              1110: {
                slidesPerView: 10,
              },
              300: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={10}
            style={{ cursor: "pointer" }}
            className="mySwiper"
            navigation={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
          >
            <SwiperSlide className="w-auto">
              <div className="swiper-slide review-items position-relative filter-div">
                {ShowXMark ? (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="filter-btn-x-mark"
                    onClick={handleShowDelete}
                  />
                ) : (
                  ""
                )}
                <button
                  className={
                    ShowXMark ? "filter-btns bg-varcolor" : "filter-btns"
                  }
                  onClick={handleShowDelete}
                >
                  All
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="swiper-slide review-items position-relative filter-div">
                {ShowXMark1 ? (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="filter-btn-x-mark"
                    onClick={handleShowDelete1}
                  />
                ) : (
                  ""
                )}
                <button
                  className={
                    ShowXMark1 ? "filter-btns bg-varcolor" : "filter-btns"
                  }
                  onClick={handleShowDelete1}
                >
                  Buy
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <div className="swiper-slide review-items position-relative">
                {ShowXMark2 ? (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="filter-btn-x-mark"
                    onClick={handleShowDelete2}
                  />
                ) : (
                  ""
                )}
                <button
                  className={
                    ShowXMark2 ? "filter-btns bg-varcolor" : "filter-btns"
                  }
                  onClick={handleShowDelete2}
                >
                  Rent
                </button>
              </div>
            </SwiperSlide>
          </SwiperComponent>
          <div className="row realestaterow">
            <div className="col-lg-4 col-sm-12">
              <SwiperComponent
                slidesPerView={1}
                spaceBetween={10}
                style={{ cursor: "pointer" }}
                className="mySwiper"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
              >
                <SwiperSlide>
                  <div className="swiper-slide review-items position-relative">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/800px-Townhouses_in_Victoria_Australia.jpg"
                      alt="realestate_image"
                      className="realEstateImage w-100"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide review-items position-relative">
                    <img
                      src="https://prafullgupta.com/connectwork/assets/chat/groups/221123114455images(2).jpg"
                      alt="realestate_image"
                      className="realEstateImage w-100"
                    />
                  </div>
                </SwiperSlide>
              </SwiperComponent>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="mt-2 cursor-pointer" onClick={handleShow}>
                <h6
                  className="mb-0 color-black cursor-pointer d-flex align-items-center"
                  onClick={() => setshow(true)}
                >
                  Emerald Oasis Mansion
                  <span className="real-estate-badge">Commercial</span>
                </h6>
                <p className="color-black">
                  2ne Themridge Cr. Syracuse Connecticut 35524
                </p>
              </div>
              <div
                className="d-flex flex-wrap mt-2"
                style={{ gap: "10px", lineHeight: "0" }}
              >
                <div className="d-flex align-items-baseline">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123112440icons8-bedroom-100.png"
                    alt="image"
                    width={15}
                    height={15}
                  />
                  <p className="pl-2 color-black">4 Bedroom</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113010icons8-bathroom-100.png"
                    alt="image"
                    width={15}
                    height={15}
                  />
                  <p className="pl-2 color-black">3 Bathroom</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-garage-100.png"
                    alt="image"
                    width={15}
                    height={15}
                  />
                  <p className="pl-2 color-black">1 Garage</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-sofa-100.png"
                    alt="image"
                    width={15}
                    height={15}
                  />
                  <p className="pl-2 color-black">Semi-Furnished</p>
                </div>
              </div>
              <div
                className="mt-3 d-flex flex-wrap align-items-center justify-content-between"
                style={{ gap: "10px" }}
              >
                <p className="font-weight-bold color-black">$2000/ per month</p>
                <span className="real-estate-badge">Commercial</span>
              </div>
              <div
                className="mt-3 d-flex flex-wrap align-items-center justify-content-between"
                style={{ gap: "10px" }}
              >
                <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                  <a
                    href={
                      "https://api.whatsapp.com/send?phone=" +
                      "9874563210" +
                      "&" +
                      `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ....?`
                    }
                    target="_blank"
                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                  >
                    <img
                      src="./static/img/whatsapp.png"
                      alt="whatsaap"
                      className="Whatsaapsvg"
                    />
                  </a>
                  <span
                    data-toggle="modal"
                    data-target="#ProductEnquireModal"
                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center cursor-pointer"
                    onClick={() => setShowInquiry(true)}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="user-select-auto"
                    />
                  </span>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    className="whatsap-link-view d-flex align-items-center justify-content-center"
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="user-select-auto"
                    />
                  </a>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="user-select-auto mr-2 viewmore-btn-product cursor-pointer"
                  onClick={() => setShow(true)}
                />
              </div>
            </div>
          </div>
          <div
            className="mt-1 mb-2"
            style={{ borderBottom: "1px solid #ccc" }}
          ></div>
          <div className="row realestaterow mt-2">
            <div className="col-lg-4 col-sm-12">
              <SwiperComponent
                slidesPerView={1}
                spaceBetween={10}
                style={{ cursor: "pointer" }}
                className="mySwiper"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
              >
                <SwiperSlide>
                  <div className="swiper-slide review-items position-relative">
                    <img
                      src="https://prafullgupta.com/connectwork/assets/chat/groups/221123114455images(2).jpg"
                      alt="realestate_image"
                      className="realEstateImage w-100"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-slide review-items position-relative">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/800px-Townhouses_in_Victoria_Australia.jpg"
                      alt="realestate_image"
                      className="realEstateImage w-100"
                    />
                  </div>
                </SwiperSlide>
              </SwiperComponent>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="mt-2 cursor-pointer" onClick={handleShow}>
                <h6
                  className="mb-0 color-black cursor-pointer d-flex align-items-center"
                  onClick={() => setshow(true)}
                >
                  Emerald Oasis Mansion
                  <span className="real-estate-badge">Sold</span>
                </h6>
                <p className="color-black">
                  2ne Themridge Cr. Syracuse Connecticut 35524
                </p>
              </div>
              <div
                className="d-flex flex-wrap mt-2"
                style={{ gap: "10px", lineHeight: "0" }}
              >
                <div className="d-flex align-items-baseline">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123112440icons8-bedroom-100.png"
                    alt="image"
                    width={15}
                    height={15}
                  />
                  <p className="pl-2 color-black">4 Bedroom</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113010icons8-bathroom-100.png"
                    alt="image"
                    width={15}
                    height={15}
                  />
                  <p className="pl-2 color-black">3 Bathroom</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-garage-100.png"
                    alt="image"
                    width={15}
                    height={15}
                  />
                  <p className="pl-2 color-black">1 Garage</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-sofa-100.png"
                    alt="image"
                    width={15}
                    height={15}
                  />
                  <p className="pl-2 color-black">Semi-Furnished</p>
                </div>
              </div>
              <div
                className="mt-3 d-flex flex-wrap align-items-center justify-content-between"
                style={{ gap: "10px" }}
              >
                <p className="font-weight-bold color-black">$2000/ per month</p>
                <span className="real-estate-badge">Sold</span>
              </div>
              <div
                className="mt-3 d-flex flex-wrap align-items-center justify-content-between"
                style={{ gap: "10px" }}
              >
                <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                  <a
                    href={
                      "https://api.whatsapp.com/send?phone=" +
                      "9874563210" +
                      "&" +
                      `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ....?`
                    }
                    target="_blank"
                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                  >
                    <img
                      src="./static/img/whatsapp.png"
                      alt="whatsaap"
                      className="Whatsaapsvg"
                    />
                  </a>
                  <span
                    data-toggle="modal"
                    data-target="#ProductEnquireModal"
                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center cursor-pointer"
                    onClick={() => setShowInquiry(true)}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="user-select-auto"
                    />
                  </span>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    className="whatsap-link-view d-flex align-items-center justify-content-center"
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="user-select-auto"
                    />
                  </a>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="user-select-auto mr-2 viewmore-btn-product cursor-pointer"
                  onClick={() => setShow(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
