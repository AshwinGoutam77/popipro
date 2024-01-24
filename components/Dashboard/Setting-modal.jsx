import Api from "@services/Api";
import { AddUserCurrency, UpdateMetaTags } from "@services/Routes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function SettingModal({
  active,
  handleClose,
  currency,
  MainData,
}) {
  const [ProductCurrency, setProductCurrency] = useState("");
  const [AllowNotification, setAllowNotification] = useState(
    MainData?.company_setting?.allow_notification
  );
  const [AllowLocation, setAllowLocation] = useState(
    MainData?.company_setting?.allow_location
  );

  const handleSave = async () => {
    try {
      let payload = {
        currency: ProductCurrency,
        allow_notification: AllowNotification,
        allow_location: AllowLocation,
      };
      const res = await Api(AddUserCurrency, payload);
      if (res?.data?.status) {
        handleClose();
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(res?.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast(error.res?.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleAllowNotification = () => {
    setAllowNotification(1);
    if (AllowNotification == 1) {
      setAllowNotification(0);
    }
  };
  const handleAllowLocation = () => {
    setAllowLocation(1);
    if (AllowLocation == 1) {
      setAllowLocation(0);
    }
  };
  return (
    <>
      <Modal show={active} onHide={() => handleClose("")} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-0"
              id="BlogModalTitle"
            >
              Setting
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => handleClose("")}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body className="py-3 px-4">
          <div>
            <select
              style={{
                height: "49px",
                padding: "6px 18px",
                background: "#f7f9fa",
                appearance: "auto",
              }}
              onChange={(e) => setProductCurrency(e.target.value)}
              className="mt-1"
              defaultValue={MainData?.company_setting?.currency?.id}
            >
              <option value="">Select currency</option>
              {currency &&
                currency?.map((item, index) => {
                  return (
                    <option key={index} value={item?.id}>
                      {item?.currency}
                    </option>
                  );
                })}
            </select>

            <ul className="m-0 p-0 multimodes-ul mt-3 px-1">
              <li className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0 color-black">Allow Push Notifications</h6>
                <label className="switch">
                  <input
                    data-status={AllowNotification}
                    data-active={AllowNotification}
                    checked={AllowNotification == 1 ? true : false}
                    type="checkbox"
                    name="hello"
                    onChange={() => handleAllowNotification()}
                  />
                  <span className="slider round"></span>
                </label>
              </li>
              <li className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0 color-black">Allow Location</h6>
                <label className="switch">
                  <input
                    data-status={AllowLocation}
                    data-active={AllowLocation}
                    checked={AllowLocation == 1 ? true : false}
                    type="checkbox"
                    onChange={() => handleAllowLocation()}
                  />
                  <span className="slider round"></span>
                </label>
              </li>
              <li className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0 color-black">
                  Allow Resources Notifications
                </h6>
                <label className="switch">
                  <input
                    data-status={AllowNotification}
                    data-active={AllowNotification}
                    checked={AllowNotification == 1 ? true : false}
                    type="checkbox"
                    name="hello"
                    onChange={() => handleAllowNotification()}
                  />
                  <span className="slider round"></span>
                </label>
              </li>
            </ul>
            <p className="color-black py-2">
              *Note: Above notification and location settings are for profile
              visitiors
            </p>
            <button
              className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-3"
              style={{ padding: "7px 19px" }}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="delete-button w-auto bg-btn7 lnk wow fadeInUp mt-3 ml-2"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
