import {
  faCheck,
  faCheckCircle,
  faFloppyDisk,
  faInfo,
  faPencil,
  faPhone,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Api from "@services/Api";
import { CardData, deleteSection } from "@services/Routes";
import { Modal } from "react-bootstrap";
import EditPlan from "./EditPlan";
import EditDropdown from "./Dropdown";
import { showToast } from "@components/Dashboard/Toast";

export default function EditAlternateNo({
  APIDATA,
  Data,
  TitleData,
  PlanData,
  MainData,
}) {
  const [NumberLabel, setNumberLabel] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [ShowLoader, setShowLoader] = useState();
  const [Active, setActive] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [ModalId, setModalId] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [Extension, setExtension] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [AlterNumber, setAlterNumber] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setActive(TitleData?.card_alternate_phone?.is_active == "1" ? true : false);
    setIsLocked(TitleData?.card_alternate_phone?.is_locked == "1" ? true : false);
  }, [TitleData]);

  useEffect(() => {
    setAlterNumber(TitleData?.card_alternate_phone?.visible_name);
  }, []);

  const handleCanclebtn = () => {
    handleClose();
    handleEditClose();
    setNumberLabel("");
    setMobileNumber("");
    setCountryCode("");
    setExtension("");
  };

  const handleActive = async () => {
    const titles = [
      {
        name: "card_alternate_phone",
        visible_name: AlterNumber,
        is_featured: Active ? "0" : "1",
        is_active: Active ? "0" : "1",
      },
    ];
    Swal.fire({
      title: "Are you sure?",
      text:
        Active == 1
          ? "You want to hide this section from your profile?"
          : "You want to show this section on your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(24 123 249)",
      cancelButtonColor: "#d33",
      confirmButtonText: Active == 1 ? "Yes hide it!" : "Yes show it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setShowLoader(true);
          const response = await Api(CardData, { titles });
          if (response.status) {
            setActive((prev) => !prev);
            setShowLoader(false);
            // APIDATA();
          }
        } catch (error) {
          if (error.request.status == "401") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
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
      }
    });
  };

  const handleSaveDetails = async (id = null) => {
    setShowLoader(true);
    let alternate_phones = [];
    let error = false;
    let mess = "";
    if (MobileNumber == "" || NumberLabel == "" || CountryCode == "") {
      error = true;
      mess =
        NumberLabel == ""
          ? "Label is required"
          : CountryCode == ""
            ? "Country code is required"
            : MobileNumber == ""
              ? "Number is required" : "";
    } else {
      (alternate_phones = [
        {
          title: NumberLabel,
          number: MobileNumber,
          extension: Extension,
          country_code: CountryCode,
          saved_alternate_phone: id !== null ? id : "",
        },
      ])

    }
    if (error) {
      setShowLoader(false);
      toast.error(mess, {
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

    try {
      const response = await Api(CardData, { alternate_phones });
      if (response?.data?.status) {
        APIDATA();
        handleClose();
        handleEditClose();
        handleCanclebtn();
        setNumberLabel("");
        setMobileNumber("");
        setCountryCode("");
        setExtension("");
        setShowLoader(false);
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
      if (error?.request?.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      toast.error("Something went wrong, Please try again later.", {
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

  const handleDeleteNumber = async (id, type, DataId) => {
    let data = {
      type: type,
      base: id,
      id: DataId,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(deleteSection, data);
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
        }
      }
    });
  };
  const handleSetId = (id, title, number, country_code, extension) => {
    handleEditShow();
    setModalId(id);
    setNumberLabel(title);
    setMobileNumber(number);
    setCountryCode(country_code);
    setExtension(extension);
  };
  const handleChnageTitle = async () => {
    if (AlterNumber == "") {
      toast.error("Section title is required", {
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
    setShowLoader(true);
    const titles = [
      {
        name: "card_alternate_phone",
        visible_name: AlterNumber,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
        setShowLoader(false);
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
        setEditFields(false);
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
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
  const handleUpgradePlan = () => {
    Swal.fire({
      title:
        "You have reached your storage limit, to increase your limit please upgrade your plan.",
      icon: "info",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<a href="https://www.popipro.com/order" class="text-white" target="_blank">Upgrade</a>',
    });
  };

  const handleShowSection = async () => {
    const newValue = !isLocked;
    setIsLocked(newValue);
    let titles = [
      {
        name: "card_alternate_phone",
        visible_name: TitleData?.card_alternate_phone?.visible_name,
        is_locked: newValue ? 1 : 0,
      },
    ];
    const response = await Api(CardData, { titles });
    if (response?.data?.status) {
      showToast(response.data?.message, 'success');
    }
  };

  return (
    <>
      {/* <SimpleBackdrop visible={ShowLoader} /> */}
      <Modal show={show} onHide={handleCanclebtn} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {AlterNumber}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="modalFormLable">Label *</label>
            <input
              type="text"
              name="number"
              rows="4"
              cols="50"
              className="form-control mb-4 mt-1"
              value={NumberLabel}
              placeholder="Enter label for Alternate number"
              onChange={(e) => setNumberLabel(e.target.value)}
              maxLength="50"
            ></input>
          </div>
          <div>
            <label className="modalFormLable">Phone Number *</label>
            <div className="d-flex align-items-center" style={{ gap: "8px" }}>
              <select
                className="form-control mb-4 mt-1"
                onChange={(e) => setCountryCode(e.target.value)}
                value={CountryCode}
                style={{ height: "45px", width: "50%" }}
              >
                <option value="">Code</option>
                {MainData?.countrycode_listing &&
                  MainData?.countrycode_listing?.map((item, index) => {
                    return (
                      <option value={item?.value} key={index}>
                        {item?.value + ": " + item?.name}
                      </option>
                    );
                  })}
              </select>
              <input
                type="number"
                name="number"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1"
                value={MobileNumber}
                placeholder="Phone number"
                onChange={(e) => setMobileNumber(e.target.value)}
              ></input>
              <input
                type="number"
                name="number"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-50"
                value={Extension}
                placeholder="Extension"
                onChange={(e) => setExtension(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            <button className="send-btnn" onClick={() => handleSaveDetails()}>
              Save
            </button>
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit model */}
      <Modal show={showEdit} onHide={handleCanclebtn} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Edit {AlterNumber}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleCanclebtn}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {Data?.card_alternate_phone?.map((item, index) => {
            return ModalId === item.id ? (
              <div key={index}>
                <div>
                  <label className="modalFormLable">Label</label>
                  <input
                    type="text"
                    name="number"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1"
                    value={NumberLabel}
                    placeholder="Enter label for Alternate number"
                    style={{
                      height: "40px",
                      border: "1px solid #ccc",
                    }}
                    onChange={(e) => setNumberLabel(e.target.value)}
                    maxLength="50"
                  ></input>
                </div>
                <div>
                  <label className="modalFormLable">Phone Number *</label>
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "8px" }}
                  >
                    <select
                      className="form-control mb-4 mt-1"
                      onChange={(e) => setCountryCode(e.target.value)}
                      value={CountryCode}
                      style={{ height: "45px", width: "50%" }}
                    >
                      <option value="">Code</option>
                      {MainData?.countrycode_listing &&
                        MainData?.countrycode_listing?.map((item, index) => {
                          return (
                            <option value={item?.value} key={index}>
                              {item?.value + ": " + item?.name}
                            </option>
                          );
                        })}
                    </select>
                    <input
                      type="number"
                      name="number"
                      rows="4"
                      cols="50"
                      className="form-control mb-4 mt-1"
                      value={MobileNumber}
                      placeholder="xxxxxxxxxx"
                      onChange={(e) => setMobileNumber(e.target.value)}
                    ></input>
                    <input
                      type="number"
                      name="number"
                      rows="4"
                      cols="50"
                      className="form-control mb-4 mt-1 w-50"
                      value={Extension}
                      placeholder="xxxx"
                      onChange={(e) => setExtension(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center mt-3"
                  style={{ gap: "10px" }}
                >
                  <button
                    className="send-btnn"
                    onClick={() => handleSaveDetails(item.id)}
                  >
                    Save
                  </button>
                  <button
                    className="delete-button m-0"
                    onClick={handleCanclebtn}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              ""
            );
          })}
        </Modal.Body>
      </Modal>

      {TitleData?.card_alternate_phone?.source !== 0 ? (
        <div className="position-relative">
          {Data ? (
            <EditPlan
              Data={Data}
              PlanData={PlanData}
              APIDATA={APIDATA}
              MainData={MainData}
              in_subscription={TitleData?.card_alternate_phone?.in_subscription}
            />
          ) : (
            ""
          )}
          <div className="box-content boxxx sm-mt-0" id="about_us">
            <div className="flex-header">
              <div className="d-flex align-items-baseline">
                {EditFields ? (
                  <input
                    type="text"
                    name="AboutMe"
                    className="title-section-input mb-3"
                    placeholder="Custom Numbers"
                    onChange={(e) => setAlterNumber(e.target.value)}
                    defaultValue={AlterNumber || ""}
                  />
                ) : (
                  <>
                    <h1 className="title title--h1 first-title title__separate">
                      {AlterNumber}
                    </h1>
                  </>
                )}
              </div>

              <div>
                {TitleData?.card_alternate_phone?.source == "2" &&
                  TitleData?.card_alternate_phone?.in_subscription ? (
                  <>
                    <div className="web-edit-icons">
                      <div className="d-flex align-items-center">
                        <div class="wrapper">
                          <div class="tooltip">
                            Please add any relevant phone numbers, including
                            WhatsApp, Skype, and contact numbers.
                          </div>
                          <img
                            src="../static/img/info.svg"
                            alt="image"
                            width={18}
                            className="mr-2 cursor-pointer"
                            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                          />
                        </div>
                        <div className="edit-pencile-div">
                          {EditFields ? (
                            <FontAwesomeIcon
                              icon={faFloppyDisk}
                              className="ml-3 pe-auto floopySave-icon"
                              onClick={() => handleChnageTitle()}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faPencil}
                              className="ml-3 pe-auto Iconcolor-black"
                              onClick={() => setEditFields(true)}
                            />
                          )}
                        </div>
                        <>
                          {TitleData?.card_alternate_phone?.row_limit <=
                            Data?.card_alternate_phone?.length ? (
                            <button
                              className="addmore"
                              data-toggle="modal"
                              data-target="#AlternateNumberModal"
                              onClick={handleUpgradePlan}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          ) : (
                            <button className="addmore" onClick={handleShow}>
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          )}
                          <>
                            <label className="switch">
                              <input
                                data-status={
                                  TitleData.card_alternate_phone?.is_active
                                }
                                data-active={Active}
                                checked={Active}
                                type="checkbox"
                                onChange={() => handleActive()}
                              />
                              <span className="slider round"></span>
                            </label>
                          </>
                        </>
                      </div>
                    </div>

                    <div className="mobile-edit-icons">
                      {EditFields ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="ml-2 VarColor w-auto cursor-pointer CheckTitle"
                            onClick={() => handleChnageTitle()}
                          />
                        </div>
                      ) : (
                        <EditDropdown
                          TitleData={TitleData}
                          Active={Active}
                          handleActive={handleActive}
                          setEditFields={setEditFields}
                          AddTitle={
                            "Add " +
                            TitleData?.card_alternate_phone?.visible_name
                          }
                          handleShowAddModal={handleShow}
                          setTooltipIsOpen={setTooltipIsOpen}
                          message="Please add any relevant phone numbers, including
                        WhatsApp, Skype, and contact numbers."
                          tooltipIsOpen={tooltipIsOpen}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {Data?.card_alternate_phone?.length == 0 ? (
              <p>
                {AlterNumber} are empty, to add {AlterNumber} click on the add
                icon.
              </p>
            ) : (
              ""
            )}
            {Data?.card_alternate_phone?.map((item, index) => {
              return (
                <div className="alternate-number-div" key={index}>
                  {TitleData?.card_alternate_phone?.source == "2" &&
                    TitleData?.card_alternate_phone?.in_subscription ? (
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      className="user-select-auto position-absolute top-0 end-0 zindex-1 edit-user-minus"
                      style={{
                        top: "0",
                        right: "0",
                        cursor: "pointer",
                        color: "var(--color)",
                        fontSize: "20px",
                        zIndex: "1",
                        background: "white",
                      }}
                      onClick={() => handleDeleteNumber(item.id, 9, Data?.id)}
                    />
                  ) : (
                    ""
                  )}
                  <div
                    className="d-flex align-items-baseline justify-content-between mt-1 mb-1"
                    key={index}
                  >
                    <a href={"tel:" + item.number}>
                      <div className="d-flex align-items-center flex-wrap">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="pe-auto Iconcolor-black"
                          style={{ fontSize: "15px" }}
                        />
                        <p
                          className="ml-2 font-weight-bold"
                          style={{ color: "black" }}
                        >
                          {item.title} :
                        </p>
                        <a
                          href={`tel: ${item.country_code
                            ? item.country_code + "-"
                            : item.country_code
                            } ${item?.number} ${item?.extension ? "- " + item?.extension : ""
                            }`}
                          className="ml-1"
                          style={{ color: "black" }}
                        >
                          {item?.country_code}
                          {item?.country_code ? "-" : ""}
                          {item?.number}
                          {item?.extension ? "-" : ""}
                          {item?.extension}
                        </a>
                      </div>
                    </a>
                    {TitleData?.card_services?.source == "2" &&
                      TitleData?.card_alternate_phone?.in_subscription ? (
                      <FontAwesomeIcon
                        data-toggle="modal"
                        data-target="#AlternateNumberModalEdit"
                        icon={faPencil}
                        className="pe-auto cursor-pointer"
                        style={{
                          fontSize: "15px",
                          color: "var(--color)",
                          marginRight: "35px",
                        }}
                        onClick={() =>
                          handleSetId(
                            item.id,
                            item.title,
                            item.number,
                            item?.country_code,
                            item?.extension
                          )
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}

            <div className="mt-4">
              <label htmlFor="number-password">
                <input
                  type="checkbox"
                  id="number-password"
                  checked={isLocked}
                  onChange={handleShowSection}
                />{" "}
                Private the section
              </label>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
