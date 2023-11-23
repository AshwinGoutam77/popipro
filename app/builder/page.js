import Builder from '@components/ViewPages/Builder'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Builder
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
    </div>
  );
}

export default Page