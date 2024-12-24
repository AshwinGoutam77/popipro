import Api from "@services/Api";
import { AddUserCurrency, GeneralSetting, GlobalPaymentLink, UpdateMetaTags } from "@services/Routes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { showToast } from "./Toast";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function SettingModal({
  active,
  handleClose,
  currency,
  MainData,
  APIDATA,
}) {
  const [AllowNotification, setAllowNotification] = useState(
    MainData?.company_setting?.allow_notification
  );
  const [AllowLocation, setAllowLocation] = useState(
    MainData?.company_setting?.allow_location
  );

  const [FormData, setFormData] = useState({
    payment_link: "",
    payment_qr: ""
  })

  const [PassCode, setPassCode] = useState("");
  const [UploadLogo, setUploadLogo] = useState("");
  const [BannerImage, setBannerImage] = useState("")

  useEffect(() => {
    setPassCode(MainData?.company_setting?.card_section_passcode)
  }, [])


  const handleSave = async () => {
    try {
      const payload = {
        allow_notification: AllowNotification,
        allow_location: AllowLocation,
        section_passcode: PassCode ? PassCode : "",
        banner: BannerImage,
        logo: UploadLogo,
      };

      const res = await Api(GeneralSetting, payload);

      if (res?.data?.status) {
        handleClose();
        APIDATA();
        showToast(res.data.message, "success");
        localStorage.setItem("PassCode", PassCode)
      } else {
        showToast(res?.data.message, "error");
      }
    } catch (error) {
      showToast(error.res?.data.message || "An error occurred", "error");
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

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      const { value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSavePayment = async (e) => {
    e.preventDefault()
    const res = await Api(GlobalPaymentLink, FormData)
    if (res?.data?.status) {
      showToast(res.data.message, "success");
      handleClose()
      setFormData({
        payment_link: "",
        payment_qr: ""
      })
    }
    else {
      showToast('Failed', "error");
    }
  }

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
        <Modal.Body className="setting-modal py-3 px-4">
          <div>
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="General Setting">
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
                </ul>
                <p className="color-black py-2">
                  *Note: Above notification and location settings are for profile
                  visitiors
                </p>

                <li className="mt-4 list-style-none mb-2">
                  <div>
                    <label className="mb-0 color-black">Set OTP for private sections</label>
                    <input
                      type="number"
                      placeholder="Enter OTP"
                      className="form-control mt-2 w-100"
                      value={PassCode}
                      onChange={(e) => setPassCode(e.target.value)}
                    />
                  </div>
                </li>

                {MainData?.permission[0]?.visible_to == '2' && <li className="mt-4 list-style-none mb-2">
                  <div>
                    <label className="mb-0 color-black">Upload Logo</label>
                    <input
                      type="file"
                      className="form-control mt-2 w-100"
                      onChange={(e) => setUploadLogo(e.target.files[0])}
                    />
                  </div>
                </li>}

                {MainData?.permission[0]?.visible_to == '2' && <li className="mt-4 list-style-none mb-2">
                  <div>
                    <label className="mb-0 color-black">Upload banner Image</label>
                    <input
                      type="file"
                      className="form-control mt-2 w-100"
                      onChange={(e) => setBannerImage(e.target.files[0])}
                    />
                  </div>
                </li>}

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
              </Tab>
              <Tab eventKey="profile" title="Payment Setting">
                <form onSubmit={(e) => handleSavePayment(e)}>
                  <div>
                    <label>Upload QR Code</label>
                    <input type="file"
                      className="form-control"
                      name='payment_qr'
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-3 mb-2">
                    <label>Payment Link</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Enter your payment link"
                      name="payment_link"
                      value={FormData.payment_link}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-3"
                    style={{ padding: "7px 19px" }}
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="delete-button w-auto bg-btn7 lnk wow fadeInUp mt-3 ml-2"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </form>

              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
