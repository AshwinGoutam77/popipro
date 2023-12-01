/* eslint-disable react/jsx-no-target-blank */
import {
  faCircleInfo,
  faFloppyDisk,
  faInfo,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Appointmentbtns, CardData } from "@services/Routes";
import Api from "@services/Api";
import EditPlan from "./EditPlan";
import { Modal } from "react-bootstrap";

export default function EditContact({
  APIDATA,
  Data,
  TitleData,
  PlanData,
  MainData,
}) {
  const [Active, setActive] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [Appointment, setAppointment] = useState("");
  const [Show, setShow] = useState(false);

  useEffect(() => {
    setActive(TitleData?.card_booking?.is_active == "1" ? true : false);
  }, [TitleData]);

  useEffect(() => {
    setAppointment(TitleData?.card_booking?.visible_name);
  }, []);

  const handleActive = async () => {
    let titles = [
      {
        name: "card_booking",
        visible_name: Appointment,
        is_featured: Active ? "0" : "1",
        is_active: Active ? "0" : "1",
      },
    ];
    Swal.fire({
      title: "Are you sure?",
      text:
        Active == 1
          ? "You want to hide this section from your profile?"
          : "You want to show this section on your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(24 123 249)",
      cancelButtonColor: "#d33",
      confirmButtonText: Active == 1 ? "Yes hide it!" : "Yes show it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await Api(CardData, { titles });
          if (response.status) {
            setActive((prev) => !prev);
          }
        } catch (error) {
          if (error.request.status == "401") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          toast(error.response.data.message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  };
  const handleChnageTitle = async () => {
    // setShowLoader(true);
    let titles = [
      {
        name: "card_booking",
        visible_name: Appointment,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      // setShowLoader(false);
      if (response.data.status) {
        APIDATA();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditFields(false);
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      // setShowLoader(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleUpgradePlan = () => {
    Swal.fire({
      title:
        "You have reached your storage limit, to increase your limit please upgrade your plan.",
      icon: "info",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<a href="https://www.popipro.com/order" target="_blank">Upgrade</a>',
    });
  };
  const handleShowAppointment = async () => {
    const response = await Api(Appointmentbtns);
    if (response.data.status) {
      APIDATA();
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={Show} onHide={() => handleClose("")} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-0"
              id="shareModal"
            >
              Calendly Url
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
        <Modal.Body>
          <lable className="modalFormLable">Your calendly url:</lable>
          <input
            type="url"
            className="form-control mt-2"
            style={{ height: "40px", border: "1px solid #ccc" }}
          />
          <div>
            <button className="contact-btn w-auto">Save</button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="position-relative">
        {Data ? (
          <EditPlan Data={Data} PlanData={PlanData} APIDATA={APIDATA} />
        ) : (
          ""
        )}

        <div className="mb-3 box-content boxxx" id="about_us">
          <div className="flex-header">
            <div className="d-flex align-items-baseline">
              {EditFields ? (
                <input
                  type="text"
                  name="AboutMe"
                  className="title-section-input mb-3"
                  placeholder="Custom Links"
                  onChange={(e) => setAppointment(e.target.value)}
                  defaultValue={Appointment || ""}
                />
              ) : (
                <>
                  <h1 className="title title--h1 first-title title__separate">
                    {Appointment}
                  </h1>
                </>
              )}
            </div>

            <div>
              {TitleData?.card_booking?.source == "2" &&
              PlanData?.is_expired == false &&
              PlanData?.subscription?.plan_id !== 1 ? (
                <div className="d-flex align-items-center">
                  <div class="wrapper">
                    <div class="tooltip">
                      Use this section to incorporate for appointment booking.
                    </div>
                    <FontAwesomeIcon
                      icon={faInfo}
                      className="mr-4 pe-auto Iconcolor-black cursor-pointer"
                      onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                    />
                  </div>
                  <div className="edit-pencile-div mr-2">
                    {EditFields ? (
                      <FontAwesomeIcon
                        icon={faFloppyDisk}
                        className="mr-4 pe-auto floopySave-icon"
                        onClick={() => handleChnageTitle()}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="mr-4 pe-auto Iconcolor-black"
                        onClick={() => setEditFields(true)}
                      />
                    )}
                  </div>
                  <>
                    <label className="switch">
                      <input
                        data-status={Appointment?.card_booking?.is_active}
                        data-active={Active}
                        checked={Active}
                        type="checkbox"
                        onChange={() => handleActive()}
                      />
                      <span className="slider round"></span>
                    </label>
                  </>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {Data.id === "S7ZG" &&
          process.env.NEXT_PUBLIC_MODE === "development" ? (
            <div className="">
              <h6 className="font-weight-bold">
                How you want to recive appointment:
              </h6>
              <div className="d-flex align-items-start">
                <input
                  type="radio"
                  id="product-whatsaap3"
                  className="mt-1"
                  name="real-estate-radio"
                  // value={
                  //   MainData?.company_setting?.show_product_wp_button === 0
                  //     ? true
                  //     : false
                  // }
                  // onChange={() => handleProductsbtn("wp")}
                  // checked={
                  //   MainData?.company_setting?.show_product_wp_button == 0
                  //     ? true
                  //     : false
                  // }
                />
                <label
                  for="product-whatsaap3"
                  className="ml-2 Varcolor font-weight-bold"
                >
                  Via Appointemnt Form?
                </label>
              </div>
              <div
                className="d-flex align-items-start"
                onClick={() => setShow(true)}
              >
                <input
                  type="radio"
                  id="product-enq3"
                  className="mt-1"
                  name="real-estate-radio"
                  // value={
                  //   MainData?.company_setting?.show_product_enquiry_button === 0
                  //     ? true
                  //     : false
                  // }
                  // onChange={() => handleProductsbtn("enq")}
                  // checked={
                  //   MainData?.company_setting?.show_product_enquiry_button == 0
                  //     ? true
                  //     : false
                  // }
                />
                <label
                  for="product-enq3"
                  className="ml-2 Varcolor font-weight-bold"
                >
                  Via Calendly?
                </label>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row align-items-center justify-content-center mb-3"></div>
          {Show ? (
            ""
          ) : (
            <div className="row">
              <div className="form-group col-lg-6 col-md-6 mb-2">
                {/* <label className="ml-2 font-weight-normal">Name</label> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name*"
                  required="required"
                  autoComplete="on"
                  readOnly
                />
                <div className="help-block with-errors"></div>
              </div>
              <div className="form-group col-lg-6 col-md-6 mb-2">
                {/* <label className="ml-2 font-weight-normal">Contact number</label> */}
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mobile/Phone"
                  required="required"
                  autoComplete="on"
                  readOnly
                />
                <div className="help-block with-errors"></div>
              </div>
              <div className="form-group col-lg-6 col-md-6 mb-2">
                {/* <label className="ml-2 font-weight-normal">Meeting Date</label> */}
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date"
                  required="required"
                  autoComplete="on"
                  readOnly
                />
                <div className="help-block with-errors"></div>
              </div>
              <div className="form-group col-lg-6 col-md-6 mb-2">
                {/* <label className="ml-2 font-weight-normal">Meeting Time</label> */}
                <input
                  type="time"
                  className="form-control"
                  placeholder="time"
                  required="required"
                  autoComplete="on"
                  readOnly
                />
                <div className="help-block with-errors"></div>
              </div>
              <div className="d-flex align-items-start justify-content-start form-group col-lg-6 col-md-6 mb-2 px-4">
                <input
                  type="checkbox"
                  id="contact"
                  className="mr-2 mt-1"
                  value={
                    MainData?.company_setting?.show_appointment_button !== 0
                      ? true
                      : false
                  }
                  onChange={(e) => handleShowAppointment(e.target.checked)}
                  checked={
                    MainData?.company_setting?.show_appointment_button !== 0
                      ? true
                      : false
                  }
                />
                <label for="contact" className="Varcolor">
                  Do you want to show date and time field?
                </label>
              </div>
              <div className="form-group col-lg-12 col-md-12 mb-2">
                {/* <label className="ml-2 font-weight-normal">Email address</label> */}
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  required="required"
                  autoComplete="on"
                  readOnly
                />
                <div className="help-block with-errors"></div>
              </div>
              <div className="form-group col-12 col-md-12 mb-2">
                {/* <label className="ml-2 font-weight-normal">Your message</label> */}
                <textarea
                  className="textarea form-control"
                  placeholder="Your message"
                  rows="4"
                  required="required"
                  readOnly
                ></textarea>
                <div className="help-block with-errors"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
