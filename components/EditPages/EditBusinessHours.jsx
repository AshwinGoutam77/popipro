'use client';

import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { faCheckCircle, faFloppyDisk, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Api from '@services/Api';
import { showToast } from '@components/Dashboard/Toast';
import { CardData } from '@services/Routes';
import EditPlan from './EditPlan';
import EditDropdown from './Dropdown';
import { handleActive } from './EditFunctions';
import Swal from 'sweetalert2';

export default function EditBusinessHoursConfig({ APIDATA, Data, PlanData, MainData, TitleData }) {
    const allDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
    const [EditFields, setEditFields] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [currentDay, setCurrentDay] = useState('');
    const [startHours, setStartHours] = useState('');
    const [endHours, setEndHours] = useState('');
    const [isClosed, setIsClosed] = useState(false);
    const [selectedDayKey, setSelectedDayKey] = useState('');
    const [HoursTitle, setHoursTitle] = useState("");
    const [Active, setActive] = useState("");
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
    const handleShow = () => setShow(true);
    const [ShowLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setActive(TitleData?.card_timings?.is_active == "1" ? true : false);
    }, [TitleData]);

    useEffect(() => {
        setHoursTitle(TitleData?.card_timings?.visible_name);
    }, []);

    const getFullDayName = (shortDay) => {
        const map = {
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
            sun: 'Sunday',
        };
        return map[shortDay] || shortDay;
    };

    const formatTo12Hour = (time) => {
        if (!time) return '';
        const [hour, minute] = time.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };

    const timingMap = {};
    Data?.card_timings?.forEach(item => {
        const fullDay = getFullDayName(item.day);
        timingMap[fullDay] = item;
    });

    const openModal = (dayName) => {
        const selected = Object.entries(timingMap).find(
            ([fullDay]) => fullDay === dayName
        );

        const timing = selected?.[1];

        setSelectedDayKey(dayName.toLowerCase().slice(0, 3));
        setCurrentDay(dayName);
        setStartHours(timing?.start_time || '');
        setEndHours(timing?.end_time || '');
        setIsClosed(!timing || (!timing.start_time && !timing.end_time));
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        setStartHours('');
        setEndHours('');
        setIsClosed(false);
        setSelectedDayKey('');
        setCurrentDay('');
    };

    const handleSave = async () => {
        const payload = {
            day: selectedDayKey,
            start_time: isClosed ? null : startHours,
            end_time: isClosed ? null : endHours,
            closed: isClosed ? '1' : '0'
        };

        try {
            const response = await Api(CardData, { timings: [payload] });
            if (response.data.status) {
                APIDATA();
                showToast(response.data.message, 'success');
                closeModal();
            }
        } catch (error) {
            if (error.request?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            showToast(error.response?.data?.message || 'An error occurred', 'error');
        }
    };

    const handleChnageTitle = async () => {
        if (HoursTitle == "") {
            showToast("Section title is required", 'error')
            return;
        }
        setShowLoader(true);
        const titles = [
            {
                name: "card_timings",
                visible_name: HoursTitle,
            },
        ];
        try {
            const response = await Api(CardData, { titles });
            if (response.data.status) {
                setShowLoader(false);
                APIDATA();
                showToast(response.data.message, 'success');
                setEditFields(false);
            }
        } catch (error) {
            if (error.request?.status == "401") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            setShowLoader(false);
            showToast(error.response.data.message, 'error');
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

    return (
        <div className="position-relative">
            {Data ? (
                <EditPlan
                    Data={Data}
                    PlanData={PlanData}
                    APIDATA={APIDATA}
                    MainData={MainData}
                    in_subscription={TitleData?.card_timings?.in_subscription}
                    trial={TitleData?.card_timings?.can_start_trial}
                    message={TitleData?.card_timings?.message}
                />
            ) : (
                ""
            )}
            <div className="box-content boxxx" id="card_blogs">
                <div className="flex-header">
                    <div className="d-flex align-items-baseline">
                        {EditFields ? (
                            <input
                                type="text"
                                name="AboutMe"
                                className="title-section-input mb-3"
                                placeholder="Custom Numbers"
                                onChange={(e) => setHoursTitle(e.target.value)}
                                defaultValue={HoursTitle || ""}
                            />
                        ) : (
                            <>
                                <h1 className="title title--h1 first-title title__separate">
                                    {HoursTitle ? HoursTitle : "Important Document"}
                                </h1>
                            </>
                        )}
                    </div>
                    <div>
                        {TitleData?.card_timings?.source == "2" &&
                            TitleData?.card_timings?.in_subscription ? (
                            <>
                                <div className="web-edit-icons">
                                    <div className="d-flex align-items-center">
                                        <div class="wrapper">
                                            <div class="tooltip">
                                                Please add your opening hours here.
                                            </div>
                                            <img
                                                src="../static/img/info.svg"
                                                alt="image"
                                                width={18}
                                                className="mr-2 cursor-pointer"
                                                onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                                            />
                                        </div>
                                        <div className="edit-pencile-div mr-4 pr-1">
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
                                            <label className="switch">
                                                <input
                                                    data-status={
                                                        TitleData.card_timings?.is_active
                                                    }
                                                    data-active={Active}
                                                    checked={Active}
                                                    type="checkbox"
                                                    onChange={() => handleActive({ section_name: "card_timings", Visible_name: HoursTitle, Active, setActive })}
                                                />
                                                <span className="slider round"></span>
                                            </label>
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
                                                TitleData?.card_timings?.visible_name
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


                <div className="mb-4">
                    <table className="table table-bordered">
                        <thead className="var-bg">
                            <tr>
                                <th>Day of the Week</th>
                                <th>Opening Hours</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allDays.map((day, index) => {
                                const timing = timingMap[day];
                                const start = timing?.start_time;
                                const end = timing?.end_time;
                                return (
                                    <tr key={index}>
                                        <td>{day}</td>
                                        <td>
                                            {start && end
                                                ? `${formatTo12Hour(start)} - ${formatTo12Hour(end)}`
                                                : 'Closed'}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="bg-transparent border-0"
                                                onClick={() => openModal(day)}
                                            >
                                                <FontAwesomeIcon icon={faPencil} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <Modal show={modalShow} onHide={closeModal} centered>
                    <Modal.Header>
                        <Modal.Title>
                            <h5 className="title title--h1 first-title title__separate mb-1 mb-0">
                                {currentDay}
                            </h5>
                        </Modal.Title>
                        <button type="button" className="close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close alert</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex align-items-center justify-content-between gap-10 mb-4">
                            <div className="w-100">
                                <label className="form-label">Start Time</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={startHours}
                                    onChange={(e) => setStartHours(e.target.value)}
                                    disabled={isClosed}
                                />
                            </div>
                            <div className="w-100">
                                <label className="form-label">End Time</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={endHours}
                                    onChange={(e) => setEndHours(e.target.value)}
                                    disabled={isClosed}
                                />
                            </div>
                        </div>

                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="closedToggle"
                                checked={isClosed}
                                onChange={() => setIsClosed(!isClosed)}
                            />
                            <label className="form-check-label mb-0" htmlFor="closedToggle">
                                Mark as Closed
                            </label>
                        </div>

                        <div className="text-end">
                            <button className="delete-button mr-2" onClick={handleSave}>
                                Save
                            </button>
                            <button className="send-btnn" onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}
