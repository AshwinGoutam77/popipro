"use client";
import {
  faEllipsisVertical,
  faPencil,
  faPlus,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function EditDropdown({
  TitleData,
  handleActive,
  Active,
  setEditFields,
  handleShowAddModal,
}) {
  return (
    <div className="edit-dropdown">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className="mb-1 mt-1 font-weight-bold"
            onClick={() => setEditFields(true)}
          >
            {" "}
            <FontAwesomeIcon
              icon={faPencil}
              className="mr-2 pe-auto Iconcolor-black"
            />
            Edit Title
          </Dropdown.Item>
          <Dropdown.Item
            className="mb-1 font-weight-bold"
            onClick={() => handleShowAddModal()}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Property
          </Dropdown.Item>
          <Dropdown.Item
            className="mb-1 font-weight-bold"
            onClick={() => handleActive()}
          >
            <FontAwesomeIcon
              icon={Active ? faToggleOn : faToggleOff}
              className="mr-2"
            />{" "}
            {Active ? "Enable" : "Disabled"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
