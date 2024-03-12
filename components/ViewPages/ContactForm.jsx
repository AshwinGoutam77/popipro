"use client";
import Api from "@services/Api";
import { AppointmentBooking } from "@services/Routes";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SimpleBackdrop from "./SimpleBackDrop";
import localforage from "localforage";
import SpinLoader from "./SpinLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import LoadingText from "./LoadingText";

export default function ContactForm({
  card_url,
  Titles,
  PlanData,
  MainData,
  card,
}) {
  const contactRef = useRef();

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month or day is less than 10
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");
  const [MinDate, setMinDate] = useState(getCurrentDate());
  const [Time, setTime] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [Loader, setLoader] = useState(false);

  // useEffect(() => {
  //   if (typeof window === "object" && card?.landing_mode === "appointment") {
  //     if (contactRef.current) {
  //       console.log(contactRef);
  //       contactRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   }
  // }, []);

  const handleAppointment = async () => {
    if (Name == "") {
      toast.error("Name is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Contact == "") {
      toast.error("Mobile/Phone number is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Email == "") {
      toast.error("Email is required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (Email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email) == false) {
      toast.error("Invalid email format", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      // setShowLoader(true);
      setLoader(true);
      let data = {
        card_url: card_url,
        name: Name,
        contact: Contact,
        email: Email,
        message: Message,
        date: MinDate,
        time: Time,
        latitude: await localforage.getItem("latitude"),
        longitude: await localforage.getItem("longitude"),
        fb_token: await localforage.getItem("fcm_token"),
      };
      const response = await Api(AppointmentBooking, data);
      if (response.data.status) {
        setShowLoader(false);
        setLoader(false);
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
        setName("");
        setContact("");
        setEmail("");
        setMessage("");
        setDate("");
        setTime("");
      }
    } catch (error) {
      setShowLoader(false);
      setLoader(false);
      toast.error(error?.response?.data?.message, {
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

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 15) {
      setContact(value);
    }
  };

  return (
    <div ref={contactRef}>
      <SimpleBackdrop visible={ShowLoader} />
      {Titles.card_booking?.is_active === 1 &&
      PlanData?.is_expired == false &&
      PlanData?.subscription?.plan_id !== 1 &&
      PlanData?.subscription !== null ? (
        <div className="mt-3 box-content boxxx" id="card_booking">
          <div className="pb-2">
            <h3 className="title title--h1 first-title title__separate">
              {Titles && Titles.card_booking?.visible_name}
            </h3>
          </div>

          <div className="row">
            <div className="form-group col-lg-6 col-md-6 mb-2">
              {/* <label className="ml-2 font-weight-normal">Name*</label> */}
              <input
                type="text"
                className="form-control contactform-class"
                placeholder="Enter your name*"
                required="required"
                autoComplete="on"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-lg-6 col-md-6 mb-2">
              {/* <label className="ml-2 font-weight-normal">Contact number*</label> */}
              <input
                type="number"
                className="form-control contactform-class"
                placeholder="Enter your mobile/phone number*"
                required="required"
                autoComplete="on"
                value={Contact}
                onChange={handleChange}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="col-12">
              <div className="row">
                {MainData?.company_setting?.show_appointment_button !== 0 ? (
                  <div className="col-lg-6 col-md-6 mb-2">
                    <input
                      type="date"
                      value={MinDate}
                      onChange={(e) => setMinDate(e.target.value)}
                      className="date-time-input min-width-95 br-0"
                      min={MinDate}
                    />
                    <div className="help-block with-errors"></div>
                  </div>
                ) : (
                  ""
                )}
                {MainData?.company_setting?.show_appointment_button !== 0 ? (
                  <div className="col-lg-6 col-md-6 mb-2 text-center">
                    <input
                      type="time"
                      value={Time}
                      onChange={(e) => setTime(e.target.value)}
                      className="date-time-input min-width-95 br-0"
                    />
                    <div className="help-block with-errors"></div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-2">
              {/* <label className="ml-2 font-weight-normal">Email address*</label> */}
              <input
                type="email"
                className="form-control contactform-class"
                placeholder="Enter your email address*"
                required="required"
                autoComplete="on"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="help-block with-errors"></div>
            </div>
            <div className="form-group col-12 col-md-12 mb-2">
              {/* <label className="ml-2 font-weight-normal">Your message*</label> */}
              <textarea
                className="textarea form-control contactform-class"
                placeholder="Enter your message*"
                rows="4"
                required="required"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12 order-1 order-md-2 submitbutton d-flex align-items-center mt-3 gap-10">
              {!Loader ? (
                <button
                  type="submit"
                  className="contact-btn w-auto"
                  onClick={handleAppointment}
                >
                  Send
                </button>
              ) : (
                <button class="contact-btn w-auto" disabled>
                  <FontAwesomeIcon icon={faSpinner} className="spinner-fa" />
                  <LoadingText />
                </button>
              )}

              {/* {Loader && <p>Loading please wait...</p>} */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
