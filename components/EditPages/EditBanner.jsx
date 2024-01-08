/* eslint-disable @next/next/no-img-element */
"use client";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faCircleChevronLeft,
  faEye,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect } from "react";

const EditBanner = ({
  Permission,
  card,
  subscription,
  Data,
  card_url,
  PlanData,
}) => {
  useEffect(() => {
    document.documentElement.style.setProperty("--color", card?.color_code);
    document.documentElement.style.setProperty(
      "--header-color",
      card?.banner_color
    );
    document.documentElement.style.setProperty(
      "--themecolor",
      card?.background_color
    );
    document.documentElement.style.setProperty(
      "--text-color",
      card?.text_color
    );
  }, []);

  let isVisible = false;
  return (
    <>
      {Data.card_cover === "name" ||
      (Data.card_cover === "label" && Data?.card_company_logo !== null) ||
      (Data?.card_cover === "logo" &&
        Data?.card_company_logo?.length !== 0 &&
        Data?.card_cover !== "banner-logo") ? (
        <div className="bgsvg-img d-flex align-items-start justify-content-between">
          <div className="fixed-b-icons">
            {Data?.card_trustpilot !== null &&
            PlanData?.current_plan?.plan_name !== "basic" &&
            PlanData?.is_expired == false ? (
              <a
                href={Data?.card_trustpilot}
                className="float"
                target="_blank"
                style={{
                  background: "white",
                }}
              >
                <img
                  src="../static/img/trustpilot.png"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "100px",
                    background: "white",
                  }}
                  alt="photos"
                />
              </a>
            ) : (
              ""
            )}
            {Data?.whatsapp_number !== "" ? (
              <a
                href={
                  "https://api.whatsapp.com/send?phone=" + Data?.whatsapp_number
                }
                className="float"
                target="_blank"
              >
                <img src="../static/img/whatsapp.png" />
              </a>
            ) : (
              ""
            )}
            {Data?.card_google_review !== null &&
            PlanData?.current_plan?.plan_name !== "basic" &&
            PlanData?.is_expired == false ? (
              <a
                href={
                  Data?.card_google_review?.url?.includes("https://") ||
                  Data?.card_google_review?.url?.includes("http://")
                    ? "https://" + Data?.card_google_review
                    : Data?.card_google_review
                }
                className="float"
                target="_blank"
                style={{
                  bottom: "190px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <img
                  src="../static/img/google.png"
                  style={{ width: "25px" }}
                  alt="photos"
                />
              </a>
            ) : (
              ""
            )}
            {Data?.is_onboarding == 2 ? (
              <Link href={"/" + card_url}>
                <p
                  className="float"
                  style={{
                    background: "var(--color)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className="ml-1"
                    style={{
                      position: "relative",
                      right: "1px",
                      fontSize: "20px",
                      color: "white",
                    }}
                  />
                </p>
              </Link>
            ) : (
              ""
            )}
          </div>

          <div className="pt-2">
            <div>
              {Data.card_cover !== "name" && Data.card_cover !== "label" ? (
                <img
                  src={Data?.base_url + Data?.card_company_logo?.path}
                  className="Logo-icon"
                  style={{ width: "120px" }}
                  alt="photos"
                />
              ) : (
                <h5 className="text-white" style={{ fontSize: "16px" }}>
                  {Data?.card_company_logo}
                </h5>
              )}
            </div>
          </div>
          <div>
            <Link href="/dashboard">
              <div
                className={
                  Data?.banner_color == "#ffffff"
                    ? "m-0 Varcolor d-flex align-items-center getCard-a cursor-pointer"
                    : "m-0 text-white d-flex align-items-center getCard-a cursor-pointer"
                }
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="ml-2 mr-1 font-weight-bold"
                />
                Back To Dashboard
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="bgsvg-img d-flex align-items-start justify-content-between"
          style={{
            backgroundImage: `url('${
              Data?.card_cover == "banner-logo" ||
              Data?.card_cover == "banner-label"
                ? Data?.base_url + Data?.card_header?.banner?.path
                : Data?.base_url + Data?.card_company_logo?.path
            }')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="fixed-b-icons">
            {Data?.card_trustpilot !== null &&
            PlanData?.current_plan?.plan_name !== "basic" &&
            PlanData?.is_expired == false ? (
              <a
                href={Data?.card_trustpilot}
                className="float"
                target="_blank"
                style={{
                  background: "white",
                }}
              >
                <img
                  src="../static/img/trustpilot.png"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "100px",
                    background: "white",
                  }}
                  alt="photos"
                />
              </a>
            ) : (
              ""
            )}
            {Data?.whatsapp_number !== null ? (
              <a
                href={
                  "https://api.whatsapp.com/send?phone=" + Data?.whatsapp_number
                }
                className="float"
                target="_blank"
              >
                <img src="../static/img/whatsapp.png" />
              </a>
            ) : (
              ""
            )}
            {Data?.card_google_review !== null &&
            PlanData?.current_plan?.plan_name !== "basic" &&
            PlanData?.is_expired == false ? (
              <a
                href={
                  Data?.card_google_review?.url?.includes("https://") ||
                  Data?.card_google_review?.url?.includes("http://")
                    ? "https://" + Data?.card_google_review
                    : Data?.card_google_review
                }
                className="float"
                target="_blank"
                style={{
                  bottom: "190px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <img
                  src="../static/img/google.png"
                  style={{ width: "25px" }}
                  alt="photos"
                />
              </a>
            ) : (
              ""
            )}
            {Data?.is_onboarding == 2 ? (
              <Link href={"/" + card_url}>
                <p
                  className="float"
                  style={{
                    background: "var(--color)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className="ml-1"
                    style={{
                      position: "relative",
                      right: "1px",
                      fontSize: "20px",
                      color: "white",
                    }}
                  />
                </p>
              </Link>
            ) : (
              ""
            )}
          </div>

          <div className="pt-2">
            <div>
              {Data?.card_cover == "banner-logo" ? (
                <img
                  src={card?.base_url + card?.card_header?.logo?.path}
                  alt="logo"
                  className="Logo-icon"
                  style={{ width: "110px" }}
                />
              ) : Data?.card_cover == "banner-label" ? (
                <h5 className="text-white" style={{ fontSize: "16px" }}>
                  {Data?.card_header?.label
                    ? Data?.card_header?.label
                    : "Popipro"}
                </h5>
              ) : (
                ""
              )}
              {Data.card_cover === "name" &&
              Data?.card_company_logo !== null ? (
                <h5 className="text-white" style={{ fontSize: "16px" }}>
                  {card?.card_company_logo}
                </h5>
              ) : (Data?.card_cover !== "banner" &&
                  Data?.card_cover !== "banner-logo" &&
                  Data?.card_cover !== "banner-label") ||
                Data?.card_company_logo?.length == 0 ? (
                <h5 className="text-white">Popipro</h5>
              ) : (
                ""
              )}
            </div>
          </div>
          <Link href="/dashboard" scroll={false}>
            <div
              className={
                Data?.banner_color == "#ffffff"
                  ? "m-0 Varcolor d-flex align-items-center getCard-a cursor-pointer"
                  : "m-0 text-white d-flex align-items-center getCard-a cursor-pointer"
              }
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="ml-2 mr-1 font-weight-bold"
              />
              Back To Dashboard
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default EditBanner;
