"use client";
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import "../../styles/about.css";

export default function Signature() {
  return (
    <>
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
      <div className="row w-100 pt-4" style={{ marginLeft: "2px" }}>
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
              width="600"
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
                        className="border-0 pt-3"
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
              </tbody>
            </table>
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
              width="600"
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
                        className="border-0 pt-3"
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
                    <br />
                    <br />
                    {/* <td
                      style={{
                        padding: "6px 14px",
                        background: " #D3EFDF",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    > */}
                    <a
                      href="#"
                      data-external="true"
                      // style="text-decoration:none;color: #17A956;"
                      className="mt-4"
                    >
                      <span
                        style={{
                          padding: "6px 14px",
                          background: " #D3EFDF",
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginTop: "10px",
                          marginRight: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        Your anouncemment!
                      </span>
                    </a>
                    {/* </td> */}
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
