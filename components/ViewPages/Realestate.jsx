"use client";
import {
  faArrowDown,
  faArrowDownAZ,
  faArrowRight,
  faArrowUp,
  faArrowUpRightDots,
  faCircleXmark,
  faEnvelope,
  faLocationDot,
  faMapLocation,
  faPhone,
  faRightFromBracket,
  faRightLong,
  faSearch,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ButtonGroup, Dropdown, Modal } from "react-bootstrap";
import localforage from "localforage";
import { toast } from "react-toastify";
import { HitClickApi, RealEstateInquiry } from "@services/Routes";
import Api from "@services/Api";
import SimpleBackdrop from "./SimpleBackDrop";
import ReactPlayer from "react-player";
import LoadingText from "./LoadingText";

export default function Realestate({
  Data,
  MainData,
  Titles,
  card_url,
  PlanData,
  PaginationData,
}) {
  const [show, setShow] = useState(false);
  const [ShowInquiry, setShowInquiry] = useState(false);
  const handleShow = () => setShow(true);
  const [Search, setSearch] = useState(false);
  const [ContentId, setContentId] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Message, setMessage] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [LoadMore, setLoadMore] = useState("");
  const [ActiveFilter, setActiveFilter] = useState("");
  const [ActiveLooking, setActiveLooking] = useState("");
  const [HighlightSort, setHighlightSort] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductSearching, setProductSearching] = useState("");
  const [Page, setPage] = useState(1);
  const [EstateData, setEstateData] = useState("");
  const [LookingFor, setLookingFor] = useState("");
  const [ModalHeading, setModalHeading] = useState("");
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    setEstateData(Data?.card_realestates);
  }, []);

  const handleSearch = async (e) => {
    setTimeout(async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_MODE == "development"
          ? `https://dev.popipro.com/api/get-more-items?card_url=${card_url}&type=card_realestates&current_page=1&realestate_search=${e}`
          : `https://admin.popipro.com/api/get-more-items?card_url=${card_url}&type=card_realestates&current_page=1&realestate_search=${e}`,
        {
          method: "GET",
          cache: "no-cache",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEstateData(() => data?.data?.next_page_data?.data);
        setPage(1);
        setLoadMore(data?.data?.next_page_data?.next_page_url);
        data?.data?.amenities?.map((item) => {
          setActiveFilter(item?.name);
        });
      }
    }, 1000);
  };

  const handleShowSearchFilter = () => {
    setSearch(true);
    if (Search) {
      setSearch(false);
    }
  };

  const handleResetFilter = () => {
    setEstateData(Data?.card_realestates);
    setProductCategory("");
    setHighlightSort("");
    setProductSearching("");
    setPage(1);
    setActiveFilter("");
    setLookingFor("");
    setSearch(false);
  };

  const handleSearchInProduct = () => {
    if (ProductSearching == "") {
      toast.error("Searching is required", {
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
    LoadMoreFunction();
  };

  const handleShowEnquiry = (id, name) => {
    console.log("ff", name);
    setShowInquiry(true);
    setContentId(id);
    setModalHeading(name);
  };

  const handleShowDetailModal = (id) => {
    setContentId(id);
    handleShow(true);
    HitClick(id);
  };

  const handleEmptyField = () => {
    setShowInquiry(false);
    setName("");
    setPhone("");
    setMessage("");
    setEmail("");
  };

  const handleSubmitEnquiry = async (id) => {
    if (Name == "") {
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
    } else if (Phone == "") {
      toast.error("Mobile/Phone number is required", {
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
    } else if (Email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email) == false) {
      toast.error("Invalid email format", {
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
    // setShowLoader(true);
    setLoader(true);
    try {
      let data = {
        realestate: ContentId,
        name: Name,
        contact: Phone,
        email: Email,
        message: Message,
        card_url: card_url,
        latitude: await localforage.getItem("latitude"),
        longitude: await localforage.getItem("longitude"),
        fb_token: await localforage.getItem("fcm_token"),
      };
      const response = await Api(RealEstateInquiry, data);
      if (response.data.status) {
        handleEmptyField();
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
        setShowProduct(false);
        setName("");
        setEmail("");
        setContact("");
        setMessage("");
      }
    } catch (error) {
      setShowLoader(false);
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

  const HitClick = async (id) => {
    let payload = {
      card: Data?.id,
      type: "realestate",
      device_id: navigator.userAgent,
      object_base: id,
      hit_type: "view-more",
      latitude: await localforage.getItem("latitude"),
      longitude: await localforage.getItem("longitude"),
      fb_token: await localforage.getItem("fcm_token"),
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };

  const incrementCount = () => {
    setPage((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    LoadMoreFunction();
  }, [Page]);

  useEffect(() => {
    setPage(1);
    LoadMoreFunction();
  }, [ProductCategory, HighlightSort, LookingFor]);

  const LoadMoreFunction = async () => {
    setActiveFilter([ProductCategory]);
    setActiveLooking([LookingFor]);
    // setActiveFilter([...ActiveFilter, ProductCategory]);
    const response = await fetch(
      process.env.NEXT_PUBLIC_MODE == "development"
        ? `https://dev.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_realestates&current_page=${
            Page && Page
          }${HighlightSort ? "&sortBy=" + HighlightSort : ""}${
            ProductSearching ? "&realestate_search=" + ProductSearching : ""
          }${ProductCategory ? "&amenities[]=" + ProductCategory : ""}${
            LookingFor ? "&looking_for[]=" + LookingFor : ""
          }`
        : `https://admin.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_realestates&current_page=${
            Page && Page
          }${HighlightSort ? "&sortBy=" + HighlightSort : ""}${
            ProductSearching ? "&realestate_search=" + ProductSearching : ""
          }`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setLoadMore(data?.data?.next_page_data?.next_page_url);
      setHighlightSort(data?.data?.request.sortBy);
      Page > 1
        ? ProductCategory
          ? setEstateData(() => data?.data?.next_page_data?.data)
          : setEstateData((prevData) => [
              ...prevData,
              ...data?.data?.next_page_data?.data,
            ])
        : setEstateData(() => data?.data?.next_page_data?.data);
    }
  };

  const handleShowModalEnquiry = (name) => {
    setShowInquiry(true);
    setShow(false);
    setModalHeading(name);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 15) {
      setPhone(value);
    }
  };

  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Real Estate
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShow(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          {EstateData &&
            EstateData?.map((items, index) => {
              return items?.id === ContentId ? (
                <div key={index}>
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
                    {items?.youtube_link !== null ? (
                      <SwiperSlide>
                        <div className="swiper-slide review-items position-relative mb-2">
                          <div className="vedio-height">
                            <div className="product-video-player-container">
                              <ReactPlayer
                                url={items?.youtube_link}
                                controls
                                width="560"
                                height="315"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ) : (
                      ""
                    )}
                    <SwiperSlide>
                      <div className="swiper-slide review-items position-relative">
                        <img
                          src={
                            items?.image?.path
                              ? Data?.base_url + items?.image?.path
                              : "../static/img/picture-1.jpg"
                          }
                          alt="realestate_image"
                          className="realEstateImage w-100 object-fit-cover"
                        />
                      </div>
                    </SwiperSlide>
                    {items?.gallery &&
                      items?.gallery?.map((i, o) => {
                        return (
                          <SwiperSlide key={o}>
                            <div className="swiper-slide review-items position-relative">
                              <img
                                src={Data?.base_url + i?.path}
                                alt="realestate_image"
                                className="realEstateImage w-100 object-fit-cover"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </SwiperComponent>
                  <div className="mt-2 color-black mb-3">
                    <h5 className="mb-0 color-black cursor-pointer d-flex align-items-center justify-content-between">
                      {items?.heading}
                      <span className="real-estate-badge">
                        {items?.property_type?.name}
                      </span>
                    </h5>

                    <div
                      className="d-flex flex-wrap mt-3 amenities-main-section w-100"
                      style={{ gap: "10px", lineHeight: "0" }}
                    >
                      {items?.amenities &&
                        items?.amenities?.map((amenities, key) => {
                          return key < 4 ? (
                            <div
                              className="d-flex align-items-baseline amenities-div"
                              key={key}
                            >
                              <span
                                style={{ fontSize: "16px" }}
                                dangerouslySetInnerHTML={{
                                  __html: amenities.icon,
                                }}
                              ></span>
                              <p className="pl-2 color-black">
                                {amenities?.pivot?.description}
                              </p>
                            </div>
                          ) : (
                            ""
                          );
                        })}
                    </div>

                    <div
                      className="mt-3 mb-2 d-flex flex-wrap align-items-center justify-content-between"
                      style={{ gap: "10px" }}
                    >
                      {items.is_label !== 0 ? (
                        <span className="font-weight-bold VarColor real-estate-price">
                          {items?.label}
                        </span>
                      ) : (
                        <p className="font-weight-bold VarColor real-estate-price">
                          {MainData?.company_setting?.currency?.currency}{" "}
                          {new Intl.NumberFormat().format(items?.price)}
                        </p>
                      )}
                    </div>

                    <a
                      href={items?.google_address_link}
                      target="_blank"
                      className="color-black cursor-pointer mt-2 font-weight-bold"
                    >
                      {items?.street_address}, {items?.city}, {items?.state},{" "}
                      {items?.country}, ({items?.zipcode})
                    </a>

                    <p className="mt-3">
                      {items?.description.replace(/(<([^>]+)>)/gi, "")}
                    </p>

                    {items?.amenities?.length > 3 ? (
                      <div
                        className="d-flex flex-column mt-3 amenities-main-section w-100"
                        style={{ gap: "10px", lineHeight: "0" }}
                      >
                        {items?.amenities &&
                          items?.amenities?.map((amenities, key) => {
                            return key > 3 ? (
                              <div
                                className="d-flex align-items-baseline amenities-div"
                                key={key}
                              >
                                <span
                                  style={{ fontSize: "16px" }}
                                  dangerouslySetInnerHTML={{
                                    __html: amenities.icon,
                                  }}
                                ></span>
                                <p className="pl-2 color-black">
                                  {amenities?.pivot?.description}
                                </p>
                              </div>
                            ) : (
                              ""
                            );
                          })}
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="mt-4 w-100" style={{ gap: "5px" }}>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ gap: "10px" }}
                      >
                        {items?.google_address_link && (
                          <a
                            href={
                              items?.google_address_link?.includes(
                                "https://"
                              ) ||
                              items?.google_address_link?.includes("http://")
                                ? "https://" + items?.google_address_link
                                : items?.google_address_link
                            }
                            target="_blank"
                            className="w-100"
                          >
                            <button className="contact-btn w-100 m-0">
                              Visit Site
                            </button>
                          </a>
                        )}
                        {Data?.whatsapp_number && (
                          <a
                            href={
                              "https://api.whatsapp.com/send?phone=" +
                              Data?.whatsapp_number +
                              "&" +
                              `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items?.name}?`
                            }
                            target="_blank"
                            className="w-100"
                          >
                            <button className="contact-btn w-100 m-0">
                              <FontAwesomeIcon
                                icon={faPhone}
                                className="mr-2"
                              />{" "}
                              WhatsApp
                            </button>
                          </a>
                        )}
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-center mt-2"
                        style={{ gap: "10px" }}
                      >
                        <button className="contact-btn w-100 m-0">
                          Contact Agent
                        </button>
                        <button
                          className="contact-btn w-100 m-0"
                          onClick={() => handleShowModalEnquiry(items?.heading)}
                        >
                          <FontAwesomeIcon icon={faEnvelope} className="mr-1" />{" "}
                          Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
        </Modal.Body>
      </Modal>

      {/* Enquiry Modal */}
      <Modal show={ShowInquiry} onHide={() => handleEmptyField()} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Enquiry for {ModalHeading}
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => handleEmptyField()}
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
                value={Name}
                onChange={(e) => setName(e.target.value)}
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
                value={Phone}
                onChange={handleChange}
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
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton">
              {!Loader ? (
                <button
                  type="submit"
                  className="send-btnn mt-0 w-auto"
                  onClick={() => handleSubmitEnquiry()}
                >
                  Send
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

      {Titles &&
      Titles?.card_realestates?.is_active &&
      PlanData?.is_expired == false &&
      PlanData?.PlanData?.plan_id !== 1 &&
      PlanData?.PlanData !== null ? (
        Data?.card_realestates?.length !== 0 &&
        Titles?.card_realestates?.is_active !== 0 ? (
          <div className="box-content boxxx mb-3 mt-0" id="card_realestates">
            <div className="mt-0 product-section-div">
              {Search ? (
                <div className="d-flex align-items-baseline position-relative">
                  <input
                    type="text"
                    placeholder="Search and enter"
                    className="form-control mb-4"
                    onChange={(e) => setProductSearching(e.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleSearchInProduct();
                      }
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="color-black cursor-pointer search-icon-products fs-18"
                    onClick={() => handleResetFilter()}
                  />
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="color-black cursor-pointer search-icon-products fs-18 mr-5"
                    onClick={() => handleSearchInProduct()}
                  />
                </div>
              ) : (
                <div className="d-flex align-items-start justify-content-between">
                  <h3 className="title title--h1 first-title title__separate">
                    {Titles &&
                    Titles.card_realestates?.visible_name === "card_products"
                      ? "card_products"
                      : Titles?.card_realestates?.visible_name}
                  </h3>
                  <div className="d-flex gap-20">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="color-black cursor-pointer fs-18"
                      onClick={() => handleShowSearchFilter()}
                    />
                    {Search ? (
                      <div className="d-flex align-items-baseline position-relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="form-control mb-4"
                          onChange={(e) => handleSearch(e.target.value)}
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              handleSearchInProduct();
                            }
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="color-black cursor-pointer search-icon-products fs-18"
                          onClick={() => handleShowSearchFilter()}
                        />
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className="color-black cursor-pointer search-icon-products fs-18 mr-5"
                          onClick={() => handleSearchInProduct()}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        split
                        variant="success"
                        id="dropdown-split-basic"
                        className="sorting-dropdown"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu style={{ margin: "2.125rem 0 0" }}>
                        <Dropdown.Item
                          href=""
                          onClick={() => setHighlightSort("name")}
                          className={
                            HighlightSort == "name"
                              ? "dropdown-item-active"
                              : "dropdown-item"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faArrowDownAZ}
                            className="user-select-auto"
                          />{" "}
                          Sort By Name
                        </Dropdown.Item>
                        <Dropdown.Item
                          href=""
                          onClick={() => setHighlightSort("lowest-price")}
                          className={
                            HighlightSort == "lowest-price"
                              ? "dropdown-item-active"
                              : "dropdown-item"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faArrowDown}
                            className="user-select-auto"
                          />{" "}
                          Sort By Lowest Price
                        </Dropdown.Item>
                        <Dropdown.Item
                          href=""
                          onClick={() => setHighlightSort("highest-price")}
                          className={
                            HighlightSort == "highest-price"
                              ? "dropdown-item-active"
                              : "dropdown-item"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            className="user-select-auto"
                          />{" "}
                          Sort By Higest Price
                        </Dropdown.Item>
                        <Dropdown.Item
                          href=""
                          onClick={() => setHighlightSort("latest")}
                          className={
                            HighlightSort == "latest"
                              ? "dropdown-item-active"
                              : "dropdown-item"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            className="user-select-auto"
                          />{" "}
                          Sort By Latest
                        </Dropdown.Item>
                        <Dropdown.Item
                          href=""
                          onClick={() => setHighlightSort("popularity")}
                          className={
                            HighlightSort == "popularity"
                              ? "dropdown-item-active"
                              : "dropdown-item"
                          }
                        >
                          <FontAwesomeIcon
                            icon={faArrowUpRightDots}
                            className="user-select-auto"
                          />{" "}
                          Sort By Popularity
                        </Dropdown.Item>
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
                className="mySwiper cursor-pointer"
                navigation={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
              >
                <SwiperSlide className="w-auto">
                  <div className="swiper-slide review-items position-relative">
                    <button
                      className={
                        ActiveFilter == ""
                          ? // || ActiveLooking == ""
                            "filter-btns bg-varcolor"
                          : "filter-btns"
                      }
                      onClick={() => handleResetFilter()}
                    >
                      All
                    </button>
                  </div>
                </SwiperSlide>

                {/* {Data?.looking_for &&
                  Data?.looking_for?.map((items, index) => {
                    return (
                      <SwiperSlide className="w-auto" key={index}>
                        <div className="swiper-slide review-items position-relative">
                          <button
                            className={
                              ActiveLooking == items?.id
                                ? "filter-btns bg-varcolor"
                                : "filter-btns"
                            }
                            onClick={() => setLookingFor(items?.id)}
                          >
                            {items?.name}
                          </button>
                        </div>
                      </SwiperSlide>
                    );
                  })} */}

                {Data?.amenities &&
                  Data?.amenities?.map((items, index) => {
                    return (
                      <SwiperSlide className="w-auto" key={index}>
                        <div className="swiper-slide review-items position-relative">
                          <button
                            className={
                              // ActiveFilter.includes(items?.id)
                              ActiveFilter == items?.id
                                ? "filter-btns bg-varcolor filter-active"
                                : "filter-btns"
                            }
                            onClick={() => setProductCategory(items?.id)}
                          >
                            {items?.name}
                          </button>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </SwiperComponent>

              {EstateData?.length !== 0 ? (
                EstateData &&
                EstateData?.map((items, index, { length }) => {
                  return (
                    <div
                      className={
                        index + 1 === length
                          ? "row realestaterow"
                          : "row realestaterow real-estate-border mb-3"
                      }
                      key={index}
                    >
                      <div className="col-lg-4 col-sm-12 cursor-pointer">
                        <div
                          className="position-relative"
                          onClick={() => handleShowDetailModal(items?.id)}
                        >
                          <img
                            src={
                              items?.image?.path
                                ? Data?.base_url + items?.image?.path
                                : "../static/img/picture-1.jpg"
                            }
                            alt="realestate_image"
                            className="realEstateImage w-100"
                          />
                        </div>
                        <div
                          className="mt-3 d-flex align-items-center justify-content-between"
                          onClick={() => handleShowDetailModal(items?.id)}
                        >
                          <p>
                            {items?.youtube_link ? (
                              <span class="VarColor font-weight-bold mr-1">
                                1 Video
                              </span>
                            ) : (
                              ""
                            )}
                            {items?.youtube_link && items?.gallery?.length ? (
                              <span class="VarColor font-weight-bold mr-1">
                                and
                              </span>
                            ) : (
                              ""
                            )}
                            {items?.gallery?.length ? (
                              <span class="VarColor font-weight-bold text-decoration-underline">
                                More Images
                              </span>
                            ) : (
                              ""
                            )}
                          </p>
                          <p className="mobile-real-estate-price">
                            {items.is_label !== 0 ? (
                              <span className="font-weight-bold VarColor">
                                {items?.label}
                              </span>
                            ) : (
                              <span className="font-weight-bold VarColor">
                                {MainData?.company_setting?.currency?.currency}{" "}
                                {new Intl.NumberFormat().format(items?.price)}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-8 col-sm-12">
                        <div className="mt-2 cursor-pointer">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6
                              className="mb-0 color-black cursor-pointer real-estate-heading"
                              onClick={() => handleShowDetailModal(items?.id)}
                            >
                              {items?.heading}
                            </h6>
                            <p>
                              <span className="real-estate-badge">
                                {items?.property_type?.name}
                              </span>
                            </p>
                          </div>
                          <p
                            className="color-black cursor-pointer mt-2"
                            onClick={() => handleShowDetailModal(items?.id)}
                          >
                            {items?.street_address}, {items?.city},{" "}
                            {items?.state}, {items?.country}, ({items?.zipcode})
                          </p>
                        </div>
                        <div
                          className="mt-2 d-flex flex-wrap align-items-center justify-content-between"
                          style={{ gap: "10px" }}
                        >
                          {items.is_label !== 0 ? (
                            <span className="font-weight-bold VarColor web-real-estate-price">
                              {items?.label}
                            </span>
                          ) : (
                            <p className="font-weight-bold VarColor web-real-estate-price">
                              {MainData?.company_setting?.currency?.currency}{" "}
                              {new Intl.NumberFormat().format(items?.price)}
                            </p>
                          )}
                        </div>
                        <div className="d-flex align-items-center flex-wrap mt-2 amenities-main-section">
                          {items?.amenities &&
                            items?.amenities?.map((amenities, key) => {
                              return key < 4 ? (
                                <div
                                  className="d-flex align-items-baseline amenities-div"
                                  key={key}
                                >
                                  <span
                                    style={{ fontSize: "16px" }}
                                    dangerouslySetInnerHTML={{
                                      __html: amenities.icon,
                                    }}
                                  ></span>
                                  <p className="pl-2 color-black">
                                    {amenities?.pivot?.description}
                                  </p>
                                </div>
                              ) : (
                                ""
                              );
                            })}
                          {/* <div className="d-flex align-items-baseline amenities-div">
                            <span style={{ fontSize: "16px" }}>
                              <svg
                                id="a"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="8mm"
                                height="8.005mm"
                                viewBox="0 0 22.677 22.691"
                              >
                                <rect
                                  x="2.24"
                                  y="2.094"
                                  width="18.197"
                                  height="18.504"
                                  fill="none"
                                  stroke="#1f1d1e"
                                  stroke-miterlimit="10"
                                  stroke-width=".6"
                                ></rect>
                                <g>
                                  <line
                                    x1="5.59"
                                    y1="5.444"
                                    x2="17.151"
                                    y2="17.005"
                                    fill="none"
                                    stroke="#1f1d1e"
                                    stroke-miterlimit="10"
                                    stroke-width=".6"
                                  ></line>
                                  <polygon
                                    points="5.26 8.585 5.86 8.564 5.752 5.607 8.709 5.715 8.73 5.115 5.129 4.984 5.26 8.585"
                                    fill="#1f1d1e"
                                    stroke-width="0"
                                  ></polygon>
                                  <polygon
                                    points="14.01 17.335 14.031 16.734 16.987 16.843 16.879 13.886 17.48 13.865 17.61 17.466 14.01 17.335"
                                    fill="#1f1d1e"
                                    stroke-width="0"
                                  ></polygon>
                                </g>
                              </svg>
                            </span>
                            <p className="pl-2 color-black">
                              {items?.area}
                            </p>
                          </div> */}
                        </div>
                        <div
                          className="mt-3 d-flex flex-wrap align-items-center justify-content-between"
                          style={{ gap: "10px" }}
                        >
                          <div
                            className="d-flex flex-wrap"
                            style={{ gap: "10px" }}
                          >
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
                              onClick={() =>
                                handleShowEnquiry(items?.id, items?.heading)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="user-select-auto"
                              />
                            </span>
                            {items?.google_address_link !== null ? (
                              <a
                                href={items?.google_address_link}
                                target="_blank"
                                className="whatsap-link-view d-flex align-items-center justify-content-center"
                              >
                                <FontAwesomeIcon
                                  icon={faLocationDot}
                                  className="user-select-auto"
                                />
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="user-select-auto mr-2 viewmore-btn-product cursor-pointer"
                            onClick={() => handleShowDetailModal(items?.id)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="mx-2 color-black">No property found</p>
              )}
            </div>
            {PaginationData?.total_realestate ==
              Data?.card_realestates?.length && LoadMore !== null ? (
              <div className="mx-auto text-center">
                <span
                  className="text-center cursor-pointer mx-auto video-load-more fs-16"
                  onClick={() => incrementCount()}
                >
                  Load More
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
}
