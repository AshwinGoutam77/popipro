import Api from "@services/Api";
import { UpdateMetaTags } from "@services/Routes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function MetaTags({
  active,
  handleClose,
  Data,
  APIDATA,
  setMetaDescription,
  MetaDescription,
  setMetaTitle,
  MetaTitle,
  setTitle,
  Title,
  setDescription,
  Description,
}) {
  const [showChatModal, setShowshowChatModal] = useState(false);
  const handleCloseshowChatModal = () => setShowshowChatModal(false);
  const handleShowshowChatModal = () => setShowshowChatModal(true);
  const [InputState, setInputState] = useState("");

  const handleUpdateMetaTags = async () => {
    MetaTitle;
    let payload = {
      meta_title: MetaTitle ? MetaTitle : Title,
      meta_desc: MetaDescription ? MetaDescription : Description,
    };
    const res = await Api(UpdateMetaTags, payload);
    if (res.status) {
      APIDATA();
      handleClose();
      setMetaTitle("");
      setMetaDescription("");
      toast.success(res.data.message, {
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
  const handleCloseModal = () => {
    handleClose();
    setMetaTitle("");
    setMetaDescription("");
  };

  // chatapi code
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
                "Write meta description as " +
                Data.card_profession +
                "in 155 characters and give 5 suggestion",
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
      //   const suggestionData = suggestionList.replace(/[0-9]./g, "");
      setSuggestions(suggestionList);
      setIsTyping(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  let regex = /(<([^>]+)>)/gi;

  const handleChatModal = () => {
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
                  <div key={index} className="mb-4">
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
      <Modal show={active} onHide={() => handleClose("")} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-0"
              id="BlogModalTitle"
            >
              Manage Meta Tags
            </h5>
          </Modal.Title>

          <button
            type="button"
            className="close"
            onClick={() => handleClose("")}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body className="py-3 px-4">
          <div>
            <label>Meta Title</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter meta title"
              defaultValue={
                Data?.meta_title !== null ? Data?.meta_title : Title
              }
              onChange={(e) => setMetaTitle(e.target.value)}
            />
            <div className="d-flex align-items-center justify-content-between">
              <label>Meta Description (Only 150 characters are allowed.)</label>
              {/* <div className="">
                <p
                  onClick={handleChatModal}
                  className="cursor-pointer text-right"
                >
                  Use AI{" "}
                  <img
                    src="../static/img/ai-stick.png"
                    alt="stick"
                    style={{ width: "20%" }}
                  />
                </p>
              </div> */}
            </div>
            <textarea
              name="number"
              placeholder="Enter meta description*"
              className="mt-2 form-control"
              defaultValue={
                Data?.meta_description !== null
                  ? Data?.meta_description?.replace(regex, "")
                  : Description?.replace(regex, "")
              }
              onChange={(e) => setMetaDescription(e.target.value)}
              style={{ minHeight: "100px" }}
              maxlength="150"
              required
            />
            <button
              className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4"
              style={{ padding: "7px 19px" }}
              onClick={handleUpdateMetaTags}
            >
              Save
            </button>
            <button
              className="delete-button w-auto bg-btn7 lnk wow fadeInUp mt-4 ml-2"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
