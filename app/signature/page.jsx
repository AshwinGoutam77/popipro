"use client";
import {
  faAngleLeft,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import "../../styles/about.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "@context/AuthContext";
import RedirectComponent from "@app/RedirectComponent/page";

export default function Signature() {
  const { APIDATA, UserData } = useAuthContext();
  useEffect(() => {
    APIDATA();
    console.log(UserData);
  }, []);
  const signatureRef1 = useRef(null);
  const signatureRef2 = useRef(null);
  const signatureRef3 = useRef(null);
  const signatureRef4 = useRef(null);

  const copyToClipboard = (type) => {
    const signatureElement = type.current;
    if (signatureElement) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(signatureElement);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
      toast.success("Your email signature is copied to clipboard", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RedirectComponent />
      <div className="d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
        <div
          className="login-header p-3 text-center d-flex align-items-center justify-content-between"
          style={{ background: "black" }}
        >
          <h5 className="text-white m-0">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-white mr-2"
              width="20"
            />{" "}
            Email Signature
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
        {/* 
      <div className="row w-100 px-4 pt-4">
        <h6 className="text-center w-100">
          Here are a few examples of email signatures.
          <br /> You can simply click the copy button and then paste them into
          your email inbox.
          <br />
          Or <br />
          See the steps to copy the email signature on{" "}
          <a
            href=" {UserData?.card?.card_website}"
            target="_blank"
            className="VarColor"
          >
            {UserData?.card?.card_website}
          </a>
        </h6>
      </div>

      <div className="row row-gap-4 my-4 mx-0">
        <div className="col-6">
          <div
            style={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <table
              ref={signatureRef1}
              className="signature"
              width="100%"
              cellSpacing="0"
              cellPadding="0"
              border="0"
              style={{
                padding: "32px 0",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              <tbody style={{ display: "flex", alignItems: "center" }}>
                <tr style={{ paddingRight: "30px" }}>
                  <td>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_MODE == "development"
                          ? "https://dev.popipro.com/" +
                          UserData?.card?.profile_picture?.path
                          : "https://admin.popipro.com/" +
                          UserData?.card?.profile_picture?.path
                      }
                      alt="photograph"
                      style={{
                        border: "1px solid white",
                        height: "auto",
                        width: "200px",
                        borderRadius: "100%",
                        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                      }}
                    />
                  </td>
                </tr>
                <tr
                  style={{
                    lineHeight: "0",
                    display: "flex",
                    flexDirection: "column",
                    borderLeft: "1px solid #ccc",
                    paddingLeft: "30px",
                  }}
                >
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {UserData?.card?.first_name}
                  </td>
                  <td>{UserData?.card?.card_profession}</td>
                  <td style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginRight: "5px",
                      }}
                    >
                      Phone:
                    </span>
                    {UserData?.card?.card_contact}
                  </td>
                  <td>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginRight: "5px",
                      }}
                    >
                      Email:
                    </span>
                    {UserData?.card?.card_email}
                  </td>
                  <td>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginRight: "5px",
                        lineHeight: "18px",
                      }}
                    >
                      Address:
                    </span>
                    {UserData?.card?.card_address}
                  </td>
                  <td>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginRight: "5px",
                      }}
                    >
                      Website:
                    </span>
                    {UserData?.card?.card_website}
                  </td>

                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src="./static/img/facebook.png"
                      alt="facebook"
                      style={{ width: "30px" }}
                    />
                    <img
                      src="./static/img/instagram.png"
                      alt="facebook"
                      style={{ width: "30px" }}
                    />
                    <img
                      src="./static/img/linkedin.png"
                      alt="facebook"
                      style={{ width: "30px" }}
                    />
                    <img
                      src="./static/img/twitter.png"
                      alt="facebook"
                      style={{ width: "30px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-6">
          <div
            style={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
            }}
          >
            <table
              ref={signatureRef1}
              className="signature"
              width="100%"
              cellSpacing="0"
              cellPadding="0"
              border="0"
              style={{
                padding: "32px 0",
                fontSize: "13px",
                fontWeight: "500",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <tbody
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <tr style={{ paddingRight: "30px" }}>
                  <td>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_MODE == "development"
                          ? "https://dev.popipro.com/" +
                          UserData?.card?.profile_picture?.path
                          : "https://admin.popipro.com/" +
                          UserData?.card?.profile_picture?.path
                      }
                      alt="photograph"
                      style={{
                        border: "1px solid white",
                        height: "auto",
                        width: "200px",
                        borderTopRightRadius: "30px",
                        borderBottomLeftRadius: "30px",
                        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                      }}
                    />
                  </td>
                </tr>
                <tr
                  style={{
                    lineHeight: "0",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <td
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {UserData?.card?.first_name}
                  </td>
                  <td>{UserData?.card?.card_profession}</td>

                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px",
                    }}
                  >
                    <img
                      src="./static/img/mail-dark.svg"
                      alt="image"
                      width="14"
                      class="mr-1"
                    />

                    {UserData?.card?.card_email}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px",
                    }}
                  >
                    <img
                      src="./static/img/phone-dark.svg"
                      alt="image"
                      width="14"
                      class="mr-1"
                    />

                    {UserData?.card?.card_contact}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px",
                      lineHeight: "18px",
                    }}
                  >
                    <img
                      src="./static/img/location-dark.svg"
                      alt="image"
                      width="14"
                      class="mr-1"
                    />

                    {UserData?.card?.card_address}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px",
                    }}
                  >
                    <img
                      src="./static/img/website.svg"
                      alt="image"
                      width="14"
                      class="mr-1"
                    />

                    {UserData?.card?.card_website}
                  </td>

                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src="./static/img/facebook.png"
                      alt="facebook"
                      style={{ width: "30px" }}
                    />
                    <img
                      src="./static/img/instagram.png"
                      alt="facebook"
                      style={{ width: "30px" }}
                    />
                    <img
                      src="./static/img/linkedin.png"
                      alt="facebook"
                      style={{ width: "30px" }}
                    />
                    <img
                      src="./static/img/twitter.png"
                      alt="facebook"
                      style={{ width: "30px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}

        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-lg-6 border-right">
              <div>
                <label>Name</label>
                <input type="text" className="form-control" />
              </div>
              <div>
                <label>Profession</label>
                <input type="text" className="form-control" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" className="form-control" />
              </div>
              <div>
                <label>Address</label>
                <input type="text" className="form-control" />
              </div>
              <div>
                <label>Contact</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 ">
              <div
                style={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: "20px",
                  borderRadius: "8px",
                  margin: "auto"
                }}
              >
                <table
                  ref={signatureRef1}
                  className="signature"
                  width="100%"
                  cellSpacing="0"
                  cellPadding="0"
                  border="0"
                  style={{
                    padding: "32px 0",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  <tbody style={{ display: "flex", alignItems: "center" }}>
                    <tr style={{ paddingRight: "30px" }}>
                      <td>
                        <img
                          src={
                            process.env.NEXT_PUBLIC_MODE == "development"
                              ? "https://dev.popipro.com/" +
                              UserData?.card?.profile_picture?.path
                              : "https://admin.popipro.com/" +
                              UserData?.card?.profile_picture?.path
                          }
                          alt="photograph"
                          style={{
                            border: "1px solid white",
                            height: "auto",
                            width: "100px",
                            borderRadius: "100%",
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          fontSize: "16px",
                          fontWeight: "00",
                          color: "black",
                          display: 'block',
                          padding: "0"
                        }}
                      >
                        {UserData?.card?.first_name}
                      </td>
                      <td style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        display: 'block',
                        padding: "0"
                      }}>{UserData?.card?.card_profession}</td>
                    </tr>
                    <tr
                      style={{
                        lineHeight: "0",
                        display: "flex",
                        flexDirection: "column",
                        borderLeft: "1px solid #ccc",
                        paddingLeft: "30px",
                      }}
                    >


                      <td style={{ marginTop: "10px" }}>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginRight: "5px",
                          }}
                        >
                          Phone:
                        </span>
                        {UserData?.card?.card_contact}
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginRight: "5px",
                          }}
                        >
                          Email:
                        </span>
                        {UserData?.card?.card_email}
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginRight: "5px",
                            lineHeight: "18px",
                            paddingTop: "0",
                          }}
                        >
                          Address:
                        </span>
                        {UserData?.card?.card_address}
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginRight: "5px",
                            paddingTop: "0"
                          }}
                        >
                          Website:
                        </span>
                        {UserData?.card?.card_website}
                      </td>

                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          src="./static/img/facebook.png"
                          alt="facebook"
                          style={{ width: "30px" }}
                        />
                        <img
                          src="./static/img/instagram.png"
                          alt="facebook"
                          style={{ width: "30px" }}
                        />
                        <img
                          src="./static/img/linkedin.png"
                          alt="facebook"
                          style={{ width: "30px" }}
                        />
                        <img
                          src="./static/img/twitter.png"
                          alt="facebook"
                          style={{ width: "30px" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-100 text-center text-white p-2 mt-0"
          style={{ bottom: "0", background: "black" }}
        >
          <p>© 2023 - 2024. All Rights Reserved By Popipro.</p>
        </div>
      </div >
    </>
  );
}
