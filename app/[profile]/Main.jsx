import React from "react";
import Header from "@components/Header";
import "../../styles/about.css";
import "../../styles/edit.css";
import Banner from "@components/Banner";
import Navbar from "@components/Navbar";
import SocialMedia from "@components/SocialMedia";
import AboutMe from "@components/AboutMe";
import QuickLinks from "@components/QuickLinks";
import Services from "@components/Services";
import Testimonials from "@components/Testimonials";
import Clients from "@components/Clients";
import Resume from "@components/Resume";
import Work from "@components/Work";
import Blog from "@components/Blog";
import Product from "@components/Products.";
import ContactForm from "@components/ContactForm";
import Footer from "@components/Footer";
import Alternateno from "@components/Alternateno";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import BuilderForm from "@components/Builder";

export default async function Main({ profile, data, id }) {
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
                      /* openModal={openModal} */
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
                    <ContactForm
                      card_url={profile}
                      Titles={titles}
                      Data={card}
                      card={card}
                      MainData={MainData}
                      PlanData={plan}
                    />
                  </div>
                </div>
              </div>

              <BuilderForm
                jsonData={[
                  {
                    type: "text",
                    required: true,
                    label: "Full Name",
                    placeholder: "Full Name",
                    className: "form-control",
                    name: "text-1691492724886-0",
                    subtype: "text",
                  },
                  {
                    type: "text",
                    required: true,
                    label: "Mobile Number",
                    placeholder: "+(161)020347525",
                    className: "form-control",
                    name: "text-1691492811723-0",
                    subtype: "text",
                  },
                  {
                    type: "text",
                    subtype: "email",
                    required: true,
                    label: "Email Address",
                    placeholder: "example@popipro.com",
                    className: "form-control",
                    name: "text-1691492845050-0",
                  },
                  {
                    type: "radio-group",
                    required: true,
                    label: "Do You have an NFC Enabled Smartphone ?",
                    name: "radio-group-1691492885723-0",
                    other: false,
                    values: [
                      { label: "YES", value: "yes", selected: false },
                      { label: "NO", value: "no", selected: false },
                    ],
                  },
                  {
                    type: "radio-group",
                    required: true,
                    label: "Have you ever Heard of&nbsp; PopiCard ?",
                    name: "radio-group-1691492942333-0",
                    other: false,
                    values: [
                      {
                        label: "Yes ! Ofcourse.",
                        value: "yes",
                        selected: false,
                      },
                      { label: "Not Really.", value: "no", selected: false },
                    ],
                  },
                  {
                    type: "checkbox-group",
                    required: true,
                    label: "Which Features of Popicard Excites you the most ?",
                    toggle: false,
                    name: "checkbox-group-1691493004357-0",
                    other: false,
                    values: [
                      {
                        label: "Quality & Water Resistance",
                        value: "quality",
                        selected: false,
                      },
                      {
                        label: "Customizable Sections",
                        value: "sections",
                        selected: false,
                      },
                      {
                        label: "Tailored Titles",
                        value: "titles",
                        selected: false,
                      },
                      {
                        label: "Easy Whatsapp Sharing",
                        value: "whatsapp",
                        selected: false,
                      },
                      {
                        label: "VFC File Download",
                        value: "vfc",
                        selected: false,
                      },
                      {
                        label: "Business Friendly Design",
                        value: "business",
                        selected: false,
                      },
                      {
                        label: "Feel Like Mini Website",
                        value: "website",
                        selected: false,
                      },
                      {
                        label: "Ease of Access",
                        value: "ease",
                        selected: false,
                      },
                    ],
                  },
                  {
                    type: "textarea",
                    required: true,
                    label:
                      "Share your thoughts on PopiCard so that we can mold according to your need.",
                    className: "form-control",
                    name: "textarea-1691493325608-0",
                    subtype: "textarea",
                    rows: 4,
                  },
                ]}
              />
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
