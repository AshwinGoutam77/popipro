"use client";
import {
  faAngleLeft,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/about.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/about.css";
import Api from "@services/Api";
import { EditData, GoogleAnalytics } from "@services/Routes";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import SimpleBackdrop from "@components/ViewPages/Backdrop";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page() {
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [Data, setData] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [GraphData, setGraphData] = useState("");

  const handleGoogleData = async () => {
    setShowLoader(true);
    const res = await Api(GoogleAnalytics, {});
    setData(res.data.data?.traffic_analysis);
    setGraphData(res.data.data);
  };
  useEffect(() => {
    handleGoogleData();
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

  const column = [
    {
      name: "Browser",
      selector: (row) =>
        row.detail?.browser == null ? "---" : row.detail?.browser,
    },
    {
      name: "Device",
      selector: (row) =>
        row.detail?.device == null ? "---" : row.detail?.device,
    },
    {
      name: "Location",
      selector: (row) =>
        row.detail?.state
          ? row.detail?.city +
            ", " +
            row?.detail?.state +
            ", " +
            row.detail?.country
          : row?.detail?.city
          ? row.detail?.city + ", " + row.detail?.country
          : "---",
    },
    {
      name: "Referer",
      selector: (row) => row?.referer,
    },
    {
      name: "Date / Time",
      selector: (row) => row.created_date_time,
    },
  ];

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
        GoogleAnalytics,
        {},
        "?start_date=" + startDt + "&end_date=" + endDt
      );
      if (response.data.status) {
        setShowLoader(false);
        setData(response.data.data?.traffic_analysis);
        setGraphData(response.data.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      setShowLoader(false);
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
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
  };

  const chartData5 = {
    series: [
      {
        name: "Custom Forms",
        data: GraphData?.graph?.overall?.map((i) => {
          return i;
        }),
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
        categories: GraphData?.ranges?.range?.map((i) => {
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
    GraphData?.location_graph &&
    GraphData?.location_graph?.map((item) => {
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
        categories: GraphData?.ranges?.range?.map((i) => {
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

  return Data ? (
    <>
      <div>
        <div
          className="login-header p-3 text-center d-flex align-items-center justify-content-between"
          style={{ background: "black" }}
        >
          <h5 className="text-white m-0 d-flex align-items-center">
            <FontAwesomeIcon
              icon={faMagnifyingGlassChart}
              className="text-white mr-2"
              width={20}
            />
            Traffic Analysis
          </h5>
          <Link href="/dashboard">
            <h6 className="text-white m-0">
              {" "}
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-white mr-2"
                width={20}
              />
              Back
            </h6>
          </Link>
        </div>

        <div className="w-100 bg-custom">
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
                    className="w-auto"
                    style={{ padding: "7px 10px", appearance: "auto" }}
                  >
                    <option>City</option>
                    <option>State</option>
                    <option>Country</option>
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
          <div className="box-shadow-leads mb-4" style={{ overflowX: "auto" }}>
            <DataTable
              columns={column}
              data={Data}
              pagination
              fixedHeader
              selectableRows
              selectableRowsHighlight
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <SimpleBackdrop visible={ShowLoader} />
  );
}
