import React,{useState , useEffect} from 'react'
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast'
import axios from 'axios';


const API = "https://e-commerce-backend-orcin-nine.vercel.app";

const Profile = () => {

  const [auth , setAuth] = useAuth()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [phone,setPhone] = useState("")
const [address,setAddress] = useState("")

//get user data
useEffect(() =>{
      const{email ,name,phone,address} = auth.user
      setName(name)
      setPhone(phone)
      setEmail(email)
      setAddress(address)

},[])


//forn function
const handleSubmit = async (e)=>{
e.preventDefault()
 try{
const {data} = await axios.put( `${API}/api/v1/auth/profile`,{
  name,
  email,
  password,
  phone,
  address, 
});
 if(data?.error){
  toast.error(data?.error)
 }else{
  setAuth({...auth, user:data?.updateduser})
  let ls = localStorage.getItem("auth")
  ls = JSON.parse(ls)
  ls.user = data.updateduser
  localStorage.setItem('auth',JSON.stringify(ls));
  toast.success("Profile Updated Successfully");
 }
 }catch(error){
console.log(error)
toast.error("Something went wrong")
 }
}

  return (
       <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
       <h4 className="title">USER PROFILE</h4>
  <form onSubmit={handleSubmit}>

    <div className="m-3">  
      <input
      type="text"
      value={name}
      onChange={(e)=>setName(e.currentTarget.value)}
      className="form-control"
      id="exampleInputEmail"
      placeholder='Enter your name'
    
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
      disabled
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
      
      />
    </div>

 <button type="submit" className="btn btn-prinary">
  UPDATE
 </button>

  </form>
 </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile