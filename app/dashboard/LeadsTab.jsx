import DashboardPlan from '@components/Dashboard/DashboardPlan'
import { faBagShopping, faBuildingUser, faCalendarCheck, faCartShopping, faCircleCheck, faSignal } from '@node_modules/@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome'
import Link from '@node_modules/next/link'
import React from 'react'

export default function LeadsTabData({ setModalShow, TitleData, Data, PlanData, MainData, handleFreeTrail, in_Plan, APIDATA }) {
    return (
        <>
            {/* Lead insights */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.analytics?.in_subscription
                            ? "/shared-contact-leads"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.analytics?.can_start_trial) {
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
                                in_subscription={MainData?.non_section_feature?.analytics?.in_subscription}
                                can_start_trial={MainData?.non_section_feature?.analytics?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <>
                            <FontAwesomeIcon
                                icon={faSignal}
                                className="text-white mb-2"
                                style={{ fontSize: "20px" }}
                            />
                            <h6 className="text-white text-center mb-0">
                                {" "}
                                Shared Contact Leads
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* Product enquiry */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.titles?.card_products?.in_subscription
                            ? "/product-enquiry"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.titles?.card_products?.can_start_trial) {
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
                                in_subscription={MainData?.titles?.card_products?.in_subscription}
                                can_start_trial={MainData?.titles?.card_products?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className="text-white mb-2"
                                style={{ fontSize: "20px" }}
                            />
                            <h6 className="text-white text-center mb-0">
                                {" "}
                                Product Enquiry
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* order products leads */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.titles?.card_products?.in_subscription
                            ? "/product-records"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.titles?.card_products?.can_start_trial) {
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
                                in_subscription={MainData?.titles?.card_products?.in_subscription}
                                can_start_trial={MainData?.titles?.card_products?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <>
                            <FontAwesomeIcon
                                icon={faBagShopping}
                                className="text-white mb-2"
                                style={{ fontSize: "20px" }}
                            />
                            <h6 className="text-white text-center mb-0">
                                Order Leads
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* real estate enquiry */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.titles?.card_realestates?.in_subscription
                            ? "/real-estate-enquiry"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.titles?.card_realestates?.can_start_trial) {
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
                                in_subscription={MainData?.titles?.card_realestates?.in_subscription}
                                can_start_trial={MainData?.titles?.card_realestates?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <>
                            <FontAwesomeIcon
                                icon={faBuildingUser}
                                className="text-white mb-2"
                                style={{ fontSize: "20px" }}
                            />
                            <h6 className="text-white text-center mb-0">
                                {" "}
                                {TitleData?.card_realestates?.visible_name} Enquiry
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* My appointment */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.titles?.card_booking?.in_subscription
                            ? "/appointment"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.titles?.card_booking?.can_start_trial) {
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
                                in_subscription={MainData?.titles?.card_booking?.in_subscription}
                                can_start_trial={MainData?.titles?.card_booking?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <>
                            <FontAwesomeIcon
                                icon={faCalendarCheck}
                                className="text-white mb-2"
                                style={{ fontSize: "20px" }}
                            />
                            <h6 className="text-white text-center mb-0">
                                Appointments
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* Custom form */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.analytics?.in_subscription
                            ? "/custom-form"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.analytics?.can_start_trial) {
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
                                in_subscription={MainData?.non_section_feature?.analytics?.in_subscription}
                                can_start_trial={MainData?.non_section_feature?.analytics?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <>
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className="text-white mb-2"
                                style={{ fontSize: "20px" }}
                            />
                            <h6 className="text-white text-center mb-0">
                                Custom Form
                            </h6>
                        </>
                    </span>
                </Link>
            </div>
        </>
    )
}
