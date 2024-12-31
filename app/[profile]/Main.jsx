import React from "react";
import Header from "@components/ViewPages/Header";
import "../../styles/about.css";
import "../../styles/edit.css";
import Banner from "@components/ViewPages/Banner";
import Navbar from "@components/ViewPages/Navbar";
import SocialMedia from "@components/ViewPages/SocialMedia";
import AboutMe from "@components/ViewPages/AboutMe";
import QuickLinks from "@components/ViewPages/QuickLinks";
import Services from "@components/ViewPages/Services";
import Testimonials from "@components/ViewPages/Testimonials";
import Clients from "@components/ViewPages/Clients";
import Resume from "@components/ViewPages/Resume";
import Work from "@components/ViewPages/Work";
import Blog from "@components/ViewPages/Blog";
import Product from "@components/ViewPages/Products.";
import ContactForm from "@components/ViewPages/ContactForm";
import Footer from "@components/ViewPages/Footer";
import Alternateno from "@components/ViewPages/Alternateno";
import { redirect } from "next/navigation";
import BuilderForm from "@components/ViewPages/Builder";
import EmbedPost from "@components/ViewPages/EmbedPost";
import Realestate from "@components/ViewPages/Realestate";
import Video from "@components/ViewPages/Video";
import Documents from "@components/ViewPages/Documents";

