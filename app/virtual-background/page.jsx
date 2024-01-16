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
import QR from "qrcode-base64";

export default function page() {
  const canvasRef = useRef(null);
  const [ShowLoader, setShowLoader] = useState(false);
  const [Data, setData] = useState();
  const [Image, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [MainData, setMainData] = useState("");
  const [VirtualBgId, setVirtualBgId] = useState("");

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
          response.data.data?.virtual_background?.[0]?.path
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
      // Create a link to download the captured image
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "captured_image.png";

      // Append the link to the body and trigger a click to start the download
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

      <div className="row m-0">
        <div className="col-sm-12 col-lg-6" id="captureDiv">
          <div className="p-4 position-relative">
            <img
              src={Data?.qrcode_generator}
              className="qr-background-image"
              alt="qr-code"
              style={{ width: "100px", height: "100px" }}
            />
            <img
              src={Image}
              alt="image"
              className="virtal-bg-main-image"
              id="setImage"
            />
          </div>
        </div>

        <div className="col-sm-12 col-lg-6 text-center d-flex align-items-center justify-content-center flex-column">
          <button
            onClick={() => capture()}
            className="contact-btn w-auto text-white"
          >
            Download Background
          </button>
          <p className="mt-4">
            Your custom background will save as a 1920x1080 image.
          </p>
          <a href="https://www.popipro.com/">
            How do I use my popipro background in Zoom
          </a>
        </div>
      </div>

      <div className="px-4 pt-4 pb-4">
        <h5>Featured Backgrounds</h5>

        <div
          className="pt-4 d-flex align-items-center flex-wrap vb-div"
          style={{ gap: "10px" }}
        >
          {Data &&
            Data?.virtual_background?.map((item, index) => {
              return (
                <img
                  src={"data:image/png;base64," + item?.path}
                  alt="image"
                  className="virtual-images"
                  onClick={() => handleVirtualBg(item?.id, item?.path)}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </>
  ) : (
    <SimpleBackdrop visible={ShowLoader} />
  );
}
