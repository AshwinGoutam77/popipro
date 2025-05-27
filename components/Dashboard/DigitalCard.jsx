import QRCode from "qrcode.react";
import React from "react";
import { Modal } from "react-bootstrap";
import html2canvas from "html2canvas";
import Link from "@node_modules/next/link";

export default function DigitalCard({ active, handleClose, card_url, Data }) {
  function capture() {
    const captureDiv = document.getElementById("DownloadCard");
    captureDiv.style.backgroundColor = "#fff";
    captureDiv.style.borderRadius = "10px";
    captureDiv.parentElement.style.backgroundColor = "white";

    html2canvas(captureDiv).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "captured_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      captureDiv.style.backgroundColor = "";
      captureDiv.parentElement.style.backgroundColor = "";
    });
  }
  return (
    <div>
      <Modal show={active} onHide={() => handleClose("")} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-0">
              Download Your Business Card
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
        <Modal.Body>
          <div className="text-center">
            <div className="digital-cards-section p-4" id="DownloadCard">
              <QRCode
                value={"front.popipro.com/" + card_url}
                fgColor="#000"
                imageSettings={{
                  src: "../../static/img/brand.png",
                  excavate: true,
                  height: "30",
                  width: "30",
                  borderRadius: "10",
                }}
              />
              <div>
                <h6 className="color-black m-0">{Data?.first_name}</h6>
                <p className="color-black">{Data?.card_profession}</p>

                <p className="mt-4">Popipro</p>
                <p className="">
                  {Data &&
                    Data.contact_country_code &&
                    Data.contact_extension !== null
                    ? Data?.contact_country_code +
                    "-" +
                    Data?.card_contact +
                    "-" +
                    Data?.contact_extension
                    : Data?.contact_country_code
                      ? Data?.contact_country_code + "-" + Data?.card_contact
                      : Data?.card_contact}
                </p>
                <p className="">{Data?.card_email}</p>
                <div className="d-flex flex-wrap align-items-center justify-content-start gap-2 mt-2">
                  {Data?.card_social_links &&
                    Data?.card_social_links.map((item, i) => {
                      return item?.link !== null ? (
                        <div key={i}>
                          {!item.link?.includes("https://") ? (
                            <Link
                              href={item.parent.target_url + item.link}
                              target="_blank"
                              key={i}
                              onClick={() => HitClick("direct", "social", item.id)}
                            >
                              <div className="media-icon-div">
                                <span className="social-media-icons">
                                  <picture>
                                    <source
                                      type="image/png"
                                      srcSet={
                                        "./static/img/" +
                                        item.parent.platform_name.toLowerCase() +
                                        ".png"
                                      }
                                    />
                                    <img
                                      src={
                                        "./static/img/" +
                                        item.parent.platform_name.toLowerCase() +
                                        ".png"
                                      }
                                      alt={item.parent.platform_name}
                                      className="w-25px br-100"
                                    />
                                  </picture>
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <Link
                              href={item.link}
                              target="_blank"
                              key={i}
                              onClick={() => HitClick("direct", "social", item.id)}
                            >
                              <div className="media-icon-div">
                                <span className="social-media-icons">
                                  <picture>
                                    <source
                                      type="image/png"
                                      srcSet={
                                        "./static/img/" +
                                        item.parent.platform_name.toLowerCase() +
                                        ".png"
                                      }
                                    />
                                    <img
                                      src={
                                        "./static/img/" +
                                        item.parent.platform_name.toLowerCase() +
                                        ".png"
                                      }
                                      alt={item.parent.platform_name}
                                      className="w-25px br-100"
                                    />
                                  </picture>
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
              </div>
            </div>
            <button
              className="contact-btn w-auto mt-4"
              onClick={() => capture()}
            >
              Download Digital Card
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
