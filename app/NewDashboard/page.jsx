"use client";
import DashboardPlan from "@components/Dashboard/DashboardPlan";
import { faGear, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { EditData } from "@services/Routes";
import Link from "next/link";
import "../../styles/edit.css";
import "../../styles/about.css";
import React, { useEffect, useState } from "react";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Multimodes from "@components/Dashboard/Multimodes";
import ChangePassword from "@components/Dashboard/ChangePassword";
import Theme from "@components/Dashboard/Theme";
import Suggestions from "@components/Dashboard/Suggestions";
import SendMessage from "@components/Dashboard/SendMessage";
import MetaTags from "@components/Dashboard/MetaTags";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";

export default function Page() {
  const [ShowLoader, setShowLoader] = useState(false);
  const [Data, setData] = useState("");
  const [PlanData, setPlanData] = useState("");
  const [Color, setColor] = useState("");
  const [BackgroundColor, setBackgroundColor] = useState("");
  const [HeaderColor, setHeaderColor] = useState("");
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

  let cardProfile;
  if (typeof window !== "undefined") {
    cardProfile = localStorage.getItem("url");
  }

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
  const handleAnalyticsTab = () => {
    setProfileTab(false);
    setInsightsTab(false);
    setLeadsTab(false);
    setThemeTab(false);
    setAnalyticsTab(true);
  };
  const handleInsightsTab = () => {
    setProfileTab(false);
    setInsightsTab(true);
    setLeadsTab(false);
    setThemeTab(false);
    setAnalyticsTab(false);
  };
  const handleThemeTab = () => {
    setProfileTab(false);
    setInsightsTab(false);
    setLeadsTab(false);
    setThemeTab(true);
    setAnalyticsTab(false);
  };

  return Data ? (
    <>
      <div className="dashboard-header">
        <div className="d-flex align-items-center justify-content-between pt-4">
          <div>
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
              className="dashboard-image2"
            />
            {/* <FontAwesomeIcon
              icon={faGear}
              className="text-white ml-2"
              width={20}
              style={{ fontSize: "30px" }}
            /> */}
          </div>{" "}
          <img
            src="https://www.popipro.com/assets/images/whiteLogo.png"
            alt="logo"
            className="login-logo"
            style={{ width: "115px" }}
          />
        </div>
        <div className="pt-4">
          <h6 className="mb-0 dashboard-heading-h6">Hello,</h6>
          <h1 className="font-weight-bold dashboard-heading-h1 mt-0">
            {Data?.first_name}
            <img
              src="https://prafullgupta.com/connectwork/assets/chat/chats/211223115317Waving_Hand_Sign_Emoji_Icon_ios10_large.webp"
              width={20}
              className="ml-2"
            />
          </h1>
        </div>
      </div>
      <div className="position-relative">
        <div className="dashboard-content-dev">
          <div className="d-flex align-items-center justify-content-center">
            <div className="row p-4 mt-4 d-flex justify-content-center align-items-center subscription-box">
              <div className="col-6">
                <img src="../static/img/girl.png" alt="image" width={"100%"} />
              </div>
              <div className="col-6">
                <p>
                  Hello User, Welcome to popipro Your Subscrition will ends in{" "}
                  <span className="font-weight-bold">
                    {MainData?.plan?.subscription_left_days} days.
                  </span>{" "}
                </p>
              </div>
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
              navigation={{
                clickable: true,
              }}
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
                    Edit Profile
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="swiper-slide review-items position-relative">
                  <button
                    className={LeadsTab ? "filter-btns-active" : "filter-btns"}
                    onClick={handleLeadsTab}
                  >
                    Leads Analytics
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto">
                <div className="swiper-slide review-items position-relative">
                  <button
                    className={
                      AnalyticsTab ? "filter-btns-active" : "filter-btns"
                    }
                    onClick={handleAnalyticsTab}
                  >
                    Google Analytics
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
                    className={ThemeTab ? "filter-btns-active" : "filter-btns"}
                    onClick={handleThemeTab}
                  >
                    Edit Theme
                  </button>
                </div>
              </SwiperSlide>
            </SwiperComponent>
          </div>
          <div className="row dashboard-row-div2 mb-4">
            {ProfileTab || AnalyticsTab ? (
              <>
                {/* Edit profile */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={"/edit/" + cardProfile}
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
                      <img
                        src="../static/img/user.png"
                        alt="image"
                        width={60}
                      />
                      <h6 className="mb-0">Edit Profile</h6>
                    </span>
                  </Link>
                </div>
                {/* Edit theme */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column"
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
                      <img
                        src="../static/img/paint.png"
                        alt="image"
                        width={60}
                      />
                      <h6 className="text-center mb-0">Edit Theme</h6>
                    </>
                  </div>
                </div>
                {/* Multiple Mode */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column"
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
                      <img
                        src="../static/img/slider.png"
                        alt="image"
                        width={60}
                      />
                      <h6 className="text-center mb-0">Multiple Mode</h6>
                    </>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column"
                    onClick={() => {
                      console.log("abc");
                      setModalShow("suggestion");
                    }}
                  >
                    <img src="../static/img/light.png" alt="image" width={60} />
                    <h6 className="text-center mb-0">Suggestions</h6>
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
                        ? "/plan"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
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
                      <img
                        src="../static/img/money.png"
                        alt="image"
                        width={60}
                      />
                      <h6 className="text-center mb-0">Subscription</h6>
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}

            {ThemeTab ? (
              <>
                {/* Chnage password */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column"
                    onClick={() => setModalShow("password")}
                  >
                    <img
                      src="../static/img/password.png"
                      alt="image"
                      width={60}
                    />
                    <h6 className="text-center mb-0">Password</h6>
                  </div>
                </div>

                {/* Mega Title */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <div
                    className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column"
                    onClick={() => {
                      handleShowMetaTags();
                    }}
                  >
                    <img src="../static/img/code.png" alt="image" width={60} />
                    <h6 className="text-center mb-0">Meta Tags</h6>
                  </div>
                </div>

                {/* Overall insights */}
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/insights"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
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
                        <img
                          src="../static/img/graph.png"
                          alt="image"
                          width={60}
                        />
                        <h6 className="text-center mb-0">Overall Insights</h6>
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
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/leads"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
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
                        <img
                          src="../static/img/lead.png"
                          alt="image"
                          width={60}
                        />
                        <h6 className="text-center mb-0">Lead</h6>
                      </>
                    </span>
                  </Link>
                </div>

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
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
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
                        <img
                          src="../static/img/product.png"
                          alt="image"
                          width={60}
                        />
                        <h6 className="text-center mb-0">
                          {TitleData?.card_products?.visible_name}
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>

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
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
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
                        <img
                          src="../static/img/blog.png"
                          alt="image"
                          width={60}
                        />
                        <h6 className="text-center mb-0">
                          {" "}
                          {TitleData?.card_blogs?.visible_name}
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>

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
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
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
                        <img
                          src="../static/img/service.png"
                          alt="image"
                          width={60}
                        />
                        <h6 className="text-center mb-0">
                          {" "}
                          {TitleData?.card_products?.visible_name} Inquiry
                        </h6>
                      </>
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}

            {InsightsTab ? (
              <>
                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/appointment-lead"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
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
                        <img
                          src="../static/img/appointment.png"
                          alt="image"
                          width={60}
                        />
                        <h6 className="text-center mb-0">Appointments</h6>
                      </>
                    </span>
                  </Link>
                </div>

                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href={
                      PlanData?.is_expired !== false &&
                      PlanData?.is_trial_taken !== 0
                        ? "https://www.popipro.com/order"
                        : PlanData?.subscription?.plan_id !== 1 &&
                          PlanData?.subscription !== null
                        ? "/testimonialsLeads"
                        : ""
                    }
                    className="w-100  text-decoration-none"
                  >
                    <span className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
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
                        <img
                          src="../static/img/testimonial.png"
                          alt="image"
                          width={60}
                        />
                        <h6 className="text-center mb-0">Approve Request</h6>
                      </>
                    </span>
                  </Link>
                </div>

                <div className="col-6 col-lg-3 mt-3 d-flex justify-content-center p-0 px-2">
                  <Link
                    href="/google-analytics"
                    className="w-100  text-decoration-none"
                  >
                    <div className="dashboard-boxes2 d-flex justify-content-center align-items-center flex-column">
                      <img
                        src="../static/img/google.png"
                        alt="image"
                        width={60}
                      />
                      <h6 className="text-center mb-0">Google Analytics</h6>
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
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
    <SimpleBackdrop visible={ShowLoader} />
  );
}
