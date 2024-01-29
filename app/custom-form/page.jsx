"use client";
import {
  faAngleLeft,
  faAngleRight,
  faCircleCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect } from "react";
import "../../styles/edit.css";
import "../../styles/about.css";
import "../styles/graph.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Api from "@services/Api";
import {
  EditData,
  GetAllForm,
  GetCustomForm,
  GetCustomFormData,
  GetCustomFormRecords,
} from "@services/Routes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page() {
  const [Show, setShow] = useState(false);
  const [CustomFormData, setCustomFormData] = useState("");
  const [FormsData, setFormsData] = useState();
  const [RecordsData, setRecordsData] = useState("");
  const [FormHeading, setFormHeading] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(true);
  const [SelectId, setSelectId] = useState("");
  const [form_permissions, setform_permissions] = useState("");
  const [CustomFromGraph, setCustomFromGraph] = useState("");

  useEffect(() => {
    handleGetCustomForm();
    handleGetAllForms();
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
        localStorage.removeItem("url");
        window.location.href = "/login";
      }
    }
    setShowLoader(false);
  };

  const handleGetAllForms = async () => {
    const res = await Api(GetAllForm, {});
    if (res.status) {
      setFormsData(res.data.data?.forms);
      setform_permissions(res.data.data?.form_permissions);
    }
  };

  const handleGetCustomForm = async (id) => {
    const res = id
      ? await Api(GetCustomFormData, {}, "?form_id=" + id)
      : await Api(GetCustomFormData, {});
    if (res.status) {
      setCustomFormData(res.data.data?.customForms);
      setCustomFromGraph(res?.data?.data);
    }
  };

  const handleGetCustomFormData = async (id, name) => {
    setShow(true);
    const res = await Api(GetCustomFormRecords, {}, id);
    if (res.status) {
      setFormHeading(res?.data?.data?.formHeading);
      setRecordsData(res?.data?.data?.recorded_data);
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
        GetCustomFormData,
        {},
        "?start_date=" +
          startDt +
          "&end_date=" +
          endDt +
          "&location_filter=" +
          e +
          "&form_id=" +
          SelectId
      );
      if (response.data.status) {
        setCustomFormData(response.data.data?.customForms);
        setCustomFromGraph(response?.data?.data);
        setShowLoader(false);
      } else {
        setShowLoader(false);
        toast.error(response.data.message, {
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
    } catch (error) {
      console.log(error);
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
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
  const chartData5 = {
    series: [
      {
        name: "Custom Forms",
        data: CustomFromGraph?.graph?.overall?.map((i) => {
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
        categories: CustomFromGraph?.ranges?.range?.map((i) => {
          return i;
        }),
      },
      title: {
        text: "Custom Form Leads",
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
    CustomFromGraph?.location_graph &&
    CustomFromGraph?.location_graph?.map((item) => {
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
        categories: CustomFromGraph?.ranges?.range?.map((i) => {
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

  return FormsData ? (
    <>
      <ToastContainer
        position="top-right"
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
      <SimpleBackdrop visible={ShowLoader} />
      <Modal show={Show} onHide={() => setShow(false)} centered size="">
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1 mb-0">
              {FormHeading}
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShow(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px" }}>
          {RecordsData?.length !== 0 ? (
            RecordsData &&
            RecordsData?.map((items, index) => {
              console.log(items);
              return (
                <div key={index}>
                  <div className="leads-custom-table2 mb-1" key={index}>
                    <div className="d-flex align-items-start">
                      <p className="w-100 font-weight-bold">{items?.name}</p>
                      <p className="w-100">
                        {items?.value ? (
                          items?.value.join(", ")
                        ) : (
                          <p className="">----</p>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="font-weight-bold m-2 color-black">No Data Found</p>
          )}
        </Modal.Body>
      </Modal>

      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-white mr-2"
            width="20"
          />{" "}
          Custom Form
        </h5>
        <Link href="/dashboard">
          <h6 className="text-white m-0">
            {" "}
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-white mr-2"
              width="10"
            />
            Back
          </h6>
        </Link>
      </div>
      <div className="d-flex align-items-center flex-column justify-content-between w-100 mb-4">
        <div className="w-100">
          <div className="mx-3 mt-4">
            <div className="row w-100 m-0 mb-4 align-items-end filter-section-row bg-white">
              <div className="col-6 col-lg-2 p-0 px-2">
                <label className="ml-1 mb-1">From</label>
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
                <select
                  onChange={(e) => setSelectId(e.target.value)}
                  className="form-control"
                  style={{
                    appearance: "auto",
                    height: "36px",
                    padding: "10px",
                  }}
                >
                  <option>Select Form</option>
                  {FormsData &&
                    FormsData?.map((items, index) => {
                      return (
                        <option value={items?.id} key={index}>
                          {items?.form_heading}
                        </option>
                      );
                    })}
                </select>
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
                  height={345}
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
            <table className="insight-table">
              <thead>
                <tr>
                  <th>Form</th>
                  <th>Location</th>
                  <th>Submitted Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {CustomFormData?.length === 0 || form_permissions == 0 ? (
                  <tr>
                    <td className="p-3" colspan="5">
                      {form_permissions !== 0
                        ? "No data available"
                        : "Access to this data is restricted; kindly reach out to your company for futher assistance."}
                    </td>
                  </tr>
                ) : (
                  CustomFormData &&
                  CustomFormData?.map((items, index) => {
                    return (
                      <tr
                        data-column="Message"
                        key={index}
                        onClick={() =>
                          handleGetCustomFormData(
                            items?.id,
                            items?.form_heading
                          )
                        }
                        className="cursor-pointer"
                      >
                        <td data-column="Name">{items?.form}</td>
                        {items.detail ? (
                          <td data-column="created date">
                            {items.detail?.state
                              ? items.detail?.city +
                                ", " +
                                items.detail?.state +
                                ", " +
                                items.detail?.country
                              : items.detail?.city +
                                ", " +
                                items.detail?.country}
                          </td>
                        ) : (
                          <td>---</td>
                        )}
                        <td className="leads-short-para">{items.created_at}</td>
                        <td
                          onClick={() =>
                            handleGetCustomFormData(items?.id, items?.form)
                          }
                        >
                          <FontAwesomeIcon icon={faEye} className="text-dark" />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  ) : (
    <SimpleBackdrop visible={ShowLoader} />
  );
}
