import React from 'react';
import PropTypes from 'prop-types';
import CartButton from 'domain/Cart/CartButton';
import './style.scss';


export const ProductItem = ({
    id,
    title, 
    price, 
    picture
}) => (
    <div className="product-item">

        <div className="picture-container">
            <img 
                className="picture" 
                src={picture} 
                alt={`${title} picture`}
            />
        </div>

        <div className="title">{title}</div>

        <div className="bottom">

            <div className="product-actions">
                <CartButton productId={id} />
            </div>

            <span className="price">${price.toLocaleString()}USD</span>

        </div>

    </div>
)

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
}

export default ProductItem;
