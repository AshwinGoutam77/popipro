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

export default function Page() {
  const [Show, setShow] = useState(false);
  const [CustomFormData, setCustomFormData] = useState("");
  const [RecordsData, setRecordsData] = useState("");
  const [FormHeading, setFormHeading] = useState("");

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

  return (
    <>
      <Modal show={Show} onHide={() => setShow(false)} centered>
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
                        <div className="leads-custom-table mb-1" key={o}>
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
                    <div className="leads-custom-table mb-1">
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">
                          No Data Found
                        </p>
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

      {/* <div className="row m-0 mt-4">
        {CustomFormData &&
          CustomFormData?.map((items, index) => {
            return (
              <div
                className="col-12 col-lg-3 margin-sm-top"
                onClick={() => handleGetCustomFormData(items?.id)}
                key={index}
              >
                <div className="card p-4">
                  <p className="font-medium text-slate-700 dark:text-navy-100 font-weight-bold">
                    {items?.form_heading}
                  </p>

                  <p className="mt-1 text-xs+ color-black">
                    click here to see complete report
                  </p>
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
                      <span className="text-xs">View Details</span>
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
            );
          })}
      </div> */}

      <div className="box-shadow-leads mt-4">
        <table className="insight-table">
          <thead>
            <tr>
              <th>Form Title</th>
              <th>Created Date</th>
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
                      handleGetCustomFormData(items?.id, items?.form_heading)
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
    </>
  );
}
