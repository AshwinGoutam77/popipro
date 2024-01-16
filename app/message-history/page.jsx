"use client";
import {
  faAngleLeft,
  faAngleRight,
  faChevronRight,
  faDownload,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/about.css";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Page() {
  const [show, setShow] = useState(false);
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  function pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  const handleSearchData = async () => {};
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1 mb-0">
              Users
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShow(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 15px" }}>
          <div className="font-weight-bold color-black history-user-list">
            <p>1. John Doe</p>
            <p>2. John Doe</p>
            <p>3. John Doe</p>
            <p>4. John Doe</p>
            <p>5. John Doe</p>
          </div>
        </Modal.Body>
      </Modal>
      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon
            icon={faMessage}
            className="text-white mr-2"
            width="20"
          />{" "}
          Message History
        </h5>
        <Link href="/address-book">
          <h6 className="text-white m-0">
            {" "}
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-white mr-2"
              width="10"
            />
            Back
          </h6>
        </Link>
      </div>
      <div
        className="d-flex align-items-center flex-column justify-content-between h-100vh w-100 bg-white"
        style={{ height: "calc(100vh - 58px)" }}
      >
        <div className="w-100 mt-4">
          <div className="mx-3">
            <div className="row w-100 m-0 p-0 mb-4 align-items-end">
              <div className="col-6 col-lg-2 p-0 px-2">
                <label className="ml-1">From</label>
                <DatePicker
                  dateFormat="MM/dd/yyyy"
                  selected={StartDate}
                  maxDate={new Date()}
                  onChange={(date) => setStartDate(date)}
                  placeholderText={"End Date"}
                  className="form-control insight-filter w-100"
                />
              </div>
              <div className="col-6 col-lg-2 p-0 px-2">
                <label className="ml-1">To</label>
                <DatePicker
                  dateFormat="MM/dd/yyyy"
                  selected={EndDate}
                  defaultValue={EndDate}
                  onChange={(Date) => setEndDate(Date)}
                  maxDate={new Date()}
                  placeholderText={"End Date"}
                  className="form-control insight-filter w-100"
                />
              </div>
              <div className="col-6 col-lg-2 p-0 px-2">
                <button
                  className="insight-search w-100 mt-3"
                  onClick={handleSearchData}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="box-shadow-leads">
            <table className="insight-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Date</th>
                  <th>Count</th>
                  <th>Message</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => setShow(true)} className="cursor-pointer">
                  <td>Doctors</td>
                  <td>23/11/2024</td>
                  <td>5</td>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="w-100 text-center text-white p-2 mt-3"
          style={{ bottom: "0", background: "black" }}
        >
          <p> © 2024. All Rights Reserved By Popipro.</p>
        </div>
      </div>
    </>
  );
}
