import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ShoppingHeader from "./ShoppingHeader";
import { updateUser } from "../../features/login/LoginSlice";
import { FaCopy, FaEdit } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import OrderSuccessModel from "./OrderSuccessModel";
import { setOrderSource, clearCart, clearOrderItems } from "../../features/shopping/cartSlice";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../features/shopping/orderSlice";
const coupons = [
  {
    code: "30 OFF",
    description: "30% off orders over $50",
    discount: 30,
    minSubtotal: 50,
  },
  {
    code: "20 OFF",
    description: "20% off orders over $30",
    discount: 20,
    minSubtotal: 30,
  },
  {
    code: "WELCOME10",
    description: "10% off any order",
    discount: 10,
    minSubtotal: 0,
  },
];

const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const selectedItems = useSelector((state) => state.cart?.selectedItems || []);
  const buyNowItem = useSelector((state) => state.cart.buyNowItem);
  const { cart, isBuyNowMode } = useSelector((state) => state.cart);
  const orderSource = useSelector((state) => state.cart.orderSource);
  const [payerName, setPayerName] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const user = useSelector((state) => state.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [showPayPal, setShowPayPal] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const itemsToShow = isBuyNowMode ? selectedItems : cart;

  const subtotal = itemsToShow.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const discount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;

  const total = subtotal - discount;
  const handleApplyCoupon = () => {
    const coupon = coupons.find((c) => c.code === couponInput.trim());
    if (coupon) {
      if (subtotal >= (coupon.minSubtotal || 0)) {
        setAppliedCoupon(coupon);
        setCouponDiscount(subtotal * (coupon.discount / 100));
        setCouponError("");
        setCouponInput("");
      } else {
        setCouponError(
          `Minimum order $${coupon.minSubtotal} required for this coupon.`
        );
      }
    } else {
      setCouponError("Invalid Coupon Code.");
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCouponInput(code);
  };

  const handleUpdate = () => {
    dispatch(updateUser(formData));
    setEditMode(false);
  };
  
  // const handlePlaceOrder = () => {
  //   const source = isBuyNowMode ? "buyNow" : "cart";
  //   dispatch(setOrderSource(source));
  //   setShowModal(true);
  // };
  

  const handlePlaceOrder = (paypalDetails = null) => {
    // Calculate order amounts
    const orderSubtotal = itemsToShow.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    const orderDiscount = appliedCoupon ? (orderSubtotal * appliedCoupon.discount) / 100 : 0;
    const orderTax = orderSubtotal * 0.05;
    const orderShipping = 5.00;
    const orderTotal = orderSubtotal + orderTax + orderShipping - orderDiscount;

    // Create order object
    const newOrder = {
      id: `order-${Date.now()}`,
      date: new Date().toISOString(),
      items: itemsToShow.map(item => ({
        id: item.id,
        name: item.name || item.title,
        image: item.image || item.thumbnail,
        price: item.price,
        quantity: item.quantity || 1
      })),
      subtotal: orderSubtotal.toFixed(2),
      tax: orderTax.toFixed(2),
      shipping: orderShipping.toFixed(2),
      discount: orderDiscount.toFixed(2),
      total: orderTotal.toFixed(2),
      paymentMode: paymentMethod,
      status: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      source: isBuyNowMode ? 'buyNow' : 'cart',
      user: {
        name: user?.name,
        email: user?.email,
        address: `${user?.city}, ${user?.state}, ${user?.country}`
      },
      transactionId: paypalDetails?.id || null  // Use the PayPal transaction ID if available
    };

    // Save order and cleanup
    dispatch(addOrder(newOrder));
    
    if (!isBuyNowMode) {
      dispatch(clearCart());
    }
    
    dispatch(clearOrderItems());
    
    // For PayPal, set payer info
    if (paypalDetails) {
      setPayerName(paypalDetails.payer.name.given_name);
      setTransactionId(paypalDetails.id);
    }
    
    setShowModal(true);
  };

  const handleModalClose = () => {
    if (orderSource === "cart") {
      dispatch(clearCart());
    }
    dispatch(setOrderSource(null));
    setShowModal(false);
    navigate("/dashboard/e-shopping-cart");
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  const paypalRef = useRef(null);

  return (
    <div className="bg-[#f0f4fc] min-h-screen">
      <div className="fixed z-50 w-full top-0 left-0">
        <ShoppingHeader />
      </div>

      <div className="md:ml-[20%] ml-0 pt-24 px-4 grid grid-cols-1 mt-16 md:mt-0 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-white shadow rounded p-4 overflow-y-auto max-h-[60vh]">
            <h2 className="text-xl font-semibold mb-4">
              Review item and Shipping
            </h2>

            {selectedItems.length == 0 ? (
              <p className="text-gray-600">No items to place an order.</p>
            ) : (
              <div className="space-y-6 ">
                <div className="flex flex-col  justify-center ">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row justify-between items-center m-3  pb-2"
                    >
                      <div className="flex flex-col md:flex-row gap-4 items-center">
                        <img
                          src={item.image || item.thumbnail}
                          alt={item.title}
                          className="w-22 h-22 object-contain border border-gray-200 shadow-md rounded-md p-1"
                        />
                        <h3 className="font-medium text-lg ">{item.title}</h3>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity || 1}{" "}
                        </p>
                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Delivery Info */}
          <div className="bg-white shadow rounded p-4 relative ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Delivery Information</h2>

              <button onClick={() => setEditMode(!editMode)}>
                <div className="text-gray-600 hover:text-black">
                  {editMode ? (
                    <button
                      className="bg-gray-200 font-light text-sm px-4 py-1 rounded-full"
                      onClick={handleUpdate}
                    >
                      Save Information
                    </button>
                  ) : (
                    <FaEdit />
                  )}
                </div>
              </button>
            </div>
            {editMode ? (
              <div className="space-y-4 ">
                {[
                  "name",
                  "email",
                  "phoneNo",
                  "zipCode",
                  "city",
                  "state",
                  "country",
                ].map((field) => (
                  <div key={field} className="relative">
                    <label
                      htmlFor={field}
                      className="absolute left-1 -top-3 text-sm text-gray-500"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={field}
                      type="text"
                      value={formData[field] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="border border-gray-300 px-3 py-2 w-full rounded mt-2"
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                    />
                  </div>
                ))}
                {/* <div className="flex items-end ">
                  <button
                    className="bg-gray-400 text-white px-4 py-1 rounded-full"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div> */}
              </div>
            ) : (
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user?.phoneNo}
                </p>
                <p>
                  <strong>Zip Code:</strong> {user?.zipCode}
                </p>
                <p>
                  <strong>City:</strong> {user?.city}
                </p>
                <p>
                  <strong>State:</strong> {user?.state}
                </p>
                <p>
                  <strong>Country:</strong> {user?.country}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-md p-4 flex flex-col gap-6">
          <div>
            <h2 className="mb-4 text-xl font-semibold flex flex-col md:flex-row gap-2">
              Order Summary
            </h2>

            {/* Coupon Input */}
            <div className="mb-4 flex flex-col border-0 md:flex-row  md:border p-1 md:border-gray-300 md:rounded-full gap-3 ">
              <input
                type="text"
                placeholder="Apply coupon"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className=" px-3 py-2 w-full md:flex-1 border border-gray-400 rounded-full md:border-0"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-green-900 text-white px-12  py-2 rounded-full w-full md:w-auto"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="text-red-500 text-sm mt-1">{couponError}</p>
            )}

            <div className="text-sm max-h-40 overflow-y-auto mb-4">
              <p className="font-semibold mb-2">Available Coupons:</p>
              {coupons.map((coupon) => {
                const isEligible = subtotal >= (coupon.minSubtotal || 0);
                return (
                  <div
                    key={coupon.code}
                    className={`flex justify-between items-center p-2 rounded mb-1 ${
                      isEligible ? "bg-gray-100" : "bg-gray-300 opacity-50"
                    }`}
                  >
                    <div>
                      <p className="font-bold">{coupon.code}</p>
                      <p className="text-xs">{coupon.description}</p>
                    </div>
                    <button
                      className={`text-green-700 ${
                        !isEligible && "cursor-not-allowed"
                      }`}
                      onClick={() => isEligible && handleCopy(coupon.code)}
                      disabled={!isEligible}
                    >
                      Copy coupon
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

            <div className="space-y-2 mb-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => {
                    setPaymentMethod("paypal");
                    setShowPayPal(false);
                  }}
                />
                PayPal
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => {
                    setPaymentMethod("cod");
                    setShowPayPal(false);
                  }}
                />
                Cash on Delivery (COD)
              </label>
            </div>

            {/* Price Table */}
            <div className="text-sm border-t pt-3 space-y-1">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax (5%)</p>
                <p>+${(subtotal * 0.05).toFixed(2)}</p>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <p>Coupon ({appliedCoupon.code})</p>
                  <p>- ${discount.toFixed(2)}</p>
                </div>
              )}
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>+$5.00</p>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 mb-5">
                <p>Total</p>
                <p>${(subtotal * 1.05 - discount + 5).toFixed(2)}</p>
              </div>
            </div>
            {/* PAYPAL flow */}
            {paymentMethod === "paypal" && !showPayPal && (
              <button
                className="bg-green-900 text-white py-2 w-full  rounded-full"
                onClick={() => {
                  setShowPayPal(true);
                  setTimeout(() => {
                    if (window.paypal && paypalRef.current) {
                      paypalRef.current.innerHTML = "";
                      window.paypal
                        .Buttons({
                          createOrder: (data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: (
                                      subtotal * 1.05 -
                                      discount +
                                      5
                                    ).toFixed(2),
                                  },
                                },
                              ],
                            });
                          },
                          onApprove: (data, actions) => {
                            return actions.order.capture().then((details) => {
                              // setPayerName(details.payer.name.given_name);
                              // setTransactionId(details.id);
                              handlePlaceOrder(details);
                              // setShowModal(true);
                            });
                          },
                        })
                        .render(paypalRef.current);
                    }
                  }, 0);
                }}
              >
                Pay with PayPal
              </button>
            )}

            {paymentMethod === "paypal" && showPayPal && (
              <div ref={paypalRef} className="relative z-10"></div>
            )}

            {paymentMethod === "cod" && (
              <button
              onClick={(e) => {
                e.preventDefault();
                handlePlaceOrder();
              }}
                className="bg-green-900 text-white py-2 w-full rounded-full"
              >
                Pay cash on delivery
              </button>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <OrderSuccessModel
          onClose={handleModalClose}
          payerName={payerName}
          transactionId={transactionId}
        />
      )}
    </div>
  );
};

export default PlaceOrder;
