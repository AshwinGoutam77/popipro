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
    clearCart,
    incrementPrice,
    decrementPrice,
    incrementCount,
    decrementCount,
  } = useContext(AuthContext);

  const [Checkout, setCheckout] = useState(false);
  const [SuccessBtn, setSuccessBtn] = useState(false);
  const [Scanner, setScanner] = useState(false);

  const handleRemoveCartItem = (id) => {
    removeFromCart(id);
  };

  const handleIncrement = (id) => {
    incrementQuantity(id);
  };

  const handleDecrement = (id) => {
    decrementQuantity(id);
  };

  const handleform = (e) => {
    e.preventDefault();
    setSuccessBtn(true);
  };

  const handleHide = () => {
    handleClose();
    setSuccessBtn(false);
    setCheckout(false);
  };

  const handleClearCart = () => {
    clearCart();
    handleClose();
  };

  return (
    <Modal show={active} onHide={() => handleHide()} centered>
      <Modal.Header>
        <Modal.Title>
          <h5 className="title title--h1 first-title title__separate mb-0">
            Shopping Cart
          </h5>
        </Modal.Title>

        <button type="button" className="close" onClick={() => handleHide()}>
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
                      <div className="col-4">
                        <img
                          src={item?.image}
                          alt="cart"
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <div className="col-8">
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
                              {/* {incrementCount} */}
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

            <div className="align-items-baseline justify-content-between mt-3">
              <p className="font-weight-bold color-black d-flex justify-content-between w-100">
                <p>Sub-total</p>
                <p>
                  {MainData?.company_setting?.currency?.currency}
                  {totalPrice}
                </p>
              </p>
              <p className="font-weight-bold color-black d-flex justify-content-between w-100">
                <p>Shipping Charges </p>
                <p>
                  {MainData?.company_setting?.currency?.currency}
                  0.00
                </p>
              </p>
              <p className="font-weight-bold color-black d-flex justify-content-between w-100">
                <p>Tax and other charges </p>
                <p>
                  {MainData?.company_setting?.currency?.currency}
                  0.00
                </p>
              </p>

              <p className="font-weight-bold color-black d-flex justify-content-between w-100">
                <p>Total price </p>
                <p>
                  {MainData?.company_setting?.currency?.currency}
                  {totalPrice}
                </p>
              </p>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="contact-btn w-auto mt-2"
                onClick={() => setCheckout(true)}
              >
                Checkout
              </button>
              <button
                className="contact-btn w-auto mt-2 ml-2"
                onClick={() => handleClearCart()}
              >
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div>
            {!SuccessBtn ? (
              <>
                {" "}
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
                  <form onSubmit={(e) => handleform(e)}>
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: "10px" }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        required
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                    <input
                      type="email"
                      className="form-control mt-3"
                      placeholder="Email"
                      required
                    />
                    <textarea
                      className="form-control mt-3 mb-3"
                      placeholder="Enter Message"
                    ></textarea>

                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        className="mr-2"
                        name="options"
                        id="cod"
                        defaultChecked
                        onClick={() => setScanner(false)}
                      />
                      <label htmlFor="cod">Cash on delivery</label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        className="mr-2"
                        name="options"
                        id="scanner"
                        onClick={() => setScanner(true)}
                      />
                      <label htmlFor="scanner">Via Scanner</label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        className="mr-2"
                        name="options"
                        id="mode"
                        onClick={() => setScanner(false)}
                      />
                      <label htmlFor="mode">Other payment mode?</label>
                    </div>

                    {Scanner && (
                      <p className="mt-3 font-weight-bold">
                        *Note: You need to send a screenshot of the order to the
                        owner via WhatsApp for confirmation.
                      </p>
                    )}

                    <button className="contact-btn w-auto mt-3" type="submit">
                      Place your Order
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="text-center">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/2603240337156-2-success-png-image-thumb.png"
                  alt="image"
                />
                <h6 className="mt-3">
                  Thank you for your order. The owner will receive your order
                  and will be in touch with you shortly.
                </h6>
              </div>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
