import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
 import toast from 'react-hot-toast';
 import axios from "axios";
 import {useNavigate} from "react-router-dom";
import "../../styles/AuthStyles.css";
const Register = ()=>{

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [phone,setPhone] = useState("")
const [address,setAddress] = useState("")
const [answer, setAnswer]  = useState("")
const navigate = useNavigate()

const API = "https://e-commerce-backend-orcin-nine.vercel.app";

//forn function
const handleSubmit = async (e)=>{
e.preventDefault()
 try{
const res = await axios.post( `${API}/api/v1/auth/register`,{
  name,
  email,
  password,
  phone,
  address,
  answer,
});
if(res.data.success){
  toast.success(res.data && res.data.message)
  navigate('/login')
}else{
  toast.error(res.data.message)
}
 }catch(error){
console.log(error)
toast.error("Something went wrong")
 }
}


  return (
    <Layout title="Register - Ecommerce App">

 <div className="form-container">
       <h4 className="title">REGISTER FORM</h4>
  <form onSubmit={handleSubmit}>

    <div className="m-3">  
      <input
      type="text"
      value={name}
      onChange={(e)=>setName(e.currentTarget.value)}
      className="form-control"
      id="exampleInputEmail"
      placeholder='Enter your name'
      required
      />
    </div>

      <div className="m-3">  
      <input
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.currentTarget.value)}
      className="form-control"
      id="exampleInputPassword"
      placeholder='Enter your email'
      required
      />
    </div>

      <div className="m-3">  
      <input
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.currentTarget.value)}
      className="form-control"
      id="exampleInputPassword"
      placeholder='Enter your password'
      required
      />
    </div>

     <div className="m-3">     
      <input
      type="text"
      value={phone}
      onChange={(e)=>setPhone(e.currentTarget.value)}
      className="form-control"
      id="exampleInputPassword"
      placeholder='Enter your phone'
      required
      />
    </div>

    <div className="m-3">  
      <input
      type="text"
      value={address}
      onChange={(e)=>setAddress(e.currentTarget.value)}
      className="form-control"
      id="exampleInputPassword"
      placeholder='Enter your address'
      required
      />
    </div>

    
    <div className="m-3">  
      <input
      type="text"
      value={answer}
      onChange={(e)=>setAnswer(e.currentTarget.value)}
      className="form-control"
      id="exampleInputPassword"
      placeholder='What is Your Favorite sports'
      required
      />
    </div>
 
 <button type="submit" className="btn btn-prinary">
  Submit
 </button>

  </form>
 </div>

    </Layout>
  )
}

export default Register