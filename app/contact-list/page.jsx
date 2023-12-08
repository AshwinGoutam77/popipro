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
  const [SelectedContacts, setSelectedContacts] = useState("");
  const [AddressBookRadio, setAddressBookRadio] = useState(false);
  const [ShowSendMessage, setShowSendMessage] = useState(false);
  const [AddBook, setAddBook] = useState(true);

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

  function openContactPicker() {
    const supported = "contacts" in navigator && "ContactsManager" in window;

    if (supported) {
      getContacts();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This feature only supported htmlFor android mobile chrome and chrome version > 80",
      });
    }
  }
  async function getContacts() {
    const props = ["name", "email", "tel"];
    const opts = { multiple: true };

    try {
      const contacts = await navigator.contacts.select(props, opts);
      setSelectedContacts(JSON.stringify(contacts));
      setShowContactsModal(true);
    } catch (err) {
      alert(err);
    }
  }
  const handleAddManualy = () => {
    setAddressBookRadio(true);
    setAddBook(false);
  };
  const handleAddressBook = () => {
    setAddressBookRadio(false);
    setAddBook(true);
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
      <h2 className="title title--h1 first-title title__separate mx-4 mt-4">
        Group Name
      </h2>
      <div className="mt-4 px-4">
        <h6 className="font-weight-bold">How you want to add contacts:</h6>
        <div className="d-flex align-items-start">
          <input
            type="radio"
            name="radio-book"
            id="product-whatsaap2"
            className="mt-1"
            onChange={() => handleAddressBook()}
            value={AddBook}
            checked={AddBook ? true : false}
          />
          <label
            htmlFor="product-whatsaap2"
            className="ml-2 Varcolor font-weight-bold"
          >
            Via Address Book?
          </label>
        </div>
        <div className="d-flex align-items-start">
          <input
            type="radio"
            name="radio-book"
            id="product-enq2"
            className="mt-1"
            onChange={() => handleAddManualy()}
          />
          <label
            htmlFor="product-enq2"
            className="ml-2 Varcolor font-weight-bold"
          >
            Add Manualy?
          </label>
        </div>
      </div>
      <div className="mt-4 d-flex align-items-center justify-content-between mx-4">
        <button
          className="contact-btn w-auto"
          onClick={() => setShowSendMessage(true)}
        >
          Send message
        </button>
        <button
          className="contact-btn w-auto"
          onClick={() =>
            AddressBookRadio ? setShowContact(true) : openContactPicker()
          }
        >
          <FontAwesomeIcon
            className="text-white font-weight-bold cursor-pointer mr-2"
            icon={faPlus}
            width={12}
          />
          Add Contact
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
              <th>Notification</th>
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
              <td data-column="name">Allowed</td>
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
              <td data-column="name">Blocked</td>
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
              <td data-column="name">Allowed</td>
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
              <td data-column="name">Allowed</td>
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
              <td data-column="name">Blocked</td>
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
              <td data-column="name">Allowed</td>
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
              <td data-column="name">Allowed</td>
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
              <td data-column="name">Allowed</td>
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
