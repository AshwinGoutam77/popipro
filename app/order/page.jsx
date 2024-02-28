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
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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
  width: 250,
});

const Order = () => {
  const [items, setItems] = useState([]);
  const [OrderItems, setOrderItems] = useState("");
  const APIDATA = async () => {
    try {
      const response = await Api(
        EditData,
        {},
        "?card_url=" + localStorage.getItem("url")
      );
      if (response.data.status) {
        ".....", response.data.data.headers;
        setItems(response.data.data.headers);
        document.documentElement.style.setProperty(
          "--color",
          response.data.data.card.color_code
        );
        document.documentElement.style.setProperty(
          "--themecolor",
          response.data.data.card.background_color
        );
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--color");
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
      response.data.data;
    }
  };

  const handleSequence = async () => {
    let abc = items?.map((item, index) => ({
      control_name: item?.attribute,
      sequence: index + 1,
    }));
    setOrderItems(abc);
    const response = await Api(CardSequence, { control: abc });
    if (response.data.status) {
      response;
    }
  };

  useEffect(() => {
    APIDATA();
  }, []);

  useEffect(() => {
    handleSequence();
  }, [items]);

  const onDragEnd = (result) => {
    handleSq();
    if (!result.destination) return; // Dragged outside the droppable area

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    console.log(reorderedItems);
    reorderedItems?.map(
      (item, index) => (
        console.log(item),
        {
          control_name: item?.attribute,
          sequence: index,
        }
      )
    );
    setItems(reorderedItems);
  };

  return (
    <>
      {/* <button className="contact-btn w-auto mt-5 ml-5">Save Order</button> */}
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
        <div className="main_content w-100">
          <DragDropContext onDragEnd={onDragEnd} className="w-100">
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.attribute}
                      draggableId={item.attribute}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.menu_name}
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
