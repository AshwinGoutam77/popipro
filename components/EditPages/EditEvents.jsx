import React, { useEffect, useState } from 'react'
import EditDropdown from './Dropdown';
import { CardData, deleteFiles, deleteSection } from '@services/Routes';
import Api from '@services/Api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark, faFloppyDisk, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { handleActive } from './EditFunctions';
import { Modal } from 'react-bootstrap';
import { showToast } from '@components/Dashboard/Toast';
import EditPlan from './EditPlan';

export default function EditEvents({ TitleData, Data, APIDATA, MainData, PlanData }) {
    const [EditFields, setEditFields] = useState(false);
    const [Active, setActive] = useState("");
    const [EventTitle, setEventTitle] = useState("");
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleEditClose = () => setShowEdit(false);
    const handleShow = () => setShow(true);
    const [ShowLoader, setShowLoader] = useState(false);
    const [DocTitle, setDocTitle] = useState("")
    const [File, setFile] = useState("")

    useEffect(() => {
        setActive(TitleData?.card_documents?.is_active == "1" ? true : false);
    }, [TitleData]);

    useEffect(() => {
        setEventTitle(TitleData?.card_documents?.visible_name);
    }, []);

    const handleChnageTitle = async () => {
        if (EventTitle == "") {
            showToast("Section title is required", 'error')
            return;
        }
        setShowLoader(true);
        const titles = [
            {
                name: "card_documents",
                visible_name: EventTitle,
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
            if (error.request?.status == "401") {
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

    const handleSaveDetails = async () => {
        let data = {
            title: DocTitle,
            document: File,
        };
        const fileSizeLimit = 10 * 1024 * 1024;
        if (File.size > fileSizeLimit) {
            showToast("File size cannot exceed 10 MB.", "error");
        } else if (DocTitle == "") { showToast("title is requried", "error") }
        else if (File == "") { showToast("Document is requried", "error") }
        else if (File && DocTitle) {
            {
                try {
                    const response = await Api(CardData, { documents: [data] });
                    if (response?.data?.status) {
                        showToast(response?.data?.message, "success");
                        setDocTitle("")
                        setFile([])
                        handleClose();
                        APIDATA()
                    } else {
                        showToast(response?.data?.message || "An error occurred. Please try again.", "error");
                    }
                } catch (error) {
                    console.error("API Error:", error);
                    showToast("Something went wrong. Please try again later.", "error");
                }
            }
        }
    }

    const handleDelete = async (id, type, DataId) => {
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
            confirmButtonColor: "rgb(99 171 187)",
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

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>
                        <h5 class="title title--h1 first-title title__separate mb-1 mb-0">
                            Add Upcoming Events
                        </h5>
                    </Modal.Title>
                    <button type="button" class="close" onClick={handleClose}>
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">Close alert</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="modalFormLable">Upload Image</label>
                        <input
                            type="file"
                            className="form-control mb-4 mt-1"
                            accept=".png, .jpg, .jpeg"
                            value={DocTitle}
                            onChange={(e) => setDocTitle(e.target.value)}
                        ></input>
                        <label className="modalFormLable">Heading</label>
                        <input
                            type="text"
                            placeholder='Enter Your Event Heading'
                            className="form-control mb-4 mt-1"
                            onChange={(e) => setFile(e.target.files[0])}
                        ></input>

                        <div className='d-flex align-items-center justify-content-between gap-4 mb-2'>
                            <div className='w-100'>
                                <label className="modalFormLable">Date</label>
                                <input
                                    type="date"
                                    placeholder='Enter Your Event Heading'
                                    className="form-control mb-2 mt-1"
                                    onChange={(e) => setFile(e.target.files[0])}
                                ></input>
                            </div>

                            <div className='w-100'>
                                <label className="modalFormLable">Time</label>
                                <input
                                    type="time"
                                    placeholder='Enter Your Event Heading'
                                    className="form-control mb-2 mt-1"
                                    onChange={(e) => setFile(e.target.files[0])}
                                ></input>
                            </div>
                        </div>

                        <label className="modalFormLable">Google Address</label>
                        <input
                            type="url"
                            placeholder='Enter Your Event Location'
                            className="form-control mb-2 mt-1"
                            onChange={(e) => setFile(e.target.files[0])}
                        ></input>
                    </div>

                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                        <button className="send-btnn" onClick={() => handleSaveDetails()}>
                            Save
                        </button>
                        <button className="delete-button m-0" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="position-relative">
                {Data ? (
                    <EditPlan
                        Data={Data}
                        PlanData={PlanData}
                        APIDATA={APIDATA}
                        MainData={MainData}
                        in_subscription={TitleData?.card_documents?.in_subscription}
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
                                    onChange={(e) => setEventTitle(e.target.value)}
                                    defaultValue={EventTitle || ""}
                                />
                            ) : (
                                <>
                                    <h1 className="title title--h1 first-title title__separate">
                                        {EventTitle ? EventTitle : "Important Document"}
                                    </h1>
                                </>
                            )}
                        </div>
                        <div>
                            {TitleData?.card_documents?.source == "2" &&
                                TitleData?.card_documents?.in_subscription ? (
                                <>
                                    <div className="web-edit-icons">
                                        <div className="d-flex align-items-center">
                                            <div class="wrapper">
                                                <div class="tooltip">
                                                    Add Your Latest or Upcoming Events Here to Keep Everyone Updated!
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
                                                            onChange={() => handleActive({ section_name: "card_documents", Visible_name: EventTitle, Active, setActive })}
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
                                                    TitleData?.card_documents?.visible_name
                                                }
                                                handleShowAddModal={handleShow}
                                                setTooltipIsOpen={setTooltipIsOpen}
                                                message="Please add your relavent important documents and files here."
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

                    <div className="row events-section">
                        <div className="col-sm-6">
                            <img src="../static/img/picture-1.jpg" alt="banner" />
                            <div>
                                <h3 class="title title--h4 mt-2 m-0">UpComing Event in Jaipur</h3>
                                <span>23 Jan, 2025 | 1:00 pm | Albert Hall, Jaipur</span>
                            </div>
                            <div>
                                <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</p>
                                <div className='d-flex align-items-center gap-2 mt-4'>
                                    <button className="contact-btn w-auto m-0" onClick={() => setShow(true)}>Edit</button>
                                    <button className="delete-button w-auto m-0">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img src="../static/img/picture-1.jpg" alt="banner" />
                            <div>
                                <h3 class="title title--h4 mt-2 m-0">UpComing Event in Jaipur</h3>
                                <span>23 Jan, 2025 | 1:00 pm | Albert Hall, Jaipur</span>
                            </div>
                            <div>
                                <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</p>
                                <div className='d-flex align-items-center gap-2 mt-4'>
                                    <button className="contact-btn w-auto m-0" onClick={() => setShow(true)}>Edit</button>
                                    <button className="delete-button w-auto m-0">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
