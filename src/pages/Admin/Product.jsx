 


import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
 

const API = "https://e-commerce-backend-orcin-nine.vercel.app";

const Products = () => {

  const [products, setProducts] = useState([]);
  

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
 
          <div className="d-flex flex-wrap">
  {products?.map((p) => (
             
               <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                
    <div 
      key={p._id}
      className="card m-2"
      style={{ width: "18rem" }}
    >    
      
      <img
        src={`${API}/api/v1/product/product-photo/${p._id}`}
        className="card-img-top"
        alt={p.name}
        style={{
          height: "200px",
          objectFit: "cover"
        }}
      />

      <div className="card-body">

        🔥 Name + Price Row
         <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{p.name}</h5>
          <h5 className="card-title text-primary mb-0">
            {p.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h5>
        </div>

        
        <p className="card-text mt-2">
          {p.description.substring(0, 60)}...
        </p>

        {/* Buttons */}
          <div className="d-flex justify-content-between">
          <button 
            className="btn btn-info btn-sm"
            onClick={() => navigate(`/product/${p.slug}`)}
          >
            More Details
          </button>

          <button 
            className="btn btn-dark btn-sm"
            onClick={()=>{
              setCart([...cart,p]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, p])
              );
              toast.success('Item Added to cart')
            }}
          >
            ADD TO CART
          </button>
        </div>

      </div>
    </div>
    </Link>
  ))}
</div>   
                
        </div>
      </div>
    </Layout>
  );
};

export default Products;

 
