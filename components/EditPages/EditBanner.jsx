/* eslint-disable @next/next/no-img-element */
"use client";
import {
  faArrowRight,
  faChevronLeft,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect } from "react";

const EditBanner = ({ Permission, card, subscription, Data, card_url, PlanData }) => {
  useEffect(() => {
    const themeColors = {
      "--color": "#24b1e6",
      "--header-color": "#24b1e6",
      "--themecolor": "#dfeef8",
      "--text-color": "#ffffff",
    };
    Object.entries(themeColors).forEach(([key, value]) =>
      document.documentElement.style.setProperty(key, value)
    );
  }, []);

  const renderIconLink = (url, imgSrc, styles = {}) =>
    url ? (
      <a href={url} className="float" target="_blank" style={styles}>
        <img src={imgSrc} style={{ width: "25px", ...styles }} alt="icon" />
      </a>
    ) : null;

  const renderFixedIcons = () => (
    <div className="fixed-b-icons">
      {card.whatsapp_number && renderIconLink(
        card?.whatsapp_country_code
          ? `https://api.whatsapp.com/send?phone=${card.whatsapp_country_code.replace(/\+/g, "%2B")}${card.whatsapp_number}`
          : `https://api.whatsapp.com/send?phone=${card.whatsapp_number}`,
        "../static/img/whatsapp.png"
      )}
      {PlanData?.current_plan?.plan_name !== "basic" && !PlanData?.is_expired
        ? [
          renderIconLink(Data?.card_google_review, "../static/img/google.png", { background: "white", bottom: "190px" }),
          renderIconLink(Data?.card_trustpilot, "../static/img/trustpilot.png", {
            background: "white",
            borderRadius: "50%",
          }),
        ]
        : null}
      {Data?.is_onboarding === 2 && (
        <Link href={`/${card_url}`}>
          <p className="float" style={{ background: "var(--color)" }}>
            <FontAwesomeIcon icon={faEye} style={{ fontSize: "20px", color: "white" }} />
          </p>
        </Link>
      )}
    </div>
  );

  const renderHeaderContent = () => {
    const { card_cover, base_url, card_company_logo, card_header } = Data;

    if (card_cover === "name" || card_cover === "label") {
      return card_company_logo ? (
        <h5 className="text-white" style={{ fontSize: "16px" }}>
          {card_company_logo}
        </h5>
      ) : null;
    }

    if (card_cover === "banner-logo") {
      return (
        <img src={card?.base_url + card_header?.logo?.path} alt="logo" className="Logo-icon" style={{ width: "110px" }} />
      );
    }

    if (card_cover === "banner-label") {
      return (
        <h5 style={{ fontSize: "16px", color: card_header?.label_color }}>
          {card_header?.label || "Popipro"}
        </h5>
      );
    }

    return card_company_logo ? (
      <img src={base_url + card_company_logo?.path} className="Logo-icon" style={{ width: "120px" }} alt="logo" />
    ) : (
      <h5 className="text-white">Popipro</h5>
    );
  };

  return (
    <div
      className="bgsvg-img d-flex align-items-start justify-content-between"
      style={
        Data.card_cover?.includes("banner")
          ? {
            backgroundImage: `url('${Data.base_url + (Data.card_cover === "banner-logo" || Data.card_cover === "banner-label" ? Data.card_header?.banner?.path : Data.card_company_logo?.path)}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }
          : {}
      }
    >
      {renderFixedIcons()}
      <div className="pt-2">{renderHeaderContent()}</div>
      <Link href="/dashboard">
        <div className="m-0 text-white d-flex align-items-center getCard-a cursor-pointer">
          <FontAwesomeIcon icon={faChevronLeft} className="ml-2 mr-1 font-weight-bold" />
          Dashboard
        </div>
      </Link>
    </div>
  );
};

export default EditBanner;