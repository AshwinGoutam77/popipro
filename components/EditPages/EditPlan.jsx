import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import SimpleBackdrop from "../ViewPages/Backdrop";
import { UpgradePlan } from "@services/Routes";
import Api from "@services/Api";
import { showToast } from "@components/Dashboard/Toast";

export default function EditPlan({
  PlanData,
  Data,
  APIDATA,
  MainData,
  in_subscription,
  message,
  trial
}) {
  const [ShowLoader, setShowLoader] = useState();
  const handleFreeTrail = async () => {
    try {
      Swal.fire({
        title: MainData?.is_individual == 0 ? "" : "Are you sure?",
        text:
          MainData?.is_individual == 0
            ? "Kindly contact to your company to upgrade the plan."
            : "You want to activate 30 days Free trial for Premium Features without paying any money for now? ",
        icon: "warning",
        showCancelButton: MainData?.is_individual == 0 ? false : true,
        confirmButtonColor: "rgb(24 123 249)",
        cancelButtonColor: "#d33",
        showConfirmButton: MainData?.is_individual == 0 ? false : true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await Api(UpgradePlan, {
            total_month: "1",
            is_trial: "1",
          });
          setShowLoader(false);
          if (response.data.status) {
            Swal.fire("Done", "", "success");
            APIDATA();
            showToast(response.data.message, 'success')
          } else {
            showToast(response.data.message, 'error')
          }
        }
      });
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
      showToast(error.response.data.message, 'error')
    }
  };
  return (
    <div>
      {
        in_subscription == false &&
        <a
          href={trial ? "#" : "https://www.popipro.com/order"}
          target="_blank"
          rel="noreferrer"
          className="w-100 text-center"
          onClick={(e) => {
            if (trial) {
              e.preventDefault();
              handleFreeTrail();
            }
          }}
        >
          <div className="overlay-div d-flex align-items-start justify-content-end flex-column">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faLock}
                className="text-white mb-2"
                style={{ fontSize: "20px" }}
              />
              <p className="text-white ml-2 text-left">
                {message}
              </p>
            </div>
          </div>
        </a>
      }
    </div>
  );
}
