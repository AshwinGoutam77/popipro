"use client";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { EditData, GetInshights } from "@services/Routes";
import Api from "@services/Api";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import "../../styles/about.css";
import { redirect } from "next/navigation";
import { useAuthContext } from "@context/AuthContext";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "@components/Dashboard/Filters";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AppointmentLead() {
  const { token, APIDATA } = useAuthContext();
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    api();
    APIDATA();
  }, []);

  const api = async () => {
    const response = await Api(GetInshights, {});
    if (response.data.status) {
      setData(response.data.data);
    }
  };
  const chartData5 = {
    series: [
      {
        name: "As per referer",
        data: [21, 40, 28, 100, 42, 109, 23],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "month",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      title: {
        text: "Appointment Leads As Per Month",
        align: "left",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  const chartData6 = {
    series: [
      {
        name: "India",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Austrialia",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Canada",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
      {
        name: "China",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "month",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  return token ? (
    Data ? (
      <div>
        <SimpleBackdrop visible={ShowLoader} />
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header>
            <Modal.Title>
              <h5
                class="title title--h1 first-title title__separate mb-1 mb-0"
                id="BlogModalTitle"
              >
                More Details
              </h5>
            </Modal.Title>
            <button
              type="button"
              class="close"
              onClick={() => setShowModal(false)}
            >
              <span aria-hidden="true">×</span>
              <span class="sr-only">Close alert</span>
            </button>
          </Modal.Header>
          <Modal.Body style={{ padding: "10px 5px" }}>
            {Data &&
              Data?.bookings?.map((item, index) => {
                return item.id == ModalId ? (
                  <div className="leads-custom-table mb-1" key={index}>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Name</p>
                      <p className="w-100">{item.name}</p>
                    </div>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Email</p>
                      <p className="w-100">{item.email}</p>
                    </div>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Contact Number</p>
                      <p className="w-100">{item.contact}</p>
                    </div>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">
                        Appointment Date / Time
                      </p>
                      <p className="w-100">{item.appointment}</p>
                    </div>
                    {/* <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Appointment Time</p>
                      <p className="w-100">{item.time}</p>
                    </div> */}
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Created Date</p>
                      <p className="w-100">{item.created_at}</p>
                    </div>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Location</p>
                      {item.detail ? (
                        <p className="w-100">
                          {item.detail?.state
                            ? item.detail?.city +
                              ", " +
                              item.detail?.state +
                              ", " +
                              item.detail?.country
                            : item.detail?.city + ", " + item.detail?.country}
                        </p>
                      ) : (
                        <p className="w-100">---</p>
                      )}
                    </div>
                    {item.message ? (
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Message</p>
                        <p className="w-100">{item.message}</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                );
              })}
          </Modal.Body>
        </Modal>
        <div>
          <div
            className="login-header p-3 text-center d-flex align-items-center justify-content-between"
            style={{ background: "black" }}
          >
            <h5 className="text-white m-0 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faCalendarCheck}
                className="text-white mr-2"
              />
              Appointments
            </h5>
            <Link href="/dashboard">
              <h6 className="text-white m-0">
                {" "}
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="text-white mr-2"
                />
                Back
              </h6>
            </Link>
          </div>
          <div
            className="w-100 bg-custom"
            style={{ minHeight: "calc(100vh - 58px)" }}
          >
            <div className="mx-3 pt-4">
              <Filters setData={setData} setShowLoader={setShowLoader} />
            </div>
            <div className="row m-0 mb-4 row-gap-3">
              <div className="col-sm-12 col-lg-6">
                <div className="barchart-div">
                  <Charts
                    options={chartData5?.options}
                    series={chartData5?.series}
                    type="area"
                    height={300}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-6">
                <div className="barchart-div">
                  <Charts
                    options={chartData6?.options}
                    series={chartData6?.series}
                    type="bar"
                    height={300}
                  />
                </div>
              </div>
            </div>
            <div className="box-shadow-leads">
              <table className="insight-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Requested Date</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Data?.bookings?.length === 0 ||
                  Data?.leads_permissions?.appointment == 0 ? (
                    <tr>
                      <td className="p-3 color-black" colspan="5">
                        {Data?.leads_permissions?.appointment !== 0
                          ? "No data available"
                          : "Access to this data is restricted; kindly reach out to your company for futher assistance."}
                      </td>
                    </tr>
                  ) : (
                    Data?.bookings?.map((item, index) => {
                      return (
                        <tr
                          data-column="Message"
                          key={index}
                          onClick={() => {
                            setModalId(item.id), setShowModal(true);
                          }}
                          className="cursor-pointer"
                        >
                          <td data-column="name">{item.name}</td>
                          <td data-column="name">
                            {item.contact ? item.contact : "-"}
                          </td>
                          <td data-column="created date">{item.created_at}</td>
                          {item.detail ? (
                            <td data-column="created date">
                              {item.detail?.state
                                ? item.detail?.city +
                                  ", " +
                                  item.detail?.state +
                                  ", " +
                                  item.detail?.country
                                : item.detail?.city +
                                  ", " +
                                  item.detail?.country}
                            </td>
                          ) : (
                            <td>---</td>
                          )}
                          <td className="d-flex align-items-center">
                            <FontAwesomeIcon
                              icon={faEye}
                              className="text-dark"
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="w-100 text-center text-white p-2 mt-3"
            style={{ bottom: "0", background: "black" }}
          >
            <p> © 2023 - 24. All Rights Reserved By Popipro.</p>
          </div>
        </div>
      </div>
    ) : (
      <SimpleBackdrop visible={ShowLoader} />
    )
  ) : (
    redirect("/login")
  );
}
