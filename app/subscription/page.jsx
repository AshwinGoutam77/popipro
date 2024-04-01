"use client";
import {
  faAngleLeft,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { EditData, Subscription } from "@services/Routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../styles/about.css";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import { useAuthContext } from "@context/AuthContext";

const PlanManagment = () => {
  const { APIDATA, UserData } = useAuthContext();
  console.log(UserData);
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
    const response = await Api(Subscription, {});
    // if (response.data.status) {
    setData(response.data);
    // }
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
      <div
        className="w-100 bg-custom pt-4"
        style={{ height: "calc(100vh - 58px)", padding: "20px" }}
      >
        {/* <div className="box-shadow-leads">
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
                      Data?.plan?.subscription?.plan_price}
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
        </div> */}
        <h5 className="pl-2 color-black">Subscription History</h5>

        {/* {Data &&
          Data?.map((item, index) => {
            return ( */}
        <div className="subscription-section mt-3">
          <div className="d-flex align-items-center justify-content-between divider">
            <div>
              <h6 className="color-black m-0">
                {UserData?.plan?.current_plan?.plan_name} Plan
              </h6>
              <p>{Data?.message}</p>
            </div>
            <button className="contact-btn w-auto mt-0">Active</button>
          </div>

          <div className="d-flex align-items-center justify-content-between mt-3">
            <p>Price</p>
            <p>
              {UserData?.plan?.subscription?.plan_currency?.currency}
              {UserData?.plan?.subscription?.plan_price}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <p>Start Date</p>
            <p>{UserData?.plan?.subscription?.start_date}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <p>End Date</p>
            <p>{UserData?.plan?.subscription?.end_date}</p>
          </div>
        </div>
        {/* );
          })} */}

        <div
          className="w-100 text-center text-white p-2 position-absolute mt-3"
          style={{ bottom: "0", background: "black" }}
        >
          <p> © 2023 - 2024. All Rights Reserved By Popipro.</p>
        </div>
      </div>
    </div>
  ) : (
    <SimpleBackdrop visible={ShowLoader} />
  );
};

export default PlanManagment;
