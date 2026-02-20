import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import {useCart} from '../context/Cart';
import toast from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";

import "../styles/Homepage.css";

  const API = "https://e-commerce-backend-orcin-nine.vercel.app";


const HomePage = () => {
  const navigate = useNavigate();
  const [cart , setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    //adding
     getAllProducts();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if (page === 1) return;

  if (checked.length === 0 && radio.length === 0) {
    loadMore();
  }
}, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
const handleFilter = (value, id) => {
  if (value) {
    setChecked([id]);  
  } else {
    setChecked([]);  
  }
};

useEffect(() => {
  setPage(1);

  if (checked.length === 0 && radio.length === 0) {
    getAllProducts();
  } else {
    filterProduct();
  }
}, [checked, radio]);

  const filterProduct = async () => {
  try {
    setLoading(true);
    const { data } = await axios.post(
      `${API}/api/v1/product/product-filters`,
      { checked, radio }
    );
    setLoading(false);
    setProducts(data?.products);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};


  return (
    <Layout title={"ALl Products - Best offers "}>

  {/* ====== Carousel Banner Start ====== */}
  <div className="container-fluid px-0">
    <div
      id="homepageCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/image/banner 4.jpg"
            className="d-block w-100"
            alt="Banner 1"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="/image/banner 3.webp"
            className="d-block w-100"
            alt="Banner 2"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="/image/banner 1.jpg"
            className="d-block w-100"
            alt="Banner 3"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="/image/banner2.jpg"
            className="d-block w-100"
            alt="Banner 4"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#homepageCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#homepageCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
   
 <section className="py-3">
      <div className="container text-center">
        <h2 className="mb-4">Shop by Category</h2>

        <div className="row g-4">

          {/* Analog */}
          <div className="col-6 col-md-3">
            <div 
              className="card shadow-lg h-100 border-0"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/analog")}
            >
              <img
                src="/image/l1.webp"
                className="card-img-top p-3"
                alt="Analog Watch"
              />
              <div className="card-body">
                <h5 className="card-title">Analog</h5>
              </div>
            </div>
          </div>

          {/* Digital */}
          <div className="col-6 col-md-3">
            <div
              className="card shadow-lg h-100 border-0"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/digital")}
            >
              <img
                src="/image/l2.webp"
                className="card-img-top p-3"
                alt="Digital Watch"
              />
              <div className="card-body">
                <h5 className="card-title">Digital</h5>
              </div>
            </div>
          </div>

          {/* Smart Watch */}
          <div className="col-6 col-md-3">
            <div
              className="card shadow-lg h-100 border-0"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/smart-watches")}
            >
              <img
                src="/image/l3.jpg"
                className="card-img-top p-3"
                alt="Smart Watch"
              />
              <div className="card-body">
                <h5 className="card-title">Smart Watch</h5>
              </div>
            </div>
          </div>

          {/* Luxury */}
          <div className="col-6 col-md-3">
            <div
              className="card shadow-lg h-100 border-0"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/luxury")}
            >
              <img
                src="/image/l4.jpg"
                className="card-img-top p-3"
                alt="Luxury Watch"
              />
              <div className="card-body">
                <h5 className="card-title">Luxury</h5>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


  <div className="container-fluid row mt-3">
    {/* Sidebar + Products */}
  </div>

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (          
             <Checkbox
                key={c._id}
                checked={checked.includes(c._id)}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                 >
                 {c.name}
                 </Checkbox>

            ))}
          </div>
          
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div 
                key={p._id}
              className="card m-2 "
              //  style={{ width: "18rem" }}>  
                >
                <img
                  src={`${API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />

     
       <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>

 

  );
};

export default HomePage;

 
