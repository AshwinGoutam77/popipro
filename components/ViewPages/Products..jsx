/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowRight,
  faArrowUpWideShort,
  faChevronLeft,
  faChevronRight,
  faCircleXmark,
  faEnvelope,
  faLink,
  faSearch,
  faSort,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { HitClickApi, ProductEnquiry } from "@services/Routes";
import Api from "@services/Api";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SimpleBackdrop from "./SimpleBackDrop";

export default function Product({
  Titles,
  Data,
  card,
  PaginationData,
  PlanData,
  MainData,
  card_url,
}) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [ModalId, setModalId] = useState("");
  const [Page, setPage] = useState(1);
  const [Products, setProducts] = useState("");
  const [showProduct, setShowProduct] = useState(false);
  const handleShowProduct = () => setShowProduct(true);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");
  const [MessageId, setMessageId] = useState("");
  const [Search, setSearch] = useState(false);
  const [Latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [ProductModalTitle, setProductModalTitle] = useState("");
  const [Category, setCategory] = useState("");
  const [LoadMore, setLoadMore] = useState("");
  const [ActiveFilter, setActiveFilter] = useState("");
  const [HighlightSort, setHighlightSort] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductSearching, setProductSearching] = useState("");

  useEffect(() => {
    setProducts(Data?.card_products);
    setCategory(Data?.product_categories);
  }, []);

  const handleCloseProduct = () => {
    setName("");
    setContact("");
    setMessage("");
    setEmail("");
    setShowProduct(false);
  };

  const ShowModalID = (id, name) => {
    setProductModalTitle(name);
    setModalId(id);
    handleShow();
    HitClick(id);
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
  }, [ProductCategory, HighlightSort, ProductSearching]);

  const LoadMoreFunction = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_MODE == "development"
        ? `https://dev.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_products&current_page=${
            Page && Page
          }${
            ProductCategory ? "&product_categories[0]=" + ProductCategory : ""
          }&sortBy=${
            HighlightSort && HighlightSort
          }&product_search=${ProductSearching}`
        : `https://admin.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_products&current_page=${Page} `,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setLoadMore(data?.data?.next_page_data?.next_page_url);
      data?.data?.categories?.map((item) => {
        setActiveFilter(item?.name);
      });
      setHighlightSort(data?.data?.request.sortBy);
      Page > 1
        ? ProductCategory
          ? setProducts(() => data?.data?.next_page_data?.data)
          : setProducts((prevData) => [
              ...prevData,
              ...data?.data?.next_page_data?.data,
            ])
        : setProducts(() => data?.data?.next_page_data?.data);
    }
  };

  const handleProductSubmit = async (id) => {
    if (Name == "") {
      toast.error("Name is requried", {
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
    } else if (Contact == "") {
      toast.error("Mobile/Phone number is requried", {
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
    setShowLoader(true);
    try {
      let data = {
        product: MessageId,
        name: Name,
        contact: Contact,
        email: Email,
        message: Message,
        card_url: card_url,
        latitude: Latitude,
        longitude: Longitude,
      };
      const response = await Api(ProductEnquiry, data);
      if (response.data.status) {
        // APIDATA();
        setShowLoader(false);
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
  const handleHitClick = async () => {
    let payload = {
      card: Data?.id,
      type: "product",
      device_id: navigator.userAgent,
      object_base: Data?.id,
      hit_type: "visit-site",
      latitude: Latitude,
      longitude: Longitude,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  const HitClick = async (id) => {
    setMessageId(id);
    let payload = {
      card: Data?.id,
      type: "product",
      device_id: navigator.userAgent,
      object_base: id,
      hit_type: "view-more",
      latitude: Latitude,
      longitude: Longitude,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  const handleShowModal = (id, name) => {
    setProductModalTitle(name);
    HitClick(id);
    handleShowProduct();
  };
  if (typeof window !== "undefined") {
    const slider = document.querySelector("[data-slider]");
    const track = slider?.querySelector("[data-slider-track]");
    const prev = slider?.querySelector("[data-slider-prev]");
    const next = slider?.querySelector("[data-slider-next]");

    if (track) {
      prev.addEventListener("click", () => {
        next.removeAttribute("disabled");

        track.scrollTo({
          left: track.scrollLeft - track.firstElementChild.offsetWidth,
          behavior: "smooth",
        });
      });

      next.addEventListener("click", () => {
        prev.removeAttribute("disabled");

        track.scrollTo({
          left: track.scrollLeft + track.firstElementChild.offsetWidth,
          behavior: "smooth",
        });
      });

      track.addEventListener("scroll", () => {
        const trackScrollWidth = track.scrollWidth;
        const trackOuterWidth = track.clientWidth;

        prev.removeAttribute("disabled");
        next.removeAttribute("disabled");

        if (track.scrollLeft <= 0) {
          prev.setAttribute("disabled", "");
        }

        if (track.scrollLeft === trackScrollWidth - trackOuterWidth) {
          next.setAttribute("disabled", "");
        }
      });
    }
  }
  const handleSearch = async (e) => {
    setTimeout(async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_MODE == "development"
          ? `https://dev.popipro.com/api/get-more-items?card_url=${card_url}&type=card_products&current_page=1&product_search=${e}`
          : `https://admin.popipro.com/api/get-more-items?card_url=${card_url}&type=card_products&current_page=1&product_search=${e}`,
        {
          method: "GET",
          cache: "no-cache",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProducts(() => data?.data?.next_page_data?.data);
        setPage(1);
        setLoadMore(data?.data?.next_page_data?.next_page_url);
        data?.data?.categories?.map((item) => {
          setActiveFilter(item?.name);
        });
      }
    }, 1000);
  };
  const handleAllowNotif = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  function showPosition(position) {
    localStorage.setItem("latitude", position.coords.latitude);
    localStorage.setItem("longitude", position.coords.longitude);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(() => {
    handleAllowNotif();
  }, []);

  const handleShowSearchFilter = () => {
    setSearch(true);
    if (Search) {
      setSearch(false);
    }
  };

  const handleResetFilter = () => {
    setProducts(Data?.card_products);
    setActiveFilter("");
    setSearch(false);
  };

  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              {ProductModalTitle}
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {Products &&
            Products?.map((item, index) => {
              return (
                <div key={index}>
                  {ModalId == item.id ? (
                    <div>
                      {item?.gallery?.length ? (
                        <SwiperComponent
                          slidesPerView={1}
                          spaceBetween={10}
                          style={{ cursor: "pointer" }}
                          className="mySwiper pb-0"
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          modules={[Pagination, Navigation]}
                        >
                          {item?.gallery?.map((o, i) => {
                            return (
                              <SwiperSlide key={i}>
                                <div className="swiper-slide review-items position-relative">
                                  <img
                                    src={Data?.base_url + o?.path}
                                    alt="product-gallery-images"
                                    className="coverr-modal lazyload mb-2"
                                  />
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </SwiperComponent>
                      ) : item?.image?.path ? (
                        <img
                          className="coverr-modal lazyload"
                          src={Data?.base_url + item?.image?.path}
                          alt="product"
                        />
                      ) : (
                        <img
                          className="coverr lazyload"
                          src="../static/img/picture-1.jpg"
                          style={{ width: "100%", height: "190px" }}
                          alt="product"
                        />
                      )}
                      <div className="d-flex align-items-center justify-content-end">
                        {/* <span
                          className="mt-3 mb-0 font-weight-bold"
                          style={{ color: "black", fontSize: "14px" }}
                        >
                          {item.name}
                        </span> */}
                        {item.is_label !== 0 ? (
                          <span className="product-price">{item.label}</span>
                        ) : item.price !== 0 &&
                          item.price !== "" &&
                          item.currency !== null ? (
                          <span className="product-price text-right">
                            {item.pcurrency?.currency} {item.price}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <p
                        id="p_wrap"
                        className="review-item__caption text-left mt-3"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></p>
                      <div
                        className="d-flex align-items-center justify-content-center mt-3 flex-wrap"
                        style={{ gap: "10px" }}
                      >
                        {item.url !== "" ? (
                          <a
                            href={
                              item?.url?.includes("http://") ||
                              item?.url?.includes("https://")
                                ? item?.url
                                : "https://" + item?.url
                            }
                            target="_blank"
                            className="mt-1 contact-btn w-auto"
                            style={{ background: "var(--color)" }}
                            onClick={() => handleHitClick()}
                          >
                            <FontAwesomeIcon
                              icon={faLink}
                              className="user-select-auto mr-2"
                            />
                            {Data?.id == "TrxF"
                              ? "Watch Video"
                              : item.button_placeholder
                              ? item.button_placeholder
                              : "Visit Site"}
                          </a>
                        ) : (
                          ""
                        )}
                        {MainData?.company_setting
                          ?.show_product_enquiry_button !== 0 ? (
                          <span
                            className="mt-1 contact-btn w-auto d-block cursor-pointer"
                            onClick={() =>
                              handleShowModal(item?.id, item?.name)
                            }
                            data-toggle="modal"
                            data-target="#ProductEnquireModal"
                          >
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="user-select-auto mr-2"
                            />
                            Enquiry Now
                          </span>
                        ) : (
                          ""
                        )}
                        {MainData?.company_setting?.show_product_wp_button !==
                        0 ? (
                          <a
                            href={
                              "https://api.whatsapp.com/send?phone=" +
                              Data?.card_contact +
                              "&" +
                              `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${item.name}?`
                            }
                            target="_blank"
                            className="mt-1 contact-btn w-auto d-block"
                            onClick={() => HitClick(item?.id)}
                          >
                            <img
                              src="./static/img/whatsapp.png"
                              alt="whatsaap"
                              style={{
                                width: "23px",
                                marginBottom: "1px",
                              }}
                            />
                            Quick Connect
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
        </Modal.Body>
      </Modal>

      {/* Enquiry Modal */}
      <Modal show={showProduct} onHide={handleCloseProduct} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Enquiry For {ProductModalTitle}
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={handleCloseProduct}>
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
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
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
              <button
                type="submit"
                className="contact-btn mt-0 w-auto"
                style={{ padding: "10px 60px" }}
                onClick={() => handleProductSubmit()}
              >
                Send
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {Titles?.card_products?.is_active === 1 &&
      // Products?.length !== 0 &&
      PlanData?.is_expired == false &&
      PlanData?.subscription?.plan_id !== 1 &&
      PlanData?.subscription !== null ? (
        <div className="box-content boxxx mb-3" id="card_products">
          <div className="mt-0 product-section-div">
            {Search ? (
              <div className="d-flex align-items-baseline position-relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control mb-4"
                  onChange={(e) => setProductSearching(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ fontSize: "18px" }}
                  className="color-black cursor-pointer search-icon-products"
                  onClick={() => handleResetFilter()}
                />
              </div>
            ) : (
              <div className="d-flex align-items-start justify-content-between">
                <h3 className="title title--h1 first-title title__separate">
                  {Titles &&
                  Titles.card_products?.visible_name === "card_products"
                    ? "card_products"
                    : Titles?.card_products?.visible_name}
                </h3>
                <div className="d-flex" style={{ gap: "20px" }}>
                  {process.env.NEXT_PUBLIC_MODE === "development" ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ fontSize: "18px" }}
                        className="color-black cursor-pointer"
                        onClick={() => handleShowSearchFilter()}
                      />
                      {Search ? (
                        <div className="d-flex align-items-baseline position-relative">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="form-control mb-4"
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                          <FontAwesomeIcon
                            icon={faXmark}
                            style={{ fontSize: "18px" }}
                            className="color-black cursor-pointer search-icon-products"
                            onClick={() => handleShowSearchFilter()}
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
                          <Dropdown.Item
                            href=""
                            onClick={() => setHighlightSort("name")}
                            className={
                              HighlightSort == "name"
                                ? "dropdown-item-active"
                                : "dropdown-item"
                            }
                          >
                            Sort By Name
                          </Dropdown.Item>
                          <Dropdown.Item
                            href=""
                            onClick={() => setHighlightSort("price")}
                            className={
                              HighlightSort == "price"
                                ? "dropdown-item-active"
                                : "dropdown-item"
                            }
                          >
                            Sort By Price
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
                            Sort By Popularity
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
            {process.env.NEXT_PUBLIC_MODE === "development" &&
            Category?.length !== 0 ? (
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
                  <div className="swiper-slide review-items position-relative">
                    <button
                      className={
                        ActiveFilter == ""
                          ? "filter-btns bg-varcolor"
                          : "filter-btns"
                      }
                      onClick={() => handleResetFilter()}
                    >
                      All
                    </button>
                  </div>
                </SwiperSlide>
                {Category &&
                  Category?.map((items, index) => {
                    return (
                      <SwiperSlide className="w-auto" key={index}>
                        <div
                          className="swiper-slide review-items position-relative"
                          // onClick={() => setProductCategory(items?.id)}
                        >
                          <button
                            className={
                              ActiveFilter == items?.name
                                ? "filter-btns bg-varcolor"
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
            ) : (
              ""
            )}

            {Products?.length !== 0 ? (
              Products &&
              Products?.map((items, index, { length }) => {
                return (
                  <div key={index}>
                    <div
                      className={
                        index + 1 === length
                          ? "swiper-slide review-item review-item-products"
                          : "swiper-slide review-item review-item-products review-item-products-border"
                      }
                    >
                      <div className="row d-flex justify-content-between pt-3 product-bottom-padding w-100">
                        <div className="col-6 col-sm-6 col-lg-4">
                          <div className="position-relative">
                            {items?.image?.path ? (
                              <Image
                                className="case-item__icon-products"
                                src={
                                  process.env.NEXT_PUBLIC_MODE == "development"
                                    ? "https://dev.popipro.com/" +
                                      items.image.path
                                    : "https://admin.popipro.com/" +
                                      items.image.path
                                }
                                alt="products"
                                width={0}
                                height={0}
                              />
                            ) : (
                              <Image
                                className="case-item__icon-products"
                                src="./static/img/picture-1.jpg"
                                alt="products"
                                width={0}
                                height={0}
                              />
                            )}
                            {items?.description?.length <= "0" ? (
                              ""
                            ) : (
                              <div className="product-icons-div">
                                {Data?.whatsapp_number !== null &&
                                MainData?.company_setting
                                  ?.show_product_wp_button !== 0 ? (
                                  <a
                                    href={
                                      "https://api.whatsapp.com/send?phone=" +
                                      Data?.whatsapp_number +
                                      "&" +
                                      `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items.name}?`
                                    }
                                    target="_blank"
                                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    {/* <i className="fa-brands  fa-whatsapp Whatsaapsvg"></i> */}
                                    <img
                                      src="./static/img/whatsapp.png"
                                      alt="whatsaap"
                                      className="Whatsaapsvg"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {MainData?.company_setting
                                  ?.show_product_enquiry_button !== 0 ? (
                                  <span
                                    data-toggle="modal"
                                    data-target="#ProductEnquireModal"
                                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center cursor-pointer"
                                    onClick={() =>
                                      handleShowModal(items?.id, items?.name)
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faEnvelope}
                                      className="user-select-auto"
                                    />
                                  </span>
                                ) : (
                                  ""
                                )}
                                {items.url !== "" ? (
                                  <a
                                    href={
                                      items?.url?.includes("https://") ||
                                      items?.url?.includes("http://")
                                        ? items?.url
                                        : "https://" + items?.url
                                    }
                                    target="_blank"
                                    className="whatsap-link-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faLink}
                                      className="user-select-auto"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className={
                            items?.description?.length <= "0"
                              ? "col-6 col-sm-6 col-lg-8 d-flex align-items-start justify-content-center flex-column"
                              : "col-6 col-sm-6 col-lg-8"
                          }
                          style={{ textAlign: "initial" }}
                        >
                          <p
                            style={{ fontSize: "14px", color: "black" }}
                            className={
                              items?.description?.length <= "0"
                                ? "title title--h5 font-weight-bolder product-heading2 m-0 cursor-pointer"
                                : "title title--h5 font-weight-bolder product-heading m-0 cursor-pointer"
                            }
                            onClick={() => ShowModalID(items.id, items?.name)}
                          >
                            {items.name}
                          </p>
                          <p
                            id="p_wrap"
                            className="review-item__caption text-left products-review m-0 mt-1 cursor-pointer"
                            dangerouslySetInnerHTML={{
                              __html: items.description,
                            }}
                            onClick={() => ShowModalID(items.id, items?.name)}
                          ></p>
                          <div className="text-align-end mt-2 d-flex align-items-center justify-content-between text-left">
                            {items.is_label !== 0 ? (
                              <span className="product-price">
                                {items.label}
                              </span>
                            ) : (
                              <div>
                                {items.price !== 0 &&
                                items.price !== "" &&
                                items.currency !== null ? (
                                  <span className="product-price">
                                    {items.pcurrency?.currency} {items.price}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                            {items?.description?.length <= "0" ? (
                              <div
                                className="d-flex align-items-center justify-content-left weight-small-100"
                                style={{ gap: "10px" }}
                              >
                                {Data?.whatsapp_number !== null &&
                                MainData?.company_setting
                                  ?.show_product_wp_button !== 0 ? (
                                  <a
                                    href={
                                      "https://api.whatsapp.com/send?phone=" +
                                      Data?.whatsapp_number +
                                      "&" +
                                      `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items.name}?`
                                    }
                                    target="_blank"
                                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    {/* <i className="fa-brands  fa-whatsapp Whatsaapsvg"></i> */}
                                    <img
                                      src="./static/img/whatsapp.png"
                                      alt="whatsaap"
                                      className="Whatsaapsvg"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {MainData?.company_setting
                                  ?.show_product_enquiry_button !== 0 ? (
                                  <span
                                    data-toggle="modal"
                                    data-target="#ProductEnquireModal"
                                    className="whatsap-enquiry-view d-flex align-items-center justify-content-center cursor-pointer"
                                    onClick={() =>
                                      handleShowModal(items?.id, items?.name)
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faEnvelope}
                                      className="user-select-auto"
                                    />
                                  </span>
                                ) : (
                                  ""
                                )}
                                {items.url !== "" ? (
                                  <a
                                    href={
                                      items?.url?.includes("https://") ||
                                      items?.url?.includes("http://")
                                        ? items?.url
                                        : "https://" + items?.url
                                    }
                                    target="_blank"
                                    className="whatsap-link-view d-flex align-items-center justify-content-center"
                                    onClick={() => HitClick(items?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faLink}
                                      className="user-select-auto"
                                    />
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              <p
                                style={{
                                  fontSize: "15px",
                                  marginRight: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  ShowModalID(items.id, items?.name)
                                }
                                className="m-0 mr-2"
                              >
                                <FontAwesomeIcon
                                  icon={faArrowRight}
                                  className="user-select-auto mr-2 viewmore-btn-product"
                                />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 mb-2" />
                  </div>
                );
              })
            ) : (
              <p className="mx-2 color-black">No Data Found</p>
            )}

            {PaginationData?.total_product !== Products?.length &&
            LoadMore !== null ? (
              <div className="mx-auto text-center">
                <span
                  className="text-center cursor-pointer mx-auto"
                  style={{
                    textDecoration: "underline",
                    fontSize: "16px",
                    color: "var(--color)",
                  }}
                  onClick={() => incrementCount()}
                >
                  Load More
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
