import React, { useEffect, useState } from 'react'
import './NewCollections.css'

import {Link} from 'react-router-dom'
const NewCollections=()=>{

    const [new_collection,setNew_collection]=useState([])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/newcollections`)
        .then((response)=>response.json())
        .then((data)=>setNew_collection(data))
    },[])
    return (
        <div className='newcollections'>
           <h1>NEW COLLECTIONS</h1>
           <hr />
           <div className="collections">
           {new_collection.map((item ) => (
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
export default NewCollections
