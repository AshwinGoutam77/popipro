/* eslint-disable @next/next/no-img-element */
"use client";
import {
  faAddressBook,
  faAddressCard,
  faAward,
  faBagShopping,
  faBuildingUser,
  faCalendarCheck,
  faCartShopping,
  faCircleCheck,
  faEye,
  faGear,
  faHomeAlt,
  faLightbulb,
  faMoneyBill1Wave,
  faNewspaper,
  faPalette,
  faRightFromBracket,
  faShareSquare,
  faSignal,
  faSliders,
  faStar,
  faTasks,
  faUpDownLeftRight,
  faUserEdit,
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
import { CardData, EditData, SaveToken, UpgradePlan } from "@services/Routes";
import DashboardPlan from "@components/Dashboard/DashboardPlan";
import Multimodes from "@components/Dashboard/Multimodes";
import ChangePassword from "@components/Dashboard/ChangePassword";
import Theme from "@components/Dashboard/Theme";
import Suggestions from "@components/Dashboard/Suggestions";
import { Swiper as SwiperComponent } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SendMessage from "@components/Dashboard/SendMessage";
import MetaTags from "@components/Dashboard/MetaTags";
import { Dropdown } from "react-bootstrap";
import SettingModal from "@components/Dashboard/Setting-modal";
import DigitalCard from "@components/Dashboard/DigitalCard";
import localforage from "localforage";
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseCloudMessaging } from "../../app/firebase";
import SelfBranding from "@components/Dashboard/SelfBranding";
import ProfileTabData from "./ProfileTab";
import InsightsTabData from "./InsightsTab";
import LeadsTabData from "./LeadsTab";
import AdvanceFeatureData from "./AdvanceFeature";
import Share from "@components/ViewPages/Share";

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
  const [AdvanceFeatures, setAdvanceFeatures] = useState(false);
  const [AnalyticsTab, setAnalyticsTab] = useState(false);
  const [InsightsTab, setInsightsTab] = useState(false);
  const [ThemeTab, setThemeTab] = useState(false);
  const [ActiveConfit, setActiveConfit] = useState(false);
  const [Latitude, setLatitude] = useState("");
  const [Longitude, setLongitude] = useState("");

  const APIDATA = async () => {
    if (localStorage.getItem("url")) {
      setShowLoader(true);
      try {
        const response = await Api(
          EditData,
          {},
          "?card_url=" + localStorage.getItem("url") + "&is_edit=true",
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
          document.documentElement.style.setProperty("--color", "#24b1e6");
          document.documentElement.style.setProperty("--header-color", "#24b1e6");
          document.documentElement.style.setProperty("--themecolor", "#dfeef8");
          document.documentElement.style.setProperty("--text-color", "#ffffff");
          localStorage.setItem("is_expried", JSON.stringify(response?.data?.data?.plan?.is_expired));
          localStorage.setItem("is_trial_taken", JSON.stringify(response?.data?.data?.plan?.is_trial_taken));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("url");
          window.location.href = "/login";
        }
      } catch (error) {
        error;
        if (error?.request?.status == "401") {
          localStorage.removeItem("token");
          localStorage.removeItem("url");
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
    localStorage.removeItem("tabs");
  };

  const SaveStatusApi = async () => {
    setShowLoader(true);
    if (Data.first_name == null) {
      toast.erro("Name field is required", {
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

  const handleProfileTab = () => {
    localStorage.setItem("tabs", "profile");
    setProfileTab(localStorage.getItem("tabs") == "profile" ? true : false);
    setInsightsTab(false);
    setLeadsTab(false);
    setThemeTab(false);
    setAnalyticsTab(false);
    setAdvanceFeatures(false)
  };

  const handleLeadsTab = () => {
    localStorage.setItem("tabs", "leads");
    setProfileTab(false);
    setInsightsTab(false);
    setLeadsTab(localStorage.getItem("tabs") == "leads" ? true : false);
    setThemeTab(false);
    setAnalyticsTab(false);
    setAdvanceFeatures(false)
  };

  const handleAdvanceTab = () => {
    localStorage.setItem("tabs", "advance");
    setProfileTab(false);
    setInsightsTab(false);
    setLeadsTab(false);
    setAdvanceFeatures(localStorage.getItem("tabs") == "advance" ? true : false);
    setThemeTab(false);
    setAnalyticsTab(false);
  };

  const handleInsightsTab = () => {
    localStorage.setItem("tabs", "insights");
    setProfileTab(false);
    setInsightsTab(localStorage.getItem("tabs") == "insights" ? true : false);
    setLeadsTab(false);
    setThemeTab(false);
    setAnalyticsTab(false);
    setAdvanceFeatures(false)
  };

  useEffect(() => {
    let Tabs = localStorage.getItem("tabs");
    setProfileTab(Tabs == "profile" || Tabs == null ? true : false);
    setLeadsTab(Tabs == "leads" ? true : false);
    setInsightsTab(Tabs == "insights" ? true : false);
    setAdvanceFeatures(Tabs == "advance" ? true : false);
  }, [handleProfileTab, handleLeadsTab, handleInsightsTab, handleAdvanceTab]);

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
          APIDATA();
          if (response.data.status) {
            Swal.fire("Done", "", "success");
            toast.success(response.data.message, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setActiveConfit(true);
            setTimeout(() => {
              setActiveConfit(false);
            }, 7000);
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

  const handleSaveToken = async () => {
    let payload = {
      card_url: localStorage.getItem("url"),
      token: await localforage.getItem("fcm_token"),
      token_type: "web",
      is_admin: true
    };

    const response = await Api(SaveToken, payload);
    if (response.data.status) {
    }
  };

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await firebaseCloudMessaging.init();
        localStorage.setItem("fcm_token", token);
        const messaging = firebase.messaging();
        messaging.onMessage((payload) => {
          // console.log(payload);
        });
        handleSaveToken();
      } catch (error) {
        console.log(error);
      }
    } else if (permission === "denied") {
      // console.log("we have denied permission!, Please alow the permission.");
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    localforage.setItem("latitude", position.coords.latitude);
    localforage.setItem("longitude", position.coords.longitude);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(() => {
    requestPermission();
    getLocation();
  }, []);

  let in_Subscription = (PlanData?.current_plan?.plan_name === "Premium" || PlanData?.current_plan?.plan_name === "Platinum") && (PlanData?.is_trial_taken !== 0)
  let in_Plan = PlanData?.current_plan?.is_expired == true

  return Data ? (
    <>
      <div className="d-flex align-items-center flex-column justify-content-between h-100vh w-100 bg-white dashboard-section">
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
          <div className="d-flex align-items-center">
            {MainData?.is_individual == 1 ? (
              <FontAwesomeIcon
                icon={faGear}
                className="text-white cursor-pointer mr-4"
                style={{ fontSize: "25px" }}
                onClick={() => setModalShow("setting")}
              />
            ) : (
              ""
            )}
            <Dropdown className="">
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
                  display: "inline-flex",
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
                {MainData?.is_individual !== 1 ? (
                  <Dropdown.Item
                    href=""
                    className="mb-1"
                    onClick={() => setModalShow("setting")}
                  >
                    <FontAwesomeIcon
                      icon={faGear}
                      className="text-dark cursor-pointer mr-2"
                      style={{ fontSize: "16px" }}
                    />
                    Setting
                  </Dropdown.Item>
                ) : (
                  ""
                )}
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
          </div>
        </div>

        <div className="fixed-b-icons">
          {Data?.is_onboarding == 2 ? (
            <Link href={"/" + localStorage.getItem("url")}>
              <p
                className="float"
                style={{
                  background: "var(--color)",
                }}
              >
                <FontAwesomeIcon
                  icon={faEye}
                  className="ml-1"
                  style={{
                    position: "relative",
                    right: "1px",
                    fontSize: "20px",
                    color: "white",
                  }}
                />
              </p>
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="p-4 dashboard-section w-100">
          <div className="container dashboard-banner-container">
            <div className="row mx-auto align-items-center dashboard-banner-div">
              <div className="col-12 col-sm-6 col-md-12 col-lg-6 text-left">
                {/* <img src="../../static/img/dark-logo.png" alt="logo" className="banner-logo" /> */}
                <h3 className="text-xl text-white">
                  Welcome Back,{" "}
                  <span className="font-semibold">{Data?.first_name}</span>
                </h3>
                <p className="mt-2 leading-relaxed">
                  You can manage all your data and analytics from this dashboard.
                </p>
                {Data?.is_onboarding == "1" ? (
                  <button
                    className="hover-none mt-2 underline bg-transparent border-0 font-weight-bold text-white text-md"
                    onClick={SaveStatusApi}
                  >
                    Your profile is in DRAFT MODE, Please click here to make it
                    public
                  </button>
                ) : (
                  ""
                )}
                {Data?.is_onboarding !== "1" ? (
                  Data &&
                    PlanData?.is_expired !== false &&
                    PlanData?.is_trial_taken !== 0 ? (
                    <a
                      href={
                        PlanData?.is_expired !== false &&
                          PlanData?.is_trial_taken !== 0
                          ? "https://www.popipro.com/order"
                          : ""
                      }
                      target="_blank"
                    >
                      <button className="hover-none contact-btn w-auto mt-6 text-transform-none border border-white/10 bg-white/20 text-white hover:bg-white/30 focus:bg-white/30">
                        Your subscription is expired, Click to renew it.
                      </button>
                    </a>
                  ) : (
                    <button
                      className="hover-none contact-btn w-auto mt-6 text-transform-none border border-white/10 bg-white/20 text-white hover:bg-white/30 focus:bg-white/30"
                      onClick={() =>
                        MainData?.plan?.subscription_left_days == 0
                          ? handleFreeTrail()
                          : ""
                      }
                    >
                      {MainData?.plan?.subscription_left_days !== 0
                        ? "Your subscription is valid till " +
                        MainData?.plan?.subscription_left_days +
                        " days."
                        : "Upgrade to premium"}
                    </button>
                  )
                ) : (
                  ""
                )}

                {MainData?.plan?.subscription_left_days !== 0 && <div className="d-flex flex-wrap align-items-center justify-content-start justify-content-sm-center mt-4">
                  <Link href={MainData?.plan?.subscription_left_days == 0 ? "https://www.popipro.com/order" : "/subscription"}>
                    <button className="underline bg-transparent border-0 font-weight-bold text-white text-md">
                      View Subscription
                    </button>
                  </Link>
                  <button
                    className="underline bg-transparent border-0 font-weight-bold text-white text-md"
                    onClick={() => setModalShow("share")}
                  >
                    Share your profile  <FontAwesomeIcon
                      icon={faShareSquare}
                      className="user-select-auto mr-2 cursor-pointer fs-12 ml-2"
                    />
                  </button>
                </div>
                }
              </div>
              <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                <img src="https://www.popipro.com/assets/images/card-variants/new-images/1.png" alt="card-image" style={{ transform: 'rotate(-10deg)', width: '65%' }} />
              </div>
            </div>
          </div>

          <div className="container mt-4 d-flex justify-content-center">
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
              className="mySwiper cursor-pointer"
              modules={[Pagination, Navigation]}
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
              <SwiperSlide className="w-auto">
                <div className="swiper-slide review-items position-relative">
                  <button
                    className={AdvanceFeatures ? "filter-btns-active" : "filter-btns"}
                    onClick={handleAdvanceTab}
                  >
                    Advanced Features
                  </button>
                </div>
              </SwiperSlide>
            </SwiperComponent>
          </div>

          {/* Tabs Data */}
          <div className="container">
            <div className="row row-gap-3">
              {ProfileTab && (
                <ProfileTabData APIDATA={APIDATA} setModalShow={setModalShow} Data={Data} PlanData={PlanData} MainData={MainData} handleFreeTrail={handleFreeTrail} in_Plan={in_Plan} />
              )}

              {InsightsTab && (
                <InsightsTabData TitleData={TitleData} APIDATA={APIDATA} setModalShow={setModalShow} Data={Data} PlanData={PlanData} MainData={MainData} handleFreeTrail={handleFreeTrail} in_Plan={in_Plan} />
              )}

              {LeadsTab && (
                <LeadsTabData TitleData={TitleData} APIDATA={APIDATA} setModalShow={setModalShow} Data={Data} PlanData={PlanData} MainData={MainData} handleFreeTrail={handleFreeTrail} in_Plan={in_Plan} />
              )}

              {AdvanceFeatures &&
                <AdvanceFeatureData TitleData={TitleData} APIDATA={APIDATA} setModalShow={setModalShow} Data={Data} PlanData={PlanData} MainData={MainData} handleFreeTrail={handleFreeTrail} in_Plan={in_Plan} />
              }
            </div>
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
              href="https://www.facebook.com/popipro.official/"
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
              href="https://www.instagram.com/popipro.official/"
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
              href="https://www.youtube.com/@popiproofficial"
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
            <Link href="https://x.com/PopiproOfficial" target="_blank">
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
          <p> © 2025. All Rights Reserved By Popipro.</p>
        </div>
      </div >

      <Share
        Data={Data}
        card={localStorage.getItem("url")}
        active={modalShow == "share" ? true : false}
        handleClose={setModalShow}
      />
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
      <DigitalCard
        active={modalShow == "digitalCard" ? true : false}
        handleClose={setModalShow}
        card_url={localStorage.getItem("url")}
        Data={Data}
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
        card_url={localStorage.getItem("url")}
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
      <SettingModal
        active={modalShow == "setting" ? true : false}
        handleClose={setModalShow}
        Data={Data}
        APIDATA={APIDATA}
        currency={MainData?.currency}
        MainData={MainData}
      />
      <SelfBranding
        active={modalShow == "selfBranding" ? true : false}
        handleClose={setModalShow}
        MainData={MainData}
      />
    </>
  ) : (
    <>
      <SimpleBackdrop visible={ShowLoader} />
    </>
  );
}
