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
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseCloudMessaging } from "../../app/firebase";
import localforage from "localforage";
import ExchangeContact from "./ExchangeContact";

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
  const [ProfileImage, setProfileImage] = useState("");
  const [IsVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);
  const [Loader, setLoader] = useState(false);
  const [FunctionState, setFunctionState] = useState(false);
  const [GoogleReviewState, setGoogleReviewState] = useState(false);
  const [Latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [modalShow, setModalShow] = useState("");
  const [LocalStorageUrl, setLocalStorageUrl] = useState("");

  const handleSq = async () => {
    const response = await Api(
      GetCardSequence,
      {},
      "?card_url=" + localStorage.getItem("url")
    );
    if (response.data.status) {
      localforage.setItem("arrangeItems", response?.data?.data);
      localStorage.setItem("arrangeItems", response?.data?.data);
    }
  };

  useEffect(() => {
    if (card) {
      setLoader(true);
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
      setLoader(false);
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
    let text = card?.card_description?.replace(/(<([^>]+)>)/gi, "");
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

      var contact = {
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
        about: text,
        alternate_no: card?.card_alternate_phone?.map((item) => {
          return item.country_code
            ? item.title + item.country_code + " " + item.number
            : item.title + item.number + " ";
        }),
      };
      //  (contact);
      // return;
      // create a vcard file
      var vcard = "BEGIN:VCARD\nVERSION:3.0\nN:";
      vcard +=
        contact.name +
        "\nTEL;TYPE=work,voice:" +
        contact.phone +
        "\nEMAIL;CHARSET=UTF-8;type=Email,INTERNET:" +
        contact.email +
        "\nURL;TYPE=Popipro - Digital Business Card:" +
        contact.url;

      vcard += contact.Imagee
        ? "\nPHOTO;ENCODING=b;TYPE=JPEG:" + contact.Imagee
        : "";
      vcard += contact.website
        ? "\nURL;Website URL=UTF-8:" + contact.website
        : "";
      let alt_str = card?.card_alternate_phone?.map((item) => {
        return item.country_code
          ? `\nTEL;TYPE=${item.title},voice:` +
              item.country_code +
              " " +
              item.number +
              ""
          : `\nTEL;TYPE=${item.title},voice:` + item.number + "";
      });
      vcard += alt_str.join("");
      vcard += contact.address ? "\nADR;CHARSET=UTF-8:" + contact.address : "";
      vcard += contact.links["Instagram"]
        ? "\nURL;type=Instagram;Instagram=UTF-8:" + contact.links["Instagram"]
        : "";
      vcard += contact.links["Facebook"]
        ? "\nURL;type=Facebook;Facebook=UTF-8:" + contact.links["Facebook"]
        : "";
      vcard += contact.links["Linkedin"]
        ? "\nURL;type=Linkedin;Linkedin=UTF-8:" + contact.links["Linkedin"]
        : "";
      vcard += contact.links["Youtube"]
        ? "\nURL;type=Youtube;Youtube=UTF-8:" + contact.links["Youtube"]
        : "";
      vcard += contact.links["Twitter"]
        ? "\nURL;type=Twitter;Twitter=UTF-8:" + contact.links["Twitter"]
        : "";
      vcard += contact.links["Pinterest"]
        ? "\nURL;type=Pinterest;Pinterest=UTF-8:" + contact.links["Pinterest"]
        : "";
      vcard += contact.title ? "\nTITLE:" + contact.title : "";

      vcard += contact.about ? "\nNOTE:" + contact.about : "";
      vcard += "\nEND:VCARD";
      // console.log(vcard);
      // return;

      var blob = new Blob([vcard], { type: "text/vcard" });
      var url = URL.createObjectURL(blob);

      const newLink = document.createElement("a");
      newLink.download = contact.name + ".vcf";
      newLink.textContent = contact.name;
      newLink.href = url;

      newLink.click();

      setImageSrc(contact.name + contact.phone);
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

  if (
    typeof window === "object" &&
    FunctionState == false &&
    card?.landing_mode === "save-contact"
  ) {
    shareContact();
    setFunctionState(true);
  } else if (
    typeof window === "object" &&
    card?.landing_mode === "appointment"
  ) {
    var elem = document.getElementById("card_booking");
    elem?.scrollIntoView();
  } else if (
    typeof window === "object" &&
    GoogleReviewState == false &&
    card?.landing_mode === "open-google-review"
  ) {
    typeof window === "object" &&
      (window.location.href =
        card?.card_google_review?.url?.includes("https://") ||
        card?.card_google_review?.url?.includes("http://")
          ? card?.card_google_review
          : "https://" + card?.card_google_review);
    setGoogleReviewState(true);
  } else if (typeof window === "object" && card?.landing_mode === "whatsapp") {
    window.location =
      "https://api.whatsapp.com/send?phone=" + card.card_contact;
  } else if (
    typeof window === "object" &&
    GoogleReviewState == false &&
    card?.landing_mode === "open-trustpilot-review"
  ) {
    typeof window === "object" &&
      (window.location.href =
        card?.card_trustpilot?.includes("https://") ||
        card?.card_trustpilot?.includes("http://")
          ? card?.card_trustpilot
          : "https://" + card?.card_trustpilot);
    setGoogleReviewState(true);
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

  return Loader == false ? (
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
      {card.card_cover === "name" ||
      (card.card_cover === "label" && card?.card_company_logo !== null) ||
      (card?.card_cover === "logo" &&
        card?.card_company_logo?.length !== 0 &&
        card?.card_company_logo?.length !== 0 &&
        card?.card_cover !== "banner-logo") ? (
        <div className="bgsvg-img d-flex align-items-start justify-content-between">
          <div className="fixed-b-icons">
            {!IsVisible && (
              <div id="hide">
                {" "}
                <div
                  className="float float-styles"
                  target="_blank"
                  onClick={shareContact}
                >
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className="ml-1 position-relative right-1px"
                  />
                </div>
              </div>
            )}
            {card.whatsapp_number !== null ? (
              <a
                href={
                  card?.whatsapp_country_code
                    ? "https://api.whatsapp.com/send?phone=" +
                      card?.whatsapp_country_code?.replace(/\+/g, "%2B") +
                      card.whatsapp_number
                    : "https://api.whatsapp.com/send?phone=" +
                      card.whatsapp_number
                }
                className="float"
                target="_blank"
                onClick={() => HitClick("direct")}
              >
                <picture>
                  <source type="image/png" srcSet="./static/img/whatsapp.png" />
                  <img src="./static/img/whatsapp.png" alt="whatsaap" />
                </picture>
              </a>
            ) : (
              ""
            )}
            {card.card_google_review !== null &&
            subscription?.subscription?.plan_id !== 1 &&
            subscription?.subscription !== null &&
            subscription?.is_expired == false ? (
              <a
                href={
                  card?.card_google_review?.url?.includes("https://") ||
                  card?.card_google_review?.url?.includes("http://")
                    ? "https://" + card?.card_google_review
                    : card?.card_google_review
                }
                className="float float-styles-2"
                target="_blank"
              >
                <picture>
                  <source type="image/png" srcSet="./static/img/google.png" />
                  <img
                    src="./static/img/google.png"
                    style={{ width: "30px" }}
                    alt="photos"
                  />
                </picture>
              </a>
            ) : (
              ""
            )}
            {card.card_trustpilot !== null &&
            subscription?.subscription?.plan_id !== 1 &&
            subscription?.subscription !== null &&
            subscription?.is_expired == false ? (
              <a
                href={card.card_trustpilot}
                className="float fs-24"
                target="_blank"
              >
                <picture>
                  <source
                    type="image/png"
                    srcSet="./static/img/trustpilot.png"
                  />
                  <img
                    src="./static/img/trustpilot.png"
                    className="bg-white trustpilot-images"
                    alt="photos"
                  />
                </picture>
              </a>
            ) : (
              ""
            )}
          </div>

          <div className="pt-0 w-45">
            <div>
              {card.card_cover !== "name" && card.card_cover !== "label" ? (
                <picture>
                  <source
                    type="image/png"
                    srcSet={card.base_url + card.card_company_logo?.path}
                  />
                  <img
                    src={card.base_url + card.card_company_logo?.path}
                    className="Logo-icon"
                    alt="logo"
                  />
                </picture>
              ) : (
                <h1
                  className="mt-1"
                  style={{
                    fontSize: "16px",
                    color: card?.card_header?.label_color,
                  }}
                >
                  {card?.card_company_logo}
                </h1>
              )}
            </div>
          </div>
          <div>
            <Link
              href={
                LocalStorageUrl == profile
                  ? "/dashboard"
                  : MainData?.company_setting?.request_popicard_url
              }
              target={LocalStorageUrl == profile ? "" : "_blank"}
              onClick={() => HitClick("order", "card", id)}
              className={
                card.banner_color == "#ffffff"
                  ? "m-0 Varcolor d-flex align-items-center getCard-a"
                  : "m-0 text-white d-flex align-items-center getCard-a"
              }
            >
              {LocalStorageUrl == profile ? (
                <>
                  {" "}
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="ml-2 mr-1 font-weight-bold"
                  />
                  Back To Dashboard
                </>
              ) : (
                <>
                  Order PopiCard now
                  <FontAwesomeIcon icon={faArrowRight} className="ml-1 w-15" />
                </>
              )}
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="bgsvg-img d-flex align-items-start justify-content-between"
          style={{
            backgroundImage: `url('${
              card?.card_cover == "banner-logo" ||
              card?.card_cover == "banner-label"
                ? card?.base_url + card?.card_header?.banner?.path
                : card?.base_url + card?.card_company_logo?.path
            }')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="fixed-b-icons">
            {!IsVisible && (
              <div id="hide">
                {" "}
                <div
                  className="float float-styles"
                  target="_blank"
                  onClick={shareContact}
                >
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className="ml-1 position-relative right-1px"
                  />
                </div>
              </div>
            )}
            {card.whatsapp_number !== null ? (
              <a
                href={
                  card?.whatsapp_country_code
                    ? "https://api.whatsapp.com/send?phone=" +
                      card?.whatsapp_country_code?.replace(/\+/g, "%2B") +
                      card.whatsapp_number
                    : "https://api.whatsapp.com/send?phone=" +
                      card.whatsapp_number
                }
                className="float"
                target="_blank"
                onClick={() => HitClick("direct")}
              >
                <picture>
                  <source type="image/png" srcSet="./static/img/whatsapp.png" />
                  <img src="./static/img/whatsapp.png" alt="whatsaap" />
                </picture>
              </a>
            ) : (
              ""
            )}
            {card.card_google_review !== null &&
            subscription?.subscription?.plan_id !== 1 &&
            subscription?.subscription !== null &&
            subscription?.is_expired == false ? (
              <a
                href={
                  card?.card_google_review?.url?.includes("https://") ||
                  card?.card_google_review?.url?.includes("http://")
                    ? "https://" + card?.card_google_review
                    : card?.card_google_review
                }
                className="float float-styles-2"
                target="_blank"
              >
                <picture>
                  <source type="image/png" srcSet="./static/img/google.png" />
                  <img
                    src="./static/img/google.png"
                    alt="photos"
                    className="w-30"
                  />
                </picture>
              </a>
            ) : (
              ""
            )}
            {card.card_trustpilot !== null &&
            subscription?.subscription?.plan_id !== 1 &&
            subscription?.subscription !== null &&
            subscription?.is_expired == false ? (
              <a
                href={card.card_trustpilot}
                className="float bg-white fs-24"
                target="_blank"
              >
                <picture>
                  <source
                    type="image/png"
                    srcSet="./static/img/trustpilot.png"
                  />
                  <img
                    src="./static/img/trustpilot.png"
                    alt="photos"
                    className="trustpilot-images bg-white"
                  />
                </picture>
              </a>
            ) : (
              ""
            )}
          </div>

          <div className="mt-1">
            <div>
              {card?.card_cover == "banner-logo" ? (
                <picture>
                  <source
                    type="image/png"
                    srcSet={card.base_url + card.card_company_logo?.path}
                  />
                  <img
                    src={card.base_url + card.card_company_logo?.path}
                    className="Logo-icon"
                    alt="logo"
                  />
                </picture>
              ) : card?.card_cover == "banner-label" ? (
                <h5
                  className="mt-1"
                  style={{
                    fontSize: "16px",
                    color: card?.card_header?.label_color,
                  }}
                >
                  {card?.card_header?.label
                    ? card?.card_header?.label
                    : "Popipro"}
                </h5>
              ) : (
                ""
              )}
              {card.card_cover === "name" &&
              Data?.card_company_logo !== null ? (
                <h5
                  className=""
                  style={{
                    fontSize: "16px",
                    color: card?.card_header?.label_color,
                  }}
                >
                  {card?.card_company_logo}
                </h5>
              ) : (card?.card_cover !== "banner" &&
                  card?.card_cover !== "banner-logo" &&
                  card?.card_cover !== "banner-label") ||
                card?.card_company_logo?.length == 0 ? (
                <h5
                  className=""
                  style={{
                    fontSize: "16px",
                    color: card?.card_header?.label_color,
                  }}
                >
                  Popipro
                </h5>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <Link
              href={
                LocalStorageUrl == profile
                  ? "/dashboard"
                  : MainData?.company_setting?.request_popicard_url
              }
              target={LocalStorageUrl == profile ? "" : "_blank"}
              onClick={() => HitClick("order", id, id)}
              className={
                card.banner_color == "#ffffff"
                  ? "m-0 Varcolor d-flex align-items-center getCard-a"
                  : "m-0 text-white d-flex align-items-center getCard-a"
              }
            >
              {LocalStorageUrl == profile ? (
                <>
                  {" "}
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="ml-2 mr-1 font-weight-bold"
                  />
                  Back To Dashboard
                </>
              ) : (
                <>
                  Order PopiCard now
                  <FontAwesomeIcon icon={faArrowRight} className="ml-1 w-15" />
                </>
              )}
            </Link>
          </div>
        </div>
      )}
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
                            {/* <img
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
                            /> */}
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
