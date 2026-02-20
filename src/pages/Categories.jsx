 import React from 'react'
 import {Link} from 'react-router-dom'
 import Layout from '../components/Layout/Layout'
 import useCategory from '../hooks/useCategory'
 
 const Categories = () => {
  const categories= useCategory()
   return (
   <Layout title={'All Categories'}>
 
  <div className="container py-5">
  <div className="row g-4">
    {categories.map((c) => (
      <div className="col-12 col-md-6 col-lg-4" key={c._id}>     
        <Link 
          to={`/category/${c.slug}`} 
          style={{ textDecoration: "none" }}
        >
          <div className="category-card">
            {c.name}
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

         
   </Layout>
   );
 };
 
 export default Categories