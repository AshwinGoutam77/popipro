"use client";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import {
  faAngleLeft,
  faChartSimple,
  faChevronRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Api from "@services/Api";
import { GetOverallInsights } from "@services/Routes";
import "../../styles/about.css";
import "../styles/graph.css";
import { redirect } from "next/navigation";
import { useAuthContext } from "@context/AuthContext";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import dynamic from "next/dynamic";
import { Modal } from "react-bootstrap";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import RedirectComponent from "@app/RedirectComponent/page";

const Page = () => {
  const { token, APIDATA, UserData } = useAuthContext();
  const [Data, setData] = useState("");
  let d = new Date();
  const [StartDate, setStartDate] = useState(d.setMonth(d.getMonth() - 1));
  const [EndDate, setEndDate] = useState(new Date());
  const [ShowLoader, setShowLoader] = useState(false);
  // const [UserData, setUserData] = useState("");
  const [AppointmentTab, setAppointmentTab] = useState(true);
  const [ProductInquiryTab, setProductInquiryTab] = useState(false);
  const [ShareContactTab, setShareContactTab] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ModalId, setModalId] = useState("");
  const [ModalData, setModalData] = useState("");
  const [SelectValue, setSelectValue] = useState("country");

  useEffect(() => {
    api();
    APIDATA();
  }, []);

  const api = async () => {
    setShowLoader(true);
    const response = await Api(GetOverallInsights, {});
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
  const handleSearchData = async (e) => {
    setSelectValue(e);
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
        GetOverallInsights,
        {},
        "?start_date=" +
        startDt +
        "&end_date=" +
        endDt +
        "&location_filter=" +
        e
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
  const handleSearchLocation = async (e) => {
    setSelectValue(e);
    try {
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
        GetOverallInsights,
        {},
        "?start_date=" +
        startDt +
        "&end_date=" +
        endDt +
        "&location_filter=" +
        e
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

  const handleAppointmentTab = () => {
    setAppointmentTab(true);
    setShareContactTab(false);
    setProductInquiryTab(false);
  };
  const handleInquiryTab = () => {
    setAppointmentTab(false);
    setShareContactTab(false);
    setProductInquiryTab(true);
  };
  const handleShareTab = () => {
    setAppointmentTab(false);
    setShareContactTab(true);
    setProductInquiryTab(false);
  };

  let dSet =
    Data?.social_interact?.graphs &&
    Data?.social_interact?.graphs?.map((item) => {
      return {
        name: item?.name,
        data: item?.value,
      };
    });
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
        categories: Data?.ranges?.range?.map((i) => {
          return i;
        }),
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
        data: Data?.profile_interact?.graphs?.save_contact?.map((i) => {
          return i;
        }),
      },
      {
        name: "Shared Contacts",
        data: Data?.profile_interact?.graphs?.shared_contact?.map((i) => {
          return i;
        }),
      },
      {
        name: "Email",
        data: Data?.profile_interact?.graphs?.email?.map((i) => {
          return i;
        }),
      },
      {
        name: "Phone",
        data: Data?.profile_interact?.graphs?.phone?.map((i) => {
          return i;
        }),
      },
      {
        name: "URL",
        data: Data?.profile_interact?.graphs?.url?.map((i) => {
          return i;
        }),
      },
      {
        name: "Location",
        data: Data?.profile_interact?.graphs?.location?.map((i) => {
          return i;
        }),
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
        categories: Data?.ranges?.range?.map((i) => {
          return i;
        }),
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
        data: Data?.leads_interact?.graphs?.shared_contact?.map((i) => {
          return i;
        }),
      },
      {
        name: "Appointment",
        data: Data?.leads_interact?.graphs?.appointment?.map((i) => {
          return i;
        }),
      },
      {
        name: UserData?.titles?.card_products?.visible_name + " Inquiry",
        data: Data?.leads_interact?.graphs?.product_enquiry?.map((i) => {
          return i;
        }),
      },
      {
        name: "Custom Form",
        data: Data?.leads_interact?.graphs?.customform?.map((i) => {
          return i;
        }),
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
        categories: Data?.ranges?.range?.map((i) => {
          return i;
        }),
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

  let dSet2 =
    Data?.organic_interact?.graphs &&
    Data?.organic_interact?.graphs?.map((item) => {
      return {
        name: item?.name.slice(0, -1).replace("https://", ""),
        data: item?.values,
      };
    });
  const chartData5 = {
    series: dSet2 || [],
    options: {
      chart: {
        zoom: {
          enabled: false,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1,
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "date",
        categories: Data?.ranges?.range?.map((i) => {
          return i;
        }),
      },
      title: {
        text: "As per referer",
        align: "left",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  let dSet3 =
    Data?.location_interact?.graphs &&
    Data?.location_interact?.graphs?.map((item) => {
      return {
        name: item?.name,
        data: item?.value,
      };
    });
  const chartData6 = {
    series: dSet3,
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
        categories: Data?.ranges?.range?.map((i) => {
          return i;
        }),
      },
      title: {
        text: "As per location",
        align: "left",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  const chartData7 = {
    series: [
      {
        name: UserData?.titles?.card_photos?.visible_name,
        data: Data?.resource_interact?.graphs?.photos?.map((i) => {
          return i;
        }),
      },
      {
        name: UserData?.titles?.card_videos?.visible_name,
        data: Data?.resource_interact?.graphs?.video?.map((i) => {
          return i;
        }),
      },
      {
        name: UserData?.titles?.card_blogs?.visible_name,
        data: Data?.resource_interact?.graphs?.blogs?.map((i) => {
          return i;
        }),
      },
      {
        name: UserData?.titles?.card_products?.visible_name,
        data: Data?.resource_interact?.graphs?.products?.map((i) => {
          return i;
        }),
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
        categories: Data?.ranges?.range?.map((i) => {
          return i;
        }),
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
  const handleShowModal = (id, MapData) => {
    setShowModal(true);
    setModalId(id);
    setModalData(MapData);
  };

  const [showFull, setShowFull] = useState(false);
  const truncateText = (text) => {
    const words = text.split(" ");
    return words.length > 50 ? words.slice(0, 50).join(" ") + "..." : text;
  };

  return token ? (
    <>
      {ShowLoader ? (
        <h5
          className="d-flex align-items-center justify-content-center text-center video-loader"
          style={{ height: "100vh" }}
        >
          Loading...
        </h5>
      ) : (
        <>
          <RedirectComponent />
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

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header>
              <Modal.Title>
                <h5
                  className="title title--h1 first-title title__separate mb-1 mb-0"
                  id="BlogModalTitle"
                >
                  More Details
                </h5>
              </Modal.Title>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close alert</span>
              </button>
            </Modal.Header>
            <Modal.Body style={{ padding: "10px" }}>
              {ModalData &&
                ModalData?.map((item, index) => {
                  return item.id == ModalId ? (
                    <div className="leads-custom-table mb-1" key={index}>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">
                          {item.appointment ? "Submitted Date" : "Date"}
                        </p>
                        <p className="w-100">{item.created_at}</p>
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Name</p>
                        <p className="w-100">{item?.name}</p>
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Email</p>
                        <p className="w-100">
                          {item?.email ? item?.email : "---"}
                        </p>
                      </div>
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Phone</p>
                        <p className="w-100">{item.contact}</p>
                      </div>
                      {item.appointment ? (
                        <div className="d-flex align-items-start">
                          <p className="w-100 font-weight-bold">
                            Appointment Date
                          </p>
                          <p className="w-100">{item.appointment}</p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="d-flex align-items-start">
                        <p className="w-100 font-weight-bold">Location</p>
                        {item.detail ? (
                          <p className="w-100">
                            {item.detail?.state
                              ? item.detail?.city +
                              ", " +
                              item.detail?.state +
                              ", " +
                              item.detail?.country
                              : item.detail?.city + ", " + item.detail?.country}
                          </p>
                        ) : (
                          <p className="w-100">---</p>
                        )}
                      </div>
                      {item.message ? (
                        <div className="d-flex align-items-start">
                          <p className="w-100 font-weight-bold">Message</p>
                          <div className="w-100">
                            <p>{showFull ? item.message : truncateText(item.message)}</p>
                            {item.message.split(" ").length > 50 && (
                              <button className="contact-btn w-auto" onClick={() => setShowFull(!showFull)}>
                                {showFull ? "Show Less" : "Show More"}
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  );
                })}
            </Modal.Body>
          </Modal>

          {/* Header */}
          <div className="bg-white">
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
                Overall Analytics
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

            <div className="container-fluid">
              <div className="pt-2 bg-white insights-main-div">
                <div className="px-1">
                  {/* Quick Analytics */}
                  <div className="row d-flex align-items-center justify-content-between row-gap-3">
                    <div className="col-lg-3 col-sm-12">
                      <h5 className="first-title title__separate text-black">
                        Quick Analytics
                      </h5>
                    </div>
                    {/* <p className="mr-4 color-black">Year(2024)</p> */}
                    <div className="col-lg-9 col-sm-12">
                      <div className="row w-100 m-0 p-0 px-4 mb-4 align-items-end bg-white justify-content-end">
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

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                      <p className="text-xs font-weight-bold text-white">
                        Total Profile Views
                      </p>
                      <div className="flex items-end justify-between space-x-2">
                        <p className="mt-4 text-2xl font-medium text-white">
                          {Data?.quick_analytics?.profile_visits}
                        </p>
                      </div>
                      <div className="mask is-hexagon-2 absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                    </div>
                    <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                      <p className="text-xs font-weight-bold text-white">
                        Total Social Hits
                      </p>
                      <div className="flex items-end justify-between space-x-2">
                        <p className="mt-4 text-2xl font-medium text-white">
                          {Data?.quick_analytics?.social_visits}
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
                          {Data?.quick_analytics?.leads}
                        </p>
                      </div>
                      <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                    </div>
                    <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                      <p className="text-xs font-weight-bold text-amber-50">
                        Total Resources Hits
                      </p>
                      <div className="flex items-end justify-between space-x-2">
                        <p className="mt-4 text-2xl font-medium text-white">
                          {Data?.quick_analytics?.resource_hits}
                        </p>
                      </div>
                      <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                    </div>
                  </div>

                  {/* Top 5 Leads table */}
                  <h5 className="first-title title__separate mt-4 text-black">
                    Top 5 Leads
                  </h5>
                  <div className="mt-4">
                    <SwiperComponent
                      breakpoints={{
                        1110: {
                          slidesPerView: 2,
                        },
                        300: {
                          slidesPerView: 2,
                        },
                      }}
                      spaceBetween={10}
                      style={{ cursor: "pointer" }}
                      className="mySwiper mb-0"
                      modules={[Pagination]}
                    >
                      <SwiperSlide className="w-auto">
                        <div className="swiper-slide review-items position-relative">
                          <button
                            className={
                              AppointmentTab
                                ? "filter-btns-active"
                                : "filter-btns"
                            }
                            onClick={handleAppointmentTab}
                          >
                            Appointment Leads
                          </button>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="w-auto">
                        <div className="swiper-slide review-items position-relative">
                          <button
                            className={
                              ProductInquiryTab
                                ? "filter-btns-active"
                                : "filter-btns"
                            }
                            onClick={handleInquiryTab}
                          >
                            Product Inquiry Leads
                          </button>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="w-auto">
                        <div className="swiper-slide review-items position-relative">
                          <button
                            className={
                              ShareContactTab
                                ? "filter-btns-active"
                                : "filter-btns"
                            }
                            onClick={handleShareTab}
                          >
                            Shared Contact Leads
                          </button>
                        </div>
                      </SwiperSlide>
                    </SwiperComponent>
                  </div>
                  <div className="box-shadow-leads">
                    {AppointmentTab ? (
                      <Table className="insight-table">
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Appointment Date</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {Data?.latest_leads?.appointment?.length === 0 ? (
                            <Tr>
                              <Td className="p-3">No data available</Td>
                            </Tr>
                          ) : (
                            Data?.latest_leads?.appointment?.map(
                              (item, index) => {
                                return (
                                  <Tr
                                    data-column="Message"
                                    key={index}
                                    onClick={() =>
                                      handleShowModal(
                                        item.id,
                                        Data?.latest_leads?.appointment
                                      )
                                    }
                                    className="cursor-pointer"
                                  >
                                    <Td data-column="name">{item.name}</Td>
                                    <Td data-column="name">
                                      {item.email ? item.email : "---"}
                                    </Td>
                                    <Td data-column="name">{item.contact}</Td>
                                    <Td data-column="name">
                                      {item.appointment}
                                    </Td>
                                    <Td className="">
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        className="text-dark"
                                      />
                                    </Td>
                                  </Tr>
                                );
                              }
                            )
                          )}
                        </Tbody>
                      </Table>
                    ) : (
                      ""
                    )}
                    {ProductInquiryTab ? (
                      <Table className="insight-table">
                        <Thead>
                          <Tr>
                            <Th>Date</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {Data?.latest_leads?.product_enquiry?.length === 0 ? (
                            <Tr>
                              <Td className="p-3">No data available</Td>
                            </Tr>
                          ) : (
                            Data?.latest_leads?.product_enquiry?.map(
                              (item, index) => {
                                return (
                                  <Tr
                                    data-column="Message"
                                    key={index}
                                    onClick={() =>
                                      handleShowModal(
                                        item.id,
                                        Data?.latest_leads?.product_enquiry
                                      )
                                    }
                                    className="cursor-pointer"
                                  >
                                    <Td data-column="name">
                                      {item.created_at}
                                    </Td>
                                    <Td data-column="name">{item.name}</Td>
                                    <Td data-column="name">
                                      {item.email ? item.email : "---"}
                                    </Td>
                                    <Td data-column="name">{item.contact}</Td>
                                    <Td className="">
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        className="text-dark"
                                      />
                                    </Td>
                                  </Tr>
                                );
                              }
                            )
                          )}
                        </Tbody>
                      </Table>
                    ) : (
                      ""
                    )}
                    {ShareContactTab ? (
                      <Table className="insight-table">
                        <Thead>
                          <Tr>
                            <Th>Date</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {Data?.latest_leads?.shared_contact?.length === 0 ? (
                            <Tr>
                              <Td className="p-3">No data available</Td>
                            </Tr>
                          ) : (
                            Data?.latest_leads?.shared_contact?.map(
                              (item, index) => {
                                return (
                                  <Tr
                                    data-column="Message"
                                    key={index}
                                    onClick={() =>
                                      handleShowModal(
                                        item.id,
                                        Data?.latest_leads?.shared_contact
                                      )
                                    }
                                    className="cursor-pointer"
                                  >
                                    <Td data-column="name">
                                      {item.created_at}
                                    </Td>
                                    <Td data-column="name">{item.name}</Td>
                                    <Td data-column="name">
                                      {item.email ? item.email : "---"}
                                    </Td>
                                    <Td data-column="name">{item.contact}</Td>
                                    <Td className="">
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        className="text-dark"
                                      />
                                    </Td>
                                  </Tr>
                                );
                              }
                            )
                          )}
                        </Tbody>
                      </Table>
                    ) : (
                      ""
                    )}
                  </div>

                  <h5 className="first-title title__separate mt-4 text-black">
                    Insights
                  </h5>
                  <div className="row mb-4 row-gap-3">
                    <div className="col-sm-12 col-lg-6">
                      <div className="barchart-div">
                        {/* <p className="ml-4 mb-2 color-black font-weight-bold">
                      As per referer
                    </p> */}
                        <Charts
                          options={chartData5?.options}
                          series={chartData5?.series}
                          type="area"
                          height={300}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                      <div className="barchart-div">
                        <div className="d-flex align-items-center justify-content-end">
                          <select
                            className="w-auto location-filter dashboard-location-select"
                            onChange={(e) =>
                              handleSearchLocation(e.target.value)
                            }
                            defaultValue={SelectValue}
                          >
                            <option value="country">Country</option>
                            <option value="state">State</option>
                            <option value="city">City</option>
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

                  {/* Profile Intreacts */}
                  <h5 className="first-title title__separate mt-4 text-black">
                    Profile Interacts
                  </h5>
                  <div className="row mt-4 row-gap-3">
                    <div className="col-sm-12 col-lg-8 insights-order-1">
                      <div className="barchart-div">
                        <Charts
                          options={chartData3?.options}
                          series={chartData3?.series}
                          type="bar"
                          height={440}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 insights-order-2">
                      <div className="dashboard-leads-col-4-div py-4">
                        <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-5">
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-white">
                              Add Contacts
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white">
                                {Data?.profile_interact?.stats?.save_contact}
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
                                {Data?.profile_interact?.stats?.shared_contact}
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
                                {Data?.profile_interact?.stats?.email}
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
                                {Data?.profile_interact?.stats?.phone}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              Website URL
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white">
                                {Data?.profile_interact?.stats?.url}
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
                                {Data?.profile_interact?.stats?.location}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              {
                                UserData?.titles?.card_alternate_phone
                                  ?.visible_name
                              }
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white">
                                {Data?.profile_interact?.stats?.location}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              {UserData?.titles?.card_custom_url?.visible_name}
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white">
                                {Data?.profile_interact?.stats?.location}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Socail Links */}
                  {Data?.social_interact?.stats?.length !== 0 && (
                    <>
                      <h5 className="first-title title__separate mt-4 text-black">
                        Social Hits
                      </h5>
                      <div className="row mt-4 row-gap-3">
                        <div className="col-sm-12 col-lg-4">
                          <div className="dashboard-leads-col-4-div py-4">
                            <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-5">
                              {Data?.social_interact?.stats?.map(
                                (items, index) => {
                                  return (
                                    <div
                                      className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5"
                                      key={index}
                                    >
                                      <p className="text-xs font-weight-bold text-white">
                                        {items?.name}
                                      </p>
                                      <div className="flex items-end justify-between space-x-2">
                                        <p className="mt-4 text-2xl font-medium text-white">
                                          {items?.value}
                                        </p>
                                      </div>
                                      <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-8">
                          <div className="barchart-div">
                            <Charts
                              options={chartData2?.options}
                              series={chartData2?.series}
                              type="bar"
                              height={
                                Data?.social_interact?.stats?.length >= 5
                                  ? 322
                                  : 210
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Leads */}
                  <h5 className="first-title title__separate mt-4 text-black">
                    Leads
                  </h5>
                  <div className="row mt-4 row-gap-3">
                    <div className="col-sm-12 col-lg-8 insights-order-1">
                      <div className="barchart-div">
                        <Charts
                          options={chartData4?.options}
                          series={chartData4?.series}
                          type="bar"
                          height={210}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 insights-order-2">
                      <div className="dashboard-leads-col-4-div py-4">
                        <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-5">
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-white">
                              Shared Contact
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white d-flex justify-content-between align-items-center w-100">
                                {Data?.leads_interact?.stats?.shared_contact}{" "}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              Appointment
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white d-flex justify-content-between align-items-center w-100">
                                {Data?.leads_interact?.stats?.appointment}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              {/* {UserData?.titles?.card_products?.visible_name}{" "} */}
                              Product Inquiry
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white d-flex justify-content-between align-items-center w-100">
                                {Data?.leads_interact?.stats?.product_enquiry}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              Custom Form
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white d-flex justify-content-between align-items-center w-100">
                                {Data?.leads_interact?.stats?.customform}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resources Hits */}
                  <h5 className="first-title title__separate mt-4 text-black">
                    Resources Hits
                  </h5>
                  <div className="row mt-4">
                    <div className="col-sm-12 col-lg-4">
                      <div className="dashboard-leads-col-4-div py-4">
                        <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-5">
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-white">
                              {UserData?.titles?.card_photos?.visible_name}
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white">
                                {Data?.resource_interact?.stats?.photos}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              {UserData?.titles?.card_videos?.visible_name}
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white">
                                {Data?.resource_interact?.stats?.video}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              {/* {UserData?.titles?.card_blogs?.visible_name} */}
                              Blogs
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white">
                                {Data?.resource_interact?.stats?.blogs}
                              </p>
                            </div>
                            <div className="mask is-diamond absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20"></div>
                          </div>
                          <div className="relative flex flex-col overflow-hidden rounded-lg theme-custom p-3.5">
                            <p className="text-xs font-weight-bold text-amber-50">
                              {/* {UserData?.titles?.card_products?.visible_name} */}
                              Products
                            </p>
                            <div className="flex items-end justify-between space-x-2">
                              <p className="mt-4 text-2xl font-medium text-white">
                                {Data?.resource_interact?.stats?.products}
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
                          height={210}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-100 text-center text-white p-2 mt-3"
              style={{ bottom: "0", background: "black" }}
            >
              <p> © 2023 - 2024. All Rights Reserved By Popipro.</p>
            </div>
          </div>
        </>
      )}
    </>
  ) : (
    redirect("/login")
  );
};

export default Page;
