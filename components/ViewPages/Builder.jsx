"use client";
import $ from "jquery"; //Load jquery
import React, { Component, createRef } from "react"; //For react component

if (typeof window !== "undefined") {
  window.jQuery = $; //JQuery alias
  window.$ = $; //JQuery alias
}
if (typeof window !== "undefined") {
  require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
  require("formBuilder"); // For FormBuilder
  require("formBuilder/dist/form-render.min.js");
}

//Initialize formBuilder
class FormBuilder extends Component {
  fb = createRef();
  componentDidMount() {
    $(this.fb.current).formRender({ formData: this.props.JsonData });
  }

  render() {
    return <div id="fb-editor" ref={this.fb} />;
  }
}

//Return Initialized formBuilder set it to HTML
function Builder({ JsonData }) {
  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    JsonData && (
      <>
        <form onSubmit={(e) => handleSubmitForm(e)}>
          <FormBuilder JsonData={JsonData} />
          <button type="submit" className="contact-btn w-auto">
            Submit Form
          </button>
        </form>
      </>
    )
  );
}

export default Builder;
