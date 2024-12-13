import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../contest/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png';
import new_collection from '../components/Assets/new_collections';
import { Link } from 'react-router-dom';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);

    // Convert props.category to lowercase to match the case used in all_product
    const selectedCategory = props.category.toLowerCase();

    // Filter new collections based on the selected category
    const filteredNewCollections = new_collection.filter(item => item.category === selectedCategory);

    // Filter all products based on the selected category
    const filteredProducts = all_product.filter(item => item.category === selectedCategory);

    return (
        <div className="shop-category">
            <img className='shopcategory-banner' src={props.banner} alt={`${props.category} banner`} />

            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing {filteredProducts.length + filteredNewCollections.length} </span> 
                    out of {filteredProducts.length + filteredNewCollections.length} products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="Sort" />
                </div>
            </div>

            <div className="shopcategory-products">
                {/* Render filtered products */}
                {filteredProducts.map(filteredItem => (
                    <div key={filteredItem.id} className="product-card">
                        <Link to={`/product/${filteredItem.id}`}>
                            <img
                                src={filteredItem.image}
                                alt={filteredItem.name}
                                className="product-image"
                            />
                        </Link>
                        <p className="product-name">{filteredItem.name}</p>
                        <p className="new-price">${filteredItem.new_price}</p>
                            <p className="old-price">${filteredItem.old_price}</p>
                    </div>
                ))}

                {/* Render filtered new collections */}
                {filteredNewCollections.map(item => (
                    <div key={item.id} className="product-card">
                        <Link to={`/product/${item.id}`}>
                            <img src={item.image} alt={item.name} className="product-image" />
                        </Link>
                        <p className="product-name">{item.name}</p>
                      
                        <div className="item-prices">
                            <p className="new-price">${item.new_price}</p>
                            <p className="old-price">${item.old_price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="shopcategory-loadmore">
                Explore more
            </div>
        </div>
    );
};


 

export default ShopCategory;
