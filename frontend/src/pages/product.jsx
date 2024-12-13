import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'; // Correctly import useParams from react-router-dom
import { ShopContext } from '../contest/ShopContext';
import Breadcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../components/DescriptionBox/descriptionBox'
import RelatedProduct from '../components/RelatedProduct/RelatedProduct'
import Cart from '../pages/cart'
 


const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams(); // Correct use of useParams

    // Find the product by converting productId to a number
    const product = all_product.find((e) => e.id === Number(productId));

    return (
        <div>
            <Cart/>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProduct />
            
        </div>
    );
};

export default Product;
