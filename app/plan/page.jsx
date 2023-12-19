"use client";
import {
  faAngleLeft,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { EditData } from "@services/Routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../styles/about.css";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";

const PlanManagment = () => {
  const [Data, setData] = useState("");
  const [ModalId, setModalId] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(false);

  useEffect(() => {
    api();
    APIDATA();
  }, []);

  const api = async () => {
    const response = await Api(
      EditData,
      {},
      "?card_url=" + localStorage.getItem("url")
    );
    if (response.data.status) {
      setData(response.data.data);
    }
  };

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

  return Data ? (
    <div>
      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon
            icon={faMoneyBill1Wave}
            className="text-white mr-2"
          />{" "}
          Subscription
        </h5>
        <Link href="/dashboard">
          <h6 className="text-white m-0">
            {" "}
            <FontAwesomeIcon icon={faAngleLeft} className="text-white mr-2" />
            Back
          </h6>
        </Link>
      </div>
      <div className="w-100 bg-white" style={{ height: "calc(100vh - 58px)" }}>
        <div className="box-shadow-leads pt-4">
          <table className="insight-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Price</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {Data?.blog_states?.length === 0 ? (
                <tr>
                  <td className="p-3">No data available</td>
                </tr>
              ) : (
                //   Data?.Plan?.map((item, index) => {
                //     return (
                <tr className="cursor-pointer">
                  <td data-column="Name">
                    {Data?.plan?.subscription?.plan?.plan_name}
                  </td>
                  <td data-column="Name">
                    {Data?.plan?.subscription?.plan_currency?.currency +
                      Data?.plan?.subscription?.plan?.plan_price_per_month}
                  </td>
                  <td data-column="Name">
                    {Data?.plan?.subscription?.start_date}
                  </td>
                  <td data-column="Email">
                    {Data?.plan?.subscription?.end_date}
                  </td>
                </tr>
                //     );
                //   })
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
  ) : (
    <SimpleBackdrop visible={ShowLoader} />
  );
};

export default PlanManagment;
