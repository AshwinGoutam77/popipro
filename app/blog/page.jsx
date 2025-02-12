"use client";
import {
  faAngleLeft,
  faAngleRight,
  faChartSimple,
  faEye,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BlogsInsights, EditData, GetInshights } from "@services/Routes";
import Api from "@services/Api";
import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import "../../styles/about.css";
import { redirect } from "next/navigation";
import { useAuthContext } from "@context/AuthContext";
import dynamic from "next/dynamic";
import { Modal } from "react-bootstrap";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import RedirectComponent from "@app/RedirectComponent/page";

export default function DashboardBlogs() {
  const { token, APIDATA, UserData } = useAuthContext();
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [BlogFilter, setBlogFilter] = useState("");

  useEffect(() => {
    api();
    APIDATA();
  }, []);

  const api = async () => {
    setShowLoader(true);
    const response = await Api(BlogsInsights, {});
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
        BlogsInsights,
        {},
        BlogFilter !== ""
          ? "?start_date=" +
          startDt +
          "&end_date=" +
          endDt +
          "&blog_id=" +
          BlogFilter?.target?.value +
          "&type=" +
          BlogFilter?.target[BlogFilter.target.selectedIndex].getAttribute(
            "datatype"
          ) +
          "&location_filter=" +
          e
          : BlogFilter?.target?.value
            ? "?start_date=" +
            startDt +
            "&end_date=" +
            endDt +
            "&blog_id=" +
            BlogFilter?.target?.value +
            "&type=" +
            "card" +
            "&location_filter=" +
            e
            : "?start_date=" +
            startDt +
            "&end_date=" +
            endDt +
            "&blog_id=" +
            "" +
            "&type=" +
            "card" +
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
        name: UserData?.titles?.card_blogs?.visible_name,
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
      title: {
        text: "Total " + UserData?.titles?.card_blogs?.visible_name + " Hits",
        align: "left",
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
      title: {
        text: "As Per Location",
        align: "left",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };
  const handleShowModal = (name) => {
    setShowModal(true);
    setModalId(name);
  };

  return token ? (
    <>
      <RedirectComponent />
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
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header>
              <Modal.Title>
                <h5
                  class="title title--h1 first-title title__separate mb-1 mb-0"
                  id=""
                >
                  Hits Details
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
            <Modal.Body style={{ padding: "10px 0" }}>
              <div className="box-shadow-leads hits-details-modal">
                <table className="insight-table">
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data?.blog_stats?.map((item, index) => {
                      return item.name == ModalId
                        ? item?.data?.map((i, o) => {
                          return (
                            <tr key={o + index} className="cursor-pointer">
                              <td data-column="Name">
                                {i?.state !== "" ||
                                  i?.city !== "" ||
                                  i?.country !== ""
                                  ? i?.state
                                    ? i?.city +
                                    `${i?.city ? ", " : ""}` +
                                    i?.state +
                                    `${i?.state ? ", " : ""}` +
                                    i?.country
                                    : i?.city +
                                    `${i?.city ? ", " : ""}` +
                                    i?.country
                                  : "---"}
                              </td>
                              <td data-column="Email">
                                {i?.created_at ? i?.created_at : "---"}
                              </td>
                              <td className="">
                                {i?.name ? i?.name : "---"}
                              </td>
                            </tr>
                          );
                        })
                        : "";
                    })}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
          </Modal>
          <div>
            <div
              className="login-header p-3 text-center d-flex align-items-center justify-content-between"
              style={{ background: "black" }}
            >
              <h5 className="text-white m-0">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="text-white mr-2"
                  width="20"
                />{" "}
                {/* {UserData?.titles?.card_blogs?.visible_name} */}
                Blogs
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

            <div className="container-fluid">
              <div
                className="w-100 bg-custom"
              >
                <div className="pt-4">
                  <div className="row w-100 m-0 mb-4 align-items-end filter-section-row bg-white">
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
                      <select
                        onChange={(e) => setBlogFilter(e)}
                        className="form-control"
                        style={{
                          appearance: "auto",
                          padding: "10px",
                        }}
                      >
                        <option>Select Blog</option>
                        {Data &&
                          Data?.blog_list?.map((items, index) => {
                            return (
                              <option
                                value={items?.id}
                                key={index}
                                datatype={items?.type}
                              >
                                {items?.name}
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
                <div className="row mb-4 row-gap-3">
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
                      <div className="d-flex align-items-center justify-content-end dashboard-location-select">
                        {/* <p className="ml-4 color-black font-weight-bold">
                        As Per Location
                      </p> */}
                        <select
                          className="w-auto location-filter"
                          onChange={(e) => handleSearchData(e.target.value)}
                        >
                          <option value="country">Country</option>
                          <option value="city">City</option>
                          <option value="state">State</option>
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

                <div className="row">
                  <div className="col-12">
                    <div className="box-shadow-leads">
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Views</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {Data?.blog_stats?.length === 0 ? (
                            <Tr>
                              <td className="p-3">No data available</td>
                            </Tr>
                          ) : (
                            Data?.blog_stats?.map((item, index) => {
                              return (
                                <Tr
                                  data-column="Message"
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleShowModal(item?.name);
                                  }}
                                >
                                  <Td data-column="created date">
                                    {item.name}
                                  </Td>

                                  <Td data-column="created date">
                                    {item?.count}
                                  </Td>

                                  <Td data-column="status">
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="text-dark"
                                    />
                                  </Td>
                                </Tr>
                              );
                            })
                          )}
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                </div>
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
}
