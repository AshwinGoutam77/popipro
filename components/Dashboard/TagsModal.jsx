import React, { useEffect, useState } from "react";
import Api from "@services/Api";
import {
  DeleteProductCategory,
  GlobalPaymentLink,
  HitSuggestion,
  ManageCategory,
  ProductEnquiryBtns,
  ToogleRealEstateBtn,
} from "@services/Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import { Modal } from "react-bootstrap";
import { faPencil, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function TagsModal({ active, handleClose, Data, APIDATA, TitleData, MainData, realEstate, productsModal }) {
  const [EditCategory, setEditCategory] = useState(false);
  const [CategoryId, setCategoryId] = useState("");
  const [UpdateCategory, setUpdateCategory] = useState("");
  const [CategoryData, setCategoryData] = useState("");

  useEffect(() => {
    setCategoryData(Data?.categories);
  }, []);

  const handleSaveCategory = (id) => {
    setCategoryId(id);
    setEditCategory(true);
    if (EditCategory) {
      setEditCategory(false);
    }
  };

  const handleUpdateCategory = async (id) => {
    if (UpdateCategory == "") {
      toast.error("Category is requied", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    let payload = {
      category: id,
      category_name: UpdateCategory,
    };
    const response = await Api(ManageCategory, payload);
    if (response?.data?.status) {
      setEditCategory(false);
      APIDATA();
      setCategoryData(Data?.categories);
      toast.success(response.data.message, {
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
  };

  const handleDelteCategry = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(DeleteProductCategory, {}, id);
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
        }
      }
    });
  };

  const handleProductsbtn = async (type) => {
    try {
      const response = await Api(ProductEnquiryBtns, {}, "?type=" + type);
      if (response.data.status) {
        APIDATA();
        toast.success(response.data.message, {
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
    } catch (error) {
      toast.error(error.response.data.message, {
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
  };



  const handleRealEstateBtn = async (type) => {
    try {
      const response = await Api(ToogleRealEstateBtn, {}, "?type=" + type);
      if (response.data.status) {
        APIDATA();
        toast.success(response.data.message, {
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
    } catch (error) {
      toast.error(error.response.data.message, {
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
  };


  return (
    <>
      <Modal show={active} onHide={() => handleClose("")} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-0"
            >
              Settings
            </h5>
          </Modal.Title>

          <button
            type="button"
            className="close"
            onClick={() => handleClose("")}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* <h6 className="text-dark">Manage Category</h6>
            <ul className="m-0 p-0 multimodes-ul px-1">
              {CategoryData
                ? CategoryData &&
                CategoryData?.map((items, index) => {
                  return (
                    <li
                      className="d-flex align-items-center justify-content-between mb-1"
                      key={index}
                    >
                      {EditCategory && CategoryId === items?.id ? (
                        <input
                          name="product"
                          className="category-title-input"
                          onChange={(e) => setUpdateCategory(e.target.value)}
                          defaultValue={items?.name}
                          placeholder={items?.name}
                        ></input>
                      ) : (
                        <h6 className="mb-0 color-black">{items?.name}</h6>
                      )}
                      <div>
                        {EditCategory && CategoryId === items?.id ? (
                          <FontAwesomeIcon
                            icon={faSave}
                            className="mr-4 cursor-pointer color-black"
                            onClick={() => handleUpdateCategory(items?.id)}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPencil}
                            className="mr-4 cursor-pointer color-black"
                            onClick={() => handleSaveCategory(items?.id)}
                          />
                        )}
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="cursor-pointer color-black"
                          onClick={() => handleDelteCategry(items?.id)}
                        />
                      </div>
                    </li>
                  );
                })
                : "No Category Found"}
            </ul> */}

            {productsModal && <div className="">
              <h6 className="font-weight-bold">
                How you want to receive inquiry:
              </h6>
              <div className="d-flex align-items-start">
                <input
                  type="checkbox"
                  id="product-whatsapp"
                  className="mt-1"
                  value={
                    MainData?.company_setting?.show_product_wp_button !==
                      0
                      ? true
                      : false
                  }
                  onChange={() => handleProductsbtn("wp")}
                  checked={
                    MainData?.company_setting?.show_product_wp_button !==
                      0
                      ? true
                      : false
                  }
                />
                <label
                  for="product-whatsapp"
                  className="ml-2 Varcolor font-weight-bold"
                >
                  Via whatsapp only?
                </label>
              </div>
              <div className="d-flex align-items-start">
                <input
                  type="checkbox"
                  id="product-enq"
                  className="mt-1"
                  value={
                    MainData?.company_setting
                      ?.show_product_enquiry_button !== 0
                      ? true
                      : false
                  }
                  onChange={() => handleProductsbtn("enq")}
                  checked={
                    MainData?.company_setting
                      ?.show_product_enquiry_button !== 0
                      ? true
                      : false
                  }
                />
                <label
                  for="product-enq"
                  className="ml-2 Varcolor font-weight-bold mb-0"
                >
                  Via enquiry form?
                </label>
              </div>
            </div>}

            {realEstate && <div className="">
              <h6 className="font-weight-bold">
                How you want to receive inquiry:
              </h6>
              <div className="d-flex align-items-start">
                <input
                  type="checkbox"
                  id="real-estate-whatsapp"
                  className="mt-1"
                  value={
                    MainData?.company_setting?.show_realestate_wp_button !== 0
                      ? true
                      : false
                  }
                  onChange={() => handleRealEstateBtn("wp")}
                  checked={
                    MainData?.company_setting?.show_realestate_wp_button !== 0
                      ? true
                      : false
                  }
                />
                <label
                  for="real-estate-whatsapp"
                  className="ml-2 Varcolor font-weight-bold"
                >
                  Via whatsapp only?
                </label>
              </div>
              <div className="d-flex align-items-start">
                <input
                  type="checkbox"
                  id="real-estate-enq"
                  className="mt-1"
                  value={
                    MainData?.company_setting
                      ?.show_realestate_enquiry_button !== 0
                      ? true
                      : false
                  }
                  onChange={() => handleRealEstateBtn("enq")}
                  checked={
                    MainData?.company_setting
                      ?.show_realestate_enquiry_button !== 0
                      ? true
                      : false
                  }
                />
                <label
                  for="real-estate-enq"
                  className="ml-2 Varcolor font-weight-bold mb-0"
                >
                  Via enquiry form?
                </label>
              </div>
            </div>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
