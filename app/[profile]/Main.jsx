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
import { ToastContainer } from "react-toastify";
import BuilderForm from "@components/ViewPages/Builder";
import EmbedPost from "@components/ViewPages/EmbedPost";
import Realestate from "@components/ViewPages/Realestate";

export default async function Main({ profile, data, id, referer }) {
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
  let is_onboarding = data?.data?.card?.is_onboarding;
  let FormData = data?.data?.forms;

  if (profile == "happy-helathy-homes") {
    redirect("happy-healthy-homes");
  }

  return (
    data && (
      <>
        {is_onboarding == 2 ? (
          <>
            <Banner
              card={card}
              permission={permission}
              subscription={plan}
              CardLinks={card?.card_social_links}
              Titles={titles}
              id={id}
              MainData={MainData}
              referer={referer}
            />
            <main className="main">
              <div className="container gutter-top">
                <Header
                  profile={profile}
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
                  <div className="col-12 col-md-12 col-lg-10">
                    <Alternateno Data={card} Titles={titles} PlanData={plan} />
                    <SocialMedia
                      card={card}
                      Titles={titles}
                      CardLinks={card?.card_social_links}
                    />

                    <AboutMe Titles={titles} card={card} />

                    <QuickLinks
                      subscription={plan}
                      card={card}
                      Titles={titles}
                    />

                    <Services subscription={plan} card={card} Titles={titles} />

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
                    {card.id === "S7ZG" &&
                    process.env.NEXT_PUBLIC_MODE === "development" ? (
                      <Realestate />
                    ) : (
                      ""
                    )}
                    {card.id === "S7ZG" &&
                    process.env.NEXT_PUBLIC_MODE === "development" ? (
                      <EmbedPost
                        Card_videos={card?.card_videos}
                        Card_photos={card?.card_photos}
                        Titles={titles}
                        Data={card}
                        card={card}
                        PaginationData={pagination_data}
                        PlanData={plan}
                        card_url={profile}
                      />
                    ) : (
                      ""
                    )}
                    <ContactForm
                      card_url={profile}
                      Titles={titles}
                      Data={card}
                      card={card}
                      MainData={MainData}
                      PlanData={plan}
                    />

                    {MainData?.custom_forms !== null &&
                    plan?.is_expired == false ? (
                      <div
                        className="mb-3 box-content boxxx mt-0"
                        id="about_us"
                      >
                        <div className="flex-header">
                          <h2 className="title title--h1 first-title title__separate">
                            Custom Form
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
                </div>
              </div>
            </main>
            <Footer card_url={profile} />
          </>
        ) : (
          redirect("/")
        )}
      </>
    )
  );
}
