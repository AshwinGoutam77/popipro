"use client";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { ForgotPassword, ResetPassword } from "@services/Routes";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forgot() {
  const [Email, setEmail] = useState("");
  const [Otp, setOtp] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirm_Password, setConfirm_Password] = useState("");
  const [Confirmation, setConfirmation] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);

  const handlecontinue = async (e) => {
    e.preventDefault();
    if (Email == "") {
      setShowLoader(false);
      toast.error("Email field is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email) == false) {
      setShowLoader(false);
      toast.error("Invalid Email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setbuttonLoader(true);
    try {
      setShowLoader(true);
      let payload = {
        email: Email,
      };
      setShowLoader(true);
      const response = await Api(ForgotPassword, payload);
      if (response.status) {
        setShowLoader(false);
        setConfirmation(true);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setbuttonLoader(false);
    setShowLoader(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (Otp === "") {
      toast.error("Otp is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (Password === "") {
      toast.error("Password is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (Confirm_Password === "") {
      toast.error("Confirm Password is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (Password !== Confirm_Password) {
      toast.error("Password should be match with confirm password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setShowLoader(true);
    try {
      let payload = {
        email: Email,
        otp: Otp,
        password: Password,
        password_confirmation: Confirm_Password,
      };
      const response = await Api(ResetPassword, payload);
      if (response.data.status) {
        window.location.href = "/login";
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setShowLoader(false);
  };

  return (
    <>
      <SimpleBackdrop visible={ShowLoader} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className="login-header p-2 text-center"
        style={{ background: "black" }}
      >
        <img
          src="https://www.popipro.com/assets/images/whiteLogo.png"
          alt="logo"
          className="login-logo"
          style={{ width: "145px" }}
        />
      </div>
      <div className="row login-screen-div w-100 m-0 height-100">
        <div className="banner-login-div col-sm-12 col-lg-6 m-0 p-0 position-relative">
          <img
            src="https://toolapi.devwings.com/assets/chat/chats/2025-07/150725062059popiprologinscreen.jpg"
            alt="logo"
            className="w-100 banner-login-image"
          />
        </div>
        <div className="login-section col-sm-12 col-lg-6 m-0 p-0 mt-4 d-flex align-items-center justify-content-center">
          <div>
            <h3 className="text-center">
              Forgot <span>Password?</span>
            </h3>
            <form className="login-form-section text-center px-5 pt-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {Confirmation ? (
                <>
                  <input
                    type="number"
                    name="number"
                    placeholder="OTP"
                    className="mt-2"
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="mt-2"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    className="mt-2"
                    onChange={(e) => setConfirm_Password(e.target.value)}
                    required
                  />

                  <button
                    className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4"
                    data-wow-delay=".6s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.6s",
                      animationName: "fadeInUp",
                    }}
                    onClick={(e) => handleResetPassword(e)}
                  >
                    Continue
                  </button>
                </>
              ) : (
                ""
              )}
              {buttonLoader ? (
                <button
                  className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4"
                  data-wow-delay=".6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInUp",
                  }}
                  onClick={(e) => handlecontinue(e)}
                >
                  Continue
                </button>
              ) : (
                <>
                  {!Confirmation ? (
                    <button
                      className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4"
                      data-wow-delay=".6s"
                      style={{
                        visibility: "visible",
                        animationDelay: "0.6s",
                        animationName: "fadeInUp",
                      }}
                      onClick={(e) => handlecontinue(e)}
                    >
                      Continue
                    </button>
                  ) : (
                    ""
                  )}
                </>
              )}
              <div className="align-bottom col-sm-12 d-flex justify-content-center text-center mt-3">
                <Link href={"/login"} className="m-2 VarColor">
                  <FontAwesomeIcon icon={faLongArrowLeft} /> Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
