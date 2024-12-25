"use client";
import {
  faEllipsisVertical,
  faInfo,
  faPencil,
  faPlus,
  faToggleOff,
  faToggleOn,
  faWandMagicSparkles,
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
  AddTitle,
  setTooltipIsOpen,
  tooltipIsOpen,
  message,
  aiData,
  handleGetAiSuggestion
}) {
  return (
    <div className="edit-dropdown d-flex align-items-center">
      <div class="wrapper">
        <div class="tooltip">{message}</div>
        <img
          src="../static/img/info.svg"
          alt="image"
          width={18}
          className="mr-4 cursor-pointer"
          onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
        />
      </div>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {/* <FontAwesomeIcon icon={faEllipsisVertical} /> */}
          <img
            src="../static/img/nine-dots.svg"
            alt="image"
            width={16}
            className="cursor-pointer"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {setEditFields && (
            <Dropdown.Item
              className="mb-1 mt-1 font-weight-bold"
              onClick={() => setEditFields(true)}
            >
              <img
                src="../static/img/edit-icon.svg"
                alt="image"
                width={14}
                style={{ marginRight: "11px" }}
              />
              Edit Title
            </Dropdown.Item>
          )}

          {handleShowAddModal && (
            <Dropdown.Item
              className="mb-1 font-weight-bold"
              onClick={() => handleShowAddModal()}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> {AddTitle}
            </Dropdown.Item>
          )}

          {aiData && (
            <Dropdown.Item
              className="mb-1 font-weight-bold"
              onClick={() => handleGetAiSuggestion()}
            >
              <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-2" /> {aiData}
            </Dropdown.Item>
          )}

          {Active !== undefined && (
            <Dropdown.Item
              className="mb-1 font-weight-bold"
              onClick={() => handleActive()}
            >
              <FontAwesomeIcon
                icon={Active ? faToggleOn : faToggleOff}
                className="mr-1"
              />{" "}
              {!Active ? "Enable Section" : "Disable Section"}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
