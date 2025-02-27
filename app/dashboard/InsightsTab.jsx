import DashboardPlan from '@components/Dashboard/DashboardPlan'
import { faBagShopping, faHomeAlt, faNewspaper } from '@node_modules/@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome'
import Link from '@node_modules/next/link'
import React from 'react'

export default function InsightsTabData({ setModalShow, Data, PlanData, MainData, handleFreeTrail, in_Plan, APIDATA }) {
    return (
        <>
            {/* Overall insights */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.analytics?.in_subscription
                            ? "/overall-analytics"
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
                            <img
                                src="../static/img/analytics.svg"
                                alt="image"
                                width={20}
                                className="text-white mb-2"
                            />
                            <h6 className="text-white text-center mb-0">
                                Overall Analytics
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* Product analytics */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.titles?.card_products?.in_subscription
                            ? "/product"
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
                                {/* {TitleData?.card_products?.visible_name} */}
                                Products
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* Blogs analytics */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.titles?.card_blogs?.in_subscription
                            ? "/blog"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.titles?.card_blogs?.can_start_trial) {
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
                                in_subscription={MainData?.titles?.card_blogs?.in_subscription}
                                can_start_trial={MainData?.titles?.card_blogs?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <>
                            <FontAwesomeIcon
                                icon={faNewspaper}
                                className="text-white mb-2"
                                style={{ fontSize: "20px" }}
                            />
                            <h6 className="text-white text-center mb-0">
                                {" "}
                                {/* {TitleData?.card_blogs?.visible_name} */}
                                Blogs
                            </h6>
                        </>
                    </span>
                </Link>
            </div>

            {/* Real Estate */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.titles?.card_realestates?.in_subscription
                            ? "/real-estate"
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
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
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
                        <FontAwesomeIcon
                            icon={faHomeAlt}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Real Estate
                        </h6>
                    </div>
                </Link>
            </div>
        </>
    )
}
