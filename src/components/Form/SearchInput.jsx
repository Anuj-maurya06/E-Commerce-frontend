import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/Search";
 // ✅ Import context

const API = "https://e-commerce-backend-orcin-nine.vercel.app";

const SearchInput = () => {
  const [search, setSearch] = useSearch(); // ✅ Use context instead of local state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${API}/api/v1/product/search/${search.keyword}`
      );

      // ✅ Save results in context
      setSearch({ ...search, results: data.results });

      navigate("/search"); // Go to search page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword} // ✅ from context
          onChange={(e) =>
            setSearch({ ...search, keyword: e.target.value }) // ✅ update context
          }
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
