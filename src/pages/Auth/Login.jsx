import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [auth , setAuth] = useAuth()

  const navigate = useNavigate();
const Location = useLocation();

  const API = "https://e-commerce-backend-orcin-nine.vercel.app";

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //backend call  
      const res = await axios.post(`${API}/api/v1/auth/login`, {
        //Ye body payload hai jo backend ko bheja ja raha hai
        //jo ki req.body me milenge
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth",JSON.stringify(res.data));
        navigate(Location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>

             <div className= "mb-3 mt-3">
               <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
            FORGOT PASSWORD
          </button>
             </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;