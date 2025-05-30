import React, { useEffect, useState } from 'react'
import EditDropdown from './Dropdown';
import { CardData, deleteFiles, deleteSection, LoadMoreApi } from '@services/Routes';
import Api from '@services/Api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark, faFloppyDisk, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { handleActive, handleDraft } from './EditFunctions';
import { Modal } from 'react-bootstrap';
import { showToast } from '@components/Dashboard/Toast';
import EditPlan from './EditPlan';

export default function EditEvents({ TitleData, Data, APIDATA, MainData, PlanData, card_url,
    PaginationData, AddEvents, setAddEvents }) {
    const [EditFields, setEditFields] = useState(false);
    const [Active, setActive] = useState("");
    const [EventTitle, setEventTitle] = useState("");
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleShow = () => setShow(true);
    const [ShowLoader, setShowLoader] = useState(false);
    const [LoadMoreData, setLoadMoreData] = useState("");
    const [formData, setFormData] = useState({
        banner: null,
        name: "",
        date: "",
        time: "",
        location: "",
        venue: "",
        description: "",
        saved_events: ""
    });
    const [Page, setPage] = useState(2);
    const handleClose = () => {
        setShow(false);
        setFormData({
            banner: null,
            name: "",
            date: "",
            time: "",
            location: "",
            venue: "",
            description: "",
            saved_events: ""
        });
    }
    const [isLocked, setIsLocked] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        setActive(TitleData?.card_events?.is_active == "1" ? true : false);
        setIsLocked(TitleData?.card_events?.is_locked == "1" ? true : false);
    }, [TitleData]);

    useEffect(() => {
        setEventTitle(TitleData?.card_events?.visible_name);
    }, []);

    const handleChnageTitle = async () => {
        if (EventTitle == "") {
            showToast("Section title is required", 'error')
            return;
        }
        setShowLoader(true);
        const titles = [
            {
                name: "card_events",
                visible_name: EventTitle,
            },
        ];
        try {
            const response = await Api(CardData, { titles });
            setShowLoader(false);
            if (response.data.status) {
                setShowLoader(false);
                APIDATA();
                showToast(response.data.message, 'success')
                setEditFields(false);
            }
        } catch (error) {
            if (error.request?.status == "401") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            setShowLoader(false);
            showToast(error.response.data.message, 'error')
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

    const handleSave = async () => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (formData.banner && formData.banner?.size > MAX_FILE_SIZE) {
            return showToast("File size must be less than 5MB", "error");;
        }
        const requiredFields = [
            // { value: formData.banner, message: "Image is required." },
            { value: formData.name?.trim(), message: "Heading is required." },
            { value: formData.date, message: "Date is required." },
            { value: formData.description, message: "Description is required." },
            { value: formData.time, message: "Time is required." },
            {
                value: formData.location?.trim(),
                message: "Please enter a valid URL.",
                isValid: (value) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)
            },
        ];

        const missingField = requiredFields.find(
            (field) =>
                !field.value || (field.isValid && !field.isValid(field.value))
        );

        if (missingField) {
            showToast(missingField.message, "error");
            return;
        }

        try {
            const response = await Api(CardData, { events: [formData] });
            if (response?.data?.status) {
                showToast(response?.data?.message, "success");
                setPage(2);
                setFormData({
                    banner: null,
                    name: "",
                    date: "",
                    time: "",
                    location: "",
                    venue: "",
                    description: "",
                    saved_events: ""
                });
                handleClose();
                APIDATA();
            } else {
                showToast(response?.data?.message, "error");
            }
        } catch (err) {
            console.log(err?.response?.data?.message);
            
            showToast(err?.response?.data?.message, "error");
        }
    };

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
                    setPage(2);
                    APIDATA();
                }
            }
        });
    };

    const handleEditData = (items) => {
        if (!items) return;

        const parseEventTime = (dateStr) => {
            const date = new Date(dateStr);
            if (isNaN(date)) return "";

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        };

        const formattedDate = items?.date ? parseEventTime(items.date) : "";

        const cleanTime = items?.event_time
            ? items.event_time.replace(/(am|pm)/i, "").trim()
            : "";

        setShow(true);
        setFormData({
            // banner: items?.banner || null,
            name: items?.name || "",
            date: formattedDate,
            time: cleanTime,
            location: items?.location || "",
            venue: items?.venue || "",
            description: items?.description || "",
            saved_events: items?.id || null,
        });
    };

    const LoadMoreFunction = async () => {
        const response = await Api(
            LoadMoreApi,
            {},
            "?card_url=" + card_url + "&type=card_events" + "&current_page=" + Page + "&is_edit=true"
        );
        if (response.data.status) {
            setLoadMoreData(response?.data?.data?.next_page_data?.next_page_url);
            setAddEvents((prevData) => [
                ...prevData,
                ...response?.data?.data?.next_page_data?.data,
            ]);
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleShowSection = async () => {
        const newValue = !isLocked;
        setIsLocked(newValue);
        let titles = [
            {
                name: "card_events",
                visible_name: TitleData?.card_events?.visible_name,
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
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>
                        <h5 className="title title--h1 first-title title__separate mb-1 mb-0">
                            Add Upcoming Events
                        </h5>
                    </Modal.Title>
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close alert</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="modalFormLable">Upload Image (maximum size: 5MB)</label>
                        <input
                            type="file"
                            className="form-control mb-4 mt-1"
                            accept=".png, .jpg, .jpeg"
                            name="banner"
                            onChange={handleChange}
                        />

                        <label className="modalFormLable">Heading</label>
                        <input
                            type="text"
                            placeholder="Enter Your Event Heading"
                            className="form-control mb-4 mt-1"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <div className="d-flex align-items-center justify-content-between gap-4 mb-2">
                            <div className="w-100">
                                <label className="modalFormLable">Date</label>
                                <input
                                    type="date"
                                    className="form-control mb-2 mt-1"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-100">
                                <label className="modalFormLable">Time</label>
                                <input
                                    type="time"
                                    className="form-control mb-2 mt-1"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-between gap-4 mb-2'>
                            <div>
                                <label className="modalFormLable">Venue</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Event Venue"
                                    className="form-control mb-2 mt-1"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="modalFormLable">Google Link</label>
                                <input
                                    type="url"
                                    placeholder="Enter Your Event Location"
                                    className="form-control mb-2 mt-1"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <label className="modalFormLable">Description</label>
                        <textarea
                            placeholder="Enter Your Event Description"
                            className="form-control mb-2 mt-1"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                        <button className="send-btnn" onClick={handleSave}>
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
                        in_subscription={TitleData?.card_events?.in_subscription}
                        trial={TitleData?.card_events?.can_start_trial}
                        message={TitleData?.card_events?.message}
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
                            {TitleData?.card_events?.source == "2" &&
                                TitleData?.card_events?.in_subscription ? (
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
                                                        id="card_events"
                                                        onClick={handleUpgradePlan}
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                ) : (
                                                    <button className="addmore" onClick={handleShow}
                                                        id="card_events">
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
                                                            onChange={() => handleActive({ section_name: "card_events", Visible_name: EventTitle, Active, setActive })}
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
                                                    TitleData?.card_events?.visible_name
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

                    {AddEvents?.length == 0 ? "Events are empty, to add Events click on the add icon." : <>
                        <div className="row events-section">

                            {AddEvents && AddEvents?.map((items, index) => {
                                return (
                                    <div className="col-sm-6" key={index}>
                                        <div className="events-tags-div">
                                            <p>{items?.date}</p>
                                        </div>
                                        <img src={items?.banner?.path ? MainData?.card?.base_url + items?.banner?.path : "../static/img/picture-1.jpg"} alt="banner" />
                                        <div>
                                            <h3 class="title title--h4 mt-2 m-0">{items?.name}</h3>
                                            <span> {items?.event_time && items?.event_time + " |"} {items?.venue}</span>
                                        </div>
                                        <div>
                                            <p>{items?.description}</p>
                                            <div className='d-flex align-items-center gap-2 mt-4'>
                                                <button className="contact-btn w-auto m-0" onClick={() => handleEditData(items)}>Edit</button>
                                                <button
                                                    className="send-btnn m-0"
                                                    onClick={() => handleDraft({ card_url: card_url, status: items?.status == 0 ? 1 : items?.status == 2 ? 1 : "2", product_id: items.id, APIDATA, item_name: items?.name, card_section: "card_events" })}
                                                >
                                                    {items?.status == 0 || items?.status == 2 ? "Publish it" : items?.status == 1 ? "Unpublished" : ""}
                                                </button>
                                                <button className="delete-button w-auto m-0" onClick={() => handleDelete(items.id, 13, Data?.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {PaginationData?.total_card_events !== AddEvents?.length ? (
                            <div className="mx-auto text-center mt-4">
                                <a
                                    className="text-center cursor-pointer mx-auto"
                                    style={{
                                        textDecoration: "underline",
                                        fontSize: "16px",
                                        color: "var(--color)",
                                    }}
                                    onClick={LoadMoreFunction}
                                >
                                    Load More
                                </a>
                            </div>
                        ) : (
                            ""
                        )}
                    </>}
                    <div className="mt-4">
                        <label htmlFor="product-password">
                            <input
                                type="checkbox"
                                id="product-password"
                                checked={isLocked}
                                onChange={handleShowSection}
                            />{" "}
                            Private the section
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}
