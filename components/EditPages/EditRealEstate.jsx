"use client";
import {
  faArrowUpWideShort,
  faInfo,
  faPencil,
  faPlus,
  faSortAlphaDownAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function EditRealEstate() {
  const [show, setshow] = useState(false);
  const handleCanclebtn = () => {
    setshow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleCanclebtn} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add Real Estate
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleCanclebtn}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="modalFormLable">
              Upload Images (*Recommended Size 347x160)
            </label>
            <input
              type="file"
              name="image"
              className="form-control mb-4 p-1"
              accept="image/png, image/gif, image/jpeg"
              style={{ border: "1px solid #ccc" }}
              //   ref={aRef}
              //   onChange={(e) => setImage(e.target.files[0])}
            />
            <label className="modalFormLable">Heading*</label>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              //   value={ServicesName}
              placeholder="Heading"
              style={{ height: "40px", border: "1px solid #ccc" }}
              //   onChange={(e) => setServicesName(e.target.value)}
            ></input>
            <label className="modalFormLable">About*</label>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              //   value={ServicesName}
              placeholder="About"
              style={{ height: "40px", border: "1px solid #ccc" }}
              //   onChange={(e) => setServicesName(e.target.value)}
            ></input>
            <div
              className="d-flex align-items-center flex-wrap"
              style={{ gap: "10px" }}
            >
              <div>
                <label className="modalFormLable">Bedroom*</label>
                <br />
                <input
                  name="name"
                  rows="4"
                  cols="50"
                  className="form-control mb-4 mt-1 w-auto"
                  //   value={ServicesName}
                  placeholder="Bedroom"
                  style={{ height: "40px", border: "1px solid #ccc" }}
                  //   onChange={(e) => setServicesName(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="modalFormLable">Bathroom*</label>
                <input
                  name="name"
                  rows="4"
                  cols="50"
                  className="form-control mb-4 mt-1 w-auto"
                  //   value={ServicesName}
                  placeholder="Bathroom"
                  style={{ height: "40px", border: "1px solid #ccc" }}
                  //   onChange={(e) => setServicesName(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="modalFormLable">Garage*</label>
                <input
                  name="name"
                  rows="4"
                  cols="50"
                  className="form-control mb-4 mt-1 w-auto"
                  //   value={ServicesName}
                  placeholder="Garage"
                  style={{ height: "40px", border: "1px solid #ccc" }}
                  //   onChange={(e) => setServicesName(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="modalFormLable">
                  Furnished/ SemiFrunished*
                </label>
                <input
                  name="name"
                  rows="4"
                  cols="50"
                  className="form-control mb-4 mt-1 w-auto"
                  //   value={ServicesName}
                  placeholder="Furnished/ SemiFrunished*"
                  style={{ height: "40px", border: "1px solid #ccc" }}
                  //   onChange={(e) => setServicesName(e.target.value)}
                ></input>
              </div>
            </div>
            <label className="modalFormLable">Price</label>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              //   value={ServicesName}
              placeholder="Price"
              style={{ height: "40px", border: "1px solid #ccc" }}
              //   onChange={(e) => setServicesName(e.target.value)}
            ></input>
            <label className="modalFormLable">Location</label>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              //   value={ServicesName}
              placeholder="Location"
              style={{ height: "40px", border: "1px solid #ccc" }}
              //   onChange={(e) => setServicesName(e.target.value)}
            ></input>
          </div>
          <div
            className="d-flex align-items-center mt-3"
            style={{ gap: "10px" }}
          >
            <button
              className="send-btnn"
              //   onClick={() => handleSaveBlogDetail()}
            >
              Save
            </button>
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="box-content boxxx mb-3 mt-0" id="card_realstate">
        <div className="pb-0 pb-sm-2">
          <div className="flex-header">
            <h2 className="title title--h1 first-title title__separate">
              Real Estate
            </h2>
            <div>
              {/* {TitleData?.card_blogs?.source == "2" &&
              PlanData?.is_expired == false &&
              PlanData?.subscription?.plan_id !== 1 ? ( */}
              <div className="d-flex align-items-center">
                <div class="wrapper">
                  <div class="tooltip">
                    Present yourself/business by writing blogs, articles,
                    poetry, story...
                  </div>
                  <FontAwesomeIcon
                    icon={faInfo}
                    className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                    // onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                  />
                </div>
                <div className="edit-pencile-div">
                  {/* {EditFields ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      className="ml-3 pe-auto floopySave-icon"
                      onClick={() => handleChnageTitle()}
                    />
                  ) : ( */}
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="ml-3 pe-auto Iconcolor-black"
                    //   onClick={() => setEditFields(true)}
                  />
                  {/* )} */}
                </div>

                {/* {MainData?.company_setting?.maximum_blogs !==
                  PaginationData?.total_blogs ? (
                    <button
                      className="addmore"
                      data-toggle="modal"
                      data-target="#AddMoreBlogModal"
                      onClick={() => handleShow()}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  ) : ( */}
                <button
                  className="addmore"
                  onClick={() => setshow(true)}
                  // onClick={handleUpgradePlan}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                {/* )} */}
                <>
                  <label className="switch">
                    <input
                      //   data-status={TitleData.card_blogs?.is_active}
                      //   data-active={Active}
                      //   checked={Active}
                      type="checkbox"
                      //   onChange={() => handleActive()}
                    />
                    <span className="slider round"></span>
                  </label>
                </>
              </div>
              {/* ) : (
                ""
              )} */}
            </div>
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
              <div className="d-flex align-items-center justify-content-between verify-div-sm">
                <div className="d-flex align-items-center">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123110412icons8-verified-48.png"
                    alt="verify_png"
                    width={15}
                  />
                  <span
                    className="pl-1"
                    style={{
                      fontSize: "12px",
                      color: "green",
                      paddingTop: "2px",
                    }}
                  >
                    Verified
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className=""
                    style={{ color: "#c7c700", fontSize: "13px" }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      paddingTop: "3px",
                    }}
                    className="pl-1"
                  >
                    4.5 Rating
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <h6 className="mb-0 color-black">Emerald Oasis Mansion</h6>
                <p className="color-black">
                  2ne Themridge Cr. Syracuse Connecticut 35524
                </p>
              </div>
              <div className="d-flex flex-wrap mt-2" style={{ gap: "10px" }}>
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
                  <button className="real-tour-btn">Visit Tour</button>
                  <button className="real-tour-btn">Enquiry</button>
                </div>
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-start px-4"
              style={{
                gap: "10px",
                marginTop: "18px",
                marginBottom: "18px",
              }}
            >
              <button
                className="send-btnn m-0"
                data-toggle="modal"
                data-target="#EditProductModal"
                onClick={() => setshow(true)}
                //   onClick={() =>
                //     handleSetId(
                //       items.id,
                //       items.name,
                //       items.description,
                //       items.price,
                //       items.url,
                //       items.currency,
                //       items.button_placeholder
                //     )
                //   }
              >
                Edit
              </button>
              <button
                className="delete-button m-0"
                //   onClick={() => handleDelteBlogs(items.id, 2, Data?.id)}
              >
                Delete
              </button>
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
              <div className="d-flex align-items-center justify-content-between verify-div-sm">
                <div className="d-flex align-items-center">
                  <img
                    src="https://prafullgupta.com/connectwork/assets/chat/groups/221123110412icons8-verified-48.png"
                    alt="verify_png"
                    width={15}
                  />
                  <span
                    className="pl-1"
                    style={{
                      fontSize: "12px",
                      color: "green",
                      paddingTop: "2px",
                    }}
                  >
                    Verified
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className=""
                    style={{ color: "#c7c700", fontSize: "13px" }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      paddingTop: "3px",
                    }}
                    className="pl-1"
                  >
                    4.5 Rating
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <h6 className="mb-0 color-black">Paradise Cove Mansion</h6>
                <p className="color-black">
                  2ne Themridge Cr. Syracuse Connecticut 35524
                </p>
              </div>
              <div className="d-flex flex-wrap mt-2" style={{ gap: "10px" }}>
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
                  <button className="real-tour-btn">Visit Tour</button>
                  <button className="real-tour-btn">Enquiry</button>
                </div>
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-start px-4"
              style={{
                gap: "10px",
                marginTop: "18px",
                marginBottom: "18px",
              }}
            >
              <button
                className="send-btnn m-0"
                data-toggle="modal"
                data-target="#EditProductModal"
                onClick={() => setshow(true)}
                //   onClick={() =>
                //     handleSetId(
                //       items.id,
                //       items.name,
                //       items.description,
                //       items.price,
                //       items.url,
                //       items.currency,
                //       items.button_placeholder
                //     )
                //   }
              >
                Edit
              </button>
              <button
                className="delete-button m-0"
                //   onClick={() => handleDelteBlogs(items.id, 2, Data?.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
