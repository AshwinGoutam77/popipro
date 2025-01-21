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

  if (UserData?.plan?.is_expired == true) {
    window.location.href = '/'
    return
  }
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

      {/* <div
        className="row w-100 pt-4 responsive-row-signature"
        style={{ paddingLeft: "30px" }}
      >
        <div className="col-sm-12 col-lg-6">
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
              background: "white",
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
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol",
              }}
            >
              <tbody>
                <tr>
                  <td
                    width="120"
                    style={{ verticalAlign: "top", padding: "0 16px" }}
                  >
                    <a href="popipro.com" data-external="true">
                      <img
                        alt="Logo"
                        style={{ width: 90, height: "auto", border: 0 }}
                        src={`https://chart.googleapis.com/chart?cht=qr&chl=${
                          "app.popipro.com/" + "prafull-gupta"
                        }&chs=160x160&chld=L|0`}
                        width={90}
                        border={0}
                      />
                    </a>
                  </td>
                  <td
                    style={{ borderLeft: "1px solid #d4d4d4" }}
                    width="16"
                  ></td>
                  <td
                    style={{
                      verticalAlign: "top",
                      textAlign: "left",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        paddingTop: "10px",
                        lineHeight: "0px",
                        color: "#000000",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {UserData?.card?.first_name}
                    </span>
                    <br />
                    <span style={{ marginBottom: "16px" }}>
                      {UserData?.card?.card_profession}
                    </span>
                    <br />
                    <br />
                    <span style={{ color: "#8C8C8C" }}>
                      {UserData?.card?.card_address},
                      <br />
                      Rajasthan, India.
                    </span>
                    <br />
                    <br />
                    <a
                      href="#"
                      data-external="true"
                      style={{ textDecoration: "none", color: "#FF8000" }}
                    >
                      <img
                        width="50%"
                        className="border-0"
                        src="https://konghq.com/wp-content/uploads/2019/03/icn-twitter.png"
                        style={{
                          width: "25px",
                          marginRight: "10px",
                        }}
                      />
                    </a>
                    <a
                      href="#"
                      data-external="true"
                      style={{ textDecoration: "none", color: "#FF8000" }}
                    >
                      <img
                        width="50%"
                        className="border-0"
                        src="https://konghq.com/wp-content/uploads/2019/03/icn-github.png"
                        style={{
                          width: "25px",
                          marginRight: "10px",
                        }}
                      />
                    </a>
                    <a
                      href="#"
                      data-external="true"
                      style={{ textDecoration: "none", color: "#FF8000" }}
                    >
                      <img
                        width="50%"
                        className="border-0"
                        src="https://konghq.com/wp-content/uploads/2019/03/icn-linkedin.png"
                        style={{
                          width: "25px",
                          marginRight: "10px",
                        }}
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      paddingTop: 14,
                      textAlign: "justify",
                      fontSize: "10pt",
                      color: "#929292",
                      maxWidth: 370,
                    }}
                  >
                    {UserData?.card?.card_description.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              className="contact-btn w-auto mt-5"
              data-clipboard-target=".signature"
              onClick={() => copyToClipboard(signatureRef1)}
            >
              Copy Email Signature
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6">
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
              background: "white",
            }}
          >
            <table
              ref={signatureRef2}
              style={{
                width: "100%",
                fontSize: "10pt",
                fontFamily: "Arial, sans-serif",
              }}
              cellSpacing={0}
              cellPadding={0}
              border={0}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      width: 102,
                      fontSize: "10pt",
                      fontFamily: "Arial, sans-serif",
                      borderRight: "1px solid #929292",
                      verticalAlign: "top",
                    }}
                    valign="top"
                  >
                    <img
                      src={
                        process.env.NEXT_PUBLIC_MODE == "development"
                          ? "https://dev.popipro.com/" +
                            UserData?.card?.profile_picture?.path
                          : "https://admin.popipro.com/" +
                            UserData?.card?.profile_picture?.path
                      }
                      alt="photograph"
                      style={{ border: 0, height: "auto", width: 80 }}
                      width={80}
                      border={0}
                    />
                    <p style={{ marginTop: 35, marginBottom: 6, padding: 0 }}>
                      <a href="popipro.com" target="_blank">
                        <img
                          alt="Logo"
                          style={{ width: 90, height: "auto", border: 0 }}
                          src={`https://chart.googleapis.com/chart?cht=qr&chl=${
                            "app.popipro.com/" + "prafull-gupta"
                          }&chs=160x160&chld=L|0`}
                          width={90}
                          border={0}
                        />
                      </a>
                      <br />
                    </p>
                  </td>
                  <td style={{ width: 25 }} />
                  <td
                    style={{
                      width: 243,
                      fontSize: "10pt",
                      color: "#444444",
                      fontFamily: "Arial, sans-serif",
                      verticalAlign: "top",
                    }}
                    valign="top"
                  >
                    <table cellSpacing={0} cellPadding={0} border={0}>
                      <tbody>
                        <tr>
                          <td className="p-0">
                            <strong>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  fontFamily: "Arial, sans-serif",
                                  color: "black",
                                }}
                              >
                                {UserData?.card?.first_name}
                                <br />
                              </span>
                              <span
                                style={{
                                  fontFamily: "Arial, sans-serif",
                                  fontSize: "10pt",
                                  color: "black",
                                }}
                              >
                                {UserData?.card?.card_profession}
                                <br />
                              </span>
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="p-0 pt-0"
                            style={{ fontFamily: "Arial, sans-serif" }}
                          >
                            <span>
                              <span
                                style={{ fontSize: "9pt", color: "#929292" }}
                              >
                                {UserData?.card?.card_contact}
                              </span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-0 pt-0">
                            <a
                              href="mailto:{email}"
                              style={{
                                fontSize: "9pt",
                                color: "#929292",
                                textDecoration: "none",
                              }}
                            >
                              <span
                                style={{
                                  textDecoration: "none",
                                  fontSize: "9pt",
                                  color: "#929292",
                                  fontFamily: "Arial, sans-serif",
                                }}
                              >
                                {UserData?.card?.card_email}
                              </span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-0 pt-0">
                            <span
                              style={{
                                fontSize: "9pt",
                                color: "#929292",
                                fontFamily: "Arial, sans-serif",
                              }}
                            >
                              {" "}
                              <a href="{website}" style={{ color: "#929292" }}>
                                <span
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "9pt",
                                    color: "#929292",
                                    fontFamily: "Arial, sans-serif",
                                  }}
                                >
                                  {UserData?.card?.card_website}
                                </span>
                              </a>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-0">
                            <span
                              style={{
                                fontSize: "10pt",
                                fontFamily: "Arial, sans-serif",
                                color: "#929292",
                              }}
                            >
                              {UserData?.card?.card_address}
                              <span>,</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="p-0 pt-3"
                            style={{ paddingTop: 14, paddingBottom: 14 }}
                          >
                            <span>
                              <a
                                href="https://www.facebook.com/MyCompanyFacebook"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/facebook.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                            <span>
                              <a
                                href="https://twitter.com/MyCompanyTwitter"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/twitter.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                            <span>
                              <a
                                href="https://www.youtube.com/user/MyCompanyChannel"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/youtube.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                            <span>
                              <a
                                href="https://www.linkedin.com/company/mycompanylinkedin"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/linkedin.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                            <span>
                              <a
                                href="https://www.instagram.com/mycompanyinstagram/"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/instagram.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      paddingTop: 14,
                      textAlign: "justify",
                      fontSize: "10pt",
                      color: "#929292",
                      maxWidth: 370,
                    }}
                  >
                    {UserData?.card?.card_description.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="contact-btn w-auto"
              onClick={() => copyToClipboard(signatureRef2)}
            >
              Copy Email Signature
            </button>
          </div>
        </div>
      </div> */}

      {/* <div
        className="row w-100 pt-4 responsive-row-signature pb-4"
        style={{ paddingLeft: "30px" }}
      >
        <div className="col-sm-12 col-lg-6">
          <div
            style={{
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
              background: "white",
            }}
          >
            <table
              ref={signatureRef3}
              style={{
                width: "100%",
                fontSize: "10pt",
                fontFamily: "Arial, sans-serif",
              }}
              cellSpacing={0}
              cellPadding={0}
              border={0}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      width: 102,
                      fontSize: "10pt",
                      fontFamily: "Arial, sans-serif",
                      borderRight: "1px solid #929292",
                      verticalAlign: "top",
                    }}
                    valign="top"
                  >
                    <img
                      src={
                        process.env.NEXT_PUBLIC_MODE == "development"
                          ? "https://dev.popipro.com/" +
                            UserData?.card?.profile_picture?.path
                          : "https://admin.popipro.com/" +
                            UserData?.card?.profile_picture?.path
                      }
                      alt="photograph"
                      style={{ border: 0, height: "auto", width: 80 }}
                      width={80}
                      border={0}
                    />
                    <p style={{ marginTop: 35, marginBottom: 6, padding: 0 }}>
                      <a href="popipro.com" target="_blank">
                        <img
                          alt="Logo"
                          style={{ width: 90, height: "auto", border: 0 }}
                          src={`https://chart.googleapis.com/chart?cht=qr&chl=${
                            "app.popipro.com/" + "prafull-gupta"
                          }&chs=160x160&chld=L|0`}
                          width={90}
                          border={0}
                        />
                      </a>
                      <br />
                    </p>
                  </td>
                  <td style={{ width: 25 }} />
                  <td
                    style={{
                      width: 243,
                      fontSize: "10pt",
                      color: "#444444",
                      fontFamily: "Arial, sans-serif",
                      verticalAlign: "top",
                    }}
                    valign="top"
                  >
                    <table cellSpacing={0} cellPadding={0} border={0}>
                      <tbody>
                        <tr>
                          <td className="p-0">
                            <strong>
                              <span
                                style={{
                                  fontSize: "12pt",
                                  fontFamily: "Arial, sans-serif",
                                  color: "black",
                                }}
                              >
                                {UserData?.card?.first_name}
                                <br />
                              </span>
                              <span
                                style={{
                                  fontFamily: "Arial, sans-serif",
                                  fontSize: "10pt",
                                  color: "black",
                                }}
                              >
                                {UserData?.card?.card_profession}
                                <br />
                              </span>
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="p-0 pt-0"
                            style={{ fontFamily: "Arial, sans-serif" }}
                          >
                            <span>
                              <span
                                style={{ fontSize: "9pt", color: "#929292" }}
                              >
                                {UserData?.card?.card_contact}
                              </span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-0 pt-0">
                            <a
                              href="mailto:{email}"
                              style={{
                                fontSize: "9pt",
                                color: "#929292",
                                textDecoration: "none",
                              }}
                            >
                              <span
                                style={{
                                  textDecoration: "none",
                                  fontSize: "9pt",
                                  color: "#929292",
                                  fontFamily: "Arial, sans-serif",
                                }}
                              >
                                {UserData?.card?.card_email}
                              </span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-0 pt-0">
                            <span
                              style={{
                                fontSize: "9pt",
                                color: "#929292",
                                fontFamily: "Arial, sans-serif",
                              }}
                            >
                              {" "}
                              <a href="{website}" style={{ color: "#929292" }}>
                                <span
                                  style={{
                                    textDecoration: "none",
                                    fontSize: "9pt",
                                    color: "#929292",
                                    fontFamily: "Arial, sans-serif",
                                  }}
                                >
                                  {UserData?.card?.card_website}
                                </span>
                              </a>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-0">
                            <span
                              style={{
                                fontSize: "10pt",
                                fontFamily: "Arial, sans-serif",
                                color: "#929292",
                              }}
                            >
                              {UserData?.card?.card_address}
                              <span>,</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="p-0 pt-3"
                            style={{ paddingTop: 14, paddingBottom: 14 }}
                          >
                            <span>
                              <a
                                href="https://www.facebook.com/MyCompanyFacebook"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/facebook.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                            <span>
                              <a
                                href="https://twitter.com/MyCompanyTwitter"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/twitter.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                            <span>
                              <a
                                href="https://www.youtube.com/user/MyCompanyChannel"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/youtube.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                            <span>
                              <a
                                href="https://www.linkedin.com/company/mycompanylinkedin"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/linkedin.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                            <span>
                              <a
                                href="https://www.instagram.com/mycompanyinstagram/"
                                target="_blank"
                                rel="noopener"
                              >
                                <img
                                  src="../../static/img/instagram.png"
                                  alt="facebook icon"
                                  style={{ border: 0, height: 30, width: 30 }}
                                  width={20}
                                  border={0}
                                />
                              </a>
                              &nbsp;
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="contact-btn w-auto"
              onClick={() => copyToClipboard(signatureRef3)}
            >
              Copy Email Signature
            </button>
          </div>
        </div>

        <div className="col-sm-12 col-lg-6">
          <div
            style={{
              borderRadius: "10px",
              // marginTop: "45px",
              padding: "15px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
              background: "white",
            }}
          >
            <table
              ref={signatureRef4}
              className="signature"
              width="100%"
              cellSpacing="0"
              cellPadding="0"
              border="0"
              style={{
                padding: "32px 0",
                fontSize: "13px",
                fontWeight: "500",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol",
              }}
            >
              <tbody>
                <tr>
                  <td
                    width="120"
                    style={{ verticalAlign: "top", padding: "0 16px" }}
                  >
                    <a href="popipro.com" data-external="true">
                      <img
                        alt="Logo"
                        style={{ width: 90, height: "auto", border: 0 }}
                        src={`https://chart.googleapis.com/chart?cht=qr&chl=${
                          "app.popipro.com/" + "prafull-gupta"
                        }&chs=160x160&chld=L|0`}
                        width={90}
                        border={0}
                      />
                    </a>
                  </td>
                  <td
                    style={{ borderLeft: "1px solid #d4d4d4" }}
                    width="16"
                  ></td>
                  <td
                    style={{
                      verticalAlign: "top",
                      textAlign: "left",
                      color: "#000000",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        paddingTop: "10px",
                        lineHeight: "0px",
                        color: "#000000",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {UserData?.card?.first_name}
                    </span>
                    <br />
                    <span style={{ marginBottom: "16px", color: "#4C4C4C;" }}>
                      {UserData?.card?.card_profession}
                    </span>
                    <br />
                    <br />
                    <span style={{ color: "#8C8C8C" }}>
                      {UserData?.card?.card_address},
                      <br />
                      Rajasthan, India.
                    </span>
                    <br />
                    <br />
                    <a
                      href="#"
                      data-external="true"
                      style={{ textDecoration: "none", color: "#FF8000" }}
                    >
                      <img
                        width="50%"
                        className="border-0"
                        src="https://konghq.com/wp-content/uploads/2019/03/icn-twitter.png"
                        style={{
                          width: "25px",
                          marginRight: "10px",
                        }}
                      />
                    </a>
                    <a
                      href="#"
                      data-external="true"
                      style={{ textDecoration: "none", color: "#FF8000" }}
                    >
                      <img
                        width="50%"
                        className="border-0"
                        src="https://konghq.com/wp-content/uploads/2019/03/icn-github.png"
                        style={{
                          width: "25px",
                          marginRight: "10px",
                        }}
                      />
                    </a>
                    <a
                      href="#"
                      data-external="true"
                      style={{ textDecoration: "none", color: "#FF8000" }}
                    >
                      <img
                        width="50%"
                        className="border-0"
                        src="https://konghq.com/wp-content/uploads/2019/03/icn-linkedin.png"
                        style={{
                          width: "25px",
                          marginRight: "10px",
                        }}
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              className="contact-btn w-auto mt-5"
              data-clipboard-target=".signature"
              onClick={() => copyToClipboard(signatureRef4)}
            >
              Copy Email Signature
            </button>
          </div>
        </div>
      </div> */}

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
      </div>

      <div
        className="w-100 text-center text-white p-2 mt-0"
        style={{ bottom: "0", background: "black" }}
      >
        <p>© 2023 - 2024. All Rights Reserved By Popipro.</p>
      </div>
    </>
  );
}
