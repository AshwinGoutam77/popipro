"use client";
import EditHeader from "@components/EditPages/EditHeader";
import React, { useEffect, useState } from "react";
import "../../../styles/edit.css";
import "../../../styles/about.css";
import "../../styles/style.css";
import Navbar from "@components/ViewPages/Navbar";
import EditCustomLink from "@components/EditPages/EditQuickLinks";
import EditAbout from "@components/EditPages/EditAbout";
import EditLinks from "@components/EditPages/EditSocialMedia";
import EditDoing from "@components/EditPages/EditServices";
import EditTestimonials from "@components/EditPages/EditTestimonials";
import EditClients from "@components/EditPages/EditClients";
import EditResume from "@components/EditPages/EditResume";
import EditWorks from "@components/EditPages/EditWork";
import EditBlogs from "@components/EditPages/EditBlogs";
import EditProducts from "@components/EditPages/EditProducts";
import EditFooter from "@components/EditPages/EditFooter";
import { redirect, useParams, usePathname } from "next/navigation";
import EditAlternateNo from "@components/EditPages/EditAlternate";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EditBanner from "@components/EditPages/EditBanner";
import EditContact from "@components/EditPages/EditContact";
import { EditData } from "@services/Routes";
import Api from "@services/Api";
import SimpleBackdrop from "@components/ViewPages/Backdrop";
import { useAuthContext } from "@context/AuthContext";
import { ToastContainer } from "react-toastify";
import EditRealEstate from "@components/EditPages/EditRealEstate";
import SocailVisits from "@components/EditPages/SocailVisits";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import EditDocument from "@components/EditPages/EditDocument";
import EditEvents from "@components/EditPages/EditEvents";
import EditBusinessHoursConfig from "@components/EditPages/EditBusinessHours";

