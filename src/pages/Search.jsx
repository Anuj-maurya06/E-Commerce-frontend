import React from "react";
import { useSearch } from "../context/Search";
import Layout from "../components/Layout/Layout";

const API = "https://e-commerce-backend-orcin-nine.vercel.app";

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>

          <h6>
            {values?.results?.length < 1
              ? "No Products Found"
              : `Found ${values?.results?.length} Products`}
          </h6>

          <div className="d-flex flex-wrap mt-4 justify-content-center">
            {values?.results?.map((p) => (
              <div
                key={p._id}
                className="card m-2"
                style={{ width: "18rem" }}
              >
                <img
                  src={`${API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>

                  <p className="card-text">
                    {p.description?.substring(0, 30)}...
                  </p>

                  <p className="card-text">$ {p.price}</p>

                  <button className="btn btn-primary ms-1">
                    More Details
                  </button>

                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
