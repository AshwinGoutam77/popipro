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
import { CardData, deleteSection, GetAiSuggestions } from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import LoadingText from "@components/ViewPages/LoadingText";
import EditDropdown from "./Dropdown";
import { showToast } from "@components/Dashboard/Toast";
import ChatbotApp from "./Chat";
import { handleDraft } from "./EditFunctions";

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
  card_url
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
  const [InputState, setInputState] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [AiLoader, setAiLoader] = useState(false)

  useEffect(() => {
    setDoing(TitleData?.card_services?.visible_name);
  }, []);

  useEffect(() => {
    setActive(TitleData?.card_services?.is_active == "1" ? true : false);
    setIsLocked(TitleData?.card_services?.is_locked == "1" ? true : false);
  }, [TitleData]);
  const aRef = useRef(null);

  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
    setServicesDescription("");
    setServicesName("");
    setImage("");
    setShowshowChatModal(false)
  };

  const handleEditServices = async (id = null, status) => {
    setShowLoader(true);
    let data = [];
    let error = false;
    let mess = "";
    if (ServicesName === "" || ServicesDescription === "") {
      error = true;
      mess =
        ServicesName === "" ? "Heading is required" : "Description is required";
    } else {
      (data = [
        {
          services_image: Image,
          services_name: ServicesName,
          services_description: ServicesDescription,
          status: status,
          saved_services: id !== null ? id : "",
        },
      ])

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

  const handleSetId = (id, name, description, image) => {
    setModalId(id);
    setServicesName(name);
    setServicesDescription(description);
    // setImage(image)
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


  const handleShowSection = async () => {
    const newValue = !isLocked;
    setIsLocked(newValue);
    let titles = [
      {
        name: "card_services",
        visible_name: TitleData?.card_services?.visible_name,
        is_locked: newValue ? 1 : 0,
      },
    ];
    const response = await Api(CardData, { titles });
    if (response?.data?.status) {
      showToast(response.data?.message, 'success');
    }
  };

  const handleGetAiSuggestion = async () => {
    setAiLoader(true)
    handleShow();
    const response = await Api(GetAiSuggestions, { type: "service" })
    if (response?.data?.status) {
      const rawTitle = response?.data?.data?.title || "";
      const rawDescription = response?.data?.data?.description || "";
      const cleanTitle = rawTitle.replace(/{|}|\*\*/g, "");
      const cleanDescription = rawDescription.replace(/{|}|\*\*/g, "");
      setAiLoader(false)

      setServicesName(cleanTitle);
      setServicesDescription(cleanDescription);
    }
  }

  return (
    <>
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
          {AiLoader ? <h5>Loading...</h5> : !showChatModal ?
            <>
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
                  <p
                    onClick={() => setShowshowChatModal(true)}
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
                  onReady={(editor) => { }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setServicesDescription(data);
                  }}
                  onBlur={(event, editor) => { }}
                  onFocus={(event, editor) => { }}
                />
              </div>
              <div
                className="d-flex align-items-center mt-3"
                style={{ gap: "10px" }}
              >
                {!ShowLoader ? (
                  <>
                    <button className="send-btnn" onClick={() => handleEditServices("", 1)}>
                      Save
                    </button>
                    <button
                      className="send-btnn"
                      onClick={() => handleEditServices(0)}
                    >
                      Save and Draft
                    </button>
                  </>
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
            </> : <ChatbotApp OpenModal={() => setShowshowChatModal(false)} ChangeDescription={setServicesDescription}
              description={ServicesDescription} setShowshowChatModal={setShowshowChatModal} />
          }
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
                    !showChatModal ?
                      <div>
                        <input
                          type="hidden"
                          defaultValue={items.id}
                          name="hiddenId"
                          key={i}
                        />
                        <div className="mb-4 p-1 mt-1">
                          <label className="modalFormLable">
                            Upload Image (*Preferred size in ratio of 100x100)
                          </label>
                          <input
                            type="file"
                            name="image"
                            className="form-control"
                            accept="image/png, image/gif, image/jpeg"
                            style={{ border: "1px solid #ccc" }}
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          {/* <img src={Image} alt="uplaoded-img" className="edit-real-estate-images mt-2" /> */}
                        </div>
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
                          <p
                            onClick={() => setShowshowChatModal(true)}
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
                            onReady={(editor) => { }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setServicesDescription(data);
                            }}
                            onBlur={(event, editor) => { }}
                            onFocus={(event, editor) => { }}
                          />
                        </div>
                        <div
                          className="d-flex align-items-center mt-3"
                          style={{ gap: "10px" }}
                        >
                          {!ShowLoader ? (
                            <button
                              className="send-btnn"
                              onClick={() => handleEditServices(items.id)}
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
                      </div> : <ChatbotApp OpenModal={() => setShowshowChatModal(false)}
                        description={ServicesDescription} setShowshowChatModal={setShowshowChatModal} ChangeDescription={setServicesDescription} />
                  ) : (
                    ""
                  )}
                </>
              );
            })}
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
                              <>
                                <button
                                  className="addmore mr-1"
                                  onClick={handleShow}
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <div class="wrapper">
                                  <div class="tooltip w-auto" style={{ left: '-62px' }}>
                                    Generate from ai
                                  </div>
                                  <button
                                    className="addmore ml-0"
                                    onClick={handleGetAiSuggestion}
                                  >
                                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                                  </button>
                                </div>
                              </>
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
                            aiData={
                              "Generate from ai"
                            }
                            handleGetAiSuggestion={handleGetAiSuggestion}
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
                                          item.description,
                                          Data?.base_url + item?.image?.path
                                        )
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="send-btnn m-0"
                                      onClick={() => handleDraft({ card_url: card_url, status: item?.status == 0 ? 1 : item?.status == 2 ? 1 : "2", product_id: item.id, APIDATA, item_name: item?.name, card_section: "card_services" })}
                                    >
                                      {item?.status == 0 || item?.status == 2 ? "Publish it" : item?.status == 1 ? "Unpublished" : ""}
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

            <div>
              <label htmlFor="service-password">
                <input
                  type="checkbox"
                  id="service-password"
                  checked={isLocked}
                  onChange={handleShowSection}
                />{" "}
                Private the section
              </label>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
