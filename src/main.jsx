import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/Search.jsx'
import "antd/dist/reset.css";
 import {CartProvider} from './context/Cart.jsx'

 

// 🔥 Bootstrap imports (MOST IMPORTANT)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider> 
      <CartProvider>
     <BrowserRouter>
    <App />
  </BrowserRouter>
  </CartProvider>
  </SearchProvider>
  </AuthProvider>
);