const Page = () => {
  const { token } = useAuthContext();
  const params = useParams();
  const { profile } = params;
  const [isVisible, setIsVisible] = useState(false);
  const [cardData, setCardData] = useState(false);
  const [NoData, setNoData] = useState(false);
  const [ErrorDataMessage, setErrorDataMessage] = useState("");
  const [ShowLoader, setShowLoader] = useState(false);
  const [AddMoreBlogs, setAddMoreBlogs] = useState([1]);
  const [AddEvents, setAddEvents] = useState([1])
  const [AddMoreProduct, setAddMoreProduct] = useState([1]);
  const [RealEstateData, setRealEstateData] = useState([1]);
  const [AddMoreVedios, setAddMoreVedios] = useState([1]);
  const pathname = usePathname();

  let card_url = pathname.split("/").pop();

  const getProfileData = async () => {
    try {
      setShowLoader(true);
      const response = await Api(EditData, {}, "?card_url=" + card_url + "&is_edit=true");

      if (response?.data?.status) {
        setShowLoader(false);
        setCardData(response?.data?.data);
        setAddMoreBlogs(response.data.data.card.card_blogs);
        setAddEvents(response.data.data.card.card_events);
        setAddMoreProduct(response.data.data.card.card_products);
        setAddMoreVedios(response.data.data.card.card_videos);
        setRealEstateData(response.data.data.card.card_realestates);
      } else {
        setErrorDataMessage(response.data.message);
        setNoData(true);
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (NoData) {
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center text-center flex-column"
          style={{ height: "100vh", padding: "0px 60px", fontSize: "18px" }}
        >
          <img
            src="../../static/img/nodata-img.svg"
            alt="error"
            width={300}
          />
          <h5 className="mt-4 color-black">
            {ErrorDataMessage && ErrorDataMessage}
          </h5>
          <Link href="/">
            <button className="send-btnn w-auto py-2">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Back to
              popipro
            </button>
          </Link>
        </div>
      </>
    );
  }
  return token ? (
    <>
      {pathname && pathname.includes(pathname.split("/")[1]) && <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />}
      {cardData ? (
        <>
          <EditBanner
            card={cardData.card}
            Permission={cardData?.permission}
            subscription={cardData?.plan?.subscription}
            Data={cardData?.card}
            card_url={profile}
            PlanData={cardData?.plan}
          />
          <main className="main main-popipro-class">
            <div className="container gutter-top">
              <EditHeader
                Data={cardData.card}
                TitleData={cardData?.titles}
                PlanData={cardData?.plan}
                card={profile}
                APIDATA={getProfileData}
                MainData={cardData}
                updateImage={() => { }}
              />
              <div className="row sticky-parent mt-0">
                <aside className="col-12 col-md-12 col-lg-2">
                  <Navbar
                    TitleData={cardData?.titles}
                    HeaderData={cardData?.headers}
                    card={cardData?.card}
                  />
                </aside>
                <div className="col-12 col-md-12 col-lg-10">
                  <EditAbout
                    Data={cardData?.card}
                    MainData={cardData}
                    Description={cardData?.card?.card_description}
                    TitleData={cardData?.titles}
                    APIDATA={getProfileData}
                  />{" "}
                  <EditBusinessHoursConfig
                    Data={cardData?.card}
                    MainData={cardData}
                    Description={cardData?.card?.card_timings}
                    TitleData={cardData?.titles}
                    APIDATA={getProfileData}
                  />
                  <EditEvents
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    PlanData={cardData?.plan}
                    APIDATA={getProfileData}
                    card_url={card_url}
                    PaginationData={cardData?.pagination_data}
                    AddEvents={AddEvents}
                    setAddEvents={setAddEvents}
                  />
                  <EditLinks
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    LinksTitle={
                      cardData?.titles?.card_social_links?.visible_name
                    }
                    APIDATA={getProfileData}
                    PlanData={cardData?.plan}
                    CardLinks={cardData?.card?.card_social_links}
                  />

                  <EditDocument
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    PlanData={cardData?.plan}
                    APIDATA={getProfileData}
                  />

                  <EditAlternateNo
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    PlanData={cardData?.plan}
                    APIDATA={getProfileData}
                  />
                  <EditCustomLink
                    Data={cardData?.card}
                    MainData={cardData}
                    CustomLinkTitle={
                      cardData?.titles?.card_custom_url?.visible_name
                    }
                    TitleData={cardData?.titles}
                    PlanData={cardData?.plan}
                    APIDATA={getProfileData}
                  />
                  <EditDoing
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    AddMoredoings={cardData?.card?.card_services}
                    CardServices={cardData?.card?.card_services}
                    APIDATA={getProfileData}
                    PlanData={cardData?.plan}
                    card_url={profile}
                  />
                  <EditTestimonials
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    AddMoreTesti={cardData?.card?.card_testimonials}
                    APIDATA={getProfileData}
                    PlanData={cardData?.plan}
                  />
                  <EditClients
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    APIDATA={getProfileData}
                    PlanData={cardData?.plan}
                    ClientPhotos={cardData?.card?.card_clients}
                  />
                  <EditResume
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    AddMoreExp={cardData?.card?.card_experience}
                    APIDATA={getProfileData}
                    PlanData={cardData?.plan}
                  />
                  <EditWorks
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    VideoTitle={cardData?.titles?.Card_videos?.visible_name}
                    Card_videos={cardData?.card?.card_videos}
                    Card_photos={cardData?.card?.card_photos}
                    APIDATA={getProfileData}
                    PaginationData={cardData?.pagination_data}
                    PlanData={cardData?.plan}
                    AddMoreVedios={AddMoreVedios}
                    setAddMoreVedios={setAddMoreVedios}
                    card={profile}
                  />
                  <EditProducts
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    AddMoreProduct={AddMoreProduct}
                    PlanData={cardData?.plan}
                    APIDATA={getProfileData}
                    PaginationData={cardData?.pagination_data}
                    card={profile}
                    Currency={cardData?.currency}
                    setAddMoreProduct={setAddMoreProduct}
                  />
                  <EditBlogs
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    AddMoreBlogs={AddMoreBlogs}
                    PlanData={cardData?.plan}
                    APIDATA={getProfileData}
                    PaginationData={cardData?.pagination_data}
                    card={profile}
                    setAddMoreBlogs={setAddMoreBlogs}
                  />
                  {process.env.NEXT_PUBLIC_MODE === "development" && (
                    <EditRealEstate
                      Data={cardData?.card}
                      MainData={cardData}
                      TitleData={cardData?.titles}
                      RealEstateData={RealEstateData}
                      setRealEstateData={setRealEstateData}
                      PlanData={cardData?.plan}
                      APIDATA={getProfileData}
                      PaginationData={cardData?.pagination_data}
                      card={profile}
                      Currency={cardData?.currency}
                    />
                  )}

                  <EditContact
                    Data={cardData?.card}
                    MainData={cardData}
                    TitleData={cardData?.titles}
                    card_url={profile}
                    APIDATA={getProfileData}
                    PlanData={cardData?.plan}
                  />
                </div>
              </div>
            </div>
          </main>
          <EditFooter
            Data={cardData.card}
            card_url={profile}
            APIDATA={getProfileData}
          />
        </>
      ) : (
        <SimpleBackdrop visible={ShowLoader} />
      )}
    </>
  ) : (
    redirect("/login")
  );
};
export default Page;
