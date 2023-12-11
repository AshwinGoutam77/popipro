"use client";
import {
  faAngleLeft,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useRef } from "react";
import "../../styles/about.css";
import { ToastContainer, toast } from "react-toastify";

export default function Signature() {
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
          <a href="www.popipro.com" target="_blank" className="VarColor">
            www.popipro.com
          </a>
        </h6>
      </div>

      <div
        className="row w-100 pt-4 responsive-row-signature"
        style={{ paddingLeft: "30px" }}
      >
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
              ref={signatureRef1}
              className="signature"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              // style="padding: 32px 0; font-size:13px;font-weight: 500; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
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
                  {/* <td width="120" style="vertical-align:top;padding:0 16px;"> */}
                  <td
                    width="120"
                    style={{ verticalAlign: "top", padding: "0 16px" }}
                  >
                    <a href="https://konghq.com/" data-external="true">
                      <img
                        width="100%"
                        className="border-0 pt-3 signature-img"
                        src="https://prafullgupta.com/connectwork/assets/chat/groups/17112307150492d8a885-a94a-4ba9-9c26-713086f49b2f.png"
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
                      Prafull Gupta
                    </span>
                    <br />
                    {/* <span style="margin-bottom:16px;color:#4C4C4C;"> */}
                    <span style={{ marginBottom: "16px" }}>
                      Founder at Popipro &{" "}
                      <a
                        href="https://front.popipro.com/prafull-gupta"
                        data-external="true"
                        // style="text-decoration:none;color:#17A956"
                        style={{
                          textDecoration: "none",
                          color: "var(--color)",
                        }}
                      >
                        DevWings
                      </a>
                    </span>
                    <br />
                    <br />
                    <span style={{ color: "#8C8C8C" }}>
                      Vaishali Nagar, Jaipur,
                      <br />
                      Rajasthan, India.
                    </span>
                    {/* <td style={{ fontSize: "12px", fontWeight: "bold" }}> */}
                    <br />
                    <br />
                    <a
                      href="https://front.popipro.com/prafull-gupta"
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
                      href="https://front.popipro.com/prafull-gupta"
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
                      href="https://front.popipro.com/prafull-gupta"
                      data-external="true"
                      // style="text-decoration:none;color: #FF8000;"
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
                    We are a digital transformation consulting and software
                    development company that provides cutting edge engineering
                    solutions. Our team is composed of passionate engineers who
                    think and act as an extension to our customer’s product
                    development teams. At Devwings, we aren’t afraid to get
                    creative when it comes to finding a flexible business model
                    or roll up our sleeves when it comes to debugging that
                    important new product being readied for the production line.
                    we aren’t afraid to get creative when it comes to finding a
                    flexible business model or roll up our sleeves when it comes
                    to debugging that important new product being readied for
                    the production line.
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
                      src="https://admin.popipro.com/assets/user/logos/prafull-gupta-logo-240823072612000000000000820342.jpg?ver=1700643079.314"
                      alt="photograph"
                      style={{ border: 0, height: "auto", width: 80 }}
                      width={80}
                      border={0}
                    />
                    <p style={{ marginTop: 35, marginBottom: 6, padding: 0 }}>
                      <a
                        href="https://www.codetwo.com/email-signatures/"
                        target="_blank"
                      >
                        <img
                          alt="Logo"
                          style={{ width: 90, height: "auto", border: 0 }}
                          src="https://prafullgupta.com/connectwork/assets/chat/groups/17112307150492d8a885-a94a-4ba9-9c26-713086f49b2f.png"
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
                                Prafull Gupta
                                <br />
                              </span>
                              <span
                                style={{
                                  fontFamily: "Arial, sans-serif",
                                  fontSize: "10pt",
                                  color: "black",
                                }}
                              >
                                Founder of popipro
                                <br />
                              </span>
                              <span
                                style={{
                                  fontFamily: "Arial, sans-serif",
                                  fontSize: "10pt",
                                  color: "black",
                                }}
                              >
                                Devwings
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
                                9876543211
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
                                er.prafullgupta@gmail.com
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
                                  www.popipro.com
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
                              Vaishali Nagar, Jaipur
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
                    We are a digital transformation consulting and software
                    development company that provides cutting edge engineering
                    solutions. Our team is composed of passionate engineers who
                    think and act as an extension to our customer’s product
                    development teams. At Devwings, we aren’t afraid to get
                    creative when it comes to finding a flexible business model
                    or roll up our sleeves when it comes to debugging that
                    important new product being readied for the production line.
                    we aren’t afraid to get creative when it comes to finding a
                    flexible business model or roll up our sleeves when it comes
                    to debugging that important new product being readied for
                    the production line.
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
      </div>
      <div
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
                      src="https://admin.popipro.com/assets/user/logos/prafull-gupta-logo-240823072612000000000000820342.jpg?ver=1700643079.314"
                      alt="photograph"
                      style={{ border: 0, height: "auto", width: 80 }}
                      width={80}
                      border={0}
                    />
                    <p style={{ marginTop: 35, marginBottom: 6, padding: 0 }}>
                      <a
                        href="https://www.codetwo.com/email-signatures/"
                        target="_blank"
                      >
                        <img
                          alt="Logo"
                          style={{ width: 90, height: "auto", border: 0 }}
                          src="https://prafullgupta.com/connectwork/assets/chat/groups/17112307150492d8a885-a94a-4ba9-9c26-713086f49b2f.png"
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
                                Prafull Gupta
                                <br />
                              </span>
                              <span
                                style={{
                                  fontFamily: "Arial, sans-serif",
                                  fontSize: "10pt",
                                  color: "black",
                                }}
                              >
                                Founder of popipro
                                <br />
                              </span>
                              <span
                                style={{
                                  fontFamily: "Arial, sans-serif",
                                  fontSize: "10pt",
                                  color: "black",
                                }}
                              >
                                Devwings
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
                                9876543211
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
                                er.prafullgupta@gmail.com
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
                                  www.popipro.com
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
                              Vaishali Nagar, Jaipur
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
                {/* <tr>
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
                    We are a digital transformation consulting and software
                    development company that provides cutting edge engineering
                    solutions. Our team is composed of passionate engineers who
                    think and act as an extension to our customer’s product
                    development teams. At Devwings, we aren’t afraid to get
                    creative when it comes to finding a flexible business model
                    or roll up our sleeves when it comes to debugging that
                    important new product being readied for the production line.
                    we aren’t afraid to get creative when it comes to finding a
                    flexible business model or roll up our sleeves when it comes
                    to debugging that important new product being readied for
                    the production line.
                  </td>
                </tr> */}
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
              cellspacing="0"
              cellpadding="0"
              border="0"
              // style="padding: 32px 0; font-size:13px;font-weight: 500; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
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
                  {/* <td width="120" style="vertical-align:top;padding:0 16px;"> */}
                  <td
                    width="120"
                    style={{ verticalAlign: "top", padding: "0 16px" }}
                  >
                    <img
                      className="border-0 pt-3 signature-img"
                      src="https://prafullgupta.com/connectwork/assets/chat/groups/17112307150492d8a885-a94a-4ba9-9c26-713086f49b2f.png"
                    />
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
                      Prafull Gupta
                    </span>
                    <br />
                    {/* <span style="margin-bottom:16px;color:#4C4C4C;"> */}
                    <span style={{ marginBottom: "16px", color: "#4C4C4C;" }}>
                      Founder at Popipro & DevWings{" "}
                      <a
                        href="https://front.popipro.com/prafull-gupta"
                        data-external="true"
                        // style="text-decoration:none;color:#17A956"
                        style={{ textDecoration: "none", color: "#17A956" }}
                      >
                        DevWings
                      </a>
                    </span>
                    <br />
                    <br />
                    <span style={{ color: "#8C8C8C" }}>
                      Vaishali Nagar, Jaipur,
                      <br />
                      Rajasthan, India.
                    </span>
                    {/* <td style={{ fontSize: "12px", fontWeight: "bold" }}> */}
                    <br />
                    <br />
                    <a
                      href="https://front.popipro.com/prafull-gupta"
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
                      href="https://front.popipro.com/prafull-gupta"
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
                      href="https://front.popipro.com/prafull-gupta"
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
