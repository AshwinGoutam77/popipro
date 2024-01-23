"use client";
import { useAuthContext } from "@context/AuthContext";
import {
  faAngleLeft,
  faBell,
  faCircleCheck,
  faEye,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GetNotitficationHistory,
  SendPushNotification,
} from "@services/Routes";
import React, { useEffect, useState } from "react";
import "../../styles/edit.css";
import "../../styles/about.css";
import Api from "@services/Api";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import Link from "next/link";

export default function Page() {
  const { APIDATA } = useAuthContext();
  const [Title, setTitle] = useState("");
  const [Message, setMessage] = useState("");
  const [Data, setData] = useState("");
  const [Show, setShow] = useState("");
  const [ModalID, setModalID] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);

  const handleSendNotification = async () => {
    if (Message === "") {
      toast.error("Message is requried", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (Message.length >= 100) {
      toast.error("Message can't be greater than 100 words", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      setShowLoader(true);
      let payload = {
        title: Title,
        body: Message,
      };
      const response = await Api(SendPushNotification, payload);
      if (response.data?.status) {
        setShowLoader(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        APIDATA();
        setTitle("");
        setMessage("");
      }
    } catch (error) {
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
  const handleGetMessageHistory = async () => {
    setShowLoader(true);
    const res = await Api(GetNotitficationHistory, {});
    if (res.status) {
      setShowLoader(false);
      setData(res?.data?.data?.firebase_notification_log);
    }
  };
  useEffect(() => {
    APIDATA();
    handleGetMessageHistory();
  }, []);

  const handleModalId = (id) => {
    setShow(true);
    setModalID(id);
  };

  return (
    <>
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
      <SimpleBackdrop visible={ShowLoader} />
      <Modal show={Show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              More Details
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={() => setShow(false)}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 5px" }}>
          {Data &&
            Data?.map((item, index) => {
              return item.id == ModalID ? (
                <div className="leads-custom-table mb-1" key={index}>
                  <div className="d-flex align-items-start w-100">
                    <p className="font-weight-bold Heading-row">Title</p>
                    <p className="content-row">{item.message?.title}</p>
                  </div>
                  <div className="d-flex align-items-start w-100">
                    <p className="Heading-row font-weight-bold">Total Users</p>
                    <p className="content-row">
                      {item.total_user} (Accurate Users: {item?.accurate_user} ,
                      Anonymous Users:{item.total_user - item?.accurate_user})
                    </p>
                  </div>
                  <div className="d-flex align-items-start w-100">
                    <p className="Heading-row font-weight-bold">Date</p>
                    <p className="content-row">{item.created_date}</p>
                  </div>
                  <div className="d-flex align-items-start w-100">
                    <p className="font-weight-bold Heading-row">Message</p>
                    <p className="content-row">{item.message?.body}</p>
                  </div>
                  <h6 className="mt-3 color-black">Accurate Users</h6>
                  {item?.users_log?.length !== 0 ? (
                    item?.users_log?.map((i, o) => {
                      return (
                        <div className="d-flex align-items-start w-100" key={o}>
                          <p className="font-weight-bold Heading-row">
                            <span className="mr-2">{o + 1}.</span>
                            {i?.name}
                          </p>
                          {/* <p className="content-row">{i.message}</p> */}
                        </div>
                      );
                    })
                  ) : (
                    <p className="ml-0 my-2">No Users Found</p>
                  )}
                </div>
              ) : (
                ""
              );
            })}
        </Modal.Body>
      </Modal>
      <div
        className="login-header p-3 text-center d-flex align-items-center justify-content-between"
        style={{ background: "black" }}
      >
        <h5 className="text-white m-0">
          <FontAwesomeIcon
            icon={faMessage}
            className="text-white mr-2"
            width="20"
          />{" "}
          Notification
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
      <div className="notification-form-div bg-white">
        <div className="notification-message-div">
          {/* <label>Title</label>
          <input
            type="text"
            className="form-control mb-3 w-50"
            placeholder="Enter title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          <label className="ml-1">
            Write Message *(Maximum limit 100 word)
          </label>
          <textarea
            type="password"
            name="number"
            placeholder="Enter Message*"
            className="mt-2 form-control"
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ minHeight: "100px" }}
            required
          />
          <button
            className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4 mb-2"
            onClick={() => handleSendNotification()}
          >
            Send Notification
          </button>
        </div>
      </div>
      <div className="box-shadow-leads mb-4">
        <table className="insight-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Total Users</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Data?.length === 0 ? (
              <tr>
                <td className="p-3" colSpan="5">
                  No data available
                </td>
              </tr>
            ) : (
              Data &&
              Data?.map((items, index) => {
                return (
                  <tr
                    data-column="Message"
                    key={index}
                    onClick={() => handleModalId(items?.id)}
                    className="cursor-pointer"
                  >
                    <td data-column="Name">
                      {items?.message?.title ? items?.message?.title : "---"}
                    </td>
                    <td className="leads-short-para">{items.created_date}</td>
                    <td data-column="users">{items.total_user}</td>
                    <td>
                      <FontAwesomeIcon icon={faEye} className="text-dark" />
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
