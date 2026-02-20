 
import Layout from '../components/Layout/Layout';
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const API = "https://e-commerce-backend-orcin-nine.vercel.app";

const CategoryProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [products , setProduncts] = useState([])
  const [category , setCategory] = useState([])
  const [cart, setCart] = useCart();   // 🔥 CART ADDED

  useEffect(() => {
    if(params?.slug) getProductByCat()
  },[params?.slug])

  const getProductByCat = async ()=>{
    try{
      const {data} = await axios.get(`${API}/api/v1/product/product-category/${params.slug}`)
      setProduncts(data?.product)
      setCategory(data?.category)
    } catch(error){
      console.log(error)
    }
  }

  return (
    <Layout>
       <div className="container mt-3">
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>{products?.length} result found</h6>
      </div>

      <div className="row">
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>


   <div className="d-flex flex-wrap">
  {products?.map((p) => (
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
  ))}
</div>   

 

        </div>
      </div>
    </Layout>

  )
}

export default CategoryProduct
