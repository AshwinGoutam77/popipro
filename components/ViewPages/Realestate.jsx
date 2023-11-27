"use client";
import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Modal } from "react-bootstrap";

export default function Realestate() {
  const [show, setShow] = useState(false);
  const [ShowInquiry, setShowInquiry] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
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
        <Modal.Body>
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
          <div className="mt-2 color-black">
            <h6 className="mb-0">Emerald Oasis Mansion</h6>
            <p>
              2ne Themridge Cr. Syracuse Connecticut 35524 Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.{" "}
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Enquiry Modal */}
      <Modal show={ShowInquiry} onHide={() => setShowInquiry(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Enquire Now
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
          <div className="flex-header">
            <h2 className="title title--h1 first-title title__separate">
              Real Estate
            </h2>
            {/* <div className="search-box">
            <input
              className="search-text"
              type="text"
              placeholder="Search"
            />
            <a href="#" className="search-btn">
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: "18px" }}
                className="color-black cursor-pointer"
              />
            </a>
          </div> */}
            {/* <Dropdown as={ButtonGroup}>
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
              }}
            >
              {" "}
              <FontAwesomeIcon
                icon={faArrowUpWideShort}
                style={{ fontSize: "20px" }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ margin: "2.125rem 0 0" }}>
              <Dropdown.Item href="">Lease</Dropdown.Item>
              <Dropdown.Item href="">Rented</Dropdown.Item>
              <Dropdown.Item href="">Sold</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          </div>
          <div
            className="d-flex align-items-center mb-2"
            style={{ gap: "10px" }}
          >
            <button className="w-auto filter-btns">Rented</button>
            <button className="w-auto filter-btns">Sold</button>
          </div>
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
                <h6 className="mb-0 color-black">Emerald Oasis Mansion</h6>
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
                <div>
                  <button className="real-map-btn">Open Map</button>
                  <button
                    className="real-tour-btn"
                    onClick={() => setShowInquiry(true)}
                  >
                    Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                <h6 className="mb-0 color-black">Paradise Cove Mansion</h6>
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
                <p className="font-weight-bold color-black">$6000/ per month</p>
                <div>
                  <button className="real-map-btn">Open Map</button>
                  <button className="real-tour-btn">Enquiry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
