import React, { useEffect, useState } from 'react'
import './popular.css'

import {Link} from 'react-router-dom'

const Popular = () => {


        const [popularProducts,setPopularProducts]=useState([])

        useEffect(()=>{
            fetch(`${process.env.REACT_APP_BACKEND_URL}/popularinwomen`)
            .then((response)=>response.json())
            .then((data)=>setPopularProducts(data))

        },[])
    
    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popularProducts.map((item) => (
                    <div key={item.id} className="product-card">
                        <Link to ={`/product/${item.id}`}><img src={item.image} alt={item.name} className="product-image" /> </Link>
                        <p className="product-name">{item.name}</p>
                      
                        <div className="item-prices">
                        <p className="new-price">${item.new_price}</p>
                        <p className="old-price">${item.old_price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Popular
