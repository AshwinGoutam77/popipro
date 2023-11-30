"use client";
import { faAddressBook, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../styles/edit.css";

export default function Page() {
  const [show, setShow] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [ShowContactsModal, setShowContactsModal] = useState(false);
  const [ShowSendMessage, setShowSendMessage] = useState(false);
  const [SelectedContacts, setSelectedContacts] = useState("");

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
      // alert(
      //   "Contact list API not supported!. Only for android mobile chrome and chrome version > 80"
      // );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This feature only supported for android mobile chrome and chrome version > 80",
      });
    }
  }
  async function getContacts() {
    const props = ["name", "email", "tel"];
    const opts = { multiple: true };

    try {
      const contacts = await navigator.contacts.select(props, opts);
      // alert(JSON.stringify(contacts));
      setSelectedContacts(JSON.stringify(contacts));
      setShowContactsModal(true);
    } catch (err) {
      alert(err);
    }
  }
  return (
    <>
      <Modal
        show={ShowContactsModal}
        onHide={() => setShowContactsModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Selected Contacts
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowContactsModal(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 15px" }}>
          <p className="p-4">{SelectedContacts}</p>
          {SelectedContacts &&
            SelectedContacts?.map((item, index) => {
              return (
                <>
                  <p>Email: {item.name}</p>
                </>
              );
            })}
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add Group
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
          <label className="modalFormLable">Group Name*</label>
          <input
            name="name"
            rows="4"
            cols="50"
            className="form-control mt-1 rounded-0"
            placeholder=""
            style={{ height: "40px", border: "1px solid #ccc" }}
          ></input>
          <div>
            <button
              className="contact-btn w-auto"
              onClick={() => setShow(false)}
            >
              Save Group
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showContact} onHide={() => setShowContact(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1 mb-0">
              Add Contact
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowContact(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
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
            className="form-control mt-1 rounded-0"
            placeholder=""
            style={{ height: "40px", border: "1px solid #ccc" }}
          ></input>
          <button className="contact-btn w-auto">Save Contact</button>
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
          <label className="modalFormLable">Send message to group*</label>
          <textarea
            name="name"
            rows="4"
            cols="50"
            className="form-control mt-1 rounded-0"
            placeholder=""
            style={{ height: "140px", border: "1px solid #ccc" }}
          ></textarea>
          <div className="mb-2">
            <button className="contact-btn w-auto">Send</button>
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
      <div className="m-4 address-book-add-contact-div d-flex align-items-center justify-content-between">
        <h6 className="color-black mb-0">Create Contact Group</h6>
        <div className="" onClick={() => setShow(true)}>
          <img
            src="https://prafullgupta.com/connectwork/assets/chat/groups/271123054957add.png"
            alt="images"
            width={25}
          />
        </div>
      </div>

      <div>
        <div className="address-book-add-contact-div mx-4">
          <h5 className="title title--h1 first-title title__separate mx-2">
            Groups
          </h5>
          <div className="m-1 p-2  d-flex align-items-center justify-content-between">
            <h6 className="color-black mb-0">Doctors</h6>
            <div
              className="d-flex align-items-center address-book-svg address-book-svg"
              style={{ gap: "10px" }}
            >
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123054957add.png"
                alt="images"
                width={25}
                // onClick={() => setShowContact(true)}
                onClick={openContactPicker}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123060257remove.png"
                alt="images"
                width={25}
                onClick={() => handleDeleteNumber()}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/chats/271123060450messenger.png"
                alt="images"
                width={25}
                onClick={() => setShowSendMessage(true)}
              />
              <Link href="/contact-list" className="d-flex">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/271123055204right.png"
                  alt="images"
                  width={25}
                />
              </Link>
            </div>
          </div>
          <div className="m-1 p-2 d-flex align-items-center justify-content-between">
            <h6 className="color-black mb-0">Restaurant</h6>
            <div
              className="d-flex align-items-center address-book-svg address-book-svg"
              style={{ gap: "10px" }}
            >
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123054957add.png"
                alt="images"
                width={25}
                onClick={() => setShowContact(true)}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123060257remove.png"
                alt="images"
                width={25}
                onClick={() => handleDeleteNumber()}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/chats/271123060450messenger.png"
                alt="images"
                width={25}
                onClick={() => setShowSendMessage(true)}
              />
              <Link href="/contact-list" className="d-flex">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/271123055204right.png"
                  alt="images"
                  width={25}
                />
              </Link>
            </div>
          </div>
          <div className="m-1 p-2 d-flex align-items-center justify-content-between">
            <h6 className="color-black mb-0">Furniture</h6>
            <div
              className="d-flex align-items-center address-book-svg address-book-svg"
              style={{ gap: "10px" }}
            >
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123054957add.png"
                alt="images"
                width={25}
                onClick={() => setShowContact(true)}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123060257remove.png"
                alt="images"
                width={25}
                onClick={() => handleDeleteNumber()}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/chats/271123060450messenger.png"
                alt="images"
                width={25}
                onClick={() => setShowSendMessage(true)}
              />
              <Link href="/contact-list" className="d-flex">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/271123055204right.png"
                  alt="images"
                  width={25}
                />
              </Link>
            </div>
          </div>
          <div className="m-1 p-2 d-flex align-items-center justify-content-between">
            <h6 className="color-black mb-0">Electrician </h6>
            <div
              className="d-flex align-items-center address-book-svg address-book-svg"
              style={{ gap: "10px" }}
            >
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123054957add.png"
                alt="images"
                width={25}
                onClick={() => setShowContact(true)}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123060257remove.png"
                alt="images"
                width={25}
                onClick={() => handleDeleteNumber()}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/chats/271123060450messenger.png"
                alt="images"
                width={25}
                onClick={() => setShowSendMessage(true)}
              />
              <Link href="/contact-list" className="d-flex">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/271123055204right.png"
                  alt="images"
                  width={25}
                />
              </Link>
            </div>
          </div>
          <div className="m-1 p-2 d-flex align-items-center justify-content-between">
            <h6 className="color-black mb-0">Plumbers</h6>
            <div
              className="d-flex align-items-center address-book-svg address-book-svg"
              style={{ gap: "10px" }}
            >
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123054957add.png"
                alt="images"
                width={25}
                onClick={() => setShowContact(true)}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/groups/271123060257remove.png"
                alt="images"
                width={25}
                onClick={() => handleDeleteNumber()}
              />
              <img
                src="https://prafullgupta.com/connectwork/assets/chat/chats/271123060450messenger.png"
                alt="images"
                width={25}
                onClick={() => setShowSendMessage(true)}
              />
              <Link href="/contact-list" className="d-flex">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/271123055204right.png"
                  alt="images"
                  width={25}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
