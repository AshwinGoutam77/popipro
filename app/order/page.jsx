"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../styles/about.css";
import { CardSequence, EditData, GetCardSequence } from "@services/Routes";
import Api from "@services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faArrowUpWideShort,
  faNewspaper,
  faSort,
  faUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { AuthContext, useAuthContext } from "@context/AuthContext";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%",
  padding: "15px",
  borderRadius: "10px",
});

const Order = () => {
  const [items, setItems] = useState([]);
  const [Testimonial, setTestimonial] = useState([]);
  const [Services, setServices] = useState([]);
  const [Products, setProducts] = useState([]);
  const [UserData, setUserData] = useState("");

  const [OrderItems, setOrderItems] = useState("");

  const APIDATA = async () => {
    try {
      const response = await Api(
        EditData,
        {},
        "?card_url=" + localStorage.getItem("url")
      );
      if (response.data.status) {
        setItems(response.data.data.sequence);
        setTestimonial(response?.data?.data?.card?.card_testimonials);
        setServices(response?.data?.data?.card?.card_services);
        setProducts(response?.data?.data?.card?.card_products);
        setUserData(response?.data?.data);
        document.documentElement.style.setProperty("--color", "#24b1e6");
        document.documentElement.style.setProperty("--header-color", "#24b1e6");
        document.documentElement.style.setProperty("--themecolor", "#dfeef8");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        localStorage.removeItem("url");
        window.location.href = "/login";
      }
    }
  };

  const handleSq = async () => {
    const response = await Api(
      GetCardSequence,
      {},
      "?card_url=" + localStorage.getItem("url")
    );
    if (response.data.status) {
    }
  };

  useEffect(() => {
    APIDATA();
    handleSq();
  }, []);

  const onDragEnd = async (result) => {
    handleSq();
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    reorderedItems?.map((item, index) => ({
      control_name: item?.name,
      sequence: index,
    }));
    setItems(reorderedItems);

    let abc = reorderedItems?.map((item, index) => ({
      control_name: item?.name,
      sequence: index + 1,
    }));
    setOrderItems(abc);

    const response = await Api(CardSequence, { control: abc });
    if (response.data.status) {
      response;
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center flex-column justify-content-between h-100vh w-100 bg-white"
        style={{ height: "calc(100vh - 0px)" }}
      >
        <div
          className="login-header p-3 text-center d-flex align-items-center justify-content-between w-100"
          style={{ background: "black" }}
        >
          <h5 className="text-white m-0">
            <FontAwesomeIcon
              icon={faArrowUpWideShort}
              className="text-white mr-2"
              width="20"
            />{" "}
            Order
          </h5>
          <Link href="/dashboard">
            <h6 className="text-white m-0">
              {" "}
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-white mr-2"
                width="20"
              />
              Back
            </h6>
          </Link>
        </div>
        <div className="row w-100">
          <div className="col-sm-12 col-md-6 col-lg-6">
            {" "}
            <div className="w-100 flex-column">
              <h5 className="my-4 ml-1 color-black">
                Rearrange your profile sections through drag and drop.
              </h5>
              <DragDropContext onDragEnd={onDragEnd} className="droppable-div">
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {items.map((item, index) => (
                        <Draggable
                          key={item.name}
                          draggableId={item.name}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="card dragable-cards"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className="d-flex align-items-center justify-content-between color-black">
                                <spam>
                                  {index + 1}. {item.visible_name}
                                </spam>
                                <FontAwesomeIcon icon={faSort} />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="w-100 flex-column">
              <h5 className="my-4 ml-1 color-black">
                Rearrange inner sections through drag and drop.
              </h5>
              <div className="drag-drop-inner-section">
                <h6 className="mt-1 ml-2 mb-0 color-black">
                  {UserData?.titles?.card_testimonials?.visible_name} Section
                </h6>
                <DragDropContext
                  onDragEnd={onDragEnd}
                  className="droppable-div"
                >
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {Testimonial?.map((item, index) => (
                          <Draggable
                            key={item.name}
                            draggableId={item.name}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="card dragable-cards"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div className="d-flex align-items-center justify-content-between">
                                  <spam>
                                    {index + 1}. {item.name}
                                  </spam>
                                  <FontAwesomeIcon icon={faSort} />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>

            <div className="w-100 flex-column mt-4">
              <div className="drag-drop-inner-section">
                <h6 className="mt-1 ml-2 mb-0 color-black">
                  {UserData?.titles?.card_services?.visible_name} Section
                </h6>
                <DragDropContext
                  onDragEnd={onDragEnd}
                  className="droppable-div"
                >
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {Services?.map((item, index) => (
                          <Draggable
                            key={item.name}
                            draggableId={item.name}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="card dragable-cards"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div className="d-flex align-items-center justify-content-between">
                                  <spam>
                                    {index + 1}. {item.name}
                                  </spam>
                                  <FontAwesomeIcon icon={faSort} />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>

            <div className="w-100 flex-column mt-4">
              <div className="drag-drop-inner-section">
                <h6 className="mt-1 ml-2 mb-0 color-black">
                  {UserData?.titles?.card_products?.visible_name} Section
                </h6>
                <DragDropContext
                  onDragEnd={onDragEnd}
                  className="droppable-div"
                >
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {Products?.map((item, index) => (
                          <Draggable
                            key={item.name}
                            draggableId={item.name}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="card dragable-cards"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div className="d-flex align-items-center justify-content-between">
                                  <spam>
                                    {index + 1}. {item.name}
                                  </spam>
                                  <FontAwesomeIcon icon={faSort} />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-100 text-center text-white p-2 mt-3"
          style={{ bottom: "0", background: "black" }}
        >
          <p> © 2023. All Rights Reserved By Popipro.</p>
        </div>
      </div>
    </>
  );
};

export default Order;
