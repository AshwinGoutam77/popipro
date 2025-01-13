import React, { useEffect, useState } from "react";
import Api from "@services/Api";
import {
  DeleteProductCategory,
  GlobalPaymentLink,
  HitSuggestion,
  ManageCategory,
} from "@services/Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import { Modal } from "react-bootstrap";
import { faPencil, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function TagsModal({ active, handleClose, Data, APIDATA, TitleData }) {
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

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal show={active} onHide={() => handleClose("")} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-0"
            >
              {TitleData.card_products?.visible_name} Settings
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
            <h6 className="text-dark">Manage Category</h6>
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
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