export default async function Main({ profile, data, id, referer, fetchData }) {
  let card = data?.data?.card || {};
  let MainData = data?.data;
  let permission = data?.data?.permission;
  let titles = data?.data?.titles;
  let headers = data?.data?.headers;
  let company_setting = data?.data?.company_setting;
  let plan = data?.data?.plan;
  let pagination_data = data?.data?.pagination_data;
  let AddMoreBlogs = data?.data?.card?.card_blogs;
  let Products = data?.data?.card?.card_products;
  let RealEstateData = data?.data?.card?.card_realestates;
  let is_onboarding = data?.data?.card?.is_onboarding;
  let Sqdata = data?.data?.sequence;


  if (profile == "happy-helathy-homes") {
    redirect("happy-healthy-homes");
  }

  let Sdata =
    Sqdata &&
    Sqdata?.map((item) => ({
      uploaded: "User",
      id: item?.sequence,
      status: item?.name,
    }));

  let sortedData = Sdata?.slice().sort((a, b) => a.id - b.id);

  return (
    data && (
      <>
        {is_onboarding == 2 ? (
          <>
            <Banner
              card={card}
              profile={profile}
              permission={permission}
              subscription={plan}
              CardLinks={card?.card_social_links}
              Titles={titles}
              id={id}
              MainData={MainData}
              referer={referer}
            />
            <main className="main main-popipro-class">
              <div className="container gutter-top">
                <Header
                  profile={profile}
                  MainData={MainData}
                  card={card}
                  company_setting={company_setting}
                  Titles={titles}
                  CardLinks={card?.card_social_links}
                  PlanData={plan}
                />
                <div className="row sticky-parent">
                  <aside className="col-12 col-md-12 col-lg-2">
                    <Navbar
                      TitleData={titles}
                      HeaderData={headers}
                      card={card}
                    />
                  </aside>
                  {process.env.NEXT_PUBLIC_MODE !== "development" ? (
                    <div className="col-12 col-md-12 col-lg-10">
                      <AboutMe Titles={titles} card={card} fetchData={fetchData} />
                      <Alternateno
                        Data={card}
                        Titles={titles}
                        PlanData={plan}
                      />
                      <SocialMedia
                        card={card}
                        Titles={titles}
                        CardLinks={card?.card_social_links}
                      />

                      <QuickLinks
                        subscription={plan}
                        card={card}
                        Titles={titles}
                      />

                      <Services
                        subscription={plan}
                        card={card}
                        Titles={titles}
                      />

                      <Testimonials
                        card={card}
                        subscription={plan}
                        card_testimonials={card?.card_testimonials}
                        Titles={titles}
                        company_setting={company_setting}
                        InquiryModal={false}
                        InquiryPopup={false}
                        setInquiryModal={false}
                        profile={profile}
                      />

                      <Clients
                        card={card}
                        ClientPhotos={card?.card_clients}
                        PlanData={plan}
                        Titles={titles}
                      />

                      <Resume
                        Titles={titles}
                        subscription={plan}
                        card_experience={card?.card_experience}
                      />

                      <Work
                        Card_videos={card?.card_videos}
                        Card_photos={card?.card_photos}
                        Titles={titles}
                        Data={card}
                        card={card}
                        PaginationData={pagination_data}
                        PlanData={plan}
                        card_url={profile}
                      />
                      <Video
                        Card_videos={card?.card_videos}
                        Card_photos={card?.card_photos}
                        Titles={titles}
                        Data={card}
                        card={card}
                        PaginationData={pagination_data}
                        PlanData={plan}
                        card_url={profile}
                      />
                      <Product
                        PlanData={plan}
                        Titles={titles}
                        Data={card}
                        card={card}
                        PaginationData={pagination_data}
                        MainData={MainData}
                        Products={Products}
                        card_url={profile}
                      />
                      <Blog
                        PlanData={plan}
                        Titles={titles}
                        Data={card}
                        card={card}
                        PaginationData={pagination_data}
                        AddMoreBlogs={AddMoreBlogs}
                        card_url={profile}
                      />
                      {process.env.NEXT_PUBLIC_MODE === "development" ? (
                        <Realestate
                          PlanData={plan}
                          Titles={titles}
                          Data={card}
                          card={card}
                          PaginationData={pagination_data}
                          RealEstateData={RealEstateData}
                          card_url={profile}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}
                      {MainData?.company_setting?.show_insta_feed == "1" &&
                        MainData?.company_setting?.insta_feed_url &&
                        MainData?.plan?.subscription?.plan?.plan_name ==
                        "Premium" ? (
                        <EmbedPost
                          Card_videos={card?.card_videos}
                          Card_photos={card?.card_photos}
                          Titles={titles}
                          Data={card}
                          card={card}
                          PaginationData={pagination_data}
                          PlanData={plan}
                          card_url={profile}
                          MainData={MainData}
                        />
                      ) : (
                        ""
                      )}

                      {MainData?.company_setting?.appointment_enquiry_method ==
                        "form" ? (
                        <ContactForm
                          card_url={profile}
                          Titles={titles}
                          Data={card}
                          card={card}
                          MainData={MainData}
                          PlanData={plan}
                        />
                      ) : (
                        ""
                      )}

                      {MainData?.custom_forms !== null &&
                        plan?.is_expired == false ? (
                        <div
                          className="mb-3 box-content boxxx mt-0"
                          id="custom_form"
                        >
                          <div className="flex-header">
                            <h2 className="title title--h1 first-title title__separate">
                              {MainData?.forms?.heading
                                ? MainData?.forms?.heading
                                : "Custom Form"}
                            </h2>
                          </div>
                          <BuilderForm
                            card_url={profile}
                            JsonData={MainData?.forms?.json}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div className="col-12 col-md-12 col-lg-10">
                      {sortedData &&
                        sortedData?.map((items, index) => {
                          return (
                            <div key={index}>
                              {items.status == "card_alternate_phone" ? (
                                <Alternateno
                                  Data={card}
                                  Titles={titles}
                                  PlanData={plan}
                                  profile={profile}
                                />
                              ) : items?.status == "card_social_links" ? (
                                <SocialMedia
                                  card={card}
                                  Titles={titles}
                                  CardLinks={card?.card_social_links}
                                  profile={profile}
                                />
                              ) : items?.status == "card_custom_url" ? (
                                <QuickLinks
                                  subscription={plan}
                                  card={card}
                                  Titles={titles}
                                  profile={profile}
                                />
                              ) : items?.status == "card_description" ? (
                                <AboutMe Titles={titles} card={card} profile={profile} />
                              ) : items?.status == "card_documents" ?
                                <Documents Titles={titles} card={card} profile={profile} />
                                : items?.status == "card_services" ? (
                                  <Services
                                    subscription={plan}
                                    card={card}
                                    Titles={titles}
                                    profile={profile}
                                  />
                                ) : items?.status == "card_testimonials" ? (
                                  <Testimonials
                                    card={card}
                                    subscription={plan}
                                    card_testimonials={card?.card_testimonials}
                                    Titles={titles}
                                    company_setting={company_setting}
                                    InquiryModal={false}
                                    InquiryPopup={false}
                                    setInquiryModal={false}
                                    profile={profile}
                                  />
                                ) : items?.status == "card_clients" ? (
                                  <Clients
                                    card={card}
                                    ClientPhotos={card?.card_clients}
                                    PlanData={plan}
                                    Titles={titles}
                                    profile={profile}
                                  />
                                ) : items?.status == "card_experience" ? (
                                  <Resume
                                    Titles={titles}
                                    subscription={plan}
                                    card_experience={card?.card_experience}
                                    profile={profile}
                                  />
                                ) : items?.status == "card_photos" ? (
                                  <Work
                                    Card_videos={card?.card_videos}
                                    Card_photos={card?.card_photos}
                                    Titles={titles}
                                    Data={card}
                                    card={card}
                                    PaginationData={pagination_data}
                                    PlanData={plan}
                                    card_url={profile}
                                  />
                                ) : items?.status == "card_videos" ? (
                                  <Video
                                    Card_videos={card?.card_videos}
                                    Card_photos={card?.card_photos}
                                    Titles={titles}
                                    Data={card}
                                    card={card}
                                    PaginationData={pagination_data}
                                    PlanData={plan}
                                    card_url={profile}
                                  />
                                ) : items?.status == "card_products" ? (
                                  <Product
                                    PlanData={plan}
                                    Titles={titles}
                                    Data={card}
                                    card={card}
                                    PaginationData={pagination_data}
                                    MainData={MainData}
                                    Products={Products}
                                    card_url={profile}
                                  />
                                ) : items?.status == "card_blogs" ? (
                                  <Blog
                                    PlanData={plan}
                                    Titles={titles}
                                    Data={card}
                                    card={card}
                                    PaginationData={pagination_data}
                                    AddMoreBlogs={AddMoreBlogs}
                                    card_url={profile}
                                  />
                                ) : items?.status == "card_realestates" ? (
                                  process.env.NEXT_PUBLIC_MODE ===
                                    "development" ? (
                                    <Realestate
                                      PlanData={plan}
                                      Titles={titles}
                                      Data={card}
                                      card={card}
                                      PaginationData={pagination_data}
                                      RealEstateData={RealEstateData}
                                      card_url={profile}
                                      MainData={MainData}
                                    />
                                  ) : (
                                    ""
                                  )
                                ) : items?.status == "EmbedPost" ? (
                                  MainData?.company_setting?.show_insta_feed ==
                                    1 ? (
                                    <EmbedPost
                                      Card_videos={card?.card_videos}
                                      Card_photos={card?.card_photos}
                                      Titles={titles}
                                      Data={card}
                                      card={card}
                                      PaginationData={pagination_data}
                                      PlanData={plan}
                                      card_url={profile}
                                      MainData={MainData}
                                    />
                                  ) : (
                                    ""
                                  )
                                ) : items?.status == "card_booking" ? (
                                  MainData?.company_setting
                                    ?.appointment_enquiry_method == "form" ? (
                                    <ContactForm
                                      card_url={profile}
                                      Titles={titles}
                                      Data={card}
                                      card={card}
                                      MainData={MainData}
                                      PlanData={plan}
                                    />
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  ""
                                )}
                            </div>
                          );
                        })}

                      {MainData?.custom_forms !== null &&
                        plan?.is_expired == false ? (
                        <div
                          className="mb-3 box-content boxxx mt-0"
                          id="custom_form"
                        >
                          <div className="flex-header">
                            <h2 className="title title--h1 first-title title__separate">
                              {MainData?.forms?.heading
                                ? MainData?.forms?.heading
                                : "Custom Form"}
                            </h2>
                          </div>
                          <BuilderForm
                            card_url={profile}
                            JsonData={MainData?.forms?.json}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </main>
            <Footer profile={profile} Data={data?.data} MainData={MainData} />
          </>
        ) : (
          redirect("/")
        )}
      </>
    )
  );
}
