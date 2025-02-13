/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import {
  faAngleLeft,
  faEnvelope,
  faImage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import "../../styles/about.css";
import { useState, useRef, useEffect } from "react";
import { EditData, GetVirtualBackground, HitClickApi } from "@services/Routes";
import Api from "@services/Api";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import html2canvas from "html2canvas";
import { useAuthContext } from "@context/AuthContext";
import RedirectComponent from "@app/RedirectComponent/page";

export default function page() {
  const [ShowLoader, setShowLoader] = useState(false);
  const [Data, setData] = useState();
  const [Image, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [MainData, setMainData] = useState("");
  const [VirtualBgId, setVirtualBgId] = useState("");
  const [Inputs, setInputs] = useState({
    name: true,
    email: true,
    profession: true,
    location: true
  })

  const handleChange = (event) => {
    const { id, checked } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: checked,
    }));
  };

  useEffect(() => {
    api();
    APIDATA();
  }, []);

  const APIDATA = async () => {
    setShowLoader(true);
    try {
      const response = await Api(
        EditData,
        {},
        "?card_url=" + localStorage.getItem("url")
      );
      if (response.data.status) {
        setShowLoader(false);
        setMainData(response?.data?.data?.card);
        document.documentElement.style.setProperty(
          "--color",
          response.data.data.card.color_code
        );
        document.documentElement.style.setProperty(
          "--themecolor",
          response.data.data.card.background_color
        );
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--color");
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    setShowLoader(false);
  };

  const api = async () => {
    setShowLoader(true);
    const response = await Api(GetVirtualBackground, {});
    if (response.data.status) {
      setShowLoader(false);
      setData(response.data.data);
      setImage(
        "data:image/png;base64," +
        response.data.data?.virtual_background?.[0]?.background?.[0]?.path
      );
      setVirtualBgId(response.data.data?.[0]?.id);
    }
  };

  const handleVirtualBg = (id, path) => {
    setImage("data:image/png;base64," + path);
    setVirtualBgId(id);
  };

  function capture() {
    const captureDiv = document.getElementById("captureDiv");
    html2canvas(captureDiv).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "captured_image.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    HitClick();
  }

  const HitClick = async () => {
    let payload = {
      card: MainData?.id,
      type: "virtual-bg",
      device_id: navigator.userAgent,
      object_base: VirtualBgId,
      hit_type: "direct",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };

  return Data ? (
    <>
      <RedirectComponent />
      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon
            icon={faImage}
            className="text-white mr-2"
            width="20"
          />{" "}
          Virtual Background
        </h5>
        <Link href="/dashboard">
          <h6 className="text-white m-0">
            {" "}
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-white mr-2"
              width="20"
            />
            Back
          </h6>
        </Link>
      </div>

      <div
        className="row m-0"
        style={{ height: "calc(100vh - 58px)", overflow: "hidden" }}
      >
        <div className="col-sm-12 col-lg-6">
          <div className="p-4">
            <div className="position-relative virtual-bg-div" id="captureDiv" style={{ backgroundImage: `url(${Image})` }}>
              <img
                src={Data?.qrcode_generator}
                className="qr-background-image"
                alt="qr-code"
                style={{ width: "100px", height: "100px" }}
              />

              <div>
                {Inputs.name && <p>{MainData && MainData?.first_name}</p>}
                {Inputs.profession && <p>{MainData && MainData?.card_profession}</p>}
                {Inputs.email && <p>{MainData && MainData?.card_email}</p>}
                {Inputs.location && <p>{MainData && MainData?.card_address}</p>}
              </div>

            </div>
            <button
              onClick={() => capture()}
              className="contact-btn w-auto text-white mt-4"
            >
              Download Background
            </button>
            <p className="mt-2 color-black">
              Your custom background will save as a 1920x1080 image.
            </p>
            <a href="https://www.popipro.com/" className="text-decoration-none color-black ">
              How do I use my popipro background in Zoom, Google Meet, Microsoft
              Teams, Livestorm, Zoho Meeting, Vowel, GoToMeeting, Skype, Eyeson etc
            </a>

            <div className="virtual-bg-label-box">
              <div>
                <input
                  type="checkbox"
                  id="name"
                  checked={Inputs.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="profession"
                  checked={Inputs.profession}
                  onChange={handleChange}
                />
                <label htmlFor="profession">Profession</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="email"
                  checked={Inputs.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="location"
                  checked={Inputs.location}
                  onChange={handleChange}
                />
                <label htmlFor="location">Location</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-lg-6 feature-bg-section">
          <div className="p-4 featured-images">
            <h4 className="first-title title__separate text-black">
              Featured Backgrounds
            </h4>
            {Data &&
              Data?.virtual_background?.map((item, index) => {
                return (
                  <div className="pt-1" key={index}>
                    <h5 className="color-black">{item?.name}</h5>
                    <div
                      className="pt-1 pb-3 d-flex align-items-center flex-wrap vb-div"
                      style={{ gap: "10px" }}
                    >
                      {item?.background?.map((i, o) => {
                        return (
                          <img
                            src={"data:image/png;base64," + i?.path}
                            alt="image"
                            className="virtual-images"
                            onClick={() => handleVirtualBg(i?.id, i?.path)}
                            key={o}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* <hr />
      <div className="px-4 pt-4"></div> */}
    </>
  ) : (
    <SimpleBackdrop visible={ShowLoader} />
  );
}
