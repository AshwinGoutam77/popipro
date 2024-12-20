"use client";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
const ChatbotApp = ({
  ServicesDescription,
  active,
  handleCloseModal,
  value,
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "",
      sender: "ChatGPT",
    },
  ]);
  const [Loading, setLoading] = useState(false);
  const [CopyMessage, setCopyMessage] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = async (event) => {
    if (!ServicesDescription) {
      toast.error("Please fill the message to generate the data from ai", {
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
    event.preventDefault();
    const newMessage = {
      message: ServicesDescription,
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setInput("");

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    setLoading(true);
    const API_KEY = "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";
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concept like i am 10 year old",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo-0613",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => {
        return setLoading(false), response.json();
      })
      .then((data) => {
        //  (data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
      });
  }

  return (
    <>
      <div className="container text-right">
        <div className="prompt-area">
          <input
            type="text"
            placeholder="Send a message..."
            value={ServicesDescription}
            onChange={handleChange}
            className="d-none"
          />
          <p
            onClick={handleSend}
            data-toggle={ServicesDescription ? "modal" : ""}
            data-target="#chatapimodal"
            className="cursor-pointer"
          >
            Use AI{" "}
            <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatbotApp;
