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
  faPhoneAlt,
  faShare,
  faSquarePhone,
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

const NewInsights = () => {
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
      if (response?.data?.data) {
        setData(response.data.data);
      }
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
    Data?.click_hits?.social_media &&
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
        data: Data?.click_hits?.hits,
      },
      {
        name: "Total Save Contacts",
        data: Data?.click_hits?.saved_contact,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        enabled: false,
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
          format: "",
        },
      },
      colors: ["#24b1e6", "#166a8a"],
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

  const chartData3 = {
    series: [
      {
        name: "Add Contact",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Shared Contacts",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Email",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
      {
        name: "Phone",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "URL",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Location",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
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

  const chartData4 = {
    series: [
      {
        name: "Shared Contacts",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Appointment",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
      {
        name: "Product Inquiry",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Custom Form",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
    ],
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

  const chartData5 = {
    series: [
      {
        name: "As per reference",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
    ],
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

  const chartData6 = {
    series: [
      {
        name: "As per location",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
    ],
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
  const chartData7 = {
    series: [
      {
        name: "Images",
        data: [76, 85, 107, 98, 100, 105, 21, 56, 94],
      },
      {
        name: "Videos",
        data: [1, 23, 89, 98, 87, 99, 91, 111, 94],
      },
      {
        name: UserData?.titles?.card_products?.visible_name,
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: UserData?.titles?.card_blogs?.visible_name,
        data: [76, 85, 101, 21, 87, 105, 1, 114, 9],
      },
    ],
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
            <div className="px-1">
              {/* Quick Analytics */}

              <div className="row d-flex align-items-center justify-content-between row-gap-3">
                <div className="col-lg-3 col-sm-12">
                  <h5 className="first-title title__separate mx-4  text-black">
                    Quick Analytics
                  </h5>
                </div>
                {/* <p className="mr-4 color-black">Year(2024)</p> */}
                <div className="col-lg-9 col-sm-12">
                  <div className="row w-100 m-0 p-0 px-4 mb-4 align-items-end bg-white justify-content-end">
                    <div className="col-6 col-lg-2 p-0 px-2 d-flex align-items-center">
                      <label className="mr-2">From</label>
                      <DatePicker
                        dateFormat="MM/dd/yyyy"
                        selected={StartDate}
                        maxDate={new Date()}
                        onChange={(date) => setStartDate(date)}
                        placeholderText={"End Date"}
                        className="form-control insight-filter w-100"
                      />
                    </div>
                    <div className="col-6 col-lg-2 p-0 px-2 d-flex align-items-center">
                      <label className="mr-2">To</label>
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
                    <div className="col-6 col-lg-1 p-0 px-2 text-right">
                      <button
                        className="contact-btn w-auto"
                        onClick={handleSearchData}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-5">
                <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                  <p className="text-xs font-weight-bold text-white">
                    Total Profile Visits
                  </p>
                  <div className="flex items-end justify-between space-x-2">
                    <p className="mt-4 text-2xl font-medium text-white">
                      {Data?.total_click_hits}
                    </p>
                  </div>
                  <div className="mask is-hexagon-2 absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                </div>
                <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                  <p className="text-xs font-weight-bold text-white">
                    Total Social Visits
                  </p>
                  <div className="flex items-end justify-between space-x-2">
                    <p className="mt-4 text-2xl font-medium text-white">
                      {Data?.total_saved_contact}
                    </p>
                  </div>
                  <div className="mask is-reuleaux-triangle absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                </div>
                <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                  <p className="text-xs font-weight-bold text-white">
                    Total Leads
                  </p>
                  <div className="flex items-end justify-between space-x-2">
                    <p className="mt-4 text-2xl font-medium text-white">
                      {Data?.card_states?.product_views}
                    </p>
                  </div>
                  <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                </div>
                <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                  <p className="text-xs font-weight-bold text-amber-50">
                    Total Resources Leads
                  </p>
                  <div className="flex items-end justify-between space-x-2">
                    <p className="mt-4 text-2xl font-medium text-white">
                      {Data?.total_share_contact}
                    </p>
                  </div>
                  <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                </div>
              </div>

              {/* Appointment table */}

              <h5 className="first-title title__separate mx-4 mt-4 text-black">
                Top 5 Appointment Leads
              </h5>
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
                    {Data?.bookings?.length === 0 ? (
                      <tr>
                        <td className="p-3">No data available</td>
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
                            <td data-column="created date">
                              {item.created_at}
                            </td>
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

              <h5 className="first-title title__separate mx-4 mt-4 text-black">
                Profile Intracts
              </h5>
              <div className="row m-0 mt-4 row-gap-3">
                <div className="col-sm-12 col-lg-8">
                  <div className="barchart-div">
                    <Charts
                      options={chartData3?.options}
                      series={chartData3?.series}
                      type="bar"
                      height={325}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-4">
                  <div className="dashboard-leads-col-4-div py-4">
                    {/* <p className="ml-4 mb-2 color-black font-weight-bold">
                      Leads Stats
                    </p> */}
                    <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-5">
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-white">
                          Add Contacts
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_click_hits}
                          </p>
                        </div>
                        <div className="mask is-hexagon-2 absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-white">
                          Shared Contacts
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_saved_contact}
                          </p>
                        </div>
                        <div className="mask is-reuleaux-triangle absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-white">
                          Email
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.card_states?.product_views}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Phone
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          URL
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Location
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}

              <h5 className="first-title title__separate mx-4 mt-4 text-black">
                Social Links
              </h5>
              <div className="row m-0 mt-4 row-gap-3">
                <div className="col-sm-12 col-lg-4">
                  <div className="dashboard-leads-col-4-div py-4">
                    {/* <p className="ml-4 mb-2 color-black font-weight-bold">
                      Social Stats
                    </p> */}
                    <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-5">
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-white">
                          Instagram
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.card_states?.product_views}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Facebook
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Linkedin
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Twitter
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-8">
                  <div className="barchart-div">
                    <Charts
                      options={chartData2?.options}
                      series={chartData2?.series}
                      type="bar"
                      height={225}
                    />
                  </div>
                </div>
              </div>
              <h5 className="first-title title__separate mx-4 mt-4 text-black">
                Leads
              </h5>
              <div className="row m-0 mt-4 row-gap-3">
                <div className="col-sm-12 col-lg-8">
                  <div className="barchart-div">
                    <Charts
                      options={chartData4?.options}
                      series={chartData4?.series}
                      type="bar"
                      height={225}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-4">
                  <div className="dashboard-leads-col-4-div pb-4">
                    {/* <p className="ml-4 mb-2 color-black font-weight-bold">
                      Resources Stats
                    </p> */}
                    <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-5">
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-white">
                          Shared Contact
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.card_states?.product_views}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Appointment
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Product Inquiry
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Custom Form
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="first-title title__separate mx-4 mt-4 text-black">
                Resources Hits
              </h5>
              <div className="row m-0 mt-4">
                <div className="col-sm-12 col-lg-4">
                  <div className="dashboard-leads-col-4-div py-4">
                    <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-5">
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-white">
                          Images
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.card_states?.product_views}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          Videos
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          {UserData?.titles?.card_products?.visible_name}
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                      <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                        <p className="text-xs font-weight-bold text-amber-50">
                          {UserData?.titles?.card_blogs?.visible_name}
                        </p>
                        <div className="flex items-end justify-between space-x-2">
                          <p className="mt-4 text-2xl font-medium text-white">
                            {Data?.total_share_contact}
                          </p>
                        </div>
                        <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-8">
                  <div className="barchart-div">
                    <Charts
                      options={chartData7?.options}
                      series={chartData7?.series}
                      type="bar"
                      height={225}
                    />
                  </div>
                </div>
              </div>

              <h5 className="first-title title__separate mx-4 mt-4 text-black">
                Organic Insights
              </h5>
              <div className="row m-0 mb-4 row-gap-3">
                <div className="col-sm-12 col-lg-6">
                  <div className="barchart-div">
                    <p className="ml-4 mb-2 color-black font-weight-bold">
                      Leads as per reference
                    </p>
                    <Charts
                      options={chartData5?.options}
                      series={chartData5?.series}
                      type="bar"
                      height={300}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div className="barchart-div">
                    <p className="ml-4 mb-2 color-black font-weight-bold">
                      Leads as per location
                    </p>
                    <Charts
                      options={chartData6?.options}
                      series={chartData6?.series}
                      type="bar"
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-100 text-center text-white p-2 pt-3"
              style={{ bottom: "0", background: "black" }}
            >
              <p> © 2024. All Rights Reserved By Popipro.</p>
            </div>
          </div>
        </>
      )}
    </>
  ) : (
    redirect("/login")
  );
};

export default NewInsights;
