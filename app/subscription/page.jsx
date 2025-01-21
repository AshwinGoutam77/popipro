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
    setData(response.data);
  };


  if (UserData?.plan?.is_expired == true) {
    window.location.href = '/'
    return
  }

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
        style={{ height: "calc(100vh - 58px)" }}
      >
        <div className="px-4">
          <h5 className="color-black">Active Subscription</h5>
          <div className="subscription-section mt-3">
            <div className="d-flex align-items-center justify-content-between divider gap-2">
              <div>
                <h6 className="color-black m-0">
                  {UserData?.plan?.current_plan?.plan_name} Plan
                </h6>
                <p>{Data?.message}</p>
              </div>
              {/* <button className="contact-btn w-auto mt-0">Active</button> */}
              <span className="badge">{UserData?.plan?.current_plan?.is_expired == false ? "Active" : "Inactive"}</span>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-3">
              <p>Price</p>
              <p>
                {UserData?.plan?.subscription?.plan_currency?.currency}
                {UserData?.plan?.subscription?.plan_price}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-1">
              <p>Subscription ends in</p>
              <p>{UserData?.plan?.subscription_left_days} days</p>
            </div>
          </div>

          <h5 className="color-black mt-4">Subscription History</h5>

          <div className="box-shadow-leads my-4 mx-0 w-100">
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
                <tr>
                  <p className="p-2 color-black">No History Found</p>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
