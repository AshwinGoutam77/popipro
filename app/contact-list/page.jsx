import {
  faAddressBook,
  faAngleLeft,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import "../../styles/about.css";

export default function page() {
  return (
    <>
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
        <button className="contact-btn w-auto">
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
                Select All
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
              <td data-column="created date">
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td data-column="created date">
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td data-column="created date">
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td data-column="created date">
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td data-column="created date">
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td data-column="created date">
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td data-column="created date">
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
            <tr data-column="Message" className="cursor-pointer">
              <td className="d-flex align-items-center">
                <input type="checkbox" />
              </td>
              <td data-column="name">John Doe</td>
              <td data-column="name">9874561323</td>
              <td data-column="created date">
                <FontAwesomeIcon icon={faTrash} width={15} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
