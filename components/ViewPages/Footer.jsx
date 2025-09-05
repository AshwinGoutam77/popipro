/* eslint-disable eqeqeq */
"use client";
import localforage from "localforage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Footer({ Data, profile, MainData }) {

  const [LocalStorageUrl, setLocalStorageUrl] = useState("");
  const handleLOGOUT = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("url");
    window.location.href = "/login";
  };
  const HandleLogOutPopup = () => {
    Swal.fire({
      title: `Opps! It seems like you are already login with another profile.`,
      icon: "info",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `<p>Logout</p>`,
    }).then((result) => {
      if (result["isConfirmed"]) {
        handleLOGOUT();
      }
    });
  };
  useEffect(() => {
    handleLocal();
  }, []);

  const handleLocal = async () => {
    let LocalUrl = localStorage.getItem("url");
    setLocalStorageUrl(LocalUrl);
  };
  return (
    <>
      <div className="w-100 footer-div text-center">
        {Data?.company_setting?.agent_details?.profile?.path ? <img
          src={Data?.card?.base_url + Data?.company_setting?.agent_details?.profile?.path}
          style={{ width: "110px" }}
          alt="photos"
        /> : <img
          src="https://www.popipro.com/assets/images/whiteLogo.png"
          style={{ width: "110px" }}
          alt="photos"
        />}
        <p className="mb-4 mt-2 footer-para">
          One card to connect, collect, showcase and track{" "}
          <span className="ml-1">
            - revolutionize your network with a tap.{" "}
          </span>
        </p>
        <div
          className="d-flex align-items-center mt-3 justify-content-center"
          style={{ gap: "10px" }}
        >
          <button className="footer-btn">
            <Link
              href={MainData?.company_setting?.request_popicard_url}
              className="text-white"
              target="_blank"
            >
              Get your PopiCard
            </Link>
          </button>
          {/* {card_url !== item ? ( */}
          <Link href={"/login"}>
            <button className="footer-btn text-white">
              {LocalStorageUrl == profile ? (
                <span>Back to Dashboard</span>
              ) : (
                <span>Login to PopiCard</span>
              )}
            </button>
          </Link>
        </div>
        <p className="m-0 mt-4 pb-3 text-center footer-copyright">
          Copyright © 2025 All Rights Reserved.
        </p>
      </div>
    </>
  );
}
