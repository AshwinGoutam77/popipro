"use client";
import {
  faAddressBook,
  faAngleLeft,
  faChevronLeft,
  faChevronRight,
  faMessage,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../styles/edit.css";

export default function page() {
  const [show, setShow] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [ShowSendMessage, setShowSendMessage] = useState(false);

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
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add Group
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={() => setShow(false)}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 15px" }}>
          <label className="modalFormLable">Group Name*</label>
          <input
            name="name"
            rows="4"
            cols="50"
            className="form-control mb-4 mt-1 rounded-0"
            placeholder=""
            style={{ height: "40px", border: "1px solid #ccc" }}
          ></input>
        </Modal.Body>
      </Modal>
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
      <Modal
        show={ShowSendMessage}
        onHide={() => setShowSendMessage(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Send message
            </h5>
          </Modal.Title>
          <button
            type="button"
            class="close"
            onClick={() => setShowSendMessage(false)}
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 15px" }}>
          <label className="modalFormLable">Send message to group*</label>
          <textarea
            name="name"
            rows="4"
            cols="50"
            className="form-control mb-4 mt-1 rounded-0"
            placeholder=""
            style={{ height: "140px", border: "1px solid #ccc" }}
          ></textarea>
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
      <div className=" m-4 address-book-add-contact-div d-flex align-items-center justify-content-between">
        <h5 className="color-black mb-0">Create Contact Group</h5>
        <div className="add-contact-btn" onClick={() => setShow(true)}>
          <FontAwesomeIcon
            className="text-white font-weight-bold cursor-pointer"
            icon={faPlus}
            width={20}
          />
        </div>
      </div>

      <div>
        <h5 className="title title--h1 first-title title__separate mx-4">
          Groups
        </h5>

        <div className=" m-4 address-book-add-contact-div d-flex align-items-center justify-content-between">
          <h6 className="color-black mb-0">1. Doctors</h6>
          <div className="d-flex align-items-center address-book-svg address-book-svg">
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faPlus}
              width={17}
              onClick={() => setShowContact(true)}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faTrash}
              width={13}
              onClick={handleDeleteNumber}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faMessage}
              width={15}
              onClick={() => setShowSendMessage(true)}
            />
            <Link href="/contact-list" className="d-flex">
              <FontAwesomeIcon
                className="text-dark font-weight-bold cursor-pointer "
                icon={faChevronRight}
                width={13}
              />
            </Link>
          </div>
        </div>

        <div className=" m-4 address-book-add-contact-div d-flex align-items-center justify-content-between">
          <h6 className="color-black mb-0">2. Hotels and restaurant</h6>
          <div className="d-flex align-items-center address-book-svg">
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faPlus}
              width={17}
              onClick={() => setShowContact(true)}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faTrash}
              width={13}
              onClick={handleDeleteNumber}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faMessage}
              width={15}
              onClick={() => setShowSendMessage(true)}
            />
            <Link href="/contact-list" className="d-flex">
              <FontAwesomeIcon
                className="text-dark font-weight-bold cursor-pointer "
                icon={faChevronRight}
                width={13}
              />
            </Link>
          </div>
        </div>
        <div className=" m-4 address-book-add-contact-div d-flex align-items-center justify-content-between">
          <h6 className="color-black mb-0">3. Furniture</h6>
          <div className="d-flex align-items-center address-book-svg">
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faPlus}
              width={17}
              onClick={() => setShowContact(true)}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faTrash}
              width={13}
              onClick={handleDeleteNumber}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faMessage}
              width={15}
              onClick={() => setShowSendMessage(true)}
            />
            <Link href="/contact-list" className="d-flex">
              <FontAwesomeIcon
                className="text-dark font-weight-bold cursor-pointer "
                icon={faChevronRight}
                width={13}
              />
            </Link>
          </div>
        </div>
        <div className=" m-4 address-book-add-contact-div d-flex align-items-center justify-content-between">
          <h6 className="color-black mb-0">4. Electrician </h6>
          <div className="d-flex align-items-center address-book-svg">
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faPlus}
              width={17}
              onClick={() => setShowContact(true)}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faTrash}
              width={13}
              onClick={handleDeleteNumber}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faMessage}
              width={15}
              onClick={() => setShowSendMessage(true)}
            />
            <Link href="/contact-list" className="d-flex">
              <FontAwesomeIcon
                className="text-dark font-weight-bold cursor-pointer "
                icon={faChevronRight}
                width={13}
              />
            </Link>
          </div>
        </div>
        <div className=" m-4 address-book-add-contact-div d-flex align-items-center justify-content-between flex-wrap">
          <h6 className="color-black mb-0">5. Plumbers</h6>
          <div className="d-flex align-items-center address-book-svg">
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faPlus}
              width={17}
              onClick={() => setShowContact(true)}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faTrash}
              width={13}
              onClick={handleDeleteNumber}
            />
            <FontAwesomeIcon
              className="text-dark font-weight-bold cursor-pointer mr-4"
              icon={faMessage}
              width={15}
              onClick={() => setShowSendMessage(true)}
            />
            <Link href="/contact-list" className="d-flex">
              <FontAwesomeIcon
                className="text-dark font-weight-bold cursor-pointer "
                icon={faChevronRight}
                width={13}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
