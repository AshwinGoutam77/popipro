"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFloppyDisk,
  faInfo,
  faLock,
  faPencil,
  faPlus,
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

  // useEffect(() => {
  //   handelOpenTesti();
  // }, []);
  useEffect(() => {
    setTestiName(TitleData?.card_testimonials?.visible_name);
  }, []);

  useEffect(() => {
    setActive(TitleData?.card_testimonials?.is_active == "1" ? true : false);
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
      console.log(error);
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
    console.log(data);
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

  const handleSetId = (id, name, description, company) => {
    handleEditShow();
    setModalId(id);
    setServicesName(name);
    setServicesDescription(description);
    setCompanyName(company);
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
      {/* Add More MODAL */}
      <Modal show={show} onHide={handleCanclebtn} centered>
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
          <div>
            <label className="modalFormLable">
              Upload Image (*Prefered size in ration of 100x100)
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
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setServicesName(e.target.value)}
            ></input>
            <label className="modalFormLable">Company Name</label>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={CompanyName || ""}
              placeholder="Company Name"
              style={{ height: "40px", border: "1px solid #ccc" }}
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
            <div className="d-flex align-items-center justify-content-between">
              <label className="modalFormLable">Description*</label>
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
            <button className="send-btnn" onClick={() => handleSaveTesti()}>
              Save
            </button>
            <button className="delete-button m-0" onClick={handleClose}>
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
                    <div>
                      <input
                        type="hidden"
                        defaultValue={items.id}
                        name="hiddenId"
                        key={i}
                      />
                      <label className="modalFormLable">
                        Upload Image (*Prefered size in ration of 100x100)
                      </label>
                      <input
                        type="file"
                        name="image"
                        className="form-control mb-4 p-1"
                        accept="image/png, image/gif, image/jpeg"
                        style={{ border: "1px solid #ccc" }}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <label className="modalFormLable">Heading*</label>
                      <input
                        name="name"
                        rows="4"
                        cols="50"
                        className="form-control mb-4"
                        defaultValue={items.name || ""}
                        placeholder="Heading"
                        style={{ height: "40px", border: "1px solid #ccc" }}
                        onChange={(e) => setServicesName(e.target.value)}
                      ></input>
                      <label className="modalFormLable">Company Name</label>
                      <input
                        name="name"
                        rows="4"
                        cols="50"
                        className="form-control mb-4"
                        defaultValue={items.company_name || ""}
                        placeholder="Company Name"
                        style={{ height: "40px", border: "1px solid #ccc" }}
                        onChange={(e) => setCompanyName(e.target.value)}
                      ></input>
                      <div className="d-flex align-items-center justify-content-between">
                        <label className="modalFormLable">Description*</label>
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
                          onClick={() => handleSaveTesti(items.id)}
                        >
                          Update
                        </button>
                        <button
                          className="delete-button m-0"
                          onClick={handleEditClose}
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

      {TitleData?.card_testimonials?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
          ) : (
            ""
          )}
          <div className="mt-3 box-content boxxx" id="card_testimonials">
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
                  PlanData?.is_expired == false &&
                  PlanData?.subscription?.plan_id !== 1 ? (
                    <div className="d-flex align-items-center">
                      <div class="wrapper">
                        <div class="tooltip">
                          Here you can show testimonials, reviews, feedbacks
                          etc. Make sure to tick the get review button.
                        </div>
                        <FontAwesomeIcon
                          icon={faInfo}
                          className="mr-2 pe-auto Iconcolor-black cursor-pointer"
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
                        {MainData?.company_setting?.maximum_testimonials <=
                        AddMoreTesti?.length ? (
                          <button
                            className="addmore"
                            onClick={() => handleShow()}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        ) : (
                          <button
                            className="addmore"
                            // data-toggle="modal"
                            // data-target="#AddMoreTestiModal"
                            onClick={() => handleShow()}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        )}
                        <label className="switch">
                          <input
                            data-status={TitleData.card_testimonials?.is_active}
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
                                    <img
                                      className="case-item__icon"
                                      src="../static/img/demo.jpg"
                                      alt="testimonials"
                                      style={{ borderRadius: "100%" }}
                                    />
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
                                    className="review-item__caption text-left mb-2 mt-2"
                                    dangerouslySetInnerHTML={{
                                      __html: items.description,
                                    }}
                                  ></p>
                                  {TitleData?.card_testimonials?.source ==
                                    "2" &&
                                  PlanData?.is_expired == false &&
                                  PlanData?.subscription?.plan_id !== 1 ? (
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
                                            items.company_name
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
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
