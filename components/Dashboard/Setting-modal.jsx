import Api from "@services/Api";
import { AddUserCurrency, UpdateMetaTags } from "@services/Routes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function SettingModal({ active, handleClose, currency }) {
  const [ProductCurrency, setProductCurrency] = useState("");
  const handleSave = async () => {
    try {
      let payload = {
        currency: ProductCurrency,
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
            <button
              className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4"
              style={{ padding: "7px 19px" }}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="delete-button w-auto bg-btn7 lnk wow fadeInUp mt-4 ml-2"
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
