"use client";
import React, { useRef } from "react";

export default function page() {
  const signatureRef = useRef(null);

  const copyToClipboard = () => {
    const signatureElement = signatureRef.current;
    if (signatureElement) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(signatureElement);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
      alert("Signature copied to clipboard!");
    }
  };
  return (
    <div>
      <div>
        <div ref={signatureRef}>
          <img src="https://prafullgupta.com/connectwork/assets/chat/chats/271123023110077fb9df-cb7b-483c-9127-607e47361984.png" alt="image" />
          <button className="contact-btn w-auto">SIGNATURE</button>
        </div>
        <button onClick={copyToClipboard}>Copy Signature</button>
      </div>
    </div>
  );
}
