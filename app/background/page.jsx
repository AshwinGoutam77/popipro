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
import { GetVirtualBackground, HitClickApi } from "@services/Routes";
import Api from "@services/Api";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import html2canvas from 'html2canvas';

export default function page() {
  const canvasRef = useRef(null);
  const [ShowLoader, setShowLoader] = useState(false);
  const [Data, setData] = useState();
  const [Image, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    api();
  }, []);

  const api = async () => {
    setShowLoader(true);
    const response = await Api(GetVirtualBackground, {});
    if (response.data.status) {
      setShowLoader(false);
      setData(response.data.data);
      setImage("data:image/png;base64," + response.data.data?.[0]?.path);
    }
  };

  const shareContact = async () => {
    let text = card?.card_description?.replace(/(<([^>]+)>)/gi, "");
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: "contact-download",
      latitude: Latitude,
      longitude: Longitude,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
      setProfileImage(response.data.data.base_image);

      var contact = {
        website: card?.card_website,
        address: card?.card_address,
        Imagee: response.data.data.base_image?.replace(
          "data:image/png;base64,",
          ""
        ),
        name: card?.first_name,
        phone: card?.card_contact,
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
      // console.log(contact);
      // return;
      // create a vcard file
      var vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:";
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
      vcard += contact.card_website
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
      vcard += contact.links["instagram"]
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
    }
  };

  function capture() {
    const captureDiv = document.getElementById('captureDiv');
    html2canvas(captureDiv).then(canvas => {
      // Create a link to download the captured image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'captured_image.png';

      // Append the link to the body and trigger a click to start the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });
}
  

  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
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
            {/* <img
              src="https://prafullgupta.com/connectwork/assets/chat/groups/17112307150492d8a885-a94a-4ba9-9c26-713086f49b2f.png"
              className="qr-background-image"
            /> */}
            <img
                  src={
                    "https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0A" +
                    imageSrc +
                    "END%3AVCARD%0A"
                  }
                  className="qr-background-image"
                  alt=""
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
          <button onClick={() => capture()} className="contact-btn w-auto text-white">
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
            Data?.map((item, index) => {
              return (
                <>
                  <img
                    src={"data:image/png;base64," + item?.path}
                    alt="image"
                    className="virtual-images"
                    onClick={() => setImage("data:image/png;base64," +item.path)}
                  />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}