/* eslint-disable @next/next/no-img-element */
"use client";
import {
  faArrowRight,
  faChevronLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { GetCardSequence, HitClickApi, SaveToken } from "@services/Routes";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseCloudMessaging } from "../../app/firebase";
import localforage from "localforage";
import ExchangeContact from "./ExchangeContact";
import { useAuthContext } from "@context/AuthContext";

const Banner = ({
  profile,
  card,
  subscription,
  CardLinks,
  Titles,
  id,
  MainData,
  referer,
}) => {
  const { Loader } = useAuthContext()
  const divRef = useRef(null);
  const [ProfileImage, setProfileImage] = useState("");
  const [IsVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);
  const [FunctionState, setFunctionState] = useState(false);
  const [OtherLink, setOtherLink] = useState(false)
  const [GoogleReviewState, setGoogleReviewState] = useState(false);
  const [Latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [modalShow, setModalShow] = useState("");
  const [LocalStorageUrl, setLocalStorageUrl] = useState("");

  useEffect(() => {
    if (card || profile) {
      // setLoader(true);
      document.documentElement.style.setProperty("--color", card?.color_code);
      document.documentElement.style.setProperty(
        "--header-color",
        card.banner_color
      );
      document.documentElement.style.setProperty(
        "--themecolor",
        card.background_color
      );
      document.documentElement.style.setProperty(
        "--text-color",
        card?.text_color
      );
    } else {
      // setLoader(false);
    }
    // handleSq();
  }, []);

  useEffect(() => {
    directHitClick();
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [card?.id]);

  const listenToScroll = () => {
    let heightToHideFrom = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      IsVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  let links = [];

  const shareContact = async () => {
    let rawHtml = card?.card_description || "";

    let textWithLineBreaks = rawHtml
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<p[^>]*>/gi, '');

    let decoded = textWithLineBreaks
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'");

    let plainText = decoded.replace(/(<([^>]+)>)/gi, "");

    let escapedText = plainText
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");


    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: "contact-download",
      latitude: await localforage.getItem("latitude"),
      longitude: await localforage.getItem("longitude"),
      fb_token: await localforage.getItem("fcm_token"),
    };

    const response = await Api(HitClickApi, payload);

    if (
      response.data.status ||
      response?.data?.message == "Can not count this hit."
    ) {

      setProfileImage(response.data.data.base_image);

      const parts = (card?.card_address || "").split(",");
      const street = parts[0]?.trim() || "";
      const city = parts[1]?.trim() || "";
      const stateZip = parts[2]?.trim()?.split(" ") || [];
      const state = stateZip.length === 2 ? stateZip[0] : "";
      const zip = stateZip.length === 2 ? stateZip[1] : stateZip[0] || "";
      const country = parts[3]?.trim() || "";


      const contact = {
        website: card?.card_website,
        address: card?.card_address,
        Imagee: response.data.data.base_image?.replace(
          "data:image/png;base64,",
          ""
        ),
        name: card?.first_name,
        phone:
          (card.contact_country_code ? card.contact_country_code : "") +
          (card?.card_contact ? card?.card_contact : "") +
          (card?.contact_extension ? card?.contact_extension : ""),
        email: card.card_email,
        url: "app.popipro.com/" + profile,
        location: card.card_address,
        links: links,
        title: card?.card_profession,
        about: escapedText,
        alternate_no: card?.card_alternate_phone?.map((item) => {
          return item.country_code
            ? item.title + item.country_code + " " + item.number
            : item.title + item.number + " ";
        }),
      };

      // 📱 iOS compatible name formatting
      const nameParts = contact.name?.split(" ") || [];
      const first = nameParts[0] || "";
      const last = nameParts.slice(1).join(" ") || "";

      let vcard = "BEGIN:VCARD\nVERSION:3.0\n";
      vcard += `N:${last};${first};;;\n`;
      vcard += `FN:${contact.name}\n`;
      vcard += `TEL;TYPE=work,voice:${contact.phone}\n`;
      vcard += `EMAIL;CHARSET=UTF-8;type=Email,INTERNET:${contact.email}\n`;
      vcard += `URL;TYPE=Popipro - Digital Business Card:${contact.url}\n`;

      if (contact.Imagee) {
        vcard += `PHOTO;ENCODING=b;TYPE=JPEG:${contact.Imagee}\n`;
      }

      if (contact.website) {
        vcard += `URL;Website URL=UTF-8:${contact.website}\n`;
      }

      let alt_str = card?.card_alternate_phone?.map((item) => {
        return item.country_code
          ? `TEL;TYPE=${item.title},voice:${item.country_code} ${item.number}\n`
          : `TEL;TYPE=${item.title},voice:${item.number}\n`;
      });
      vcard += alt_str?.join("") || "";

      if (contact.address) {
        vcard += `ADR;CHARSET=UTF-8:;;${street};${city};${state};${zip};${country}\n`;
      }

      if (contact.links["Instagram"]) {
        vcard += `URL;type=Instagram:${contact.links["Instagram"]}\n`;
      }
      if (contact.links["Facebook"]) {
        vcard += `URL;type=Facebook:${contact.links["Facebook"]}\n`;
      }
      if (contact.links["Linkedin"]) {
        vcard += `URL;type=Linkedin:${contact.links["Linkedin"]}\n`;
      }
      if (contact.links["Youtube"]) {
        vcard += `URL;type=Youtube:${contact.links["Youtube"]}\n`;
      }
      if (contact.links["Twitter"]) {
        vcard += `URL;type=Twitter:${contact.links["Twitter"]}\n`;
      }
      if (contact.links["Pinterest"]) {
        vcard += `URL;type=Pinterest:${contact.links["Pinterest"]}\n`;
      }

      if (contact.title) {
        vcard += `TITLE:${contact.title}\n`;
      }

      if (contact.about) {
        vcard += `NOTE:${contact.about}\n`;
      }

      vcard += "END:VCARD";

      // const blob = new Blob([vcard], { type: "text/vcard" });
      // const url = URL.createObjectURL(blob);

      // const newLink = document.createElement("a");
      // newLink.download = `${contact.name}.vcf`;
      // newLink.href = url;
      // newLink.click();
      const encodedVcard = encodeURIComponent(vcard);
      const vcfDataUri = `data:text/vcard;charset=utf-8,${encodedVcard}`;

      const newLink = document.createElement("a");
      newLink.href = vcfDataUri;
      newLink.download = `${contact.name}.vcf`;
      document.body.appendChild(newLink);
      newLink.click();
      document.body.removeChild(newLink);


      // setImageSrc(contact.name + contact.phone);
      setModalShow("ExchangeContact");
    }
  };

  const HitClick = async (type, social, id) => {
    let payload = {
      card: card?.id,
      type: social ? social : "card",
      device_id: navigator.userAgent,
      object_base: id ? id : card?.id,
      hit_type: type,
      latitude: Latitude,
      longitude: Longitude,
      fb_token: await localforage.getItem("fcm_token"),
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };

  const directHitClick = async () => {
    let payload = {
      card: id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: id,
      hit_type: "direct",
      referer,
      latitude: await localforage.getItem("latitude"),
      longitude: await localforage.getItem("longitude"),
      fb_token: await localforage.getItem("fcm_token"),
    };

    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };

  if (typeof window === "object") {
    switch (card?.landing_mode) {
      case "save-contact":
        if (!FunctionState) {
          shareContact();
          setFunctionState(true);
        }
        break;
      case "open-google-review":
        if (!GoogleReviewState) {
          window.location.href = card?.card_google_review?.startsWith("http")
            ? card.card_google_review
            : "https://" + card?.card_google_review;
          setGoogleReviewState(true);
        }
        break;
      case "whatsapp":
        window.location = `https://api.whatsapp.com/send?phone=${card?.whatsapp_country_code?.replace(/\+/g, "%2B") || ""
          }${card.whatsapp_number}`;
        break;
      case "open-trustpilot-review":
        if (!GoogleReviewState) {
          window.location.href = card?.card_trustpilot?.startsWith("http")
            ? card.card_trustpilot
            : "https://" + card?.card_trustpilot;
          setGoogleReviewState(true);
        }
        break;
      case "other":
        if (!OtherLink) {
          window.location.href = card?.anonymous_landing_link?.startsWith("http")
            ? card.anonymous_landing_link
            : "https://" + card?.anonymous_landing_link;
          setOtherLink(true);
        }
        break;
    }
  }

  const handleSaveToken = async () => {
    let payload = {
      card_url: profile,
      token: await localforage.getItem("fcm_token"),
      token_type: "web",
    };

    const response = await Api(SaveToken, payload);
    if (response.data.status) {
    }
  };

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await firebaseCloudMessaging.init();
        localStorage.setItem("fcm_token", token);
        const messaging = firebase.messaging();
        messaging.onMessage((payload) => {
          // console.log(payload);
        });
        handleSaveToken();
      } catch (error) {
        console.log(error);
      }
    } else if (permission === "denied") {
      // console.log("we have denied permission!, Please alow the permission.");
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    localforage.setItem("latitude", position.coords.latitude);
    localforage.setItem("longitude", position.coords.longitude);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  useEffect(() => {
    if (MainData?.company_setting?.allow_notification == 1) {
      requestPermission();
    }
    getLocation();
    handleLocal();
  }, []);

  const handleLocal = async () => {
    let LocalUrl = localStorage.getItem("url");
    setLocalStorageUrl(LocalUrl);
  };

  const isNameOrLabelCover = card.card_cover === "name" || (card.card_cover === "label" && card.card_company_logo !== null);
  const isLogoCover = card.card_cover === "logo" && card.card_company_logo?.length !== 0 && card.card_cover !== "banner-logo";

  const renderIcons = () => (
    <div className="fixed-b-icons">
      {!IsVisible && (
        <div id="hide">
          <div className="float float-styles" target="_blank" onClick={shareContact}>
            <FontAwesomeIcon icon={faFloppyDisk} className="ml-1 position-relative right-1px" />
          </div>
        </div>
      )}

      {card.whatsapp_number && (
        <a
          href={`https://api.whatsapp.com/send?phone=${card.whatsapp_country_code?.replace(/\+/g, "%2B") || ""}${card.whatsapp_number}${card.contact_extension?.replace(/\+/g, "%2B") || ""}`}
          className="float"
          target="_blank"
          onClick={() => HitClick("direct")}
        >
          <picture>
            <source type="image/png" srcSet="./static/img/whatsapp.png" />
            <img src="./static/img/whatsapp.png" alt="whatsapp" />
          </picture>
        </a>
      )}

      {card.card_google_review && subscription?.subscription?.plan_id !== 1 && !subscription?.is_expired && (
        <a
          href={card.card_google_review?.includes("http") ? card.card_google_review : `https://${card.card_google_review}`}
          className="float float-styles-2"
          target="_blank"
        >
          <picture>
            <source type="image/png" srcSet="./static/img/google.png" />
            <img src="./static/img/google.png" style={{ width: "30px" }} alt="google" />
          </picture>
        </a>
      )}

      {card.card_trustpilot && subscription?.subscription?.plan_id !== 1 && !subscription?.is_expired && (
        <a href={card.card_trustpilot} className="float" target="_blank" style={{ background: "white" }}>
          <img
            src="../static/img/trustpilot.png"
            style={{ width: "30px", height: "30px", borderRadius: "100px", background: "white" }}
            alt="trustpilot"
          />
        </a>
      )}
    </div>
  );


  const renderContent = () => (
    <div className="pt-0 w-45">
      {card.card_cover !== "name" && card.card_cover !== "label" ? (
        <picture>
          <source type="image/png" srcSet={card.card_header?.logo !== null ? `${card.base_url}${card.card_header?.logo?.path}` : "https://www.popipro.com/assets/images/whiteLogo.png"} />
          <img src={card.card_header?.logo !== null ? `${card.base_url}${card.card_header?.logo?.path}` : "https://www.popipro.com/assets/images/whiteLogo.png"} className="Logo-icon" alt="logo" />
        </picture>
      ) : (
        <h1 className="mt-1" style={{ fontSize: "16px", color: card?.card_header?.label_color }}>
          {card?.card_header?.label}
        </h1>
      )}
    </div>
  );

  const renderLink = () => (
    LocalStorageUrl === profile ?
      <Link href="/dashboard" className={`m-0 ${card.banner_color === "#ffffff" ? "Varcolor" : "text-white"} d-flex align-items-center getCard-a`}><FontAwesomeIcon icon={faChevronLeft} className="ml-2 mr-1 font-weight-bold" /> Dashboard</Link> :
      <Link href={MainData?.company_setting?.agent_details?.website || ""} target="_blank" className={`m-0 ${card.banner_color === "#ffffff" ? "Varcolor" : "text-white"} d-flex align-items-center getCard-a`}>Order PopiCard now <FontAwesomeIcon icon={faArrowRight} className="ml-1 w-15" /></Link>
  );

  return Loader == true ? (
    <>
      <h5 className="d-flex align-items-center justify-content-center text-center main-loader">
        Loading...
      </h5>
    </>
  ) : (
    <>
      <ExchangeContact
        card={card}
        active={modalShow == "ExchangeContact" ? true : false}
        handleClose={setModalShow}
      />
      {isNameOrLabelCover || isLogoCover ? (
        <div className="bgsvg-img d-flex align-items-start justify-content-between">
          {renderIcons()}
          {renderContent()}
          {renderLink()}
        </div>
      ) : (
        <div
          className="bgsvg-img d-flex align-items-start justify-content-between"
          style={{
            backgroundImage: `url('${card.card_cover === "banner-logo" || card.card_cover === "banner-label" || card.card_cover === "banner"
              ? `${card.base_url}${card.card_header?.banner?.path}`
              : `${card.base_url}${card.card_company_logo?.path}`
              }')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {renderIcons()}
          <div className="mt-1">
            {card.card_cover === "banner-logo" || card.card_cover == "logo" ? (
              <picture>
                <source type="image/png" srcSet={card.card_header?.logo?.path !== undefined ? `${card.base_url}${card.card_header?.logo?.path}` : "https://www.popipro.com/assets/images/whiteLogo.png"} />
                <img src={`${card.base_url}${card.card_header?.logo?.path}`} className="Logo-icon" alt="logo" />
              </picture>
            ) : (card.card_cover === "banner-label" || card.card_cover === "label") && (
              <h5 className="mt-1" style={{ fontSize: "16px", color: card?.card_header?.label_color }}>
                {card.card_header?.label || "Popipro"}
              </h5>)
            }
          </div>
          {renderLink()}
        </div>
        )
      }
      {/* LINKS SECTION */}
      <div className="box-content boxxx mb-3 mt-0 d-none">
        <h1 className="title title--h1 first-title title__separate">
          {Titles?.card_social_links?.visible_name}
        </h1>
        <div className="d-flex flex-wrap align-items-center gap-15">
          <div className="d-flex flex-wrap align-items-center gap-15">
            {CardLinks &&
              CardLinks.map((item, i) => {
                links[item?.parent?.platform_name] = item.link;
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
                            <img
                              src={
                                "./static/img/" +
                                item.parent.platform_name.toLowerCase() +
                                ".png"
                              }
                              alt={item.parent.platform_name}
                              style={{
                                width: "50px",
                                borderRadius: "100%",
                              }}
                            />
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
                                style={{
                                  width: "50px",
                                  borderRadius: "100%",
                                }}
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
    </>
  );
};

export default Banner;