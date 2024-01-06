"use client";
import {
  faAddressBook,
  faBagShopping,
  faCalendarCheck,
  faCartShopping,
  faChartSimple,
  faCircleCheck,
  faCode,
  faEnvelope,
  faGear,
  faHomeAlt,
  faImage,
  faLightbulb,
  faMagnifyingGlassChart,
  faMessage,
  faMoneyBill1Wave,
  faNewspaper,
  faPalette,
  faRightFromBracket,
  faSignal,
  faSliders,
  faStar,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/edit.css";
import "../../styles/about.css";
import "../styles/graph.css";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Tooltip } from "@mui/material";
import Api from "@services/Api";
import { CardData, EditData, UpgradePlan } from "@services/Routes";
import DashboardPlan from "@components/Dashboard/DashboardPlan";
import Multimodes from "@components/Dashboard/Multimodes";
import ChangePassword from "@components/Dashboard/ChangePassword";
import Theme from "@components/Dashboard/Theme";
import Suggestions from "@components/Dashboard/Suggestions";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SendMessage from "@components/Dashboard/SendMessage";
import MetaTags from "@components/Dashboard/MetaTags";
import { ButtonGroup, Dropdown } from "react-bootstrap";

export default function Dashboard() {
  const [ShowLoader, setShowLoader] = useState(false);
  const [Data, setData] = useState("");
  const [PlanData, setPlanData] = useState("");
  const [Color, setColor] = useState("");
  const [BackgroundColor, setBackgroundColor] = useState("");
  const [HeaderColor, setHeaderColor] = useState("");
  const [TextColor, setTextColor] = useState("");
  const [MainData, setMainData] = useState("");
  const [TitleData, setTitleData] = useState("");
  const [Appointment, setAppointment] = useState("");
  const [modalShow, setModalShow] = useState("");
  const [time, setTime] = useState(new Date().getTime() / 1000);
  const [Description, setDescription] = useState("");
  const [Title, setTitle] = useState("");
  const [MetaTitle, setMetaTitle] = useState("");
  const [MetaDescription, setMetaDescription] = useState("");
  const [ProfileTab, setProfileTab] = useState(true);
  const [LeadsTab, setLeadsTab] = useState(false);
  const [AnalyticsTab, setAnalyticsTab] = useState(false);
  const [InsightsTab, setInsightsTab] = useState(false);
  const [ThemeTab, setThemeTab] = useState(false);

  const APIDATA = async () => {
    if (localStorage.getItem("url")) {
      setShowLoader(true);
      try {
        const response = await Api(
          EditData,
          {},
          "?card_url=" + localStorage.getItem("url")
        );
        if (response.data.status) {
          setShowLoader(false);
          setTitleData(response.data.data?.titles);
          setAppointment(response.data.data.titles.card_booking?.visible_name);
          setData(response.data.data.card);
          setPlanData(response?.data?.data?.plan);
          setColor(response.data.data.card?.color_code);
          setBackgroundColor(response.data.data?.card?.background_color);
          setHeaderColor(response.data.data?.card?.banner_color);
          setTextColor(response.data.data?.card?.text_color);
          setMainData(response.data.data);
          document.documentElement.style.setProperty(
            "--color",
            response.data.data.card.color_code
          );
          document.documentElement.style.setProperty(
            "--header-color",
            response.data.data.card.banner_color
          );
          document.documentElement.style.setProperty(
            "--themecolor",
            response.data.data.card.background_color
          );
          document.documentElement.style.setProperty(
            "--text-color",
            response.data.data.card.text_color
          );
          const color = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color");
        }
      } catch (error) {
        console.log(error);
        if (error?.request?.status == "401") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
      setShowLoader(false);
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    APIDATA();
  }, []);

  const handleLogout = () => {
    window.location.href = "/" + localStorage.getItem("url");
    localStorage.removeItem("token");
    localStorage.removeItem("url");
  };
  const handleFreeTrail = async () => {
    try {
      Swal.fire({
        title: MainData?.is_individual == 0 ? "" : "Are you sure?",
        text:
          MainData?.is_individual == 0
            ? "Kindly contact to your company to upgrade the plan."
            : "You want to activate 30 days Free trial for Premium Features without paying any money for now? ",
        icon: "warning",
        showCancelButton: MainData?.is_individual == 0 ? false : true,
        confirmButtonColor: "rgb(24 123 249)",
        cancelButtonColor: "#d33",
        showConfirmButton: MainData?.is_individual == 0 ? false : true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await Api(UpgradePlan, {
            total_month: "1",
            is_trial: "1",
          });
          setShowLoader(false);
          if (response.data.status) {
            Swal.fire("Done", "", "success");
            APIDATA();
            toast(response.data.message, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      });
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
  const SaveStatusApi = async () => {
    setShowLoader(true);
    if (Data.first_name == null) {
      toast("Name field is requried", {
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
    const response = await Api(CardData, { is_onboarding: 2 });
    if (response.status) {
      APIDATA();
    }
    setShowLoader(false);
  };
  const handleShowMetaTags = () => {
    setModalShow("metatags");
    setDescription(Data?.card_description);
    setTitle(Data?.first_name + " - " + Data?.card_profession);
    setMetaDescription(Data?.meta_description);
    setMetaTitle(Data?.meta_title);
  };
  const handleProfileTab = () => {
    setProfileTab(true);
    setInsightsTab(false);
    setLeadsTab(false);
    setThemeTab(false);
    setAnalyticsTab(false);
  };
  const handleLeadsTab = () => {
    setProfileTab(false);
    setInsightsTab(false);
    setLeadsTab(true);
    setThemeTab(false);
    setAnalyticsTab(false);
  };
  const handleInsightsTab = () => {
    setProfileTab(false);
    setInsightsTab(true);
    setLeadsTab(false);
    setThemeTab(false);
    setAnalyticsTab(false);
  };
  return Data ? (
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
      <div className="d-flex align-items-center flex-column justify-content-between h-100vh w-100 bg-white">
        <div
          className="login-header p-2 text-center d-flex align-items-center justify-content-between px-4 w-100"
          style={{ background: "black" }}
        >
          <img
            src="https://www.popipro.com/assets/images/whiteLogo.png"
            alt="logo"
            className="login-logo"
            style={{ width: "135px" }}
          />
          <div className="d-flex align-items-start">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
                style={{
                  color: "black",
                  boxShadow: "none",
                  padding: "0",
                  margin: "0",
                  height: "0",
                }}
              >
                {" "}
                <img
                  src={
                    Data?.profile_picture?.path
                      ? Data?.base_url +
                        Data?.profile_picture?.path +
                        "?ver=" +
                        time
                      : "https://avatars.githubusercontent.com/u/8152403?v=4"
                  }
                  alt="imagee"
                  className="dashboard-image"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ margin: "2.125rem 0 0" }}>
                <Dropdown.Item href="" onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-dark cursor-pointer mr-2"
                    style={{ fontSize: "16px" }}
                  />
                  Logout{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Tooltip title="Logout">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="text-white cursor-pointer"
                style={{ fontSize: "19px" }}
                onClick={handleLogout}
              />
            </Tooltip> */}
          </div>
        </div>

        <div className="p-4 dashboard-section w-100">
          <div className="row mb-4 card flex-row mt-12 user-theme-bg p-5 dashboard-web-margin">
            <div className="col-lg-6 col-sm-12 order-2 order-lg-1 mt-2 text-white text-left">
              <h3 className="text-xl text-white">
                Welcome Back,{" "}
                <span className="font-semibold">{Data?.first_name}</span>
              </h3>
              <p className="mt-2 leading-relaxed">
                You can manage all your data and analytics from this dashboard.
              </p>
              {Data &&
              PlanData?.is_expired !== false &&
              PlanData?.is_trial_taken !== 0 ? (
                <button className="contact-btn w-auto mt-6 border border-white/10 bg-white/20 text-white hover:bg-white/30 focus:bg-white/30">
                  Your subscription is expired, Click to renew it.
                </button>
              ) : (
                <button className="contact-btn w-auto mt-6 border border-white/10 bg-white/20 text-white hover:bg-white/30 focus:bg-white/30">
                  Your Subscrition will end in
                  <span className="font-weight-bold ml-1">
                    {MainData?.plan?.subscription_left_days} days.
                  </span>
                </button>
              )}
              <br />
              {Data?.is_onboarding == "1" ? (
                <button
                  className="w-auto blink-para contact-btn w-auto mt-2 border border-white/10 bg-white/20 text-white hover:bg-white/30 focus:bg-white/30"
                  onClick={SaveStatusApi}
                >
                  Your profile is in <strong>DRAFT MODE, </strong>Please{" "}
                  <u>click here</u> to make it public
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-6 col-sm-12 order-1 order-lg-2">
              <img
                className="h-40 sm:mt-0 dashboard-web-margin-image"
                src="https://prafullgupta.com/connectwork/assets/chat/groups/27122311462761406165-removebg-preview(1).png"
                alt="image"
              />
            </div>
          </div>

          <div className="mt-4 px-4 d-flex justify-content-center">
            <SwiperComponent
              breakpoints={{
                1110: {
                  slidesPerView: 10,
                },
                300: {
                  slidesPerView: 3,
                },
              }}
              spaceBetween={10}
              style={{ cursor: "pointer" }}
              className="mySwiper mb-0 pb-0"
              modules={[Pagination]}
            >
              <SwiperSlide className="w-auto">
                <div className="swiper-slide review-items position-relative">
                  <button
                    className={
                      ProfileTab ? "filter-btns-active" : "filter-btns"
                    }
                    onClick={handleProfileTab}
                  >
                    Profile
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="swiper-slide review-items position-relative">
                  <button
                    className={
                      InsightsTab ? "filter-btns-active" : "filter-btns"
                    }
                    onClick={handleInsightsTab}
                  >
                    Insights
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="swiper-slide review-items position-relative">
                  <button
                    className={LeadsTab ? "filter-btns-active" : "filter-btns"}
                    onClick={handleLeadsTab}
                  >
                    Leads
                  </button>
                </div>
              </SwiperSlide>
            </SwiperComponent>
          </div>

          <div className="row dashboard-padding">
            {ProfileTab ? (
              <>
                {/* Edit Profile */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={"/edit/" + localStorage.getItem("url")}
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                      />
                      <h6 className="text-white text-center mb-0">
                        Edit Profile
                      </h6>
                    </span>
                  </Link>
                </div>

                {/* Edit theme */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    data-toggle={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? ""
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "modal"
                        : ""
                    }
                    data-target="#BackgroundColorDiv"
                    onClick={() =>
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? ""
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? setModalShow("theme")
                        : ""
                    }
                  >
                    {Data ? (
                      <DashboardPlan
                        Data={Data}
                        PlanData={PlanData}
                        APIDATA={APIDATA}
                        MainData={MainData}
                      />
                    ) : (
                      ""
                    )}
                    <>
                      <FontAwesomeIcon
                        icon={faPalette}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                      />
                      <h6 className="text-white text-center mb-0">
                        Edit Theme
                      </h6>
                    </>
                  </div>
                </div>

                {/* Meta Title */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    onClick={() => {
                      handleShowMetaTags();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCode}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">Meta Tags</h6>
                  </div>
                </div>

                {/* Multiple Mode */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    data-toggle={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? ""
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "modal"
                        : ""
                    }
                    data-target="#MultimodesModal"
                    onClick={() => {
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? ""
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? setModalShow("MultimodesModal")
                        : "";
                    }}
                  >
                    {Data ? (
                      <DashboardPlan
                        Data={Data}
                        PlanData={PlanData}
                        APIDATA={APIDATA}
                        MainData={MainData}
                      />
                    ) : (
                      ""
                    )}
                    <>
                      <FontAwesomeIcon
                        icon={faSliders}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                      />
                      <h6 className="text-white text-center mb-0">
                        Multiple Mode
                      </h6>
                    </>
                  </div>
                </div>

                {/* My subscription */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/subscription"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <FontAwesomeIcon
                        icon={faMoneyBill1Wave}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                      />
                      <h6 className="text-white text-center mb-0">
                        Subscription
                      </h6>
                    </span>
                  </Link>
                </div>

                {process.env.NEXT_PUBLIC_MODE === "development" ? (
                  <>
                    {/* Address Book */}
                    <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                      <Link href="/address-book" className="w-100">
                        <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                          <FontAwesomeIcon
                            icon={faAddressBook}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                          />
                          <h6 className="text-white text-center mb-0">
                            Address Book
                          </h6>
                        </div>
                      </Link>
                    </div>
                    {/* Send Message */}
                    <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                      <div
                        className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                        onClick={() => {
                          setModalShow("sendMessage");
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faMessage}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          Send Message
                        </h6>
                      </div>
                    </div>
                    {/* Address Book */}
                    <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                      <Link href="/real-estate" className="w-100">
                        <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                          <FontAwesomeIcon
                            icon={faHomeAlt}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                          />
                          <h6 className="text-white text-center mb-0">
                            Real Estate
                          </h6>
                        </div>
                      </Link>
                    </div>
                    {/* Signature */}
                    <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                      <Link href="/signature" className="w-100">
                        <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                          />
                          <h6 className="text-white text-center mb-0">
                            Email Signature
                          </h6>
                        </div>
                      </Link>
                    </div>
                    {/* Background */}
                    <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                      <Link href="/background" className="w-100">
                        <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                          <FontAwesomeIcon
                            icon={faImage}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                          />
                          <h6 className="text-white text-center mb-0">
                            Virtual Background
                          </h6>
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {/* Approve review */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/approve-review"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <>
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          Approve Review
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>

                {/* Chnage password */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    onClick={() => setModalShow("password")}
                  >
                    <FontAwesomeIcon
                      icon={faGear}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">Password</h6>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    onClick={() => {
                      console.log("abc");
                      setModalShow("suggestion");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="text-white mb-2"
                      style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">Suggestions</h6>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          {/* Analytics & Data */}
          <div className="row dashboard-padding">
            {InsightsTab ? (
              <>
                {/* Overall insights */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/overall-insights"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <>
                        <FontAwesomeIcon
                          icon={faChartSimple}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          Overall Insights
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>
                {/* Google Analytics */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href="/organic-analytics"
                    className="w-100  text-decoration-none"
                  >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlassChart}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                      />
                      <h6 className="text-white text-center mb-0">
                        Organic Analytics
                      </h6>
                    </div>
                  </Link>
                </div>
                {/* Product analytics */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/product"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <>
                        <FontAwesomeIcon
                          icon={faBagShopping}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          {TitleData?.card_products?.visible_name}
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>{" "}
                {/* Blogs analytics */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/blog"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <>
                        <FontAwesomeIcon
                          icon={faNewspaper}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          {" "}
                          {TitleData?.card_blogs?.visible_name}
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}

            {LeadsTab ? (
              <>
                {/* Lead insights */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/shared-contacts-leads"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <>
                        <FontAwesomeIcon
                          icon={faSignal}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          {" "}
                          Shared Contacts Lead
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>
                {/* Product enquiry */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/product-enquiry"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <>
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          {" "}
                          {TitleData?.card_products?.visible_name} Enquiry
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>
                {/* My appointment */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/appointment"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <>
                        <FontAwesomeIcon
                          icon={faCalendarCheck}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          Appointments
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>
                {/* My appointment */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/custom-form"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                      {Data ? (
                        <DashboardPlan
                          Data={Data}
                          PlanData={PlanData}
                          APIDATA={APIDATA}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      <>
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="text-white mb-2"
                          style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                          Custom Form
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mt-0 pb-4 w-100 bg-white">
          <h6 className="text-center mt-4 font-weight-bold mb-2">
            Follow us on
          </h6>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "10px" }}
          >
            <Link
              href="https://www.facebook.com/popipro.global"
              target="_blank"
            >
              <span className="media-icon-div">
                <span className="social-media-icons">
                  <img
                    src={"./static/img/facebook.png"}
                    alt="facebook"
                    style={{
                      width: "50px",
                      borderRadius: "100%",
                    }}
                  />
                </span>
              </span>
            </Link>
            <Link
              href="https://www.instagram.com/popipro.global/"
              target="_blank"
            >
              <span className="media-icon-div">
                <span className="social-media-icons">
                  <img
                    src={"../static/img/instagram.png"}
                    alt="instagram"
                    style={{
                      width: "50px",
                      borderRadius: "100%",
                    }}
                  />
                </span>
              </span>
            </Link>
            <Link
              href="https://www.youtube.com/@popipro.global"
              target="_blank"
            >
              <span className="media-icon-div">
                <span className="social-media-icons">
                  <img
                    src={"../static/img/youtube.png"}
                    alt="linkedin"
                    style={{
                      width: "50px",
                      borderRadius: "100%",
                    }}
                  />
                </span>
              </span>
            </Link>
            <Link href="https://twitter.com/PopiPro_Global" target="_blank">
              <span className="media-icon-div">
                <span className="social-media-icons">
                  <img
                    src={"../static/img/twitter.png"}
                    alt="twitter"
                    style={{
                      width: "50px",
                      borderRadius: "100%",
                    }}
                  />
                </span>
              </span>
            </Link>
          </div>
        </div>
        <div
          className="w-100 text-center text-white p-2 mt-0"
          style={{ bottom: "0", background: "black" }}
        >
          <p> © 2023. All Rights Reserved By Popipro.</p>
        </div>
      </div>
      <Multimodes
        Data={Data}
        APIDATA={APIDATA}
        MainData={MainData}
        TitleData={TitleData}
        Appointment={Appointment}
        active={modalShow == "MultimodesModal" ? true : false}
        handleClose={setModalShow}
      />
      <ChangePassword
        active={modalShow == "password" ? true : false}
        handleClose={setModalShow}
      />
      <Theme
        APIDATA={APIDATA}
        Data={Data}
        PlanData={PlanData}
        Color={Color}
        setColor={setColor}
        BackgroundColor={BackgroundColor}
        setBackgroundColor={setBackgroundColor}
        HeaderColor={HeaderColor}
        setHeaderColor={setHeaderColor}
        TextColor={TextColor}
        setTextColor={setTextColor}
        active={modalShow == "theme" ? true : false}
        handleClose={setModalShow}
      />
      <Suggestions
        active={modalShow == "suggestion" ? true : false}
        handleClose={setModalShow}
      />
      <SendMessage
        active={modalShow == "sendMessage" ? true : false}
        handleClose={setModalShow}
      />
      <MetaTags
        active={modalShow == "metatags" ? true : false}
        handleClose={setModalShow}
        Data={Data}
        APIDATA={APIDATA}
        Description={Description}
        setDescription={setDescription}
        Title={Title}
        setTitle={setTitle}
        MetaTitle={MetaTitle}
        setMetaTitle={setMetaTitle}
        MetaDescription={MetaDescription}
        setMetaDescription={setMetaDescription}
      />
    </>
  ) : (
    <>
      <SimpleBackdrop visible={ShowLoader} />
    </>
  );
}
