 import React from 'react'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {Routes,Route} from 'react-router-dom'
 import HomePages from './pages/HomePages';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import Forgotpassword from './pages/Auth/Forgotpassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import FaqPage from './pages/FaqPages'
 
 
 const App = () => {
   return (
    <>
     <Routes>

      <Route path='/' element={<HomePages/>}/>
         <Route path='/categories' element={<Categories/>}/>
             <Route path='/cart' element={<CartPage/>}/>
             <Route path='/category/:slug' element={<CategoryProduct/>}/>
        <Route path='/search' element={<Search/>}/>
       <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>}/> 
           <Route path='user/orders' element={<Order/>}/>   
            <Route path='user/profile' element={<Profile/>}/>        
       </Route> 

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/create-user" element={<Users />} />
        </Route>

         <Route path='/register' element={<Register/>}/>
          <Route path='/forgot-password' element={<Forgotpassword/>}/>
      <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>  
          <Route path='/contact' element={<Contact/>}/>
            <Route path='/policy' element={<Policy/>}/>
              <Route path='/faq' element={<FaqPage/>}/>

              <Route path='*' element={<Pagenotfound/>}/>
    
     </Routes>
      </>
   )
 }
 
 export default App