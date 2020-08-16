import React from 'react';
import Info from 'components/Info';
import { useSelector } from 'react-redux';

export const CartFull = () => {

    const { maxProducts } = useSelector(state => state.cart) 

    return (
        <div className="cart-full">
            <Info>
                You can add up to {maxProducts} to your cart.
            </Info>
        </div>
    )
}

export default CartFull
