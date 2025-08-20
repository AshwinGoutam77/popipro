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
import Api from "@services/Api";
import { OrderProduct } from "@services/Routes";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { showToast } from "./Toast";

export default function Cart({ active, handleClose, MainData, cartId, card_url, handleGetOrderProducts }) {
  const {
    cartItems,
    removeFromCart,
    decrementQuantity,
    incrementQuantity,
    clearCart,
    setCartItems,
  } = useContext(AuthContext);

  const [Checkout, setCheckout] = useState(false);
  const [SuccessBtn, setSuccessBtn] = useState(false);
  const [Scanner, setScanner] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [OrderData, setOrderData] = useState("");
  const [LoadingOrder, setLoadingOrder] = useState(false)

  const [formData, setFormData] = useState({
    user_name: "",
    phone_number: "",
    email_address: "",
    payment_method: "cod",
  });

  const handleRemoveCartItem = (id, event) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        event.preventDefault();
        removeFromCart(id);
      }
    });
  };

  const handleIncrement = (id, event) => {
    event.preventDefault();
    incrementQuantity(id);
  };

  const handleDecrement = (id, event) => {
    event.preventDefault();
    decrementQuantity(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleform = async (e) => {
    e.preventDefault();
    setLoadingOrder(true)

    const products_detail = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const dataToSend = {
      ...formData,
      card_url: card_url,
      products_detail: products_detail,
      customer_id: localStorage?.getItem('customer_id') ? localStorage?.getItem('customer_id') : null
    };

    try {
      const response = await Api(OrderProduct, dataToSend);
      if (response.data.status) {
        showToast(response.data.message, "success");
        setSuccessBtn(true);
        setLoadingOrder(false)
        setOrderData(response?.data?.data)
        localStorage.setItem('customer_id', response?.data?.data?.customer_id)
        handleGetOrderProducts()
        setFormData({
          user_name: "",
          phone_number: "",
          email_address: "",
        })
        // clearCart();
        setCartItems([]);
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "success");
    }
  };

  const handleHide = () => {
    handleClose();
    setSuccessBtn(false);
    setCheckout(false);
  };

  const userCartItems = cartItems.filter((item) => item.card_id === cartId);

  const calculateTotalPrice = () => {
    const total = userCartItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotalPrice(total);
    localStorage.setItem('total-price', total)
  };

  useEffect(() => {
    calculateTotalPrice();
    if (userCartItems.length == 0 && !SuccessBtn) {
      handleHide();
    }
  }, [cartItems]);


  return (
    <Modal show={active} onHide={() => handleHide()} centered>
      <Modal.Header>
        <Modal.Title>
          <h5 className="title title--h1 first-title title__separate mb-0">
            <img
              src="../static/img/cart.png"
              alt="image"
              width={18}
              className="cursor-pointer mr-2"
              style={{ marginTop: "-5px" }}
            />
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
            <div className="cart-product-div">
              {cartItems &&
                cartItems?.map((item, index) => {
                  return (
                    item?.card_id === MainData?.card?.id && (
                      <div className="row cart-section" key={index}>
                        <div className="col-4">
                          <img
                            src={item?.image}
                            alt="cart"
                            onError={(e) => (e.target.src = "./static/img/picture-1.jpg")}
                            style={{ borderRadius: "10px" }}
                          />

                        </div>
                        <div className="col-8">
                          <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between">
                            <h6 className="mb-0 color-black">{item?.name}</h6>
                            <p className="font-weight-bold color-black">
                              {item?.currency} {item?.price * item?.quantity}
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-2">
                            <p
                              className="cursor-pointer"
                              onClick={(e) => handleRemoveCartItem(item?.id, e)}
                            >
                              <FontAwesomeIcon icon={faTrash} className="" />{" "}
                              Remove
                            </p>
                            <div className="d-flex align-items-center">
                              <FontAwesomeIcon
                                icon={faMinusCircle}
                                className={
                                  item?.quantity !== 1
                                    ? "VarColor cursor-pointer"
                                    : ""
                                }
                                width={20}
                                style={{ fontSize: "25px" }}
                                onClick={(e) => handleDecrement(item?.id, e)}
                              />
                              <p className="mx-2 font-weight-bold color-black">
                                {item?.quantity}
                              </p>
                              <FontAwesomeIcon
                                icon={faPlusCircle}
                                className="VarColor cursor-pointer"
                                width={20}
                                style={{ fontSize: "25px" }}
                                onClick={(e) => handleIncrement(item?.id, e)}
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
            </div>

            <div className="align-items-baseline justify-content-between mt-3">
              <div className="font-weight-bold color-black d-flex justify-content-between w-100">
                <p>Sub-total</p>
                <p>
                  {MainData?.company_setting?.currency?.currency}{" "}
                  {totalPrice}
                </p>
              </div>
              <div className="font-weight-bold color-black d-flex justify-content-between w-100">
                <p>Shipping Charges </p>
                <p>
                  {MainData?.company_setting?.currency?.currency}{" "}
                  0.00
                </p>
              </div>
              <div className="font-weight-bold color-black d-flex justify-content-between w-100">
                <p>Tax and other charges </p>
                <p>
                  {MainData?.company_setting?.currency?.currency}{" "}
                  0.00
                </p>
              </div>

              <div className="font-weight-bold color-black d-flex justify-content-between w-100">
                <p>Total price </p>
                <p>
                  {MainData?.company_setting?.currency?.currency}{" "}
                  {totalPrice}
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="contact-btn w-auto mt-2"
                onClick={() => setCheckout(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div>
            {!SuccessBtn ? (
              <>
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

                {/* card form */}
                <div className="mt-4">
                  <form onSubmit={(e) => handleform(e)}>
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: "10px" }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name*"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone Number*"
                        name="phone_number"
                        defaultValue={formData.phone_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <input
                      type="email"
                      className="form-control mt-3"
                      placeholder="Email*"
                      name="email_address"
                      defaultValue={formData.email_address}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      className="form-control mt-3 mb-3"
                      placeholder="Enter Message"
                    ></textarea>

                    {LoadingOrder ? <button disabled className="contact-btn w-auto mt-3">
                      Loading...
                    </button> : <button className="contact-btn w-auto mt-3" type="submit">
                      Place your Order
                    </button>}
                  </form>
                </div>
              </>
            ) : (
              <div className="text-center">
                <img
                  src="../../../static/img/sucess-icon.png"
                  alt="image"
                  width='90px'
                />
                <p className="my-3 font-weight-bold">
                  Your order details have been recorded for processing. To complete your order, please make the payment using the "Pay Now" button and share the payment screenshot via WhatsApp to <a href={"https://api.whatsapp.com/send?phone=" + MainData?.card?.whatsapp_number} target="_blank" className="primary-color">{MainData?.card?.whatsapp_number}</a>  or email it to <a href={"mailto:" + MainData?.card?.card_email} className="primary-color">{MainData?.card?.card_email}</a> </p>

                <p className="font-weight-bold">Your Order ID :{OrderData?.order_id} </p>
                <p className="font-weight-bold">Your Customer ID :{OrderData?.customer_id} </p>
                <h6 className="mt-3">Total Amount: {MainData?.company_setting?.currency?.currency}{OrderData?.total_price}</h6>
                {MainData?.company_setting?.payment_link !== null && <div className="">
                  <button className="contact-btn w-auto">
                    <Link href={MainData?.company_setting?.payment_link ? MainData?.company_setting?.payment_link : ""} target="_blank">Pay Now</Link>
                  </button>
                </div>}

                {MainData?.company_setting?.payment_qr.length !== 0 && <div className="mt-2">
                  <p className="mb-2">Or</p>
                  <img src={"https://dev.popipro.com/" + MainData?.company_setting?.payment_qr.path}
                    alt="qr-image" width={'160px'} />
                </div>}
              </div>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
