"use client";
import {
  faAddressBook,
  faAngleLeft,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../styles/about.css";
import "../../styles/edit.css";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";

export default function Page() {
  const [showContact, setShowContact] = useState(false);
  const [SelectedContacts, setSelectedContacts] = useState("");
  const [AddressBookRadio, setAddressBookRadio] = useState(false);
  const [ShowSendMessage, setShowSendMessage] = useState(false);
  const [DataTables, setDataTables] = useState([]);

  const getDataTable = async () => {
    setDataTables([
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
      {
        Name: "John Doe",
        group_name: "Doctors",
        Contact: "9632587410",
      },
    ]);
  };

  const column = [
    {
      name: "Name",
      selector: (row) => row.Name,
    },
    {
      name: "Group Name",
      selector: (row) => row.group_name,
    },
    {
      name: "Contact No.",
      selector: (row) => row.Contact,
    },
    {
      name: "",
      selector: (row) => (
        <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
      ),
    },
  ];
  useEffect(() => {
    getDataTable();
  }, []);

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
          All Contacts
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
      <div className="bg-white pt-4" style={{ height: "100vh" }}>
        <div className="d-flex align-items-center justify-content-between mx-4">
          <button
            className="contact-btn w-auto"
            onClick={() => setShowSendMessage(true)}
          >
            Send message
          </button>
        </div>
        <div className="box-shadow-leads pt-2">
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
            subHeaderAlign="left"
          />
        </div>
      </div>
    </>
  );
}
