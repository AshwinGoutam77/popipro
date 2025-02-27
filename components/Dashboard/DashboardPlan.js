import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { UpgradePlan } from "@services/Routes";
import Api from "@services/Api";

export default function DashboardPlan({ Data, PlanData, handleFreeTrail, can_start_trial, in_subscription }) {
  return (
    !in_subscription && (
      <p
        className="text-center dashboard-overlay-div d-flex align-items-left justify-content-end flex-column"
        // onClick={() => handleFreeTrail()}
      >
        <p className="text-white font-weight-bold text-left d-flex align-items-center">
          <FontAwesomeIcon
            icon={faLock}
            className="text-white mr-2"
            style={{ fontSize: "15px" }}
          />
          <span style={{ fontSize: "12px" }}>Premium Feature</span>
        </p>
      </p>
    )
  );
}
