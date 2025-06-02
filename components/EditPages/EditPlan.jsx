import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import SimpleBackdrop from "../ViewPages/Backdrop";
import { StartAddOnTrial, StartTrial, UpgradePlan } from "@services/Routes";
import Api from "@services/Api";
import { showToast } from "@components/Dashboard/Toast";

export default function EditPlan({
  PlanData,
  Data,
  APIDATA,
  MainData,
  in_subscription,
  message,
  trial,
  addOns,
  section_name
}) {
  const [ShowLoader, setShowLoader] = useState();
  const handleFreeTrail = async () => {
    let data = {
      addon_name: section_name
    }
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Would you like to activate a 30-day free trial for premium features without any payment required right now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(24 123 249)",
        cancelButtonColor: "#d33",
        showConfirmButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await addOns ? Api(StartAddOnTrial, data) : Api(StartTrial);
          setShowLoader(false);
          console.log(response);
          APIDATA();
          if (response.data.status) {
            Swal.fire("Done", "", "success");
            showToast(response.data.message, 'success')
          } else {
            Swal.fire(response.data.message, "error");
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
