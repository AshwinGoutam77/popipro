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
  faUser,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { CardData, TestimonialButton, deleteSection } from "@services/Routes";
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

export default function EditTestimonials({
  TitleData,
  APIDATA,
  setData,
  AddMoreTesti,
  Data,
  MainData,
  PlanData,
  token,
}) {
  const [Testimonials, setTestimonials] = useState(false);
  const [Active, setActive] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [ModalId, setModalId] = useState("");
  const [Image, setImage] = useState();
  const [ServicesName, setServicesName] = useState("");
  const [ServicesDescription, setServicesDescription] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [CompanyName, setCompanyName] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [TestiName, setTestiName] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);
  const [showChatModal, setShowshowChatModal] = useState(false);
  const handleCloseshowChatModal = () => setShowshowChatModal(false);
  const handleShowshowChatModal = () => setShowshowChatModal(true);
  const [isLocked, setIsLocked] = useState(false);

  // useEffect(() => {
  //   handelOpenTesti();
  // }, []);
  useEffect(() => {
    setTestiName(TitleData?.card_testimonials?.visible_name);
  }, []);

  useEffect(() => {
    setActive(TitleData?.card_testimonials?.is_active == "1" ? true : false);
    setIsLocked(TitleData?.card_testimonials?.is_locked == "1" ? true : false);
  }, [TitleData]);
  const aRef = useRef(null);

  const handleSaveTesti = async (id = null) => {
    setShowLoader(true);
    let titles = [
      {
        name: "card_testimonials",
        visible_name: TestiName,
      },
    ];

    let data = [];
    let error = false;
    let mess = "";
    if (ServicesName === "" || ServicesDescription === "") {
      error = true;
      mess =
        ServicesName === "" ? "Heading is required" : "Description is requied";
    } else {
      id !== null
        ? (data = [
          {
            testimonial_image: Image,
            testimonial_name: ServicesName,
            testimonial_description: ServicesDescription,
            testimonial_company_name: CompanyName,
            saved_testimonial: id,
          },
        ])
        : (data = [
          {
            testimonial_image: Image,
            testimonial_name: ServicesName,
            testimonial_description: ServicesDescription,
            testimonial_company_name: CompanyName,
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
      const response = await Api(CardData, { titles, testimonials: data });
      setShowLoader(false);
      if (response.data.status) {
        APIDATA();
        HandleEmptyFeilds();
        handleClose();
        handleEditClose();
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
        // aRef.current.value = null;
        setServicesName(" ");
        setServicesDescription(" ");
        setCompanyName("");
        handleCanclebtn();
      }
    } catch (error) {
      error;
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    setShowLoader(false);
    var elem = document.getElementById("card_testimonials");
    elem.scrollIntoView();
  };

  const handleDelteTestimonials = async (id, type, DataId) => {
    let data = {
      type: type,
      base: id,
      id: DataId,
    };
    data;
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
        name: "card_testimonials",
        visible_name: TestiName,
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

  const handleSetId = (id, name, description, company, image) => {
    handleEditShow();
    setModalId(id);
    setServicesName(name);
    setServicesDescription(description);
    setCompanyName(company);
    // setImage(image)
  };
  const HandleEmptyFeilds = () => {
    // aRef.current.value = null;
    setImage("");
    setServicesName(" ");
    setServicesDescription(" ");
    setCompanyName("");
  };
  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
    HandleEmptyFeilds();
  };
  const handleChnageTitle = async () => {
    if (TestiName == "") {
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
        name: "card_testimonials",
        visible_name: TestiName,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
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
  const handleGetReview = async (e) => {
    try {
      const response = await Api(TestimonialButton, {});
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

  const handleShowSection = async () => {
    const newValue = !isLocked;
    setIsLocked(newValue);
    let titles = [
      {
        name: "card_testimonials",
        visible_name: TitleData?.card_testimonials?.visible_name,
        is_locked: newValue ? 1 : 0,
      },
    ];
    const response = await Api(CardData, { titles });
    if (response?.data?.status) {
      showToast(response.data?.message, 'success');
    }
  };

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
              Add {TitleData?.card_testimonials?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {
            !showChatModal ? <>
              <div>
                <label className="modalFormLable">
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
                  value={ServicesName || ""}
                  placeholder="Heading"
                  onChange={(e) => setServicesName(e.target.value)}
                  maxLength="200"
                ></input>
                <label className="modalFormLable">Company Name</label>
                <input
                  name="name"
                  rows="4"
                  cols="50"
                  className="form-control mb-4 mt-1"
                  value={CompanyName || ""}
                  placeholder="Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
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
                  <button className="send-btnn" onClick={() => handleSaveTesti()}>
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
            </> : <ChatbotApp OpenModal={() => setShowshowChatModal(false)} ChangeDescription={setServicesDescription}
              description={ServicesDescription} setShowshowChatModal={setShowshowChatModal} />}
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
              Add {TitleData?.card_testimonials?.visible_name}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleCanclebtn}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {AddMoreTesti &&
            AddMoreTesti?.map((items, i) => {
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
                        <label className="modalFormLable">
                          Upload Image (*Preferred size in ratio of 100x100)
                        </label>
                        <div className="mb-3">
                          <input
                            type="file"
                            name="image"
                            className="form-control mb-1 p-1"
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
                          className="form-control mb-4"
                          defaultValue={items.name || ""}
                          placeholder="Heading"
                          onChange={(e) => setServicesName(e.target.value)}
                          maxLength="200"
                        ></input>
                        <label className="modalFormLable">Company Name</label>
                        <input
                          name="name"
                          rows="4"
                          cols="50"
                          className="form-control mb-4"
                          defaultValue={items.company_name || ""}
                          placeholder="Company Name"
                          onChange={(e) => setCompanyName(e.target.value)}
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
                        <div
                          className="d-flex align-items-center mt-3"
                          style={{ gap: "10px" }}
                        >
                          {!ShowLoader ? (
                            <button
                              className="send-btnn"
                              onClick={() => handleSaveTesti(items.id)}
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
                      </div> : <ChatbotApp OpenModal={() => setShowshowChatModal(false)} ChangeDescription={setServicesDescription}
                        description={ServicesDescription} setShowshowChatModal={setShowshowChatModal} />
                  ) : (
                    ""
                  )}
                </>
              );
            })}
        </Modal.Body>
      </Modal>

      {TitleData?.card_testimonials?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan
              Data={Data}
              PlanData={PlanData}
              APIDATA={APIDATA}
              MainData={MainData}
              in_subscription={TitleData?.card_testimonials?.in_subscription}
            />
          ) : (
            ""
          )}
          <div className="box-content boxxx" id="card_testimonials">
            <div className="">
              <div className="flex-header">
                {Testimonials ? (
                  <input
                    type="text"
                    className="title-section-input"
                    placeholder="Testimonials Heading"
                    onChange={(e) => setTestiName(e.target.value)}
                    defaultValue={
                      TitleData &&
                        TitleData?.card_testimonials?.visible_name ==
                        "card_testimonials"
                        ? "Card Testimonials"
                        : TitleData?.card_testimonials?.visible_name
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
                        onChange={(e) => setTestiName(e.target.value)}
                        defaultValue={
                          TitleData &&
                            TitleData?.card_testimonials?.visible_name ==
                            "card_testimonials"
                            ? "Testimonials"
                            : TitleData?.card_testimonials?.visible_name
                        }
                        placeholder="Title"
                        maxLength="20"
                      ></input>
                    ) : (
                      <>
                        <h1 className="title title--h1 first-title title__separate">
                          {TitleData &&
                            TitleData?.card_testimonials?.visible_name ===
                            "card_testimonials"
                            ? "Testimonials"
                            : TitleData?.card_testimonials?.visible_name}
                        </h1>
                      </>
                    )}
                  </div>
                )}
                <div>
                  {TitleData?.card_testimonials?.source == "2" &&
                    TitleData?.card_testimonials?.in_subscription ? (
                    <>
                      <div className="web-edit-icons">
                        <div className="d-flex align-items-center">
                          <div class="wrapper">
                            <div class="tooltip">
                              Here you can show testimonials, reviews, feedbacks
                              etc. Make sure to tick the get review button.
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
                            {TitleData?.card_testimonials?.row_limit <=
                              AddMoreTesti?.length ? (
                              <button
                                className="addmore"
                                onClick={() => handleUpgradePlan()}
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
                            <label className="switch">
                              <input
                                data-status={
                                  TitleData.card_testimonials?.is_active
                                }
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
                              "Add " +
                              TitleData?.card_testimonials?.visible_name
                            }
                            handleShowAddModal={handleShow}
                            setTooltipIsOpen={setTooltipIsOpen}
                            message="Here you can show testimonials, reviews, feedbacks
                            etc. Make sure to tick the get review button."
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
              {AddMoreTesti?.length == 0 ? (
                <>
                  <div>
                    <p>
                      Testimonials are empty, to add testimonials click on the
                      plus icon.
                    </p>
                  </div>
                </>
              ) : (
                <SwiperComponent
                  style={{ cursor: "pointer" }}
                  className="mySwiper"
                  pagination={{
                    clickable: true,
                  }}
                  spaceBetween={10}
                  modules={[Pagination, Navigation]}
                >
                  <div>
                    {AddMoreTesti &&
                      AddMoreTesti.map((items, index) => {
                        return (
                          <>
                            <SwiperSlide key={index}>
                              <div className="swiper-slide review-item position-relative review-item-testimonials d-block">
                                <div className="d-flex align-items-center">
                                  {items?.image?.path ? (
                                    <img
                                      className="case-item__icon"
                                      src={Data?.base_url + items?.image?.path}
                                      alt="testimonials"
                                    />
                                  ) : (
                                    <div className="no-image-testimonia-div">
                                      <FontAwesomeIcon
                                        icon={faUser}
                                        className="text-white"
                                      />
                                    </div>
                                  )}
                                  <div className="pt-0">
                                    <h4
                                      className="title title--h5 text-align-start ml-2 mb-0"
                                      style={{ textAlign: "start" }}
                                    >
                                      {items.name}
                                    </h4>
                                    <p className="text-left ml-2 font-weight-bold m-0">
                                      {items.company_name}
                                    </p>
                                  </div>
                                </div>
                                <div className="review-item__textbox">
                                  <p
                                    id="p_wrap"
                                    className="review-item__caption text-left mb-2 mt-2 content_description"
                                    dangerouslySetInnerHTML={{
                                      __html: items.description,
                                    }}
                                  ></p>
                                  {TitleData?.card_testimonials?.source ==
                                    "2" &&
                                    TitleData?.card_testimonials
                                      ?.in_subscription ? (
                                    <div
                                      className="d-flex align-items-initial mt-3"
                                      style={{ gap: "10px" }}
                                    >
                                      <button
                                        className="send-btnn m-0"
                                        data-toggle="modal"
                                        data-target="#EditTestiModal"
                                        onClick={() =>
                                          handleSetId(
                                            items.id,
                                            items.name,
                                            items.description,
                                            items.company_name,
                                            Data?.base_url + items?.image?.path
                                          )
                                        }
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="delete-button m-0"
                                        onClick={() =>
                                          handleDelteTestimonials(
                                            items.id,
                                            4,
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
                                <p className="text-left mt-3 font-weight-bold">
                                  {items?.reference_contact == null
                                    ? "*Added by you"
                                    : `*Added by ${items.name} (${items.reference_contact})`}
                                </p>
                              </div>
                            </SwiperSlide>
                          </>
                        );
                      })}
                  </div>
                </SwiperComponent>
              )}
              {TitleData?.card_testimonials?.source == "2" &&
                PlanData?.current_plan?.is_expired == false &&
                PlanData?.subscription?.plan_id !== 1 && (
                  <div className="d-flex align-items-start">
                    <input
                      type="checkbox"
                      id="testimonials"
                      className="mt-1"
                      value={
                        MainData?.company_setting?.show_testimonial_button !== 0
                          ? true
                          : false
                      }
                      onChange={(e) => handleGetReview(e.target.checked)}
                      checked={
                        MainData?.company_setting?.show_testimonial_button !== 0
                          ? true
                          : false
                      }
                    />
                    <label
                      for="testimonials"
                      className="ml-2 Varcolor font-weight-bold"
                    >
                      Click the box to allow clients to leave a review.
                    </label>
                  </div>
                )}
            </div>

            <div>
              <label htmlFor="testimonial-password">
                <input
                  type="checkbox"
                  id="testimonial-password"
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
