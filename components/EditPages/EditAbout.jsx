"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleInfo,
  faInfo,
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
  }, [TitleData]);

  const handleCancle = () => {
    setTextArea(true);
    if (TextArea) {
      setTextArea(false);
    }
  };
  const handleEditAbout = async () => {
    if (Description == null) {
      toast.error("Please fill the discription", {
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
    // setShowLoader(true);
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
                Description +
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
    if (Description == "") {
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

      {TitleData?.card_description?.source !== 0 ? (
        <div className="mb-3 box-content boxxx" id="about_us">
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
              <div className="">
                {/* <p
                  onClick={handleChatModal}
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
            ) : (
              <div>
                {TitleData?.card_description?.source == "2" ? (
                  <div className="d-flex align-items-center">
                    <div class="wrapper">
                      <div class="tooltip">
                        Share a brief overview of your professional background
                        and expertise.
                      </div>
                      <FontAwesomeIcon
                        icon={faInfo}
                        className="mr-4 pe-auto Iconcolor-black cursor-pointer"
                        onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                      />
                    </div>

                    {/* </Tooltip> */}
                    <>
                      <FontAwesomeIcon
                        icon={faPencil}
                        onClick={handleEditAboutt}
                        className="pe-auto Iconcolor-black"
                        style={{ cursor: "pointer", marginRight: "28px" }}
                      />
                      <label className="switch">
                        <input
                          data-status={TitleData.card_description?.is_active}
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
            )}
          </div>
          {TextArea ? (
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
                data={Description || ""}
                onReady={(editor) => {}}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
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
            </div>
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
                  id="p_wrap"
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
        </div>
      ) : (
        ""
      )}
    </>
  );
}
