import { AuthContext } from "@context/AuthContext";
import {
  faMinusCircle,
  faPlusCircle,
  faRemove,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Modal } from "react-bootstrap";

export default function Cart({ active, handleClose, MainData }) {
  const { cartItems, addItemToCart } = useContext(AuthContext);

  var sum = null;
  cartItems.forEach(function (value, index, arry) {
    sum += Number(value.price);
  });

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
        {cartItems &&
          cartItems?.map((item, index) => {
            return (
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
                    <p className="cursor-pointer">
                      <FontAwesomeIcon icon={faTrash} className="" /> Remove
                    </p>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon
                        icon={faMinusCircle}
                        className="VarColor cursor-pointer"
                        width={20}
                        style={{ fontSize: "25px" }}
                      />{" "}
                      <p className="mx-2 font-weight-bold color-black">1</p>
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="VarColor cursor-pointer"
                        width={20}
                        style={{ fontSize: "25px" }}
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="d-flex align-items-baseline justify-content-between mt-3">
          <p className="font-weight-bold color-black">
            Total price: {MainData?.company_setting?.currency?.currency}
            {sum}
          </p>
          <button className="contact-btn w-auto">Checkout</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
