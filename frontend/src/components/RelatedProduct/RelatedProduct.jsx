import React from 'react'
import './RelatedProduct.css'
import data_product from '../Assets/data'
import { Link } from 'react-router-dom';

const RelatedProduct =()=>{
    return (

        <div className="relatedproducts">
            <h1>Related Product </h1>
            <hr />
            <div className="relatedproduct-items">
                   {data_product.map((item)=>{
                       return  <div key={item.id} className="product-card">
                       <Link to ={`/product/${item.id}`}><img onClick={window.scrollTo(0,0)} src={item.image} alt={item.name} className="product-image" /></Link>
                       <p className="product-name">{item.name}</p>
                      
                       <div className="item-prices">
                       <p className="new-price">${item.new_price}</p>
                       <p className="old-price">${item.old_price}</p>
                       </div>
                     </div>
                   })}
            </div>
        </div>
    )
}
export default RelatedProduct