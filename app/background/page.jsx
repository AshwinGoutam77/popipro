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
import { useState } from "react";

export default function page() {
  const [Image, setImage] = useState(
    "https://cdn.hihello.me/NFMZRek9G4ieektJSVWK/backgrounds/6483e1f6-7155-440f-a1d8-7e610c6270ed.jpg-small-background"
  );
  return (
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

      <div className="row w-100">
        <div className="col-sm-12 col-lg-6">
          <div className="p-4 position-relative">
            <img
              src="https://prafullgupta.com/connectwork/assets/chat/groups/17112307150492d8a885-a94a-4ba9-9c26-713086f49b2f.png"
              className="qr-background-image"
            />
            <img
              //   src="https://cdn.hihello.me/NFMZRek9G4ieektJSVWK/backgrounds/6483e1f6-7155-440f-a1d8-7e610c6270ed.jpg-small-background"
              src={Image}
              // width={100}
              alt="image"
              style={{
                boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px ",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        <div className="col-sm-12 col-lg-6 text-center d-flex align-items-center justify-content-center flex-column">
          <a href="" download={Image} className="contact-btn w-auto text-white">
            Download Background
          </a>
          <p className="mt-4">
            Your custom background will save as a 1920x1080 image.
          </p>
          <a href="https://www.popipro.com/">
            How do I use my popipro background in Zoom™?
          </a>
        </div>
      </div>

      <div className="px-4 pt-4 pb-4">
        <h5>Featured Backgrounds</h5>

        <div
          className="pt-4 d-flex align-items-center flex-wrap justify-content-center"
          style={{ gap: "10px" }}
        >
          <img
            src="https://cdn.hihello.me/common/backgrounds/Indoor/9797b06e-aca4-47a0-88e2-5b6d507a6ea8.png-variants/small-background"
            alt="image"
            onClick={() =>
              setImage(
                "https://cdn.hihello.me/common/backgrounds/Indoor/9797b06e-aca4-47a0-88e2-5b6d507a6ea8.png-variants/small-background"
              )
            }
            style={{
              width: "235px",
              height: "200px",
              borderRadius: "10px",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px ",
              cursor: "pointer",
            }}
          />
          <img
            src="https://cdn.hihello.me/common/backgrounds/City/1623a7af-7af0-48d7-be08-b262a2ea6ddc.png-variants/small-background"
            alt="image"
            onClick={() =>
              setImage(
                "https://cdn.hihello.me/common/backgrounds/City/1623a7af-7af0-48d7-be08-b262a2ea6ddc.png-variants/small-background"
              )
            }
            style={{
              width: "235px",
              height: "200px",
              borderRadius: "10px",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px ",
              cursor: "pointer",
            }}
          />
          <img
            src="https://cdn.hihello.me/common/backgrounds/Indoor/88cd4c6b-63d7-4f79-9e62-b70614e60d16.png-variants/small-background"
            alt="image"
            onClick={() =>
              setImage(
                "https://cdn.hihello.me/common/backgrounds/Indoor/88cd4c6b-63d7-4f79-9e62-b70614e60d16.png-variants/small-background"
              )
            }
            style={{
              width: "235px",
              height: "200px",
              borderRadius: "10px",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px ",
              cursor: "pointer",
            }}
          />
          <img
            src="https://cdn.hihello.me/common/backgrounds/Nature/ca97106d-298d-4919-a05a-3a4d231cc5ad.png-variants/small-background"
            alt="image"
            onClick={() =>
              setImage(
                "https://cdn.hihello.me/common/backgrounds/Nature/ca97106d-298d-4919-a05a-3a4d231cc5ad.png-variants/small-background"
              )
            }
            style={{
              width: "235px",
              height: "200px",
              borderRadius: "10px",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px ",
              cursor: "pointer",
            }}
          />
          <img
            src="https://cdn.hihello.me/common/backgrounds/Indoor/e99a2cab-96b4-4cfc-a1ec-e5394168b476.png-variants/small-background"
            alt="image"
            onClick={() =>
              setImage(
                "https://cdn.hihello.me/common/backgrounds/Indoor/e99a2cab-96b4-4cfc-a1ec-e5394168b476.png-variants/small-background"
              )
            }
            style={{
              width: "235px",
              height: "200px",
              borderRadius: "10px",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px ",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div
        className="w-100 text-center text-white p-2 mt-0"
        style={{ bottom: "0", background: "black" }}
      >
        <p> © 2023. All Rights Reserved By Popipro.</p>
      </div>
    </>
  );
}
