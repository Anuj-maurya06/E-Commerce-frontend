 
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const API = "https://e-commerce-backend-orcin-nine.vercel.app";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

   
  //handle payments
 const handleRazorpayPayment = async () => {
  try {
    setLoading(true);

    const { data } = await axios.post(`${API}/api/payment/create-order`, {
      amount: cart.reduce((total, item) => total + item.price, 0),
    });

    const { order } = data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "My Shop",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        try {
          await axios.post(`${API}/api/payment/verify-payment`, response);

          localStorage.removeItem("cart");
          setCart([]);
          toast.success("Payment Successful ✅");
          navigate("/dashboard/user/orders");
        } catch (err) {
          toast.error("Payment Verification Failed");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: auth?.user?.name,
        email: auth?.user?.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      toast.error("Payment Failed ❌");
      setLoading(false);
    });

    rzp.open();
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    setLoading(false);
  }
};

  return (
<Layout>
  <div className="cart-page">

    {/* HEADER */}
    <div className="row">
      <div className="col-12">
        <h1 className="text-center bg-light p-2 mb-3">
          {!auth?.user
            ? "Hello Guest"
            : `Hello ${auth?.token && auth?.user?.name}`}

          <p className="text-center mb-0">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : "Your Cart Is Empty"}
          </p>
        </h1>
      </div>
    </div>

    <div className="container">
      <div className="row">

        {/* LEFT SIDE - CART ITEMS */}
        <div className="col-12 col-md-7">

          {cart?.map((p) => (
            <div className="card mb-3 p-3 shadow-sm" key={p._id}>
              <div className="row g-3 align-items-center">

                {/* IMAGE */}
                <div className="col-12 col-md-4 text-center">
                  <img
                    src={`${API}/api/v1/product/product-photo/${p._id}`}
                    className="img-fluid rounded"
                    alt={p.name}
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </div>

                {/* DETAILS */}
                <div className="col-12 col-md-5 text-center text-md-start">
                  <p className="mb-1 fw-bold">{p.name}</p>
                  <p className="mb-1 text-muted">
                    {p.description.substring(0, 40)}...
                  </p>
                  <p className="mb-0">₹ {p.price}</p>
                </div>

                {/* REMOVE BUTTON */}
                <div className="col-12 col-md-3 text-center mt-2">
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="col-12 col-md-5 mt-4 mt-md-0">
          <div className="cart-summary p-3 border rounded bg-light">

            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />

            <h4>Total : {totalPrice()} </h4>

            {auth?.user?.address ? (
              <div className="mb-3">
                <h5>Current Address</h5>
                <p>{auth?.user?.address}</p>
                <button
                  className="btn btn-outline-warning w-100"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning w-100"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning w-100"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}

            {/* RAZORPAY BUTTON */}
            {auth?.token && cart?.length > 0 && (
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleRazorpayPayment}
                disabled={loading || !auth?.user?.address}
              >
                {loading ? "Processing..." : "Checkout with Razorpay"}
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  </div>
</Layout>
    
  );
};

export default CartPage;