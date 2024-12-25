"use client";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "@components/Dashboard/Toast";
import Api from "@services/Api";
import { RephraseFromAi } from "@services/Routes";

const ChatbotApp = ({
  OpenModal,
  description,
  setShowshowChatModal,
  ChangeDescription
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [IsTyping, setIsTyping] = useState(false);
  const [InputState, setInputState] = useState("");

  const handleButtonClick = async () => {
    setIsTyping(true);
    try {
      const response = await Api(RephraseFromAi, { content: description })
      if (response.data.status) {
        console.log(response?.data?.data);
        const suggestedText = response.data?.data;
        const suggestionList = suggestedText.split("\n");
        setSuggestions(suggestionList);
        setIsTyping(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChatModal = () => {
    if (description == "") {
      OpenModal(false)
      showToast("please fill the detail to generate the data from ai", 'error')
      return;
    }
    handleButtonClick();
  };

  useEffect(() => {
    handleChatModal()
  }, [OpenModal == true])

  const handleCopyMessage = () => {
    if (InputState == "") {
      showToast("Please select a message", 'error')
    } else {
      showToast("Description updated succesfully", 'success')
      // navigator.clipboard.writeText(InputState.replace(/[0-9]./g, ""));
      ChangeDescription(InputState.replace(/[{|"|}|*]/g, ""))
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
            Update
          </button>
        )}

        {/* <input type="text" className="form-control mt-5" placeholder="Enter about your services" onKeyDown={handleKeyDown} onChange={(e) => setMessages(e.target.value)} /> */}
      </div>
    </>
  );
};

export default ChatbotApp;