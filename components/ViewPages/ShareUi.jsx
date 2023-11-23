import {
  faChevronLeft,
  faChevronRight,
  faClose,
  faDownload,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";

export default function ShareUi({
  profile,
  active,
  handleCloseUiModal,
  CardLinks,
}) {
  return (
    <Modal show={active} onHide={() => handleCloseUiModal("")} centered>
      <Modal.Header
        className="p-2 d-flex align-items-center px-3"
        style={{ background: "var(--themecolor)" }}
      >
        <Modal.Title>
          <span
            className="title title--h1 mb-0 font-weight-bold"
            id="shareUiModal"
            style={{ fontSize: "16px" }}
          >
            Share This Profile
          </span>
        </Modal.Title>
        <FontAwesomeIcon
          icon={faClose}
          className="user-select-auto mr-2"
          style={{
            fontSize: "13px",
            color: "var(--color)",
            cursor: "pointer",
          }}
          onClick={() => handleCloseUiModal("")}
        />
      </Modal.Header>
      <Modal.Body
        className="text-center d-flex align-items-center flex-column"
        style={{ background: "var(--themecolor)" }}
      >
        <div
          className="bg-white p-3 w-fit qr-div"
          style={{
            background: "white",
            width: "fit-content",
            borderRadius: "10px",
          }}
        >
          <QRCode
            value={"app.popipro.com/" + profile}
            renderAs="svg"
            style={{
              width: "30vmin",
              height: "30vmin",
            }}
          />
        </div>
        <span
          className="mt-4 font-weight-bold"
          style={{ fontSize: "12px", color: "black" }}
        >
          Point your camera at the QR code to view this profile.
        </span>
        <div className="d-flex align-items-center">
          <button
            className="bg-white px-3 py-2 mt-4 border-0 border-round font-weight-bold"
            style={{ borderRadius: "50px", fontSize: "13px" }}
          >
            <FontAwesomeIcon
              icon={faShareAlt}
              className="user-select-auto mr-2"
              style={{
                fontSize: "13px",
                color: "var(--color)",
                cursor: "pointer",
              }}
            />{" "}
            Share this profile
          </button>
          <a
            className="bg-white px-3 py-2 mt-4 border-0 border-round font-weight-bold ml-3 color-black"
            style={{ borderRadius: "50px", fontSize: "13px" }}
            href={`https://app.popipro.com/${profile}`}
            target="_blank"
            download={`https://app.popipro.com/${profile}`}
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="user-select-auto mr-2"
              style={{
                fontSize: "13px",
                color: "var(--color)",
                cursor: "pointer",
              }}
            />{" "}
            Download Qr
          </a>
        </div>
        <span
          className="mt-4 font-weight-bold"
          style={{ fontSize: "12px", color: "black" }}
        >
          Or check my social channels
        </span>

        <div className="d-flex align-items-center mt-4" style={{ gap: "10px" }}>
          {CardLinks &&
            CardLinks.map((item, i) => {
              return item?.link !== null ? (
                <div key={i}>
                  {!item.link?.includes("https://") ? (
                    <Link href={item.link} target="_blank" key={i}>
                      <div
                        className="media-icon-div"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <span className="social-media-icons">
                          <img
                            src={
                              "./static/img/" +
                              item.parent.platform_name.toLowerCase() +
                              ".png"
                            }
                            alt={item.parent.platform_name}
                            style={{
                              width: "40px",
                              borderRadius: "100%",
                            }}
                          />
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <Link href={item.link} target="_blank" key={i}>
                      <div
                        className="media-icon-div"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <span className="social-media-icons">
                          <img
                            src={
                              "./static/img/" +
                              item.parent.platform_name.toLowerCase() +
                              ".png"
                            }
                            alt={item.parent.platform_name}
                            style={{
                              width: "40px",
                              borderRadius: "100%",
                            }}
                          />
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
              ) : (
                ""
              );
            })}
        </div>
      </Modal.Body>
    </Modal>
  );
}
