"use client";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "@components/Dashboard/Toast";

const ChatbotApp = ({
  OpenModal,
  description,
  setShowshowChatModal
}) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [IsTyping, setIsTyping] = useState(false);
  const [InputState, setInputState] = useState("");
  const [Messages, setMessages] = useState("")

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
                description +
                "rewrite this sentence and give five suggestions only.",
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
      setSuggestions(suggestionList);
      setIsTyping(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChatModal = () => {
    if (description == "") {
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
    handleButtonClick();
  };

  useEffect(() => {
    handleChatModal()
  }, [OpenModal == true])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleChatModal();
    }
  };

  const handleCopyMessage = () => {
    if (InputState == "") {
      showToast("Please select a message", 'error')
    } else {
      showToast("Message copied succesfully", 'success')
      navigator.clipboard.writeText(InputState.replace(/[0-9]./g, ""));
      setShowshowChatModal(false);
    }
  };

  return (
    <>
      <div className="text-left">
        <button
          type="button"
          className="chat-modal-btn"
          onClick={OpenModal}
        >
          {/* <span aria-hidden="true">&times;</span> */}
          <span aria-hidden="true"> <FontAwesomeIcon icon={faChevronLeft} /> Back to editor</span>
        </button>
      </div>
      <div id="suggestions" className="mt-4">
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
                      index !== 0 && index !== 1 ? "mr-2" : "mr-2"
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

        {/* <input type="text" className="form-control mt-5" placeholder="Enter about your services" onKeyDown={handleKeyDown} onChange={(e) => setMessages(e.target.value)} /> */}
      </div>
    </>
  );
};

export default ChatbotApp;