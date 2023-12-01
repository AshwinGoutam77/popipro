"use client";
import {
  faAngleDoubleRight,
  faArrowRight,
  faArrowUpWideShort,
  faEnvelope,
  faInfo,
  faLocationDot,
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
import { Modal } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";

export default function EditRealEstate() {
  const [show, setshow] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const [PriceRadio, setPriceRadio] = useState(true);
  const [LabelRadio, setLabelRadio] = useState(false);
  const [GeneralSetting, setGeneralSetting] = useState(true);
  const [CatSetting, setCatSetting] = useState(false);
  const [LocationSetting, setLocationSetting] = useState(false);

  const handleCanclebtn = () => {
    setshow(false);
    setShowModal(false);
  };
  const handleRadioBTN = (e) => {
    setLabelRadio(false);
    if (PriceRadio == false) {
      setPriceRadio(true);
    }
  };
  const handleLabelRadio = () => {
    setPriceRadio(false);
    if (LabelRadio == false) {
      setLabelRadio(true);
    }
  };

  const handleSettings1 = () => {
    setGeneralSetting(true);
    setCatSetting(false);
    setLocationSetting(false);
  };
  const handleSettings2 = () => {
    setGeneralSetting(false);
    setCatSetting(true);
    setLocationSetting(false);
  };
  const handleSettings3 = () => {
    setLocationSetting(true);
    setGeneralSetting(false);
    setCatSetting(false);
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      Swal.fire("Deleted!", "", "success");
    });
  };
  return (
    <>
      <Modal show={show} onHide={() => setshow(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Real Estate
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setshow(false)}
          >
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
              <button className="contact-btn w-auto m-0">Open Map</button>{" "}
              <button
                className="contact-btn w-auto m-0"
                // onClick={() => setShowInquiry(true)}
              >
                Enquiry
              </button>
              <button className="contact-btn w-auto m-0">
                Whatsaap Enquiry
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal size="md" show={ShowModal} onHide={handleCanclebtn} centered>
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
          <div className="mx-2 mb-3 d-flex align-items-center w-100">
            <p
              className={
                GeneralSetting
                  ? "font-weight-bold cursor-pointer VarColor realestate-active"
                  : "font-weight-bold cursor-pointer VarColor"
              }
              onClick={handleSettings1}
            >
              General info. <FontAwesomeIcon icon={faAngleDoubleRight} />
            </p>
            <p
              className={
                CatSetting
                  ? "font-weight-bold cursor-pointer VarColor realestate-active ml-2"
                  : "font-weight-bold cursor-pointer VarColor ml-2"
              }
              onClick={handleSettings2}
            >
              Catagory info. <FontAwesomeIcon icon={faAngleDoubleRight} />
            </p>
            <p
              className={
                LocationSetting
                  ? "font-weight-bold cursor-pointer VarColor realestate-active ml-2"
                  : "font-weight-bold cursor-pointer VarColor ml-2"
              }
              onClick={handleSettings3}
            >
              Location info.
            </p>
          </div>

          {/* General div */}
          {GeneralSetting ? (
            <>
              <div>
                <label className="modalFormLable">
                  Featured Image (*Recommended Size 347x160)
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
                <label className="modalFormLable">
                  Other Images (*Recommended Size 347x160)
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control mb-4 p-1"
                  accept="image/png, image/gif, image/jpeg"
                  style={{ border: "1px solid #ccc" }}
                  multiple
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
                <div className="d-flex align-items-center mb-3 mt-1 ml-2">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      id="price"
                      name="product"
                      value={0}
                      checked={PriceRadio}
                      onChange={(e) => handleRadioBTN(e.target.value)}
                    />{" "}
                    <label htmlFor="price" className="ml-2 mb-0">
                      Show Price
                    </label>
                  </div>
                  <div className="d-flex align-items-center ml-3">
                    <input
                      type="radio"
                      id="css"
                      name="product"
                      value={1}
                      // checked={LabelRadio}
                      onChange={(e) => handleLabelRadio(e.target.value)}
                    />{" "}
                    <label htmlFor="css" className="ml-2 mb-0">
                      Show Text
                    </label>
                  </div>
                </div>
                {PriceRadio ? (
                  <div>
                    <label className="modalFormLable">Price</label>
                    <div className="d-flex" style={{ gap: "10px" }}>
                      <select
                        style={{
                          height: "40px",
                          padding: "6px 18px",
                          background: "#f7f9fa",
                          border: "1px solid #ccc",
                        }}
                        // onChange={(e) => setProductPriceValue(e.target.value)}
                        className="mt-1"
                      >
                        <option value="">Select currency</option>
                        <option value="">$</option>
                        <option value="">₹</option>
                        <option value="">AU$</option>
                        <option value="">SGD$</option>
                        {/* {Currency &&
                      Currency?.map((item, index) => {
                        return <option key={index}>{item}</option>;
                      })} */}
                      </select>
                      <input
                        type="number"
                        name="price"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1"
                        // value={ProductPrice}
                        placeholder="Price"
                        style={{ height: "40px", border: "1px solid #ccc" }}
                        // onChange={(e) => setProductPrice(e.target.value)}
                        maxlength="10"
                      ></input>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="modalFormLable">Text</label>
                    <input
                      type="text"
                      name="price"
                      rows="4"
                      cols="50"
                      className="form-control mb-4 mt-1"
                      // value={ProductPrice}
                      placeholder="Text"
                      style={{ height: "40px", border: "1px solid #ccc" }}
                      onChange={(e) => setProductPrice(e.target.value)}
                      maxlength="12"
                    ></input>
                  </div>
                )}
                <label className="modalFormLable">Description*</label>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    removePlugins: [
                      "EasyImage",
                      "ImageUpload",
                      "MediaEmbed",
                      "Table",
                      "TableToolbar",
                      "Indent",
                      "BlockQuote",
                      "Heading",
                      "Emoji",
                    ],
                    placeholder:
                      "Insert a text and take advantage of AI to enrich the content you've written.",
                    link: {
                      decorators: {
                        addTargetToExternalLinks: {
                          mode: "automatic",
                          callback: (url) => /^(https?:)?\/\//.test(url),
                          attributes: {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          },
                        },
                      },
                    },
                  }}
                  data={"" || ""}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    // setServicesDescription(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              </div>
              <div
                className="d-flex align-items-center mt-3 justify-content-end"
                style={{ gap: "10px" }}
              >
                <button className="send-btnn" onClick={() => handleSettings2()}>
                  Next
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          {/* Catagory div */}
          {CatSetting ? (
            <div className="w-100">
              <label className="modalFormLable">Bedroom*</label>
              <br />
              <input
                type="number"
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-100"
                //   value={ServicesName}
                placeholder="Bedroom"
                style={{ height: "40px", border: "1px solid #ccc" }}
                //   onChange={(e) => setServicesName(e.target.value)}
              ></input>
              <label className="modalFormLable">Bathroom*</label>
              <input
                type="number"
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-100"
                //   value={ServicesName}
                placeholder="Bathroom"
                style={{ height: "40px", border: "1px solid #ccc" }}
                //   onChange={(e) => setServicesName(e.target.value)}
              ></input>
              <label className="modalFormLable">Garage*</label>
              <input
                type="number"
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-100"
                //   value={ServicesName}
                placeholder="Garage"
                style={{ height: "40px", border: "1px solid #ccc" }}
                //   onChange={(e) => setServicesName(e.target.value)}
              ></input>
              <label className="modalFormLable">
                Furnished/ SemiFrunished*
              </label>
              <input
                type="number"
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-100"
                //   value={ServicesName}
                placeholder="Furnished/ SemiFrunished*"
                style={{ height: "40px", border: "1px solid #ccc" }}
                //   onChange={(e) => setServicesName(e.target.value)}
              ></input>
              <label className="modalFormLable">Category*</label>
              <input
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1"
                //   value={ServicesName}
                placeholder="Category"
                style={{ height: "40px", border: "1px solid #ccc" }}
                //   onChange={(e) => setServicesName(e.target.value)}
              ></input>
              <label className="modalFormLable">Sub Category*</label>
              <input
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1"
                //   value={ServicesName}
                placeholder="Category"
                style={{ height: "40px", border: "1px solid #ccc" }}
                //   onChange={(e) => setServicesName(e.target.value)}
              ></input>
              <div
                className="d-flex align-items-center mt-3 justify-content-end"
                style={{ gap: "10px" }}
              >
                <button className="send-btnn" onClick={() => handleSettings1()}>
                  Back
                </button>
                <button className="send-btnn" onClick={() => handleSettings3()}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Location div */}
          {LocationSetting ? (
            <div>
              <label className="modalFormLable">Address</label>
              <input
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1"
                //   value={ServicesName}
                placeholder="Address"
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
              <div
                className="d-flex align-items-center mt-3 justify-content-start"
                style={{ gap: "10px" }}
              >
                <button className="send-btnn" onClick={() => handleSettings2()}>
                  Save
                </button>
                <button className="send-btnn" onClick={() => handleCanclebtn()}>
                  Cancle
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
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
                  onClick={() => setShowModal(true)}
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
              <div className="mt-2 cursor-pointer">
                <h6
                  className="mb-0 color-black cursor-pointer"
                  onClick={() => setshow(true)}
                >
                  Emerald Oasis Mansion
                </h6>
                <p
                  className="color-black cursor-pointer"
                  onClick={() => setshow(true)}
                >
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
                      src="../static/img/whatsapp.png"
                      alt="whatsaap"
                      className="Whatsaapsvg"
                    />
                  </a>
                  <span
                    data-toggle="modal"
                    data-target="#ProductEnquireModal"
                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center cursor-pointer"
                    // onClick={() => setShowInquiry(true)}
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
                  onClick={() => setshow(true)}
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
              <div className="mt-2 cursor-pointer">
                <h6
                  className="mb-0 color-black cursor-pointer"
                  onClick={() => setshow(true)}
                >
                  Emerald Oasis Mansion
                </h6>
                <p
                  className="color-black cursor-pointer"
                  onClick={() => setshow(true)}
                >
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
                      src="../static/img/whatsapp.png"
                      alt="whatsaap"
                      className="Whatsaapsvg"
                    />
                  </a>
                  <span
                    data-toggle="modal"
                    data-target="#ProductEnquireModal"
                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center cursor-pointer"
                    // onClick={() => setShowInquiry(true)}
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
                  onClick={() => setshow(true)}
                />
              </div>
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-start"
            style={{
              gap: "10px",
              marginTop: "10px",
              marginBottom: "18px",
            }}
          >
            <button
              className="send-btnn m-0"
              data-toggle="modal"
              data-target="#EditProductModal"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
            <button className="delete-button m-0" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div className="mt-4">
            <h6 className="font-weight-bold">
              How you want to recive inquiry:
            </h6>
            <div className="d-flex align-items-start">
              <input
                type="checkbox"
                id="product-whatsaap2"
                className="mt-1"
                // value={
                //   MainData?.company_setting?.show_product_wp_button === 0
                //     ? true
                //     : false
                // }
                // onChange={() => handleProductsbtn("wp")}
                // checked={
                //   MainData?.company_setting?.show_product_wp_button == 0
                //     ? true
                //     : false
                // }
              />
              <label
                for="product-whatsaap2"
                className="ml-2 Varcolor font-weight-bold"
              >
                Via whatsaap only?
              </label>
            </div>
            <div className="d-flex align-items-start">
              <input
                type="checkbox"
                id="product-enq2"
                className="mt-1"
                // value={
                //   MainData?.company_setting?.show_product_enquiry_button === 0
                //     ? true
                //     : false
                // }
                // onChange={() => handleProductsbtn("enq")}
                // checked={
                //   MainData?.company_setting?.show_product_enquiry_button == 0
                //     ? true
                //     : false
                // }
              />
              <label
                for="product-enq2"
                className="ml-2 Varcolor font-weight-bold"
              >
                Via inquiry form?
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
