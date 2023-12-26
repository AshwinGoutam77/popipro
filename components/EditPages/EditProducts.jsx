/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleInfo,
  faEnvelope,
  faFloppyDisk,
  faInfo,
  faLink,
  faLock,
  faPencil,
  faPlus,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "react-bootstrap/Modal";
import {
  CardData,
  LoadMoreApi,
  ProductEnquiryBtns,
  deleteSection,
} from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";
import ChatbotApp from "./Chat";
import axios from "axios";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";

export default function EditProducts({
  APIDATA,
  setData,
  card_url,
  TitleData,
  Data,
  Currency,
  card,
  PaginationData,
  MainData,
  PlanData,
  AddMoreProduct,
  setAddMoreProduct,
  token,
}) {
  const [Active, setActive] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [ModalId, setModalId] = useState("");
  const [ProductModalId, setProductModalId] = useState("");
  const [Image, setImage] = useState();
  const [ServicesName, setServicesName] = useState("");
  const [ProductUrl, setProductUrl] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [ProductLabel, setProductLabel] = useState("");
  const [ServicesDescription, setServicesDescription] = useState("");
  const [ProductPriceValue, setProductPriceValue] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [Page, setPage] = useState(2);
  const [LoadMoreData, setLoadMoreData] = useState("");
  const [PriceRadio, setPriceRadio] = useState(true);
  const [LabelRadio, setLabelRadio] = useState(false);
  const [AddLabel, setAddLabel] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [ProductTitle, setProductTitle] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [ShowProductModal, setShowProductModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleProductClose = () => setShowProductModal(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);
  const handleProductShow = () => setShowProductModal(true);
  const [showChatModal, setShowshowChatModal] = useState(false);
  const handleCloseshowChatModal = () => setShowshowChatModal(false);
  const handleShowshowChatModal = () => setShowshowChatModal(true);
  const [EditRadioBtn, setEditRadioBtn] = useState("");

  const ShowModalID = (id) => {
    handleProductShow();
    setModalId(id);
  };
  useEffect(() => {
    setProductTitle(TitleData?.card_products?.visible_name);
  }, []);
  useEffect(() => {
    setActive(TitleData?.card_products?.is_active == "1" ? true : false);
  }, [TitleData]);
  const aRef = useRef(null);

  const handleSaveBlogDetail = async (id = null) => {
    setShowLoader(true);
    let data = [];
    let error = false;
    let mess = "";
    if (ServicesName === "") {
      error = true;
      mess = ServicesName === "" ? "heading field is required" : "";
    } else {
      id !== null
        ? (data = [
            {
              products_image: Image,
              products_name: ServicesName,
              products_description: ServicesDescription,
              products_url: ProductUrl,
              products_price: ProductPrice,
              products_currency: ProductPriceValue,
              button_placeholder: AddLabel,
              is_label: EditRadioBtn ? 1 : 0,
              label: ProductLabel,
              saved_products: id,
            },
          ])
        : (data = [
            {
              products_image: Image,
              products_name: ServicesName,
              products_description: ServicesDescription,
              products_url: ProductUrl,
              products_price: ProductPrice,
              products_currency: ProductPriceValue,
              button_placeholder: AddLabel,
              is_label: PriceRadio ? 0 : 1,
              label: ProductLabel,
            },
          ]);
    }
    if (error) {
      setShowLoader(false);
      toast.error(mess, {
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

    try {
      const response = await Api(CardData, { products: data });
      if (response.data.status) {
        APIDATA();
        HandleEmptyFeilds();
        handleClose();
        handleEditClose();
        setPriceRadio(true);
        setPage(2);
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
        setServicesDescription("");
        setServicesName("");
        setProductUrl("");
        setProductPrice("");
        setProductLabel("");
        setAddLabel("");
        handleCanclebtn();
      }
    } catch (error) {
      console.log(error);
      if (error?.request?.status === "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
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
    setShowLoader(false);
    var elem = document.getElementById("card_products");
    elem.scrollIntoView();
  };

  const handleDelteBlogs = async (id, type, DataId) => {
    let data = {
      type: type,
      base: id,
      id: DataId,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(deleteSection, data);
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
          setPage(2);
        }
      }
    });
  };
  const handleActive = async () => {
    let titles = [
      {
        name: "card_products",
        visible_name: TitleData?.card_products?.visible_name,
        is_featured: Active ? "0" : "1",
        is_active: Active ? "0" : "1",
      },
    ];
    Swal.fire({
      title: "Are you sure?",
      text:
        Active == 1
          ? "You want to hide this section from your profile?"
          : "You want to show this section on your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(24 123 249)",
      cancelButtonColor: "#d33",
      confirmButtonText: Active == 1 ? "Yes hide it!" : "Yes show it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setShowLoader(true);
          const response = await Api(CardData, { titles });
          if (response.status) {
            setActive((prev) => !prev);
            setShowLoader(false);
            // APIDATA();
          }
        } catch (error) {
          if (error.request.status == "401") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          toast(error.response.data.message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  };
  const handleSetId = (
    id,
    name,
    description,
    price,
    url,
    currency,
    label,
    item_label
  ) => {
    handleEditShow();
    setProductModalId(id);
    setServicesName(name);
    setServicesDescription(description);
    setProductPrice(price);
    setProductLabel(label);
    setProductUrl(url);
    setProductPriceValue(currency);
    setAddLabel(label);
    setEditRadioBtn(item_label);
  };
  const HandleEmptyFeilds = () => {
    setImage("");
    setServicesName("");
    setServicesDescription("");
    setProductPrice("");
    setProductLabel("");
    setProductUrl("");
    setAddLabel("");
  };
  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
    HandleEmptyFeilds();
  };
  const handleChnageTitle = async () => {
    setShowLoader(true);
    let titles = [
      {
        name: "card_products",
        visible_name: ProductTitle,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
        APIDATA();
        // setData(response.data.data);
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditFields(false);
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
      toast.error(error.response.data.message, {
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
  };
  const handleLoadMore = async () => {
    LoadMoreFunction();
  };

  const LoadMoreFunction = async () => {
    setShowLoader(true);
    const response = await Api(
      LoadMoreApi,
      {},
      "?card_url=" + card + "&type=card_products" + "&current_page=" + Page
    );
    if (response.data.status) {
      setLoadMoreData(response?.data?.data?.next_page_data?.next_page_url);
      setShowLoader(false);
      setAddMoreProduct((prevData) => [
        ...prevData,
        ...response?.data?.data?.next_page_data?.data,
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleUpgradePlan = () => {
    Swal.fire({
      title:
        "You have reached your storage limit, to increase your limit please upgrade your plan.",
      icon: "info",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<a href="https://www.popipro.com/order" class="text-white" target="_blank">Upgrade</a>',
    });
  };
  const handleRadioBTN = (e) => {
    setEditRadioBtn(0);
    setLabelRadio(false);
    if (PriceRadio == false) {
      setPriceRadio(true);
    }
  };
  const handleLabelRadio = () => {
    setEditRadioBtn(1);
    setPriceRadio(false);
    if (LabelRadio == false) {
      setLabelRadio(true);
    }
  };
  const handleProductsbtn = async (type) => {
    try {
      const response = await Api(ProductEnquiryBtns, {}, "?type=" + type);
      if (response.data.status) {
        APIDATA();
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
      }
    } catch (error) {
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
  };

  // chatapi code

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [IsTyping, setIsTyping] = useState(false);
  const apiKey = "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";

  const [InputState, setInputState] = useState("");
  const handleButtonClick = async () => {
    setIsTyping(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content:
                ServicesDescription +
                "rewrite this sentence and give five suggestions.",
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const suggestedText = response.data.choices[0].message.content;
      const suggestionList = suggestedText.split("\n");
      // setSuggestions(response.data.choices[0].message.content);
      setSuggestions(suggestionList);
      setIsTyping(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChatModal = () => {
    if (ServicesDescription == "") {
      toast.error("please fill the detail to generate the data from ai", {
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
    handleShowshowChatModal();
    handleButtonClick();
  };
  const handleCopyMessage = () => {
    toast.success("Message copied succesfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(InputState.replace(/[0-9]./g, ""));
    setShowshowChatModal(false);
  };

  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
      <Modal show={ShowProductModal} onHide={handleProductClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              {ProductTitle}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleProductClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "30px" }}>
          {AddMoreProduct &&
            AddMoreProduct?.map((item, index) => {
              return ModalId === item.id ? (
                <div key={index}>
                  {item?.image?.path ? (
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
                  <div className="d-flex align-items-center justify-content-between">
                    <span
                      className="mt-3 mb-0 font-weight-bold"
                      style={{ color: "black", fontSize: "14px" }}
                    >
                      {item.name}
                    </span>
                    {item.is_label == 1 ? (
                      <span className="product-price">{item.label}</span>
                    ) : (
                      <div>
                        {item.price !== 0 && item.price !== "" ? (
                          <span className="product-price">
                            {item.pcurrency?.currency} {item.price}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                  <p
                    id="p_wrap"
                    className="review-item__caption text-left mt-1 mb-1"
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
                        className="mt-1 product-modal-btn w-auto"
                        style={{ background: "var(--color)" }}
                        // onClick={() => handleHitClick()}
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
                    {MainData?.company_setting?.show_product_enquiry_button !==
                    0 ? (
                      <a
                        className="mt-1 product-modal-btn w-auto text-white d-block"
                        style={{ background: "var(--color)" }}
                        data-toggle="modal"
                        data-target="#ProductEnquireModal"
                      >
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="user-select-auto mr-2"
                        />
                        Enquire Now
                      </a>
                    ) : (
                      ""
                    )}
                    {MainData?.company_setting?.show_product_wp_button !== 0 ? (
                      <a
                        href={
                          "https://api.whatsapp.com/send?phone=" +
                          Data?.card_contact +
                          "&" +
                          `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${item.name}?`
                        }
                        target="_blank"
                        className="mt-1 product-modal-btn w-auto d-block"
                      >
                        <img
                          src="../static/img/whatsapp.png"
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
              );
            })}
        </Modal.Body>
      </Modal>

      {/* Add More MODAL */}
      <Modal show={show} onHide={handleCanclebtn} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {ProductTitle}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleCanclebtn}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <label className="modalFormLable">
              Upload Image (*Recommended Size 150*150)
            </label>
            <input
              type="file"
              name="image"
              className="form-control mb-4 p-1 mt-1"
              accept="image/png, image/gif, image/jpeg"
              style={{ border: "1px solid #ccc" }}
              ref={aRef}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label className="modalFormLable">Heading*</label>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={ServicesName}
              placeholder="Heading"
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setServicesName(e.target.value)}
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
                    onChange={(e) => setProductPriceValue(e.target.value)}
                    className="mt-1"
                  >
                    <option value="">Select currency</option>
                    {Currency &&
                      Currency?.map((item, index) => {
                        return (
                          <option key={index} value={item?.id}>
                            {item?.currency}
                          </option>
                        );
                      })}
                  </select>
                  <input
                    type="number"
                    name="price"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1"
                    value={ProductPrice}
                    placeholder="Price"
                    style={{ height: "40px", border: "1px solid #ccc" }}
                    onChange={(e) => setProductPrice(e.target.value)}
                    maxLength="10"
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
                  value={ProductLabel}
                  placeholder="Text"
                  style={{ height: "40px", border: "1px solid #ccc" }}
                  onChange={(e) => setProductLabel(e.target.value)}
                  maxLength="12"
                ></input>
              </div>
            )}
            <div
              className="d-flex align-items-center w-100"
              style={{ gap: "10px" }}
            >
              <div className="w-100">
                <label className="modalFormLable">Label for URL / link</label>
                <input
                  name="url"
                  rows="4"
                  cols="50"
                  className="form-control mb-4 mt-1"
                  value={AddLabel}
                  placeholder="URL / link"
                  style={{ height: "40px", border: "1px solid #ccc" }}
                  onChange={(e) => setAddLabel(e.target.value)}
                ></input>
              </div>
              <div className="w-100">
                <label className="modalFormLable">Url / Links</label>
                <input
                  name="url"
                  rows="4"
                  cols="50"
                  className="form-control mb-4 mt-1 w-100"
                  value={ProductUrl}
                  placeholder="Url"
                  style={{ height: "40px", border: "1px solid #ccc" }}
                  onChange={(e) => setProductUrl(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <label className="modalFormLable">Description</label>
              <p
                onClick={handleChatModal}
                data-toggle={ServicesDescription ? "modal" : ""}
                data-target="#chatapimodal"
                className="cursor-pointer text-right"
              >
                Use AI{" "}
                <img
                  src="../static/img/ai-stick.png"
                  alt="stick"
                  style={{ width: "20%" }}
                />
              </p>
            </div>
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
              data={ServicesDescription || ""}
              onReady={(editor) => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                setServicesDescription(data);
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
              onClick={() => handleSaveBlogDetail()}
            >
              Save
            </button>
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleCanclebtn} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Edit {ProductTitle}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleCanclebtn}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {AddMoreProduct &&
            AddMoreProduct?.map((items, i) => {
              console.log(items);
              return ProductModalId === items.id ? (
                <div key={i}>
                  <input
                    type="hidden"
                    defaultValue={items.id}
                    name="hiddenId"
                    key={i}
                  />
                  <label className="modalFormLable">
                    Update Image (*Recommended Size 150*150)
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control mb-4 p-1 mt-1"
                    accept="image/png, image/gif, image/jpeg"
                    style={{ border: "1px solid #ccc" }}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <label className="modalFormLable">Heading*</label>
                  <input
                    name="name"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1"
                    defaultValue={items.name || ""}
                    placeholder="Heading"
                    style={{ height: "40px", border: "1px solid #ccc" }}
                    onChange={(e) => setServicesName(e.target.value)}
                  ></input>

                  <div className="d-flex align-items-center mb-3 mt-1 ml-2">
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="price"
                        name="product"
                        value={0}
                        checked={EditRadioBtn == 0 ? true : false}
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
                        checked={EditRadioBtn == 1 ? true : false}
                        onChange={(e) => handleLabelRadio(e.target.value)}
                      />{" "}
                      <label htmlFor="css" className="ml-2 mb-0">
                        Show Text
                      </label>
                    </div>
                  </div>

                  {EditRadioBtn == 0 ? (
                    <>
                      <label className="modalFormLable">Price</label>
                      <div className="d-flex" style={{ gap: "10px" }}>
                        <select
                          style={{
                            height: "40px",
                            padding: "6px 18px",
                            background: "#f7f9fa",
                            border: "1px solid #ccc",
                          }}
                          onChange={(e) => setProductPriceValue(e.target.value)}
                          defaultValue={items.currency || ""}
                          className="mt-1"
                        >
                          <option value="">Select currency</option>
                          {Currency &&
                            Currency?.map((item, index) => {
                              return (
                                <option key={index} value={item?.id}>
                                  {item?.currency}
                                </option>
                              );
                            })}
                        </select>
                        <input
                          type="number"
                          name="price"
                          rows="4"
                          cols="50"
                          className="form-control mb-4 mt-1"
                          defaultValue={items.price}
                          placeholder="Price"
                          style={{
                            height: "40px",
                            border: "1px solid #ccc",
                          }}
                          onChange={(e) => setProductPrice(e.target.value)}
                        ></input>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="modalFormLable">Text</label>
                        <input
                          type="text"
                          name="price"
                          rows="4"
                          cols="50"
                          className="form-control mb-4 mt-1"
                          value={ProductLabel}
                          placeholder="Text"
                          style={{
                            height: "40px",
                            border: "1px solid #ccc",
                          }}
                          onChange={(e) => setProductLabel(e.target.value)}
                          maxLength="12"
                        ></input>
                      </div>
                    </>
                  )}
                  <div
                    className="d-flex align-items-center w-100"
                    style={{ gap: "10px" }}
                  >
                    <div className="w-100">
                      <label className="modalFormLable">
                        Label for url / link
                      </label>
                      <input
                        name="url"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1"
                        value={AddLabel}
                        placeholder="Label"
                        style={{
                          height: "40px",
                          border: "1px solid #ccc",
                        }}
                        onChange={(e) => setAddLabel(e.target.value)}
                      ></input>
                    </div>
                    <div className="w-100">
                      <label className="modalFormLable">URL / link</label>
                      <input
                        name="url"
                        rows="4"
                        cols="50"
                        className="form-control mb-4 mt-1 w-100"
                        value={ProductUrl}
                        placeholder="URL / link"
                        style={{
                          height: "40px",
                          border: "1px solid #ccc",
                        }}
                        onChange={(e) => setProductUrl(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="modalFormLable">Description</label>
                    <p
                      onClick={handleChatModal}
                      data-toggle={ServicesDescription ? "modal" : ""}
                      data-target="#chatapimodal"
                      className="cursor-pointer text-right"
                    >
                      Use AI{" "}
                      <img
                        src="../static/img/ai-stick.png"
                        alt="stick"
                        style={{ width: "20%" }}
                      />
                    </p>
                  </div>
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
                    data={ServicesDescription || ""}
                    onReady={(editor) => {}}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setServicesDescription(data);
                    }}
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                  />
                  <div
                    className="d-flex align-items-center mt-3"
                    style={{ gap: "10px" }}
                  >
                    <button
                      className="send-btnn"
                      onClick={() => handleSaveBlogDetail(items.id)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button m-0"
                      onClick={handleCanclebtn}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
        </Modal.Body>
      </Modal>

      {/* ChatAPi Modal */}
      <Modal
        show={showChatModal}
        onHide={() => handleCloseshowChatModal()}
        centered
        style={{ background: "rgba(0,0,0,0.7)" }}
      >
        <Modal.Body style={{ minHeight: "100px" }}>
          <div className="text-right">
            <button
              type="button"
              className="chat-modal-btn"
              onClick={() => {
                handleCloseshowChatModal();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="suggestions">
            {IsTyping ? (
              <p>Loading...</p>
            ) : (
              suggestions.map((suggestion, index) =>
                suggestion ? (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name="suggestion"
                        className={
                          index !== 0 && index !== 1 ? "mr-2" : "d-none"
                        }
                        value={suggestion}
                        onChange={(e) => setInputState(e.target.value)}
                      />
                      {suggestion.replace(/[0-9]./g, "")}
                    </label>
                  </div>
                ) : (
                  ""
                )
              )
            )}
            {IsTyping ? (
              ""
            ) : (
              <button
                className="send-btnn mt-3"
                onClick={() => handleCopyMessage()}
              >
                Copy text
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
      {TitleData?.card_products?.source !== 0 ? (
        <>
          <div className="position-relative">
            {Data ? (
              <EditPlan
                Data={Data}
                PlanData={PlanData}
                APIDATA={APIDATA}
                MainData={MainData}
              />
            ) : (
              ""
            )}
            <div className="mt-3 box-content boxxx mb-3" id="card_products">
              <div className="pb-2 flex-header">
                <div className="d-flex align-items-baseline">
                  {EditFields ? (
                    <input
                      name="years"
                      rows="4"
                      cols="50"
                      className="title-section-input"
                      onChange={(e) => setProductTitle(e.target.value)}
                      defaultValue={
                        TitleData &&
                        TitleData.card_products?.visible_name == "card_products"
                          ? "card_products"
                          : TitleData?.card_products?.visible_name
                      }
                      placeholder="Title"
                    ></input>
                  ) : (
                    <>
                      <h1 className="title title--h1 first-title title__separate">
                        {ProductTitle}
                      </h1>
                    </>
                  )}
                </div>
                <div>
                  {TitleData?.card_products?.source == "2" &&
                  PlanData?.is_expired == false &&
                  PlanData?.subscription?.plan_id !== 1 ? (
                    <div className="d-flex align-items-center">
                      <div class="wrapper">
                        <div class="tooltip">
                          Here you can manage services, products, advisory,
                          packages...
                        </div>
                        <FontAwesomeIcon
                          icon={faInfo}
                          className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                          onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                        />
                      </div>
                      <div className="edit-pencile-div">
                        {EditFields ? (
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="ml-3 pe-auto floopySave-icon"
                            onClick={() => handleChnageTitle()}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPencil}
                            className="ml-3 pe-auto Iconcolor-black"
                            onClick={() => setEditFields(true)}
                          />
                        )}
                      </div>
                      {MainData?.company_setting?.maximum_products <=
                      PaginationData?.total_product ? (
                        <button
                          className="addmore"
                          data-toggle="modal"
                          data-target="#AddProductModal"
                          // onClick={() => handleShow()}
                          onClick={handleUpgradePlan}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      ) : (
                        <button
                          className="addmore"
                          onClick={() => handleShow()}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      )}
                      <>
                        <label className="switch">
                          <input
                            data-status={TitleData.card_products?.is_active}
                            data-active={Active}
                            checked={Active}
                            type="checkbox"
                            onChange={() => handleActive()}
                          />
                          <span className="slider round"></span>
                        </label>
                      </>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {AddMoreProduct?.length == 0 ? (
                <>
                  <div>
                    <p>
                      Products are empty, to add Products click on the add icon.
                    </p>
                  </div>
                </>
              ) : (
                <div>
                  {AddMoreProduct &&
                    AddMoreProduct?.map((items, index, { length }) => {
                      return (
                        <div
                          className={
                            index + 1 === length
                              ? "swiper-slide review-item review-item-products d-block pb-0"
                              : "swiper-slide review-item review-item-products review-item-products-border d-block pb-0"
                          }
                          key={index}
                        >
                          <div className="row d-flex justify-content-between pb-3 pt-3">
                            <div className="col-6 col-sm-6 col-lg-4">
                              <div className="position-relative">
                                {items?.image?.path ? (
                                  <img
                                    className="case-item__icon-products"
                                    src={Data?.base_url + items?.image?.path}
                                    alt="product"
                                  />
                                ) : (
                                  <img
                                    className="case-item__icon-products"
                                    src="../static/img/picture-1.jpg"
                                    alt="product"
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
                                      >
                                        <img src="../static/img/whatsapp.png" />
                                      </a>
                                    ) : (
                                      ""
                                    )}
                                    {MainData?.company_setting
                                      ?.show_product_enquiry_button !== 0 ? (
                                      <a
                                        data-toggle="modal"
                                        data-target="#ProductEnquireModal"
                                        className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                      >
                                        <FontAwesomeIcon
                                          icon={faEnvelope}
                                          className="user-select-auto"
                                        />
                                      </a>
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
                                style={{ fontSize: "26px" }}
                                className={
                                  items?.description?.length <= "0"
                                    ? "title title--h5 font-weight-bolder product-heading2 m-0"
                                    : "title title--h5 font-weight-bolder product-heading m-0"
                                }
                              >
                                {items.name}
                              </p>
                              <p
                                id="p_wrap"
                                className="review-item__caption text-left products-review mt-1"
                                dangerouslySetInnerHTML={{
                                  __html: items.description,
                                }}
                              ></p>
                              <div className="text-align-end mt-1 d-flex align-items-center justify-content-between">
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
                                        {items.pcurrency?.currency}{" "}
                                        {items.price}
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
                                      >
                                        {/* <i className="fa-brands  fa-whatsapp Whatsaapsvg"></i> */}
                                        <img src="../static/img/whatsapp.png" />
                                      </a>
                                    ) : (
                                      ""
                                    )}
                                    {MainData?.company_setting
                                      ?.show_product_enquiry_button !== 0 ? (
                                      <a
                                        data-toggle="modal"
                                        data-target="#ProductEnquireModal"
                                        className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                      >
                                        <FontAwesomeIcon
                                          icon={faEnvelope}
                                          className="user-select-auto"
                                        />
                                      </a>
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
                                    data-toggle="modal"
                                    data-target="#ProductModal"
                                    onClick={() => ShowModalID(items.id)}
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
                          {TitleData?.card_products?.source == "2" &&
                          PlanData?.is_expired == false &&
                          PlanData?.subscription?.plan_id !== 1 ? (
                            <div
                              className="d-flex align-items-center justify-content-start"
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
                                onClick={() =>
                                  handleSetId(
                                    items.id,
                                    items.name,
                                    items.description,
                                    items.price,
                                    items.url,
                                    items.currency,
                                    items.label,
                                    items.is_label
                                  )
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="delete-button m-0"
                                onClick={() =>
                                  handleDelteBlogs(items.id, 2, Data?.id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  <div className="mt-4">
                    <h6 className="font-weight-bold">
                      How you want to receive inquiry:
                    </h6>
                    <div className="d-flex align-items-start">
                      <input
                        type="checkbox"
                        id="product-whatsaap"
                        className="mt-1"
                        value={
                          MainData?.company_setting?.show_product_wp_button !==
                          0
                            ? true
                            : false
                        }
                        onChange={() => handleProductsbtn("wp")}
                        checked={
                          MainData?.company_setting?.show_product_wp_button !==
                          0
                            ? true
                            : false
                        }
                      />
                      <label
                        for="product-whatsaap"
                        className="ml-2 Varcolor font-weight-bold"
                      >
                        Via whatsaap only?
                      </label>
                    </div>
                    <div className="d-flex align-items-start">
                      <input
                        type="checkbox"
                        id="product-enq"
                        className="mt-1"
                        value={
                          MainData?.company_setting
                            ?.show_product_enquiry_button !== 0
                            ? true
                            : false
                        }
                        onChange={() => handleProductsbtn("enq")}
                        checked={
                          MainData?.company_setting
                            ?.show_product_enquiry_button !== 0
                            ? true
                            : false
                        }
                      />
                      <label
                        for="product-enq"
                        className="ml-2 Varcolor font-weight-bold"
                      >
                        Via inquiry form?
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {PaginationData?.total_product !== AddMoreProduct?.length ? (
                <div className="mx-auto text-center pt-2">
                  <a
                    className="text-center cursor-pointer mx-auto"
                    style={{
                      textDecoration: "underline",
                      fontSize: "16px",
                      color: "var(--color)",
                    }}
                    onClick={handleLoadMore}
                  >
                    Load More
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
