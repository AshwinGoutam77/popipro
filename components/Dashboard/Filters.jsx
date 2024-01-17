import Api from "@services/Api";
import { GetInshights } from "@services/Routes";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

export default function Filters({ setData, setShowLoader }) {
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
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
  return (
    <>
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
    </>
  );
}
