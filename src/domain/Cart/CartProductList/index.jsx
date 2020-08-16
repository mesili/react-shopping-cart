import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Button from 'components/Button';
import { actions } from 'domain/Cart/state';
import { CartFull } from 'domain/Cart'
import QuantityButton from 'components/QuantityButton';
import Info from 'components/Info';
import './style.scss'

export const CartProductList = () => {

    const dispatch = useDispatch()

    const { maxProducts, products, selection } = useSelector(state => state.cart)

    if (!products || !products.length) {
        return (
            <div className="empty-cart">
                <Info>
                    No product in your cart.
                </Info>
            </div>
        )
    }

    const handleProductQuantity = (productId, qty) => qty > 0 && dispatch(actions.quantity(productId, qty))

    const handleProductCheck = productId => dispatch(actions.select(productId)) 

    const handleDelete = productId => dispatch(actions.del(productId))

    /* TODO : Split as separate CartProductListItem component */

    return (

        <div className="cart-product-list">
            {products.map(({
                id,
                title,
                coverImage,
                price,
                availableCoupon,
                quantity,
                onCheck,
                onQuantity,
            }) => (

                <div className="cart-product" key={`cart_product_${id}`}>

                    <div className="checkbox-container">
                        <input 
                            type="checkbox" 
                            onChange={() => handleProductCheck(id)} 
                            checked={selection.indexOf(id) !== -1}
                        />
                    </div>

                    <div className="picture">
                        <img src={coverImage} alt={`${title} picture`} />
                    </div>

                    <div className="description">
                        <div className="title">
                            {title}
                        </div>

                        <div className="remove">
                            <Button onClick={handleDelete}>
                                <FaTrash /> Remove
                            </Button>
                        </div>

                        <div className="price">
                            ${parseInt(price).toLocaleString()}USD
                            {availableCoupon === false ? (<span>No coupon</span>) : ''}
                        </div>

                    </div>

                    <div className="quantity">
                        <QuantityButton 
                            value={quantity} 
                            onChange={change => handleProductQuantity(id, quantity + change)} 
                        />
                    </div>

                </div>
            ))}

                {maxProducts && products.length >= maxProducts ? <CartFull /> :''}

        </div>

    );
}

export default CartProductList;
