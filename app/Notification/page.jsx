"use client";
import { useAuthContext } from "@context/AuthContext";
import {
  faAngleLeft,
  faBell,
  faChevronRight,
  faCircleCheck,
  faEye,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AccurateUsers,
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
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function Page() {
  const { APIDATA } = useAuthContext();
  const [Title, setTitle] = useState("");
  const [Message, setMessage] = useState("");
  const [Data, setData] = useState("");
  const [Show, setShow] = useState("");
  const [ShowList, setShowList] = useState(false);
  const [ModalID, setModalID] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [AccurateUsersList, setAccurateUsersList] = useState("");

  const handleSendNotification = async () => {
    if (Message === "") {
      toast.error("Message is required", {
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
        handleGetMessageHistory();
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

  const handleGetAccurateUsers = async () => {
    const res = await Api(AccurateUsers, {});
    if (res.status) {
      setAccurateUsersList(res?.data?.data);
    }
  };

  useEffect(() => {
    APIDATA();
    handleGetMessageHistory();
    handleGetAccurateUsers();
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
                    <p className="Heading-row font-weight-bold">Total Users</p>
                    <p className="content-row">
                      {item.total_user} (Users: {item?.accurate_user} ,
                      Anonymous: {item.total_user - item?.accurate_user})
                    </p>
                  </div>
                  {/* <div className="d-flex align-items-start w-100">
                    <p className="Heading-row font-weight-bold">Date</p>
                    <p className="content-row">{item.created_date}</p>
                  </div>
                  <div className="d-flex align-items-start w-100">
                    <p className="font-weight-bold Heading-row">Message</p>
                    <p className="content-row">{item.message?.body}</p>
                  </div> */}
                  <h6 className="mt-3 color-black">Users</h6>
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

      {/* user list modal */}
      <Modal show={ShowList} onHide={() => setShowList(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              List of users
            </h5>
          </Modal.Title>
          <button
            type="button"
            class="close"
            onClick={() => setShowList(false)}
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 5px" }}>
          {AccurateUsersList?.details &&
            AccurateUsersList?.details?.map((item, index) => {
              return (
                <div className="leads-custom-table mb-0" key={index}>
                  <div className="d-flex align-items-start w-100">
                    <p className="font-weight-bold Heading-row color-black">
                      <span className="mr-2">{index + 1}.</span>
                      {item?.name}
                    </p>
                  </div>
                </div>
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
          <p className="color-black mt-2">
            This message will recieve by {AccurateUsersList?.accurate} (accurate
            users) + {AccurateUsersList?.anonymous} (anonymous users){" "}
            <span
              className="ml-2 font-weight-bold VarColor cursor-pointer"
              onClick={() => setShowList(true)}
            >
              Get List <FontAwesomeIcon icon={faChevronRight} width={7} />
            </span>
          </p>
          <button
            className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-4 mb-2"
            onClick={() => handleSendNotification()}
          >
            Send Notification
          </button>
        </div>
      </div>
      <div className="box-shadow-leads mb-4">
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Total Users</Th>
              <Th>Message</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Data?.length === 0 ? (
              <Tr>
                <td className="p-3">No data available</td>
              </Tr>
            ) : (
              Data?.map((item, index) => {
                return (
                  <Tr
                    data-column="Message"
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleModalId(item?.id)}
                  >
                    <Td data-column="created date">{item.created_date}</Td>

                    <Td data-column="created date">{item?.total_user}</Td>

                    <Td data-column="status">
                      {item.message?.body ? item.message?.body : "---"}
                    </Td>

                    <Td data-column="status">
                      <FontAwesomeIcon icon={faEye} className="text-dark" />
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </div>
    </>
  );
}
