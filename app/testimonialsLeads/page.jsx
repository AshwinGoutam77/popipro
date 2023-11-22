"use client";
import {
  faAngleLeft,
  faAngleRight,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  ActiveTestimonials,
  EditData,
  GetTestimonials,
} from "@services/Routes";
import Api from "@services/Api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import "../../styles/about.css";
import { redirect } from "next/navigation";
import { useAuthContext } from "@context/AuthContext";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";

export default function TestimonialsLeads() {
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuthContext();
  const [ShowLoader, setShowLoader] = useState(false);

  const handleTestimonialsData = async () => {
    try {
      const response = await Api(GetTestimonials, {});
      if (response.data.status) {
        setData(response.data.data);
      }
    } catch (error) {
      if (error?.request?.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      toast(error?.response?.data?.message, {
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

  useEffect(() => {
    handleTestimonialsData();
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

  const handleActiveTestimonials = async (id) => {
    let data = {
      testimonial_id: id,
      type: 1,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Once you approve this request, it will show in your profile.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(ActiveTestimonials, data);
        if (response.data.status) {
          Swal.fire("Request Approved!", "", "success");
          handleTestimonialsData();
        }
      }
    });
  };

  const handleDeleteTestimonials = async (id) => {
    let data = {
      testimonial_id: id,
      type: 0,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Once you reject this request, you can't revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(ActiveTestimonials, data);
        if (response.data.status) {
          Swal.fire("Request Rejected!", "", "success");
          handleTestimonialsData();
        }
      }
    });
  };

  return token ? (
    Data ? (
      <div>
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
          <Modal.Body style={{ padding: "10px 5px" }}>
            {Data &&
              Data?.map((item, index) => {
                return item.id == ModalId ? (
                  <div className="leads-custom-table mb-1" key={index}>
                    <div className="d-flex align-items-start w-100">
                      <p className="font-weight-bold Heading-row">Name</p>
                      <p className="content-row">{item.name}</p>
                    </div>
                    <div className="d-flex align-items-start w-100">
                      <p className="font-weight-bold Heading-row">Sub Title</p>
                      <p className="content-row">{item.company_name}</p>
                    </div>
                    <div className="d-flex align-items-start w-100">
                      <p className="Heading-row font-weight-bold">Contact Number</p>
                      <p className="content-row">{item.user_contact_number}</p>
                    </div>
                    <div className="d-flex align-items-start w-100">
                      <p className="Heading-row font-weight-bold">Date</p>
                      <p className="content-row">{item.created_at}</p>
                    </div>
                    {item.description ? (
                      <div className="d-flex align-items-start w-100">
                        <p className="Heading-row font-weight-bold">Message</p>
                        <p className="content-row">{item.description}</p>
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
            <h5 className="text-white m-0">
              <FontAwesomeIcon icon={faStar} className="text-white mr-2" />
              Approve request
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
            <div className="box-shadow-leads pt-4">
              <table className="insight-table">
                <thead>
                  <tr>
                    <th>Contact</th>
                    <th>Req. Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Data?.length === 0 ? (
                    <tr>
                      <td className="p-3">No data available</td>
                    </tr>
                  ) : (
                    Data?.map((item, index) => {
                      return (
                        <tr
                          data-column="Message"
                          key={index}
                          className="cursor-pointer"
                        >
                          <td
                            data-column="name"
                            onClick={() => {
                              setModalId(item.id), setShowModal(true);
                            }}
                          >
                            {item.user_contact_number}
                          </td>
                          <td
                            data-column="created date"
                            onClick={() => {
                              setModalId(item.id), setShowModal(true);
                            }}
                          >
                            {item.created_at}
                          </td>
                          <td
                            data-column="status"
                            onClick={() => handleActiveTestimonials(item.id)}
                          >
                            <p href="#" class="badge badge-danger">
                              Approve It
                            </p>
                          </td>
                          <td className="d-flex align-items-center">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-dark ml-1"
                              onClick={() => handleDeleteTestimonials(item.id)}
                            />
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-dark ml-4"
                              onClick={() => {
                                setModalId(item.id), setShowModal(true);
                              }}
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
    )
  ) : (
    redirect("/login")
  );
}
