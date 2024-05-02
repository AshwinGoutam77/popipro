import LoadingText from "@components/ViewPages/LoadingText";
import { faChevronRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal } from "react-bootstrap";

export default function Notification({
  active,
  handleClose,
  Message,
  setMessage,
  AccurateUsersList,
  setShowList,
  handleSendNotification,
  ShowLoader,
}) {
  return (
    <Modal show={active} onHide={() => handleClose("")} centered>
      <Modal.Header>
        <Modal.Title>
          <h5 className="title title--h1 first-title title__separate mb-0">
            Send Notification
          </h5>
        </Modal.Title>

        <button type="button" className="close" onClick={() => handleClose("")}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close alert</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <div className="notification-form-div bg-white">
          <div className="notification-message-div">
            <label className="ml-1">
              Write Message *(Maximum limit 100 word)
            </label>
            <textarea
              type="password"
              name="number"
              placeholder="Enter Message*"
              className="mt-2 form-control"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ minHeight: "100px" }}
              required
            />
            <p className="color-black mt-2">
              This message will recieve by {AccurateUsersList?.accurate}{" "}
              (accurate users) + {AccurateUsersList?.anonymous} (anonymous
              users){" "}
              <span
                className="ml-2 font-weight-bold VarColor cursor-pointer"
                onClick={() => setShowList(true)}
              >
                Get List <FontAwesomeIcon icon={faChevronRight} width={7} />
              </span>
            </p>
            {!ShowLoader ? (
              <button
                className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4"
                onClick={() => handleSendNotification()}
              >
                Send Notification
              </button>
            ) : (
              <button class="send-btnn" disabled>
                <FontAwesomeIcon icon={faSpinner} className="spinner-fa" />
                <LoadingText />
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
