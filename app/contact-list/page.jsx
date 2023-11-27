"use client";
import {
  faAddressBook,
  faAngleLeft,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import "../../styles/about.css";
import "../../styles/edit.css";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Page() {
  const [showContact, setShowContact] = useState(false);
  const handleDeleteNumber = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this group!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
      }
    });
  };
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
        </Modal.Body>
      </Modal>
      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon
            icon={faAddressBook}
            className="text-white mr-2"
            width="20"
          />{" "}
          Address Book
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
      <h2 className="title title--h1 first-title title__separate mx-4 mt-4">
        Group Name
      </h2>
      <div className="mt-4 d-flex align-items-center justify-content-between mx-4">
        <button className="contact-btn w-auto">Send message</button>
        <button
          className="contact-btn w-auto"
          onClick={() => setShowContact(true)}
        >
          <FontAwesomeIcon
            className="text-white font-weight-bold cursor-pointer"
            icon={faPlus}
            width={12}
          />
        </button>
      </div>
      <div className="box-shadow-leads pt-2">
        <table className="insight-table">
          <thead>
            <tr>
              <th className="d-flex align-items-center">
                <input type="checkbox" className="mr-2" />
              </th>
              <th>Name</th>
              <th>Contact</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td
                data-column="created date"
                onClick={() => handleDeleteNumber()}
              >
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td
                data-column="created date"
                onClick={() => handleDeleteNumber()}
              >
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td
                data-column="created date"
                onClick={() => handleDeleteNumber()}
              >
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td
                data-column="created date"
                onClick={() => handleDeleteNumber()}
              >
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td
                data-column="created date"
                onClick={() => handleDeleteNumber()}
              >
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td
                data-column="created date"
                onClick={() => handleDeleteNumber()}
              >
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td
                data-column="created date"
                onClick={() => handleDeleteNumber()}
              >
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td
                data-column="created date"
                onClick={() => handleDeleteNumber()}
              >
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
