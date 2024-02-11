"use client";
import {
  faAngleLeft,
  faAngleRight,
  faDownload,
  faEye,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { EditData, GetInshights, ShareContactLeads } from "@services/Routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/about.css";
import { Modal } from "react-bootstrap";
import { redirect } from "next/navigation";
import { useAuthContext } from "@context/AuthContext";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Leads = () => {
  const { token, APIDATA } = useAuthContext();
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api();
    APIDATA();
  }, []);

  const api = async () => {
    setShowLoader(true);
    const response = await Api(ShareContactLeads, {});
    if (response.data.status) {
      setShowLoader(false);
      setData(response.data.data);
    }
  };

  function pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  const handleSearchData = async (e) => {
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
        ShareContactLeads,
        {},
        "?start_date=" +
          startDt +
          "&end_date=" +
          endDt +
          "&location_filter=" +
          e
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

  const shareContact = async (name, number, email) => {
    var contact = {
      name: name,
      phone: number,
      email: email,
    };
    var vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:";
    vcard +=
      contact.name +
      "\nTEL;TYPE=work,voice:" +
      contact.phone +
      "\nEMAIL;CHARSET=UTF-8;type=Email,INTERNET:" +
      contact.email +
      "\nURL;TYPE=Popipro - Digital Business Card:" +
      contact.url;

    vcard += "\nEND:VCARD";

    var blob = new Blob([vcard], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);

    const newLink = document.createElement("a");
    newLink.download = contact.name + ".vcf";
    newLink.textContent = contact.name;
    newLink.href = url;

    newLink.click();
  };

  const chartData5 = {
    series: [
      {
        name: "Shared Contact Leads",
        data: Data?.graph?.overall?.map((i) => {
          return i;
        }),
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1,
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "month",
        categories: Data?.ranges?.range?.map((i) => {
          return i;
        }),
      },
      title: {
        text: "Shared Contact Leads",
        align: "left",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  let dSet =
    Data?.location_graph &&
    Data?.location_graph?.map((item) => {
      return {
        name: item?.name,
        data: item?.value,
      };
    });
  const chartData6 = {
    series: dSet || [],
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
        categories: Data?.ranges?.range?.map((i) => {
          return i;
        }),
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  return token ? (
    <>
      {Data ? (
        <>
          <SimpleBackdrop visible={ShowLoader} />
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div
            className="login-header p-3 text-center d-flex align-items-center justify-content-between"
            style={{ background: "black" }}
          >
            <h5 className="text-white m-0">
              <FontAwesomeIcon
                icon={faSignal}
                className="text-white mr-2"
                width="20"
              />{" "}
              Shared Contact Leads
            </h5>
            <Link href="/dashboard">
              <h6 className="text-white m-0">
                {" "}
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="text-white mr-2"
                  width="20"
                />
                Back
              </h6>
            </Link>
          </div>
          <Modal show={showModal} onHide={() => setShowModal("")} centered>
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
              {Data?.leads?.map((item, index) => {
                return item.id == ModalId ? (
                  <div className="leads-custom-table mb-1" key={index}>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Date</p>
                      <p className="w-100">{item.created_at}</p>
                    </div>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Name</p>
                      <p className="w-100">{item.full_name}</p>
                    </div>
                    {item.email_address ? (
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Email</p>
                        <p className="w-100">{item.email_address}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Contact Number</p>
                      <p className="w-100">{item.contact_number}</p>
                    </div>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">Location </p>
                      {item.detail ? (
                        <p className="w-100 ml-5">
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
          <div
            className="d-flex align-items-center flex-column justify-content-between h-100vh w-100 bg-custom"
            style={{ height: "calc(100vh - 58px)" }}
          >
            <div className="w-100">
              <div className="mx-3 pt-4">
                <div className="row w-100 m-0 p-0 mb-4 align-items-end filter-section-row bg-white">
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
                      minDate={StartDate}
                      placeholderText={"End Date"}
                      className="form-control insight-filter w-100"
                    />
                  </div>
                  <div className="col-6 col-lg-2 p-0 px-2">
                    <button
                      className="contact-btn w-auto mt-3"
                      onClick={handleSearchData}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="row m-0 mb-4 row-gap-3">
                <div className="col-sm-12 col-lg-6">
                  <div className="barchart-div">
                    <Charts
                      options={chartData5?.options}
                      series={chartData5?.series}
                      type="area"
                      height={340}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div className="barchart-div">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <p className="ml-4 color-black font-weight-bold">
                        As per location
                      </p>
                      <select
                        className="w-auto location-filter"
                        onChange={(e) => handleSearchData(e.target.value)}
                      >
                        <option value="country">Country</option>
                        <option value="state">State</option>
                        <option value="city">City</option>
                      </select>
                    </div>
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
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Name</Th>
                      <Th>Contact</Th>
                      <Th>Location</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Data?.leads?.length === 0 ||
                    Data?.leads_permissions?.sharecontact == 0 ? (
                      <Tr>
                        <Td className="p-3 color-black" colspan="5">
                          {Data?.leads_permissions?.sharecontact !== 1
                            ? "No data available"
                            : "Access to this data is restricted; kindly reach out to your company for futher assistance."}
                        </Td>
                      </Tr>
                    ) : (
                      Data?.leads?.map((item, index) => {
                        return (
                          <Tr
                            data-column="Message"
                            key={index}
                            onClick={() => setModalId(item.id)}
                            className="cursor-pointer"
                          >
                            <Td
                              data-column="Name"
                              onClick={() => setShowModal(true)}
                            >
                              {item.full_name}
                            </Td>
                            <Td
                              data-column="Name"
                              onClick={() => setShowModal(true)}
                            >
                              {item?.contact_number}
                            </Td>
                            <Td className="" onClick={() => setShowModal(true)}>
                              {item.created_at}
                            </Td>
                            {item.detail ? (
                              <Td data-column="created date">
                                {item.detail?.state
                                  ? item.detail?.city +
                                    ", " +
                                    item.detail?.state +
                                    ", " +
                                    item.detail?.country
                                  : item.detail?.city +
                                    ", " +
                                    item.detail?.country}
                              </Td>
                            ) : (
                              <Td>---</Td>
                            )}
                            <Td>
                              <div
                                className="d-flex align-items-center justify-content-left"
                                style={{ gap: "10px" }}
                              >
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="text-dark"
                                  onClick={() =>
                                    shareContact(
                                      item.full_name,
                                      item.contact_number,
                                      item.email
                                    )
                                  }
                                />
                                <FontAwesomeIcon
                                  onClick={() => setShowModal(true)}
                                  icon={faEye}
                                  className="text-dark"
                                />
                              </div>
                            </Td>
                          </Tr>
                        );
                      })
                    )}
                  </Tbody>
                </Table>
              </div>
            </div>
            <div
              className="w-100 text-center text-white p-2 mt-3"
              style={{ bottom: "0", background: "black" }}
            >
              <p> © 2023 - 2024. All Rights Reserved By Popipro.</p>
            </div>
          </div>
        </>
      ) : (
        <SimpleBackdrop visible={ShowLoader} />
      )}
    </>
  ) : (
    redirect("/login")
  );
};

export default Leads;
