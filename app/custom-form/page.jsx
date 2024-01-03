"use client";
import {
  faAngleLeft,
  faAngleRight,
  faCircleCheck,
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
  GetCustomForm,
  GetCustomFormData,
  GetCustomFormRecords,
} from "@services/Routes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Page() {
  const [Show, setShow] = useState(false);
  const [CustomFormData, setCustomFormData] = useState("");
  const [RecordsData, setRecordsData] = useState("");
  const [FormHeading, setFormHeading] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(true);

  useEffect(() => {
    GetCustomForm();
  }, []);

  const GetCustomForm = async () => {
    const res = await Api(GetCustomFormData, {});
    if (res.status) {
      setCustomFormData(res.data.data);
    }
  };

  const handleGetCustomFormData = async (id, name) => {
    setShow(true);
    setFormHeading(name);
    const res = await Api(GetCustomFormRecords, {}, id);
    if (res.status) {
      setRecordsData(res.data.data);
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
        GetCustomFormData,
        {},
        "?start_date=" + startDt + "&end_date=" + endDt
      );
      if (response.data.status) {
        setCustomFormData(response.data.data);
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

  return (
    <>
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
              return (
                <div key={index}>
                  <p className="my-2 mx-2 color-black">{items?.created_at}</p>
                  {items?.recorded_data?.length !== 0 ? (
                    items &&
                    items?.recorded_data?.map((i, o) => {
                      return (
                        <div className="leads-custom-table2 mb-1" key={o}>
                          {i?.name ? (
                            <div className="d-flex align-items-start">
                              <p className="w-100 font-weight-bold">
                                {i?.name}
                              </p>
                              <p className="w-100">
                                {i?.value ? i?.value : <p className="">----</p>}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="leads-custom-table2 mb-1">
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">No Data Found</p>
                      </div>
                    </div>
                  )}
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
      <div
        className="d-flex align-items-center flex-column justify-content-between h-100vh w-100 bg-white"
        style={{ height: "calc(100vh - 58px)" }}
      >
        <div className="w-100">
          <div className="mx-3 mt-4">
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
          <div className="box-shadow-leads mt-4">
            <table className="insight-table">
              <thead>
                <tr>
                  <th>Form</th>
                  <th>Last Submitted Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {CustomFormData?.length === 0 ? (
                  <tr>
                    <td className="p-3">No data available</td>
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
                        <td data-column="Name">{items?.form_heading}</td>
                        <td className="leads-short-para">{items.created_at}</td>
                        <td onClick={() => handleGetCustomFormData(items?.id)}>
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
        </div>
      </div>
    </>
  );
}
