"use client";
import {
  faAddressBook,
  faAngleLeft,
  faChevronLeft,
  faChevronRight,
  faHomeAlt,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../styles/about.css";
import "../../styles/edit.css";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";

export default function Page() {
  const [showContact, setShowContact] = useState(false);
  const [ShowSendMessage, setShowSendMessage] = useState(false);
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [DataTables, setDataTables] = useState([]);

  const getDataTable = async () => {
    setDataTables([
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
      {
        Name: "Tester",
        Date: "23 / 11 / 2023",
        Message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        Number: "9874563210",
      },
    ]);
  };

  const column = [
    {
      name: "Name",
      selector: (row) => row.Name,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
    },
    {
      name: "Contact No.",
      selector: (row) => row.Number,
    },
    {
      name: "Message",
      selector: (row) => row.Message,
    },
    {
      name: "",
      selector: (row) => (
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => setShow(true)}
          className="cursor-pointer"
        />
      ),
    },
  ];

  useEffect(() => {
    getDataTable();
  }, []);

  const handleSearchData = async () => {};
  return (
    <>
      <Modal show={showContact} onHide={() => setShowContact(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 class="title title--h1 first-title title__separate mb-1 mb-0">
              Add Contact
            </h5>
          </Modal.Title>
          <button
            type="button"
            class="close"
            onClick={() => setShowContact(false)}
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 15px" }}>
          <label className="modalFormLable">Contact Name*</label>
          <input
            name="name"
            rows="4"
            cols="50"
            className="form-control mb-4 mt-1 rounded-0"
            placeholder=""
            style={{ height: "40px", border: "1px solid #ccc" }}
          ></input>
          <label className="modalFormLable">Contact Number*</label>
          <input
            type="number"
            name="text"
            rows="4"
            cols="50"
            className="form-control mb-4 mt-1 rounded-0"
            placeholder=""
            style={{ height: "40px", border: "1px solid #ccc" }}
          ></input>
          <button className="contact-btn w-auto mb-2">Save Contact</button>
        </Modal.Body>
      </Modal>
      <Modal
        show={ShowSendMessage}
        onHide={() => setShowSendMessage(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Send message
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowSendMessage(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 15px" }}>
          <label className="modalFormLable">
            Send message to selected users*
          </label>
          <textarea
            name="name"
            rows="4"
            cols="50"
            className="form-control mt-1 rounded-0"
            placeholder=""
            style={{ height: "140px", border: "1px solid #ccc" }}
          ></textarea>
          <div className="mb-2">
            <button className="contact-btn w-auto">Send Message</button>
          </div>
        </Modal.Body>
      </Modal>
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
          <div className="leads-custom-table mb-1">
            <div className="d-flex align-items-start">
              <p className="w-100 font-weight-bold">Property Name</p>
              <p className="w-100">Emerald Oasis Mansion</p>
            </div>
            <div className="d-flex align-items-start">
              <p className="w-100 font-weight-bold">Location</p>
              <p className="w-100">Jaipur</p>
            </div>
            <div className="d-flex align-items-start">
              <p className="w-100 font-weight-bold">Contact Number</p>
              <p className="w-100">9876543210</p>
            </div>
            <div className="d-flex align-items-start">
              <p className="w-100 font-weight-bold">Date</p>
              <p className="w-100">23/11/2023</p>
            </div>
            <div className="d-flex align-items-start">
              <p className="w-100 font-weight-bold">Message</p>
              <p className="w-100">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.{" "}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon
            icon={faHomeAlt}
            className="text-white mr-2"
            width="20"
          />{" "}
          Real Estate
        </h5>
        <Link href="/dashboard">
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
        <div className="w-100">
          <div className="mx-3 mt-3">
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
                <label className="ml-1">Property</label>
                <select className="form-control insight-filter w-100">
                  <option>Emerald Oasis Mansion</option>
                  <option>Emerald Oasis Mansion</option>
                  <option>Emerald Oasis Mansion</option>
                  <option>Emerald Oasis Mansion</option>
                  <option>Emerald Oasis Mansion</option>
                  <option>Emerald Oasis Mansion</option>
                </select>
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
          <div className="mt-4 d-flex align-items-center justify-content-between mx-4">
            <button
              className="contact-btn w-auto"
              onClick={() => setShowSendMessage(true)}
            >
              Send message
            </button>
          </div>
          <div className="box-shadow-leads">
            {/* <table className="insight-table">
              <thead>
                <tr>
                  <th className="d-flex align-items-center">
                    <input type="checkbox" className="mr-2" />
                  </th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Message</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  data-column="Message"
                  className="cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  <td className="d-flex align-items-center">
                    <input type="checkbox" />
                  </td>
                  <td data-column="name">Tester</td>
                  <td data-column="name">23/11/2023</td>
                  <td data-column="name">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </td>
                </tr>
                <tr
                  data-column="Message"
                  className="cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  <td className="d-flex align-items-center">
                    <input type="checkbox" />
                  </td>
                  <td data-column="name">Tester</td>
                  <td data-column="name">23/11/2023</td>
                  <td data-column="name">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </td>
                </tr>
                <tr
                  data-column="Message"
                  className="cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  <td className="d-flex align-items-center">
                    <input type="checkbox" />
                  </td>
                  <td data-column="name">Tester</td>
                  <td data-column="name">23/11/2023</td>
                  <td data-column="name">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </td>
                </tr>
                <tr
                  data-column="Message"
                  className="cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  <td className="d-flex align-items-center">
                    <input type="checkbox" />
                  </td>
                  <td data-column="name">Tester</td>
                  <td data-column="name">23/11/2023</td>
                  <td data-column="name">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </td>
                </tr>
                <tr
                  data-column="Message"
                  className="cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  <td className="d-flex align-items-center">
                    <input type="checkbox" />
                  </td>
                  <td data-column="name">Tester</td>
                  <td data-column="name">23/11/2023</td>
                  <td data-column="name">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </td>
                </tr>
                <tr
                  data-column="Message"
                  className="cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  <td className="d-flex align-items-center">
                    <input type="checkbox" />
                  </td>
                  <td data-column="name">Tester</td>
                  <td data-column="name">23/11/2023</td>
                  <td data-column="name">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </td>
                </tr>
              </tbody>
            </table> */}
            <DataTable
              columns={column}
              data={DataTables}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="440px"
              selectableRows
              selectableRowsHighlight
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-auto form-control mb-2"
                />
              }
              subHeaderAlign="right"
            />
          </div>
        </div>
      </div>
    </>
  );
}
