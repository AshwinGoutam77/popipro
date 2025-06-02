import DashboardPlan from '@components/Dashboard/DashboardPlan';
import { faGear, faLightbulb, faMoneyBill1Wave, faPalette, faSliders, faStar, faUpDownLeftRight, faUserEdit } from '@node_modules/@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome';
import Link from '@node_modules/next/link';
import React from 'react'

export default function ProfileTabData({ setModalShow, Data, PlanData, MainData, handleFreeTrail, in_Plan, APIDATA }) {
    return (
        <>
            {/* Edit Profile */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={"/edit/" + localStorage.getItem("url")}
                    className="w-100  text-decoration-none"
                >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        <FontAwesomeIcon
                            icon={faUserEdit}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Edit Profile
                        </h6>
                    </span>
                </Link>
            </div>

            {/* Edit theme */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.edit_theme?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        } else if (MainData?.non_section_feature?.edit_theme?.in_subscription) {
                            e.preventDefault();
                            setModalShow("theme");
                        }
                    }}
                >
                    {Data ? (
                        <DashboardPlan
                            Data={Data}
                            PlanData={PlanData}
                            APIDATA={APIDATA}
                            MainData={MainData}
                            in_subscription={MainData?.non_section_feature?.edit_theme?.in_subscription}
                            can_start_trial={MainData?.non_section_feature?.edit_theme?.can_start_trial}
                            handleFreeTrail={handleFreeTrail}
                        />
                    ) : (
                        ""
                    )}
                    <>
                        <FontAwesomeIcon
                            icon={faPalette}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Edit Theme
                        </h6>
                    </>
                </div>
            </div>

            {/* Multiple Mode */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.landingmode?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        } else if (MainData?.non_section_feature?.landingmode?.in_subscription) {
                            e.preventDefault();
                            setModalShow("MultimodesModal")
                        }
                    }}
                >
                    {Data ? (
                        <DashboardPlan
                            Data={Data}
                            PlanData={PlanData}
                            APIDATA={APIDATA}
                            MainData={MainData}
                            in_subscription={MainData?.non_section_feature?.landingmode?.in_subscription}
                            can_start_trial={MainData?.non_section_feature?.landingmode?.can_start_trial}
                            handleFreeTrail={handleFreeTrail}
                        />
                    ) : (
                        ""
                    )}
                    <>
                        <FontAwesomeIcon
                            icon={faSliders}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Multiple Mode
                        </h6>
                    </>
                </div>
            </div>

            {/* Notification */}
            {/* <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.notification?.in_subscription
                            ? "/Notification"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.notification?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        }
                    }}
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
                                in_subscription={MainData?.non_section_feature?.notification?.in_subscription}
                                can_start_trial={MainData?.non_section_feature?.notification?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <img
                            src="../static/img/notification.svg"
                            alt="image"
                            width={20}
                            style={{ transform: "rotate(-45deg)" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Notification
                        </h6>
                    </div>
                </Link>
            </div> */}

            {/* Approve review */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.titles?.card_testimonials?.in_subscription
                            ? "/approve-review"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.titles?.card_testimonials?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        }
                    }}
                    className="w-100  text-decoration-none"
                >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
                                in_subscription={MainData?.titles?.card_testimonials?.in_subscription}
                                can_start_trial={MainData?.titles?.card_testimonials?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <>
                            <FontAwesomeIcon
                                icon={faStar}
                                className="text-white mb-2"
                                style={{ fontSize: "20px" }}
                            />
                            <h6 className="text-white text-center mb-0">
                                Approve Review
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* Subscription */}
            {/* <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        in_Plan
                            ? "https://www.popipro.com/order"
                            : "/subscription"
                    }
                    className="w-100  text-decoration-none"
                >
                    <span className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <FontAwesomeIcon
                            icon={faMoneyBill1Wave}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Subscription
                        </h6>
                    </span>
                </Link>
            </div> */}

            {/* Order */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.sequence?.in_subscription
                            ? "/order"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.sequence?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        }
                    }}
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
                                in_subscription={MainData?.non_section_feature?.sequence?.in_subscription}
                                can_start_trial={MainData?.non_section_feature?.sequence?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <FontAwesomeIcon
                            icon={faUpDownLeftRight}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Manage Sequence
                        </h6>
                    </div>
                </Link>
            </div>

            {/* Chnage password */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    onClick={() => setModalShow("password")}
                >
                    <FontAwesomeIcon
                        icon={faGear}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">Password</h6>
                </div>
            </div>

            {/* Suggestions */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    onClick={() => {
                        ("abc");
                        setModalShow("suggestion");
                    }}
                >
                    <FontAwesomeIcon
                        icon={faLightbulb}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">Suggestions</h6>
                </div>
            </div>
        </>
    )
}
