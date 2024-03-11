/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleInfo,
  faFloppyDisk,
  faInfo,
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
import { CardData, LoadMoreApi, deleteSection } from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";
import axios from "axios";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";

export default function EditBlogs({
  APIDATA,
  setData,
  AddMoreBlogs,
  TitleData,
  Data,
  setAddMoreBlogs,
  card,
  PaginationData,
  MainData,
  PlanData,
  token,
}) {
  const [Active, setActive] = useState("");
  const [ShowLoader, setShowLoader] = useState("");
  const [ModalId, setModalId] = useState("");
  const [BlogModalId, setBlogModalId] = useState("");
  const [Image, setImage] = useState();
  const [ServicesName, setServicesName] = useState("");
  const [ServicesDescription, setServicesDescription] = useState("");
  const [BlogUrl, setBlogUrl] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [Page, setPage] = useState(2);
  const [LoadMoreData, setLoadMoreData] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [BlogName, setBlogName] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [BlogShow, setBlogShow] = useState(false);
  const handleClose = () => setShow(false);
  const hanldeBlogClose = () => setBlogShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleShowBlog = () => setBlogShow(true);
  const handleEditShow = () => setShowEdit(true);
  const handleBlogShow = () => setBlogShow(true);
  const [showChatModal, setShowshowChatModal] = useState(false);
  const handleCloseshowChatModal = () => setShowshowChatModal(false);
  const handleShowshowChatModal = () => setShowshowChatModal(true);
  const [InputState, setInputState] = useState("");

  useEffect(() => {
    setBlogName(TitleData?.card_blogs?.visible_name);
  }, []);

  const ShowModalID = (id) => {
    setModalId(id);
    handleShowBlog();
  };

  useEffect(() => {
    setActive(TitleData?.card_blogs?.is_active == "1" ? true : false);
  }, [TitleData]);

  const aRef = useRef(null);

  const handleSaveBlogDetail = async (id = null) => {
    setShowLoader(true);
    let data = [];
    let error = false;
    let mess = "";
    if (ServicesName == "" || ServicesDescription == "") {
      error = true;
      mess =
        ServicesName == ""
          ? "Heading field is required"
          : "Description is required";
    } else {
      id !== null
        ? (data = [
            {
              blog_image: Image,
              blog_name: ServicesName,
              blog_description: ServicesDescription,
              blog_url: BlogUrl,
              saved_blog: id,
            },
          ])
        : (data = [
            {
              blog_image: Image,
              blog_name: ServicesName,
              blog_description: ServicesDescription,
              blog_url: BlogUrl,
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
      const response = await Api(CardData, { blogs: data });
      if (response.data.status) {
        APIDATA();
        handleClose();
        handleEditClose();
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
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
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
    handleCanclebtn();
    setShowLoader(false);
    HandleEmptyFeilds();
    var elem = document.getElementById("card_blogs");
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
      confirmButtonColor: "rgb(24 123 249)",
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
        name: "card_blogs",
        visible_name: BlogName,
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
    handleEditShow();
    setBlogModalId(id);
    setServicesName(name);
    setServicesDescription(description);
  };
  const HandleEmptyFeilds = () => {
    // aRef.current.value = null;
    setServicesName("");
    setServicesDescription("");
    setBlogUrl("");
  };
  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
    HandleEmptyFeilds();
  };
  const handleChnageTitle = async () => {
    if (BlogName == "") {
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
        name: "card_blogs",
        visible_name: BlogName,
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

  const handleLoadMore = async () => {
    LoadMoreFunction();
  };

  const LoadMoreFunction = async () => {
    setShowLoader(true);
    const response = await Api(
      LoadMoreApi,
      {},
      "?card_url=" + card + "&type=card_blogs" + "&current_page=" + Page
    );
    if (response.data.status) {
      setLoadMoreData(response?.data?.data?.next_page_data?.next_page_url);
      setShowLoader(false);
      setAddMoreBlogs((prevData) => [
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
              Add {BlogName}
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
              Upload Image (*Recommended Size 347x160)
            </label>
            <input
              type="file"
              name="image"
              className="form-control mb-4 p-1"
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
            <label className="modalFormLable">Url</label>
            <input
              name="name"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={BlogUrl}
              placeholder="url"
              onChange={(e) => setBlogUrl(e.target.value)}
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
              Edit {BlogName}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleCanclebtn}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {AddMoreBlogs &&
            AddMoreBlogs?.map((items, i) => {
              return BlogModalId === items.id ? (
                <div key={i}>
                  <input
                    type="hidden"
                    defaultValue={items.id}
                    name="hiddenId"
                    key={i}
                  />
                  <label className="modalFormLable">
                    Upload Image (*Recommended Size 347x160)
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control mb-4 p-1 mt-1"
                    accept="image/png, image/gif, image/jpeg"
                    style={{ border: "1px solid #ccc" }}
                    // onChange={(evnt) => handleWhatImChange(i, evnt)}
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
                    // onChange={(evnt) => handleWhatImChange(i, evnt)}
                    onChange={(e) => setServicesName(e.target.value)}
                    maxLength="200"
                  ></input>
                  <label className="modalFormLable">Url</label>
                  <input
                    name="url"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1"
                    defaultValue={items.url || ""}
                    placeholder="url"
                    // onChange={(evnt) => handleWhatImChange(i, evnt)}
                    onChange={(e) => setBlogUrl(e.target.value)}
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
                        "Emoji",
                      ],
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

      {/* Detail modal */}
      <Modal show={BlogShow} onHide={handleBlogShow} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              {BlogName}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={hanldeBlogClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {AddMoreBlogs &&
            AddMoreBlogs?.map((item, index) => {
              return ModalId == item.id ? (
                <div>
                  {item?.image?.path ? (
                    <img
                      className="coverr-modal lazyload"
                      src={Data?.base_url + item?.image?.path}
                      alt="blogs"
                    />
                  ) : (
                    <img
                      className="coverr-modal lazyload"
                      src="../static/img/picture-1.jpg"
                      alt="blogs"
                    />
                  )}
                  <p
                    className="mt-3 font-weight-bold mb-3"
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    {item.name}
                  </p>
                  <p
                    id="p_wrap"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  ></p>
                  {item.url !== "" ? (
                    <div className="text-center">
                      <a
                        href={
                          item?.url?.includes("http://") ||
                          item?.url?.includes("https://")
                            ? item?.url
                            : "https://" + item?.url
                        }
                        target="_blank"
                        className="mt-3 send-btnn mx-auto text-center"
                        style={{
                          background: "var(--color)",
                          width: "40%",
                        }}
                      >
                        <i
                          className="fa fa-link mr-2"
                          style={{
                            fontSize: "16px",
                          }}
                        ></i>
                        Visit Site{" "}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
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

      {TitleData?.card_blogs?.source !== 0 ? (
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
          <div className="mt-3 box-content boxxx mb-3" id="card_blogs">
            <div className="pb-2 flex-header">
              <div className="d-flex align-items-baseline">
                {EditFields ? (
                  <input
                    name="years"
                    rows="4"
                    cols="50"
                    className="title-section-input"
                    onChange={(e) => setBlogName(e.target.value)}
                    defaultValue={
                      TitleData &&
                      TitleData?.card_blogs?.visible_name == "card_blogs"
                        ? "card_blogs"
                        : TitleData?.card_blogs?.visible_name
                    }
                    placeholder="Title"
                    maxLength="20"
                  ></input>
                ) : (
                  <>
                    <h5
                      className="title title--h1 first-title title__separate"
                      id="BlogModalTitle"
                    >
                      {BlogName}
                    </h5>
                  </>
                )}
              </div>
              <div>
                {TitleData?.card_blogs?.source == "2" &&
                PlanData?.is_expired == false &&
                PlanData?.subscription?.plan_id !== 1 ? (
                  <div className="d-flex align-items-center">
                    <div class="wrapper">
                      <div class="tooltip">
                        Add your latest insights, updates, and thoughts through
                        your blog.
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

                    {MainData?.company_setting?.maximum_blogs !==
                    PaginationData?.total_blogs ? (
                      <button
                        className="addmore"
                        data-toggle="modal"
                        data-target="#AddMoreBlogModal"
                        onClick={() => handleShow()}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    ) : (
                      <button className="addmore" onClick={handleUpgradePlan}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    )}
                    <>
                      <label className="switch">
                        <input
                          data-status={TitleData.card_blogs?.is_active}
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
            {AddMoreBlogs?.length == 0 ? (
              <div>
                <p className="mt-0">
                  Blogs are empty, To add blogs click on the plus icon and add
                  the blogs.
                </p>
              </div>
            ) : (
              <div className="row">
                {AddMoreBlogs?.length == 1 ? (
                  <div className="pr-0 news-grid w-100">
                    {AddMoreBlogs &&
                      AddMoreBlogs.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="blog-position col-lg-12 pr-0"
                          >
                            <div
                              className="flex-blog row w-100"
                              style={{ gap: "0px" }}
                            >
                              <div className="col-sm-12 col-lg-6 pr-0">
                                <div>
                                  {item?.image?.path ? (
                                    <img
                                      className="coverr lazyload"
                                      src={Data?.base_url + item?.image?.path}
                                      alt="photos"
                                    />
                                  ) : (
                                    <img
                                      className="coverr lazyload"
                                      src="../static/img/picture-1.jpg"
                                      alt="photos"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="col-sm-12 col-lg-6 pr-0">
                                <div className="content-div p-0 mt-3">
                                  <h2 className="title title--h4">
                                    {item.name}
                                  </h2>
                                  <p
                                    id="p_wrap"
                                    className="blogTextHeight text-dark mt-2"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  ></p>
                                  <div className="d-flex align-items-center justify-content-end">
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        cursor: "pointer",
                                      }}
                                      data-toggle="modal"
                                      data-target="#BlogModal"
                                      onClick={() => ShowModalID(item.id)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="user-select-auto mr-2 mt-1"
                                        style={{
                                          fontSize: "22px",
                                          color: "var(--color)",
                                        }}
                                        // onClick={() => handleHitClick(item?.id)}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {TitleData?.card_blogs?.source == "2" &&
                            PlanData?.is_expired == false &&
                            PlanData?.subscription?.plan_id !== 1 ? (
                              <div
                                className="d-flex align-items-center justify-content-start w-100 mb-4 mt-0"
                                style={{ gap: "10px" }}
                              >
                                <button
                                  className="send-btnn m-0"
                                  data-toggle="modal"
                                  data-target="#EditBlogModal"
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
                                    handleDelteBlogs(item.id, 5, Data?.id)
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
                  </div>
                ) : (
                  <div className="news-grid w-100">
                    {AddMoreBlogs &&
                      AddMoreBlogs.map((item, index, { length }) => {
                        return (
                          <div key={index} className="blog-position col-lg-6">
                            <div
                              className={
                                index === 0
                                  ? "flex-blog border-0 w-100 mt-0"
                                  : "flex-blog border-0 w-100 mt-0"
                              }
                            >
                              <div className="w-100">
                                {item?.image?.path ? (
                                  <img
                                    className="coverr lazyload"
                                    src={Data?.base_url + item?.image?.path}
                                    alt="blogs"
                                  />
                                ) : (
                                  <img
                                    className="coverr lazyload"
                                    src="../static/img/picture-1.jpg"
                                    alt="blogs"
                                  />
                                )}
                              </div>
                              <div className="content-div mt-3">
                                <h2 className="title title--h4 mt-2">
                                  {item.name}
                                </h2>
                                <p
                                  id="p_wrap"
                                  dangerouslySetInnerHTML={{
                                    __html: item.description,
                                  }}
                                  className="blogTextHeight mt-2"
                                ></p>
                                <div className="mt-2 d-flex align-items-center justify-content-end">
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      cursor: "pointer",
                                    }}
                                    data-toggle="modal"
                                    data-target="#BlogModal"
                                    onClick={() => ShowModalID(item.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faArrowRight}
                                      className="user-select-auto mr-2"
                                      style={{
                                        fontSize: "19px",
                                        color: "var(--color)",
                                      }}
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                            {TitleData?.card_blogs?.source == "2" &&
                            PlanData?.is_expired == false &&
                            PlanData?.subscription?.plan_id !== 1 ? (
                              <div
                                className="d-flex align-items-center justify-content-start w-100 mb-4 mt-0"
                                style={{ gap: "10px" }}
                              >
                                <button
                                  className="send-btnn m-0"
                                  data-toggle="modal"
                                  data-target="#EditBlogModal"
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
                                    handleDelteBlogs(item.id, 5, Data?.id)
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
                  </div>
                )}
                {PaginationData?.total_blogs !== AddMoreBlogs?.length ? (
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
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
