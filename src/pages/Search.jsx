import React from "react";
import { useSearch } from "../context/Search";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const API = "https://e-commerce-backend-orcin-nine.vercel.app";

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
  
    <Layout title={"Search Results"}>
  <div className="container mt-3">
    <h4 className="text-center">Search Results</h4>
    <h6 className="text-center">
      {values?.results?.length < 1
        ? "No Products Found"
        : `${values?.results?.length} result found`}
    </h6>
  </div>

  <div className="container">
    <div className="row justify-content-center">

      {values?.results?.map((p) => (
        <div
          key={p._id}
          className="col-12 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center mb-4"
        >
          <div
            className="card h-100"
            style={{ width: "100%", maxWidth: "320px" }}
          >
            <img
              src={`${API}/api/v1/product/product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
              style={{
                height: "200px",
                objectFit: "cover",
              }}
            />

            <div className="card-body d-flex flex-column">
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
                {p.description?.substring(0, 60)}...
              </p>

              <div className="mt-auto">
                <button
                  className="btn btn-info w-100 mb-2"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>

                <button
                  className="btn btn-dark w-100"
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
        </div>
      ))}

    </div>
  </div>
</Layout>
  );
};

export default Search;
