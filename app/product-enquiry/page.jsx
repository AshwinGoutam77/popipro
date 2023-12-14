"use client";
import {
  faAngleLeft,
  faAngleRight,
  faCartShopping,
  faInfo,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { EditData, GetInshights } from "@services/Routes";
import Api from "@services/Api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import "../../styles/about.css";
import { Modal } from "react-bootstrap";
import { redirect } from "next/navigation";
import { useAuthContext } from "@context/AuthContext";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProductEnquiry() {
  const { token } = useAuthContext();
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());

  useEffect(() => {
    api();
    APIDATA();
  }, []);

  const APIDATA = async () => {
    setShowLoader(true);
    try {
      const response = await Api(
        EditData,
        {},
        "?card_url=" + localStorage.getItem("url")
      );
      if (response.data.status) {
        setShowLoader(false);
        document.documentElement.style.setProperty(
          "--color",
          response.data.data.card.color_code
        );
        document.documentElement.style.setProperty(
          "--themecolor",
          response.data.data.card.background_color
        );
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--color");
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    setShowLoader(false);
  };

  const api = async () => {
    setShowLoader(true);
    const response = await Api(GetInshights, {});
    if (response.data.status) {
      setShowLoader(false);
      setData(response.data.data);
    }
  };
  const handleMessageTr = (id) => {
    setModalId(id);
    setShowModal(true);
  };

  function pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  const handleSearchData = async () => {
    try {
      setShowLoader(true);
      let startDateNew = new Date(StartDate);
      let startDt =
        startDateNew?.getFullYear() +
        "-" +
        pad(parseInt(startDateNew.getMonth()) + 1, 2) +
        "-" +
        pad(startDateNew.getDate(), 2);
      let endDt =
        EndDate?.getFullYear() +
        "-" +
        pad(parseInt(EndDate.getMonth()) + 1, 2) +
        "-" +
        pad(EndDate.getDate(), 2);
      const response = await Api(
        GetInshights,
        {},
        "?start_date=" + startDt + "&end_date=" + endDt
      );
      if (response.data.status) {
        setData(response.data.data);
        setShowLoader(false);
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
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
  };

  return token ? (
    <>
      {Data ? (
        <div>
          <SimpleBackdrop visible={ShowLoader} />
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header>
              <Modal.Title>
                <h5
                  class="title title--h1 first-title title__separate mb-1 mb-0"
                  id="BlogModalTitle"
                >
                  More Detail
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
            <Modal.Body style={{ padding: "10px" }}>
              {Data &&
                Data?.product_enquiries?.map((item, index) => {
                  return item.id == ModalId ? (
                    <div className="leads-custom-table mb-1" key={index}>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Product Name</p>
                        <p className="w-100">{item?.productable?.name}</p>
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Name</p>
                        <p className="w-100">{item.name}</p>
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Contact Number</p>
                        <p className="w-100">{item.contact}</p>
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Date</p>
                        <p className="w-100">{item.created_at}</p>
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Latitude</p>
                        <p className="w-100">
                          {item.latitude ? item.latitude : "----"}
                        </p>
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Longitude</p>
                        <p className="w-100">
                          {item.longitude ? item.longitude : "----"}
                        </p>
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
                  icon={faCartShopping}
                  className="text-white mr-2"
                />
                {Data?.title_array?.card_products?.visible_name} Inquiry
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
              className="w-100 bg-white"
              style={{ height: "calc(100vh - 58px)" }}
            >
              <div className="mx-3 pt-4">
                <div className="row w-100 m-0 p-0 mb-4 align-items-end">
                  <div className="col-6 col-lg-2 p-0 px-2">
                    <label className="ml-1">From</label>
                    <DatePicker
                      dateFormat="MM/dd/yyyy"
                      selected={StartDate}
                      maxDate={new Date()}
                      onChange={(date) => setStartDate(date)}
                      placeholderText={"End Date"}
                      className="form-control insight-filter w-100"
                    />
                  </div>
                  <div className="col-6 col-lg-2 p-0 px-2">
                    <label className="ml-1">To</label>
                    <DatePicker
                      dateFormat="MM/dd/yyyy"
                      selected={EndDate}
                      defaultValue={EndDate}
                      onChange={(Date) => setEndDate(Date)}
                      maxDate={new Date()}
                      placeholderText={"End Date"}
                      className="form-control insight-filter w-100"
                    />
                  </div>
                  <div className="col-6 col-lg-2 p-0 px-2">
                    <button
                      className="insight-search w-100 mt-3"
                      onClick={handleSearchData}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="box-shadow-leads pt-1">
                <table className="insight-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Req. Date</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data?.product_enquiries?.length === 0 ? (
                      <tr>
                        <td className="p-3">No data available</td>
                      </tr>
                    ) : (
                      Data?.product_enquiries?.map((item, index) => {
                        return (
                          <tr
                            data-column="Message"
                            key={index}
                            onClick={() => handleMessageTr(item.id)}
                            className="cursor-pointer"
                          >
                            <td data-column="name">
                              {item?.productable?.name}
                            </td>
                            <td data-column="name">
                              {item.contact ? item.contact : "-"}
                            </td>
                            <td data-column="created date">
                              {item.created_at}
                            </td>
                            <td data-column="created date">
                              {item.latitude ? item.latitude : "----"}
                            </td>
                            <td data-column="created date">
                              {item.longitude ? item.longitude : "----"}
                            </td>
                            <td className="d-flex align-items-center">
                              <FontAwesomeIcon
                                icon={faAngleRight}
                                className="text-dark ml-4"
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div
                className="w-100 text-center text-white p-2 position-absolute mt-3"
                style={{ bottom: "0", background: "black" }}
              >
                <p> © 2023. All Rights Reserved By Popipro.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SimpleBackdrop visible={ShowLoader} />
      )}
    </>
  ) : (
    redirect("/login")
  );
}
