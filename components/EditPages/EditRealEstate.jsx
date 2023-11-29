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
import { Modal } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function EditRealEstate() {
  const [show, setshow] = useState(false);
  const [PriceRadio, setPriceRadio] = useState(true);
  const [LabelRadio, setLabelRadio] = useState(false);
  const handleCanclebtn = () => {
    setshow(false);
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
  return (
    <>
      <Modal size="md" show={show} onHide={handleCanclebtn} centered>
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
            <div
              className="d-flex align-items-center w-100 flex-wrap mt-3"
              style={{ gap: "10px" }}
            >
              <div>
                <label className="modalFormLable">Bedroom*</label>
                <br />
                <input
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
