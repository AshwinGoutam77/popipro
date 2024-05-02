import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { UpgradePlan } from "@services/Routes";
import Api from "@services/Api";

export default function DashboardPlan({
  Data,
  PlanData,
  APIDATA,
  MainData,
  handleFreeTrail,
}) {
  const [ShowLoader, setShowLoader] = useState(false);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {Data &&
      PlanData?.plan_name == "Premium" &&
      PlanData?.is_trial_taken !== 0 ? (
        <a
          href="https://www.popipro.com/order"
          className="text-center dashboard-overlay-div d-flex align-items-left justify-content-end flex-column"
        >
          <p className="text-white font-weight-bold text-center d-flex align-items-center">
            <FontAwesomeIcon
              icon={faLock}
              className="text-white mr-2"
              style={{ fontSize: "20px" }}
            />
            <p className="text-left text-decoration-none">Renew your plan</p>
          </p>
        </a>
      ) : PlanData?.subscription?.plan_id == 1 ||
        PlanData?.subscription?.plan_id == null ? (
        <>
          <p
            className="text-center dashboard-overlay-div d-flex align-items-left justify-content-end flex-column"
            onClick={() => handleFreeTrail()}
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
        </>
      ) : (
        ""
      )}
    </>
  );
}
