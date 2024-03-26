/* eslint-disable @next/next/no-img-element */
import { AuthContext } from "@context/AuthContext";
import {
  faChevronLeft,
  faMinusCircle,
  faPlusCircle,
  faRemove,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";

export default function Cart({
  active,
  handleClose,
  MainData,
  product,
  card_url,
}) {
  const {
    cartItems,
    removeFromCart,
    decrementQuantity,
    incrementQuantity,
    increaseCount,
    totalPrice,
  } = useContext(AuthContext);

  const [Checkout, setCheckout] = useState(false);

  const handleRemoveCartItem = (id) => {
    removeFromCart(id);
  };

  const handleIncrement = (id) => {
    incrementQuantity(id);
  };

  const handleDecrement = (id) => {
    decrementQuantity(id);
  };

  return (
    <Modal show={active} onHide={() => handleClose("")} centered>
      <Modal.Header>
        <Modal.Title>
          <h5 className="title title--h1 first-title title__separate mb-0">
            Shopping Cart
          </h5>
        </Modal.Title>

        <button type="button" className="close" onClick={() => handleClose("")}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close alert</span>
        </button>
      </Modal.Header>

      <Modal.Body className="cart-modal">
        {!Checkout ? (
          <div>
            {cartItems &&
              cartItems?.map((item, index) => {
                return (
                  item?.card_id === MainData?.card?.id && (
                    <div className="row cart-section" key={index}>
                      <div className="col-sm-12 col-lg-4">
                        <img
                          src={item?.image}
                          alt="cart"
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <div className="col-sm-12 col-lg-8">
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="mb-0 color-black">{item?.name}</h6>
                          <p className="font-weight-bold color-black">
                            {item?.currency} {item?.price}
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <p
                            className="cursor-pointer"
                            onClick={() => handleRemoveCartItem(item?.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} className="" />{" "}
                            Remove
                          </p>
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                              icon={faMinusCircle}
                              className="VarColor cursor-pointer"
                              width={20}
                              style={{ fontSize: "25px" }}
                              onClick={() => handleDecrement(item?.id)}
                            />{" "}
                            <p className="mx-2 font-weight-bold color-black">
                              {}
                            </p>
                            <FontAwesomeIcon
                              icon={faPlusCircle}
                              className="VarColor cursor-pointer"
                              width={20}
                              style={{ fontSize: "25px" }}
                              onClick={() => handleIncrement(item?.id)}
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            <div className="d-flex align-items-baseline justify-content-between mt-3">
              <p className="font-weight-bold color-black">
                Total price: {MainData?.company_setting?.currency?.currency}
                {totalPrice}
              </p>
              <button
                className="contact-btn w-auto"
                onClick={() => setCheckout(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <p
                onClick={() => setCheckout(false)}
                className="font-weight-bold cursor-pointer color-black"
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Back to cart
              </p>
              <p className="font-weight-bold color-black">
                Total price: {MainData?.company_setting?.currency?.currency}
                {totalPrice}
              </p>
            </div>
            <div className="mt-4">
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone Number"
                />
              </div>
              <input type="text" className="form-control mt-3" placeholder="Email" />
              <textarea className="form-control mt-3" placeholder="Enter Message"></textarea>
              <button className="contact-btn w-auto mt-3">Place Order</button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
