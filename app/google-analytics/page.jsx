"use client";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarCheck,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import "../../styles/about.css";

export default function Page() {
  return (
    <>
      <div>
        <div
          className="login-header p-3 text-center d-flex align-items-center justify-content-between"
          style={{ background: "black" }}
        >
          <h5 className="text-white m-0 d-flex align-items-center">
            <FontAwesomeIcon
              icon={faMagnifyingGlassChart}
              className="text-white mr-2"
              width={20}
            />
            Google Analytics
          </h5>
          <Link href="/dashboard">
            <h6 className="text-white m-0">
              {" "}
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-white mr-2"
                width={20}
              />
              Back
            </h6>
          </Link>
        </div>
        <div
          className="w-100 bg-white"
          style={{ height: "calc(100vh - 58px)" }}
        >
          <div className="box-shadow-leads pt-4">
            <table className="insight-table">
              <thead>
                <tr>
                  <th>IP</th>
                  <th>Browser</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Web/ Mobile</th>
                </tr>
              </thead>
              <tbody>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Mobile</td>
                </tr>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Mobile</td>
                </tr>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Web</td>
                </tr>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Mobile</td>
                </tr>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Web</td>
                </tr>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Web</td>
                </tr>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Mobile</td>
                </tr>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Web</td>
                </tr>
                <tr data-column="Message" className="cursor-pointer">
                  <td data-column="name">192.168.1.7</td>
                  <td data-column="name">Chrome</td>
                  <td data-column="created date">30/11/2023</td>
                  <td data-column="created time"> 5:25 PM</td>
                  <td data-column="created web">Mobile</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="w-100 text-center text-white p-2 position-absolute mt-3"
            style={{ bottom: "0", background: "black" }}
          >
            <p> © 2023. All Rights Reserved By Popipro.</p>
          </div>
        </div>
      </div>
    </>
  );
}
