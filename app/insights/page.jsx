"use client";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import {
  faAngleLeft,
  faBagShopping,
  faChartSimple,
  faChevronRight,
  faDownload,
  faEnvelope,
  faEye,
  faLink,
  faLocationDot,
  faPhone,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Api from "@services/Api";
import { EditData, GetInshights } from "@services/Routes";
import "../../styles/about.css";
import "../styles/graph.css";
import { redirect } from "next/navigation";
import { useAuthContext } from "@context/AuthContext";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const Insights = () => {
  const { token } = useAuthContext();
  const [Data, setData] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(false);
  const [UserData, setUserData] = useState("");

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
        setUserData(response.data.data);
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

  let dSet =
    Data &&
    Data?.click_hits?.social_media?.map((item) => {
      return {
        name: item?.name,
        data: item?.data,
      };
    });
  const chartData = {
    series: [
      {
        name: "Total Profile Views",
        data: Data?.click_hits?.hits ? Data?.click_hits?.hits : "",
      },
      {
        name: "Total Save Contacts",
        data: Data?.click_hits?.saved_contact
          ? Data?.click_hits?.saved_contact
          : "",
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
  const chartData2 = {
    series: dSet || [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
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
      fill: {
        opacity: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " views";
          },
        },
      },
    },
  };

  return token ? (
    <>
      {ShowLoader ? (
        <h5
          className="d-flex align-items-center justify-content-center text-center"
          style={{ height: "100vh" }}
        >
          Loading...
        </h5>
      ) : (
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

          {/* Header */}

          <div
            className="login-header p-3 text-center d-flex align-items-center justify-content-between"
            style={{ background: "black" }}
          >
            <h5 className="text-white m-0">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="text-white mr-2"
                width="20"
              />{" "}
              Overall Insights
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

          <div className="pt-4 bg-white">
            {/* Quick Analytics */}

            <h5 className="first-title title__separate mx-4  text-black">
              Quick Analytics
            </h5>
            <div className="mt-5 grid grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-5">
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 p-3.5">
                <p className="text-xs font-weight-bold text-pink-100">
                  Profile Views
                </p>
                <div className="flex items-end justify-between space-x-2">
                  <p className="mt-4 text-2xl font-medium text-white">
                    {Data?.total_click_hits}
                  </p>
                  <a
                    href="#"
                    className="border-b border-left-0 border-right-0 border-top-0 border-dotted border-current pb-0.5 text-xs font-medium text-pink-100 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white"
                  >
                    Get Report
                  </a>
                </div>
                <div className="mask is-hexagon-2 absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
              </div>
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-info to-info-focus p-3.5">
                <p className="text-xs font-weight-bold text-sky-100">
                  Save Contacts
                </p>
                <div className="flex items-end justify-between space-x-2">
                  <p className="mt-4 text-2xl font-medium text-white">
                    {Data?.total_saved_contact}
                  </p>
                  <a
                    href="#"
                    className="border-b border-left-0 border-right-0 border-top-0 border-dotted border-current pb-0.5 text-xs font-medium text-sky-100 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white"
                  >
                    Get Report
                  </a>
                </div>
                <div className="mask is-reuleaux-triangle absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
              </div>
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 p-3.5">
                <p className="text-xs font-weight-bold text-amber-50">
                  {UserData?.titles?.card_products?.visible_name} Views
                </p>
                <div className="flex items-end justify-between space-x-2">
                  <p className="mt-4 text-2xl font-medium text-white">
                    {Data?.card_states?.product_views}
                  </p>
                  <a
                    href="#"
                    className="border-b border-left-0 border-right-0 border-top-0 border-dotted border-current pb-0.5 text-xs font-medium text-amber-50 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white"
                  >
                    Get Report
                  </a>
                </div>
                <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
              </div>
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-info to-info-focus p-3.5">
                <p className="text-xs font-weight-bold text-amber-50">
                  Your Leads
                </p>
                <div className="flex items-end justify-between space-x-2">
                  <p className="mt-4 text-2xl font-medium text-white">
                    {Data?.total_share_contact}
                  </p>
                  <a
                    href="#"
                    className="border-b border-left-0 border-right-0 border-top-0 border-dotted border-current pb-0.5 text-xs font-medium text-amber-50 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white"
                  >
                    Get Report
                  </a>
                </div>
                <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
              </div>
            </div>

            {/* Chart */}

            <div className="row w-100 m-0">
              <div className="col-12 col-lg-6 mt-4 px-0">
                <div className="barchart-div mx-4">
                  <div id="chart">
                    {typeof window !== "undefined" && (
                      <Charts
                        options={chartData?.options}
                        series={chartData?.series}
                        type="area"
                        height={350}
                      />
                    )}
                  </div>
                </div>
              </div>
              {Data?.users_social_link?.length !== 0 ? (
                <div className="col-12 col-lg-6 mt-4 px-0">
                  <div className="barchart-div mx-4">
                    {typeof window !== "undefined" && (
                      <Charts
                        options={chartData2?.options}
                        series={chartData2?.series}
                        type="bar"
                        height={350}
                      />
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Product */}

            <h5 className="first-title title__separate mx-4 mt-4 text-black">
              {UserData?.titles?.card_products?.visible_name} Analytics
            </h5>
            <div className="mx-2 mb-4">
              <div className="row m-0">
                <div className="col-12 col-lg-3 margin-sm-top">
                  <div className="card p-4">
                    <p className="font-medium text-slate-700 dark:text-navy-100 font-weight-bold">
                      {UserData?.titles?.card_products?.visible_name}
                    </p>
                    {Data?.card_states?.product_views == 0 ? (
                      <p className="mt-1 text-xs+ color-black">No Data Found</p>
                    ) : (
                      <p className="mt-1 text-xs+ color-black">
                        You got{" "}
                        <span className="VarColor font-weight-bold">
                          {Data?.card_states?.product_views}
                        </span>{" "}
                        clicks on Products, click here to see complete report
                      </p>
                    )}
                    <div className="mt-2 flex items-end justify-between">
                      <p className="flex items-center space-x-2 text-slate-400 dark:text-navy-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="text-xs">
                          View {UserData?.titles?.card_products?.visible_name}
                        </span>
                      </p>
                      <button className="link-btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 hover:shadow-lg hover:shadow-slate-200/50 focus:bg-slate-200 focus:shadow-lg focus:shadow-slate-200/50 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:hover:shadow-navy-450/50 dark:focus:bg-navy-450 dark:focus:shadow-navy-450/50 dark:active:bg-navy-450/90">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 rotate-45"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 margin-sm-top">
                  <div className="card p-4">
                    <p className="font-medium text-slate-700 dark:text-navy-100 font-weight-bold">
                      {UserData?.titles?.card_blogs?.visible_name}
                    </p>
                    {Data?.card_states?.blog_views == 0 ? (
                      <p className="mt-1 text-xs+ color-black">No Data Found</p>
                    ) : (
                      <p className="mt-1 text-xs+ color-black">
                        You got{" "}
                        <span className="VarColor font-weight-bold">
                          {Data?.card_states?.blog_views}
                        </span>{" "}
                        clicks on Products, click here to see complete report
                      </p>
                    )}
                    <div className="mt-2 flex items-end justify-between">
                      <p className="flex items-center space-x-2 text-slate-400 dark:text-navy-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="text-xs">
                          View {UserData?.titles?.card_blogs?.visible_name}
                        </span>
                      </p>
                      <button className="link-btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 hover:shadow-lg hover:shadow-slate-200/50 focus:bg-slate-200 focus:shadow-lg focus:shadow-slate-200/50 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:hover:shadow-navy-450/50 dark:focus:bg-navy-450 dark:focus:shadow-navy-450/50 dark:active:bg-navy-450/90">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 rotate-45"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 margin-sm-top">
                  <div className="card p-4">
                    <p className="font-medium text-slate-700 dark:text-navy-100 font-weight-bold">
                      Product Inquiry
                    </p>
                    {Data?.card_states?.product_views == 0 ? (
                      <p className="mt-1 text-xs+ color-black">No Data Found</p>
                    ) : (
                      <p className="mt-1 text-xs+ color-black">
                        You got{" "}
                        <span className="VarColor font-weight-bold">
                          {Data?.card_states?.product_views}
                        </span>{" "}
                        clicks on Products Inquiry, click here to see complete
                        report
                      </p>
                    )}
                    <div className="mt-2 flex items-end justify-between">
                      <p className="flex items-center space-x-2 text-slate-400 dark:text-navy-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="text-xs">View Product Inquiry</span>
                      </p>
                      <button className="link-btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 hover:shadow-lg hover:shadow-slate-200/50 focus:bg-slate-200 focus:shadow-lg focus:shadow-slate-200/50 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:hover:shadow-navy-450/50 dark:focus:bg-navy-450 dark:focus:shadow-navy-450/50 dark:active:bg-navy-450/90">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 rotate-45"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3 margin-sm-top">
                  <div className="card p-4">
                    <p className="font-medium text-slate-700 dark:text-navy-100 font-weight-bold">
                      Appointments
                    </p>
                    {Data?.card_states?.product_views == 0 ? (
                      <p className="mt-1 text-xs+ color-black">No Data Found</p>
                    ) : (
                      <p className="mt-1 text-xs+ color-black">
                        You got{" "}
                        <span className="VarColor font-weight-bold">
                          {Data?.card_states?.product_views}
                        </span>{" "}
                        clicks on Appointments, click here to see complete
                        report
                      </p>
                    )}
                    <div className="mt-2 flex items-end justify-between">
                      <p className="flex items-center space-x-2 text-slate-400 dark:text-navy-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="text-xs">View Appointments</span>
                      </p>
                      <button className="link-btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 hover:shadow-lg hover:shadow-slate-200/50 focus:bg-slate-200 focus:shadow-lg focus:shadow-slate-200/50 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:hover:shadow-navy-450/50 dark:focus:bg-navy-450 dark:focus:shadow-navy-450/50 dark:active:bg-navy-450/90">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 rotate-45"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter */}

            <div className="filter-data-section p-4 mx-4 mt-5">
              <h5 className="first-title title__separate text-black mb-4">
                Filter Data
              </h5>
              <div className="row w-100 m-0 p-0 align-items-end justify-content-sm-left">
                <div className="col-6 col-lg-2 p-0 px-2">
                  <label className="ml-1">From</label>
                  <DatePicker
                    selected={StartDate}
                    onChange={(Date) => setStartDate(Date)}
                    maxDate={new Date()}
                    placeholderText={"End Date"}
                    className="form-control insight-filter w-100"
                  />
                </div>
                <div className="col-6 col-lg-2 p-0 px-2">
                  <label className="ml-1">To</label>
                  <DatePicker
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
            <div className="filter-section">
              {/* Contact Analysis */}

              <h5 className="first-title title__separate mx-4 mt-4 text-black">
                Contact Analytics
              </h5>

              <div
                className="row w-100 m-0 justify-content-left mx-4"
                style={{ gap: "25px" }}
              >
                <div className="card p-4 sm:p-5 card-height-boxes d-flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-xl shadow-primary/50 dark:bg-accent dark:shadow-accent/50">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-xl text-white"
                      style={{ fontSize: "15px" }}
                      width="20"
                    />
                  </div>
                  <p className="mt-8">
                    People reached you through your Contact Number.
                  </p>
                  <p className="mt-2 font-medium text-slate-700 dark:text-navy-100">
                    <span className="text-2xl">
                      {Data?.card_states?.contact}
                    </span>
                  </p>
                  <p className="mt-1 flex items-center text-xs text-success">
                    <span>In this month</span>
                  </p>
                </div>
                <div className="card p-4 sm:p-5 card-height-boxes">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning shadow-xl shadow-warning/50">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-xl text-white"
                      style={{ fontSize: "15px" }}
                      width="20"
                    />
                  </div>
                  <p className="mt-8">
                    People reached you through your Email ID.
                  </p>
                  <p className="mt-2 font-medium text-slate-700 dark:text-navy-100">
                    <span className="text-2xl">{Data?.card_states?.email}</span>
                  </p>
                  <p className="mt-1 flex items-center text-xs text-success">
                    <span>In this month</span>
                  </p>
                </div>
                <div className="card p-4 sm:p-5 card-height-boxes">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info shadow-xl shadow-info/50">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="text-xl text-white"
                      style={{ fontSize: "15px" }}
                      width="20"
                    />
                  </div>
                  <p className="mt-8">
                    People reached you through your Website.
                  </p>
                  <p className="mt-2 font-medium text-slate-700 dark:text-navy-100">
                    <span className="text-2xl">
                      {Data?.card_states?.website}
                    </span>
                  </p>
                  <p className="mt-1 flex items-center text-xs text-success">
                    <span>In this month</span>
                  </p>
                </div>
                <div className="card p-4 sm:p-5 card-height-boxes">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary shadow-xl shadow-secondary/50">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-xl text-white"
                      style={{ fontSize: "15px" }}
                      width="20"
                    />
                  </div>
                  <p className="mt-8">
                    People reached you through your address.
                  </p>
                  <p className="mt-2 font-medium text-slate-700 dark:text-navy-100">
                    <span className="text-2xl">
                      {Data?.card_states?.address}
                    </span>
                  </p>
                  <p className="mt-1 flex items-center text-xs text-success">
                    <span>In this month</span>
                  </p>
                </div>
                {Data?.alternate_phone_states?.map((item, index) => {
                  return (
                    <div
                      className="card p-4 sm:p-5 card-height-boxes"
                      key={index}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary shadow-xl shadow-secondary/50">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-xl text-white"
                          style={{ fontSize: "15px" }}
                          width="20"
                        />
                      </div>
                      <p className="mt-8">
                        People reached you through the contact number{" "}
                        <span className="Varcolor">
                          {item?.country_code
                            ? item.country_code + "-" + item.number
                            : item.number}
                        </span>{" "}
                        ({item.name})
                      </p>
                      <p className="mt-2 font-medium text-slate-700 dark:text-navy-100">
                        <span className="text-2xl">{item?.count}</span>
                      </p>
                      <p className="mt-1 flex items-center text-xs text-success">
                        <span>In this month</span>
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Social Analytics */}
              <div className="flex flex-col rounded-xl bg-info/10 py-2 dark:bg-navy-800 lg:flex-row mt-4">
                <div className="flex flex-col px-4 sm:px-5 lg:w-48 lg:shrink-0 lg:py-3">
                  <h5 className="first-title title__separate mt-3 text-black w-100">
                    Socail Analytics
                  </h5>
                  <p className="mt-3 grow color-black">
                    Social analytics calculated based on your activity
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success/15 text-success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 11l5-5m0 0l5 5m-5-5v12"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="scrollbar-sm mt-1 flex space-x-4 overflow-x-auto px-4 sm:px-5 lg:mt-0 lg:pl-0">
                  {Data?.card_states?.social_links.length === 0 ? (
                    <p className="mx-4 font-weight-bold mb-4">
                      No data available
                    </p>
                  ) : (
                    Data?.card_states?.social_links?.map((item, index) => {
                      return (
                        <div
                          className="flex w-36 shrink-0 flex-col items-center justify-content-center"
                          key={index}
                        >
                          <img
                            className="z-10 h-10 w-10"
                            src={`https://lineone.piniastudio.com/images/logos/${item?.label?.toLowerCase()}-round.svg`}
                            alt="flag"
                          />

                          <div className="card -mt-5 w-full rounded-2xl px-3 py-3 text-center">
                            <p className="mt-3 text-base font-medium text-slate-700 dark:text-navy-100 font-weight-bold">
                              {item?.label}
                            </p>
                            <a
                              href="#"
                              className="color-black mt-1 font-inter text-xs+ tracking-wide text-slate-400 hover:text-primary focus:text-primary dark:hover:text-accent-light dark:focus:text-accent-light"
                            >
                              {item?.hit} People reach out through the{" "}
                              <span className="Varcolor ml-1 font-weight-bold">
                                {item?.label}
                              </span>
                            </a>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div
              className="w-100 text-center text-white p-2 mt-3"
              style={{ bottom: "0", background: "black" }}
            >
              <p> © 2023. All Rights Reserved By Popipro.</p>
            </div>
          </div>
        </>
      )}
    </>
  ) : (
    redirect("/login")
  );
};

export default Insights;
