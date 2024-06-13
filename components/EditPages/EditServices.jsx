/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleInfo,
  faFloppyDisk,
  faInfo,
  faLock,
  faPencil,
  faPlus,
  faSpinner,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "react-bootstrap/Modal";
import { CardData, deleteSection } from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import LoadingText from "@components/ViewPages/LoadingText";
import EditDropdown from "./Dropdown";

export default function EditDoing({
  TitleData,
  Data,
  APIDATA,
  setData,
  AddMoredoings,
  CardServices,
  MainData,
  PlanData,
  token,
}) {
  const [WhatIm, setWhatIm] = useState(false);
  const [Active, setActive] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [ModalId, setModalId] = useState("");
  const [Image, setImage] = useState();
  const [ServicesName, setServicesName] = useState("");
  const [ServicesDescription, setServicesDescription] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [Doing, setDoing] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);
  const [modalShow, setModalShow] = useState("");
  const [showChatModal, setShowshowChatModal] = useState(false);
  const handleCloseshowChatModal = () => setShowshowChatModal(false);
  const handleShowshowChatModal = () => setShowshowChatModal(true);
  const [InputState, setInputState] = useState("");

  useEffect(() => {
    setDoing(TitleData?.card_services?.visible_name);
  }, []);

  useEffect(() => {
    setActive(TitleData?.card_services?.is_active == "1" ? true : false);
  }, [TitleData]);
  const aRef = useRef(null);

  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
    setServicesDescription("");
    setServicesName("");
    setImage("");
  };

  const handleEditWhat = async (id = null) => {
    setShowLoader(true);
    let data = [];
    let error = false;
    let mess = "";
    if (ServicesName === "" || ServicesDescription === "") {
      error = true;
      mess =
        ServicesName === "" ? "Heading is required" : "Description is required";
    } else {
      id !== null
        ? (data = [
            {
              services_image: Image,
              services_name: ServicesName,
              services_description: ServicesDescription,
              saved_services: id,
            },
          ])
        : (data = [
            {
              services_image: Image,
              services_name: ServicesName,
              services_description: ServicesDescription,
            },
          ]);
    }
    if (error) {
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
      setShowLoader(false);
      return;
    }

    try {
      setShowLoader(true);
      const response = await Api(CardData, { services: data });
      setShowLoader(false);
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
        // aRef.current.value = null;
        setServicesDescription("");
        setServicesName("");
        handleCanclebtn();
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
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
    setShowLoader(false);
  };

  const handleDelteServices = async (id, type, DataId) => {
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
        }
      }
    });
  };

  const handleActive = async () => {
    let titles = [
      {
        name: "card_services",
        visible_name: TitleData?.card_services?.visible_name,
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
            autoClose: 2000,
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

  const handleSetId = (id, name, description) => {
    setModalId(id);
    setServicesName(name);
    setServicesDescription(description);
    handleEditShow();
  };
  const handleChnageTitle = async () => {
    if (Doing == "") {
      toast.error("Section title is required", {
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
    let titles = [
      {
        name: "card_services",
        visible_name: Doing,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
        setShowLoader(false);
        APIDATA();
        // setData(response.data.data);
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
        setEditFields(false);
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
      toast(error.response.data.message, {
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

  // chatapi code

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [IsTyping, setIsTyping] = useState(false);
  const apiKey = "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";
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
      {/* <SimpleBackdrop visible={ShowLoader} /> */}
      {/* Add More MODAL */}
      <Modal
        show={show}
        onHide={handleCanclebtn}
        centered
        enforceFocus={false}
        data-focus="false"
        tabindex="-1"
      >
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {TitleData?.card_services?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="modalFormlabel">
              Upload Image (*Preferred size in ratio of 100x100)
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
              onChange={(e) => setServicesName(e.target.value)}
              maxLength="200"
            ></input>
            <div className="d-flex align-items-center justify-content-between">
              <label className="modalFormLable">Description*</label>
              {/* <p
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
              </p> */}
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
                  "Emoji",
                ],
                placeholder:
                  "Insert a text and take advantage of AI to enrich the content you've written.",
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
            {!ShowLoader ? (
              <button className="send-btnn" onClick={() => handleEditWhat()}>
                Save
              </button>
            ) : (
              <button class="send-btnn" disabled>
                <FontAwesomeIcon icon={faSpinner} className="spinner-fa" />
                <LoadingText />
              </button>
            )}
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEdit}
        onHide={handleCanclebtn}
        centered
        enforceFocus={false}
        data-focus="false"
        tabindex="-1"
      >
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Edit {TitleData?.card_services?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleCanclebtn}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {CardServices &&
            CardServices?.map((items, i) => {
              return (
                <>
                  {ModalId === items.id ? (
                    <div>
                      <input
                        type="hidden"
                        defaultValue={items.id}
                        name="hiddenId"
                        key={i}
                      />
                      <label className="modalFormLable">
                        Upload Image (*Preferred size in ratio of 100x100)
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
                        onChange={(e) => setServicesName(e.target.value)}
                        maxLength="200"
                      ></input>
                      <div className="d-flex align-items-center justify-content-between">
                        <label className="modalFormLable">Description*</label>
                        {/* <p
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
                        </p> */}
                      </div>
                      <div className="ck-body-wrapper">
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
                              "Emoji",
                            ],
                            placeholder:
                              "Insert a text and take advantage of AI to enrich the content you've written.",
                            link: {
                              decorators: {
                                addTargetToExternalLinks: {
                                  mode: "automatic",
                                  callback: (url) =>
                                    /^(https?:)?\/\//.test(url),
                                  attributes: {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  },
                                },
                              },
                            },
                            autoFocus: true,
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
                        {!ShowLoader ? (
                          <button
                            className="send-btnn"
                            onClick={() => handleEditWhat(items.id)}
                          >
                            Update
                          </button>
                        ) : (
                          <button class="send-btnn" disabled>
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="spinner-fa"
                            />
                            <LoadingText />
                          </button>
                        )}
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
                  )}
                </>
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

      {TitleData?.card_services?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan
              Data={Data}
              PlanData={PlanData}
              APIDATA={APIDATA}
              MainData={MainData}
              in_subscription={TitleData?.card_services?.in_subscription}
            />
          ) : (
            ""
          )}
          <div className="box-content boxxx" id="card_services">
            <div className="mt-0">
              <div className="flex-header">
                {WhatIm ? (
                  <input
                    type="text"
                    className="title-section-input"
                    placeholder="Services Heading"
                    onChange={(e) => setDoing(e.target.value)}
                    defaultValue={
                      TitleData &&
                      TitleData.card_services?.visible_name == "card_services"
                        ? "Services"
                        : TitleData?.card_services?.visible_name
                    }
                    maxLength="20"
                  />
                ) : (
                  <div className="d-flex align-items-baseline">
                    {EditFields ? (
                      <input
                        name="years"
                        rows="4"
                        cols="50"
                        className="title-section-input"
                        onChange={(e) => setDoing(e.target.value)}
                        defaultValue={
                          TitleData &&
                          TitleData.card_services?.visible_name ==
                            "card_services"
                            ? "Services"
                            : TitleData?.card_services?.visible_name
                        }
                        placeholder="Title"
                        maxLength="20"
                      ></input>
                    ) : (
                      <>
                        <h1 className="title title--h1 first-title title__separate">
                          {Doing && Doing}
                        </h1>
                      </>
                    )}
                  </div>
                )}
                <div>
                  {TitleData?.card_services?.source == "2" &&
                  TitleData?.card_services?.in_subscription ? (
                    <>
                      <div className="web-edit-icons">
                        <div className="d-flex align-items-center">
                          <div class="wrapper">
                            <div class="tooltip">
                              Add services you offer, including details such as
                              service descriptions, links and any additional
                              information.
                            </div>
                            <img
                              src="../static/img/info.svg"
                              alt="image"
                              width={18}
                              className="mr-2 cursor-pointer"
                              onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                            />
                          </div>
                          <>
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
                            {TitleData?.card_services?.row_limit <=
                            CardServices?.length ? (
                              <button
                                className="addmore"
                                onClick={handleUpgradePlan}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            ) : (
                              <button
                                className="addmore"
                                data-toggle="modal"
                                data-target="#AddMoreServicesModal"
                                onClick={handleShow}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            )}
                            <label className="switch">
                              <input
                                data-status={TitleData.card_services?.is_active}
                                data-active={Active}
                                checked={Active}
                                type="checkbox"
                                onChange={() => handleActive()}
                              />
                              <span className="slider round"></span>
                            </label>
                          </>
                        </div>
                      </div>
                      <div className="mobile-edit-icons">
                        {EditFields ? (
                          <div>
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="ml-2 VarColor w-auto cursor-pointer CheckTitle"
                              onClick={() => handleChnageTitle()}
                            />
                          </div>
                        ) : (
                          <EditDropdown
                            TitleData={TitleData}
                            Active={Active}
                            handleActive={handleActive}
                            setEditFields={setEditFields}
                            AddTitle={
                              "Add " + TitleData?.card_services?.visible_name
                            }
                            handleShowAddModal={handleShow}
                            setTooltipIsOpen={setTooltipIsOpen}
                            message="Add services you offer, including details such as
                            service descriptions, links and any additional
                            information."
                            tooltipIsOpen={tooltipIsOpen}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {AddMoredoings?.length == 0 ? (
                <>
                  <div>
                    <p className="m-0">
                      Services are empty, to add services click on the edit icon
                    </p>
                  </div>
                </>
              ) : (
                <SwiperComponent
                  breakpoints={{
                    1110: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 1,
                    },
                  }}
                  spaceBetween={20}
                  style={{ cursor: "pointer" }}
                  className="mySwiper"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination, Navigation]}
                >
                  <div>
                    {CardServices &&
                      CardServices.map((item, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <div className="case-item position-relative padding-services">
                              <div className="w-100">
                                {item?.image?.path ? (
                                  <img
                                    className="case-item__icon"
                                    src={Data?.base_url + item?.image?.path}
                                    alt="services"
                                  />
                                ) : (
                                  <img
                                    className="case-item__icon"
                                    src="../static/img/picture-1.jpg"
                                    alt="services"
                                  />
                                )}
                                <div>
                                  <h3 className="title title--h4 m-0 mt-3">
                                    {item.name}
                                  </h3>
                                  <div
                                    id="p_wrap"
                                    className="case-item__caption text-start mb-2 mt-2 content_description"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  ></div>
                                </div>
                                {TitleData?.card_services?.source == "2" &&
                                TitleData?.card_services?.in_subscription ? (
                                  <div
                                    className="d-flex align-items-center justify-content-start mt-3"
                                    style={{ gap: "10px" }}
                                  >
                                    <button
                                      className="send-btnn m-0"
                                      data-toggle="modal"
                                      data-target="#EditServicesModal"
                                      onClick={() =>
                                        handleSetId(
                                          item.id,
                                          item.name,
                                          item.description
                                        )
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="delete-button m-0"
                                      onClick={() =>
                                        handleDelteServices(
                                          item.id,
                                          3,
                                          Data?.id
                                        )
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              {/* )} */}
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </div>
                </SwiperComponent>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
