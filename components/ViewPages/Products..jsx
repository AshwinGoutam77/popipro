/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowDownAZ,
  faArrowDownShortWide,
  faArrowRight,
  faArrowUp,
  faArrowUpRightDots,
  faArrowUpWideShort,
  faArrowUpZA,
  faBagShopping,
  faChevronLeft,
  faChevronRight,
  faCircleXmark,
  faEnvelope,
  faLink,
  faRightFromBracket,
  faSearch,
  faSort,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { useContext, useEffect, useState } from "react";
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
import localforage from "localforage";
import ReactPlayer from "react-player";
import LoadingText from "./LoadingText";
import { AuthContext } from "@context/AuthContext";
import Cart from "@components/Dashboard/Cart";

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
  const [HighlightSort, setHighlightSort] = useState("latest");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductSearching, setProductSearching] = useState("");
  const [Loader, setLoader] = useState(false);
  const [cart, setCart] = useState([]);
  const [CartModal, setCartModal] = useState(false);

  useEffect(() => {
    setProducts(Data?.card_products);
    setCategory(Data?.product_categories);
    localStorage?.setItem("cardId", MainData?.card?.id);
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
  }, [ProductCategory, HighlightSort]);

  const LoadMoreFunction = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_MODE == "development"
        ? `https://dev.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_products&current_page=${
            Page && Page
          }${
            ProductCategory ? "&product_categories[0]=" + ProductCategory : ""
          }${HighlightSort ? "&sortBy=" + HighlightSort : ""}${
            ProductSearching ? "&product_search=" + ProductSearching : ""
          }`
        : `https://admin.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_products&current_page=${
            Page && Page
          }${
            ProductCategory ? "&product_categories[0]=" + ProductCategory : ""
          }${HighlightSort ? "&sortBy=" + HighlightSort : ""}${
            ProductSearching ? "&product_search=" + ProductSearching : ""
          }`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setLoadMore(data?.data?.next_page_data?.next_page_url);
      data?.data?.categories?.map((item, key) => {
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
    } else if (Contact == "") {
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
        product: MessageId,
        name: Name,
        contact: Contact,
        email: Email,
        message: Message,
        card_url: card_url,
        latitude: await localforage.getItem("latitude"),
        longitude: await localforage.getItem("longitude"),
        fb_token: await localforage.getItem("fcm_token"),
      };
      const response = await Api(ProductEnquiry, data);
      if (response.data.status) {
        // APIDATA();
        // setShowLoader(false);
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
  const handleHitClick = async () => {
    let payload = {
      card: Data?.id,
      type: "product",
      device_id: navigator.userAgent,
      object_base: Data?.id,
      hit_type: "visit-site",
      latitude: await localforage.getItem("latitude"),
      longitude: await localforage.getItem("longitude"),
      fb_token: await localforage.getItem("fcm_token"),
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
      latitude: await localforage.getItem("latitude"),
      longitude: await localforage.getItem("longitude"),
      fb_token: await localforage.getItem("fcm_token"),
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
        data?.data?.categories?.map((item, key) => {
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
    setProducts(Data?.card_products);
    setProductCategory("");
    setHighlightSort("");
    setProductSearching("");
    setPage(1);
    setActiveFilter("");
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

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 15) {
      setContact(value);
    }
  };

  // Data?.card_products.map((item) => {
  //   console.log(item.some((product) => product.price === ""));
  // });

  const { cartItems, addItemToCart } = useContext(AuthContext);

  const handleAddToCart = (item) => {
    addItemToCart(item);
  };

  let TotalId = [];
  let TotalCard_id = [];
  cartItems?.forEach((item) => {
    TotalId.push(item?.id);
    TotalCard_id.push(item?.card_id);
  });

  const cartValue = TotalCard_id?.includes(MainData?.card?.id);

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
                          className="mySwiper pb-0 cursor-pointer"
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          modules={[Pagination, Navigation]}
                        >
                          {item?.youtube_link !== null ? (
                            <SwiperSlide>
                              <div className="swiper-slide review-items position-relative mb-1 ">
                                <div className="vedio-height">
                                  <div className="product-video-player-container">
                                    <ReactPlayer
                                      url={item?.youtube_link}
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
                            <div className="swiper-slide review-items position-relative mb-1">
                              <picture>
                                <source
                                  type="image/png"
                                  srcSet={
                                    item?.image?.path
                                      ? Data?.base_url + item?.image?.path
                                      : "../static/img/picture-1.jpg"
                                  }
                                />
                                <img
                                  src={
                                    item?.image?.path
                                      ? Data?.base_url + item?.image?.path
                                      : "../static/img/picture-1.jpg"
                                  }
                                  alt="product-gallery-images"
                                  className="coverr-modal lazyload mb-2"
                                />
                              </picture>
                            </div>
                          </SwiperSlide>
                          {item?.gallery?.map((o, i) => {
                            return (
                              <SwiperSlide key={i}>
                                <div className="swiper-slide review-items position-relative">
                                  <picture>
                                    <source
                                      type="image/png"
                                      srcSet={Data?.base_url + o?.path}
                                    />
                                    <img
                                      src={Data?.base_url + o?.path}
                                      alt="product-gallery-images"
                                      className="coverr-modal lazyload mb-1"
                                    />
                                  </picture>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </SwiperComponent>
                      ) : item?.image?.path ? (
                        <picture>
                          <source
                            type="image/png"
                            srcSet={Data?.base_url + item?.image?.path}
                          />
                          <img
                            className="coverr-modal lazyload"
                            src={Data?.base_url + item?.image?.path}
                            alt="product"
                          />
                        </picture>
                      ) : (
                        <picture>
                          <source
                            type="image/png"
                            srcSet="../static/img/picture-1.jpg"
                          />
                          <img
                            className="coverr lazyload w-100 h-190"
                            src="../static/img/picture-1.jpg"
                            alt="product"
                          />
                        </picture>
                      )}
                      <div className="d-flex align-items-center justify-content-end">
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
                        style={{ gap: "5px" }}
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
                            className="contact-btn w-auto mt-0 bgVarColor"
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
                            className="contact-btn w-auto d-block cursor-pointer mt-0"
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
                              Data?.whatsapp_country_code?.replace(
                                /\+/g,
                                "%2B"
                              ) +
                              Data.whatsapp_number +
                              "&" +
                              `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${item.name}?`
                            }
                            target="_blank"
                            className="contact-btn w-auto d-block mt-0"
                            onClick={() => HitClick(item?.id)}
                          >
                            <img
                              src="./static/img/whatsapp.png"
                              alt="whatsaap"
                              className="w-23px margin-b-1"
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
                  className="contact-btn mt-0 w-auto"
                  onClick={() => handleProductSubmit()}
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

      <Cart
        active={CartModal == "CartModal" ? true : false}
        handleClose={setCartModal}
        MainData={MainData}
        product={Products}
        card_url={card_url}
        cartId={MainData?.card?.id}
        TotalCard_id={TotalCard_id}
      />

      {Titles &&
      Titles?.card_products?.is_active &&
      PlanData?.is_expired == false &&
      PlanData?.PlanData?.plan_id !== 1 &&
      PlanData?.PlanData !== null ? (
        Data?.card_products?.length !== 0 &&
        Titles?.card_products?.is_active !== 0 ? (
          <div className="box-content boxxx" id="card_products">
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
                    Titles.card_products?.visible_name === "card_products"
                      ? "card_products"
                      : Titles?.card_products?.visible_name}
                  </h3>
                  <div className="d-flex align-items-start gap-20">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="color-black cursor-pointer fs-18 mt-1"
                      onClick={() => handleShowSearchFilter()}
                    />
                    {cartItems?.length !== 0 && cartValue ? (
                      <div className="position-relative">
                        <FontAwesomeIcon
                          icon={faBagShopping}
                          className="color-black cursor-pointer fs-18 mt-1"
                          onClick={() => setCartModal("CartModal")}
                        />
                      </div>
                    ) : (
                      ""
                    )}
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
                          className="color-black cursor-pointer search-icon-products fs-18"
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
                        className="sorting-dropdown"
                      >
                        {" "}
                        <img
                          src="../static/img/down-arrow.svg"
                          alt="image"
                          width={18}
                          className="cursor-pointer"
                        />
                      </Dropdown.Toggle>
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
              {Category?.length !== 0 ? (
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
                          <div className="swiper-slide review-items position-relative">
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
                          <div className="col-6 col-sm-6 col-lg-4 pr-0">
                            <div className="position-relative">
                              {items?.image?.path ? (
                                <picture>
                                  <source
                                    type="image/png"
                                    srcSet={
                                      process.env.NEXT_PUBLIC_MODE ==
                                      "development"
                                        ? "https://dev.popipro.com/" +
                                          items.image.path
                                        : "https://admin.popipro.com/" +
                                          items.image.path
                                    }
                                  />
                                  <img
                                    className="case-item__icon-products cursor-pointer"
                                    src={
                                      process.env.NEXT_PUBLIC_MODE ==
                                      "development"
                                        ? "https://dev.popipro.com/" +
                                          items.image.path
                                        : "https://admin.popipro.com/" +
                                          items.image.path
                                    }
                                    alt="products"
                                    width={0}
                                    height={0}
                                    onClick={() =>
                                      ShowModalID(items.id, items?.name)
                                    }
                                  />
                                </picture>
                              ) : (
                                <picture>
                                  <source
                                    type="image/png"
                                    srcSet="./static/img/picture-1.jpg"
                                  />
                                  <img
                                    className="case-item__icon-products cursor-pointer"
                                    src="./static/img/picture-1.jpg"
                                    alt="products"
                                    width={0}
                                    height={0}
                                    onClick={() =>
                                      ShowModalID(items.id, items?.name)
                                    }
                                  />
                                </picture>
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
                                        Data?.whatsapp_country_code?.replace(
                                          /\+/g,
                                          "%2B"
                                        ) +
                                        Data.whatsapp_number +
                                        "&" +
                                        `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items.name}?`
                                      }
                                      target="_blank"
                                      className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                      onClick={() => HitClick(items?.id)}
                                    >
                                      <picture>
                                        <source
                                          type="image/png"
                                          srcSet="./static/img/whatsapp.png"
                                        />
                                        <img
                                          src="./static/img/whatsapp.png"
                                          alt="whatsaap"
                                          className="Whatsaapsvg"
                                        />
                                      </picture>
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
                            <div className="mt-3 text-left">
                              {items?.gallery?.length ? (
                                <span
                                  class="VarColor font-weight-bold text-decoration-underline cursor-pointer"
                                  onClick={() =>
                                    ShowModalID(items.id, items?.name)
                                  }
                                >
                                  More Images
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div
                            className={
                              items?.description?.length <= "0"
                                ? "col-6 col-sm-6 col-lg-8 d-flex align-items-start justify-content-center flex-column text-left"
                                : "col-6 col-sm-6 col-lg-8 text-left"
                            }
                          >
                            <p
                              className={
                                items?.description?.length <= "0"
                                  ? "title title--h5 font-weight-bolder product-heading2 m-0 cursor-pointer fs-14 color-black"
                                  : "title title--h5 font-weight-bolder product-heading m-0 cursor-pointer fs-14 color-black"
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
                            <div
                              className="text-align-end mt-2 d-flex align-items-center justify-content-between text-left flex-wrap"
                              style={{ gap: "10px" }}
                            >
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
                                <div className="d-flex align-items-center justify-content-left weight-small-100 gap-10">
                                  {Data?.whatsapp_number !== null &&
                                  MainData?.company_setting
                                    ?.show_product_wp_button !== 0 ? (
                                    <a
                                      href={
                                        "https://api.whatsapp.com/send?phone=" +
                                        Data?.whatsapp_country_code?.replace(
                                          /\+/g,
                                          "%2B"
                                        ) +
                                        Data.whatsapp_number +
                                        +"&" +
                                        `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items.name}?`
                                      }
                                      target="_blank"
                                      className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                      onClick={() => HitClick(items?.id)}
                                    >
                                      {/* <i className="fa-brands  fa-whatsapp Whatsaapsvg"></i> */}
                                      <picture>
                                        <source
                                          type="image/png"
                                          srcSet="./static/img/whatsapp.png"
                                        />
                                        <img
                                          src="./static/img/whatsapp.png"
                                          alt="whatsaap"
                                          className="Whatsaapsvg"
                                        />
                                      </picture>
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
                                  onClick={() =>
                                    ShowModalID(items.id, items?.name)
                                  }
                                  className="m-0 mr-2 fs-15 cursor-pointer margin-r-10"
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="user-select-auto mr-2 viewmore-btn-product"
                                  />
                                </p>
                              )}
                            </div>
                            {items?.price && (
                              <div>
                                {!TotalId.includes(items?.id) ? (
                                  <p
                                    className="VarColor mt-2 font-weight-bold cursor-pointer"
                                    onClick={() =>
                                      handleAddToCart({
                                        image:
                                          process.env.NEXT_PUBLIC_MODE ==
                                          "development"
                                            ? "https://dev.popipro.com/" +
                                              items.image.path
                                            : "https://admin.popipro.com/" +
                                              items.image.path,
                                        name: items?.name,
                                        price: items?.price,
                                        currency: items.pcurrency?.currency,
                                        id: items?.id,
                                        card_id: MainData?.card?.id,
                                        quantity: 1,
                                      })
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faBagShopping}
                                      className="mr-1"
                                    />{" "}
                                    Add to cart
                                  </p>
                                ) : (
                                  <p className="VarColor mt-2 font-weight-bold cursor-pointer">
                                    <FontAwesomeIcon
                                      icon={faBagShopping}
                                      className="mr-1"
                                    />{" "}
                                    Product added to cart
                                  </p>
                                )}
                              </div>
                            )}
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
