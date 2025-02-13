"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleInfo,
  faInfo,
  faPenToSquare,
  faPencil,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CardData } from "@services/Routes";
import Api from "@services/Api";
import { Modal } from "react-bootstrap";
import axios from "axios";
import EditDropdown from "./Dropdown";
import { showToast } from "@components/Dashboard/Toast";
import ChatbotApp from "./Chat";

export default function EditAbout({ token, APIDATA, Data, TitleData }) {
  const [TextArea, setTextArea] = useState(false);
  const [Readmore, setReadmore] = useState(false);
  const [Active, setActive] = useState(false);
  const [ShowLoader, setShowLoader] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [AboutMe, setAboutMe] = useState("");
  const [Description, setDescription] = useState("");
  const [showChatModal, setShowshowChatModal] = useState(false);
  const handleCloseshowChatModal = () => setShowshowChatModal(false);
  const handleShowshowChatModal = () => setShowshowChatModal(true);
  const [InputState, setInputState] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setAboutMe(TitleData?.card_description?.visible_name);
    setDescription(Data?.card_description);
  }, []);

  const handleEditAboutt = async () => {
    setShowLoader(true);
    setTextArea(true);
    if (TextArea) {
      setTextArea(false);
    }
    setShowLoader(false);
  };

  useEffect(() => {
    setActive(TitleData?.card_description?.is_active == "1" ? true : false);
    setIsLocked(TitleData?.card_description?.is_locked == "1" ? true : false);
  }, [TitleData]);

  const handleCancle = () => {
    setTextArea(true);
    if (TextArea) {
      setTextArea(false);
    }
  };
  const handleEditAbout = async () => {
    if (Description == null) {
      toast.error("Please fill the description", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (AboutMe == "") {
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
    let DesData = {
      description: Description,
      titles: [
        {
          name: "card_description",
          visible_name: AboutMe,
        },
      ],
    };
    // APIDATA();
    setTextArea(true);
    if (TextArea) {
      setTextArea(false);
    }
    try {
      const response = await Api(CardData, DesData);
      if (response.data.status) {
        APIDATA();
        toast.success("Thank you, your edit has been successful.", {
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
      if (error.request.status === "401") {
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
    setShowLoader(false);
  };
  const HandleReadmore = () => {
    setReadmore(true);
    if (Readmore) {
      setReadmore(false);
    }
  };
  const handleActive = async () => {
    let titles = [
      {
        name: "card_description",
        visible_name: TitleData?.card_description?.visible_name,
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
          setShowLoader(false);
        }
      }
    });
  };


  const handleShowSection = async () => {
    const newValue = !isLocked;
    setIsLocked(newValue);
    let titles = [
      {
        name: "card_description",
        visible_name: TitleData?.card_description?.visible_name,
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
      {TitleData?.card_description?.source !== 0 ? (
        <div className="box-content boxxx" id="card_description">
          <div className="flex-header">
            <div className="d-flex align-items-baseline">
              {TextArea ? (
                <input
                  type="text"
                  name="AboutMe"
                  className="title-section-input"
                  placeholder="About Yourself"
                  onChange={(e) => setAboutMe(e.target.value)}
                  defaultValue={AboutMe || ""}
                  maxLength="20"
                />
              ) : (
                <>
                  <h1 className="title title--h1 first-title title__separate">
                    {TitleData?.card_description?.visible_name}
                  </h1>
                </>
              )}
            </div>
            {TextArea ? (
              <span
                onClick={() => setShowshowChatModal(true)}
                className="ai-btn"
              >
                Generate from AI
                <img
                  src="../static/img/ai.gif"
                  alt="stick"
                  style={{ width: "8%" }}
                />
              </span>
            ) : (
              <div>
                {TitleData?.card_description?.source == "2" ? (
                  <>
                    <div className="web-edit-icons">
                      <div className="d-flex align-items-center">
                        <div class="wrapper">
                          <div class="tooltip">
                            Share a brief overview of your professional
                            background and expertise.
                          </div>
                          {/* <FontAwesomeIcon
                            icon={faInfo}
                            className="mr-4 pe-auto Iconcolor-black cursor-pointer"
                            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                          /> */}
                          <img
                            src="../static/img/info.svg"
                            alt="image"
                            width={18}
                            className="mr-4 cursor-pointer"
                            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                          />
                        </div>

                        {/* </Tooltip> */}
                        <>
                          <FontAwesomeIcon
                            icon={faPencil}
                            onClick={handleEditAboutt}
                            id="a90832"
                            className="pe-auto Iconcolor-black"
                            style={{
                              cursor: "pointer",
                              marginRight: "28px",
                            }}
                          />
                          <label className="switch">
                            <input
                              data-status={
                                TitleData.card_description?.is_active
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
                      <EditDropdown
                        TitleData={TitleData}
                        Active={Active}
                        handleActive={handleActive}
                        setEditFields={""}
                        AddTitle={
                          "Add / Edit " +
                          TitleData?.card_description?.visible_name
                        }
                        handleShowAddModal={handleEditAboutt}
                        setTooltipIsOpen={setTooltipIsOpen}
                        message="Share a brief overview of your professional background and expertise."
                        tooltipIsOpen={tooltipIsOpen}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          {TextArea ? (
            !showChatModal ?
              <div>
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
                  data={Description || ""}
                  onReady={(editor) => { }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                  onBlur={(event, editor) => { }}
                  onFocus={(event, editor) => { }}
                />
                <div
                  className="d-flex align-items-center mt-3"
                  style={{ gap: "10px" }}
                >
                  <button className="send-btnn" onClick={handleEditAbout}>
                    Save
                  </button>
                  <button className="delete-button m-0" onClick={handleCancle}>
                    Cancel
                  </button>
                </div>
              </div> : <ChatbotApp OpenModal={() => setShowshowChatModal(false)} ChangeDescription={setDescription}
                description={Description} setShowshowChatModal={setShowshowChatModal} />
          ) : (
            <>
              {Data?.card_description == null ? (
                <div>
                  <p>
                    About is empty, to add about yourself click on the edit
                    icon.
                  </p>
                </div>
              ) : (
                <div
                  id="p_wrap content_description"
                  className={Readmore ? "card-p " : "card-description"}
                  dangerouslySetInnerHTML={{
                    __html: Data?.card_description,
                  }}
                ></div>
              )}
              {Data?.card_description?.length > "480" &&
                Data?.card_description !== null ? (
                <p
                  className="read-more text-align-end"
                  onClick={HandleReadmore}
                >
                  {Readmore ? (
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-2" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="mr-2 mt-2"
                    />
                  )}
                </p>
              ) : (
                ""
              )}
            </>
          )}
          <div className="mt-4">
            <label htmlFor="password">
              <input
                type="checkbox"
                id="password"
                checked={isLocked}
                onChange={handleShowSection}
              />{" "}
              Private the section
            </label>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
