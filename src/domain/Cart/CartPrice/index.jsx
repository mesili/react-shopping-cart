import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegCreditCard  } from 'react-icons/fa';
import { useToasts } from 'react-toast-notifications'
import Button  from 'components/Button';
import { Coupon } from 'domain/Cart/Coupon';
import './style.scss';


export const CartPrice = () => {
    
    const { 
        prices,
        products,
    } = useSelector(state => state.cart)

    const { addToast } = useToasts()

    const {
        initialPrice,
        couponPrice,
        finalPrice,
    } = prices 

    const handleClick = () => addToast('The demo stops here :-)', { appearance: 'info' })

    return (

        <div className="cart-price">
            <h3>Checkout prices</h3>

            <dl>
                <dt>Initial price</dt>
                <dd>${initialPrice.toLocaleString()}USD</dd>
            </dl>

            <Coupon />

            {couponPrice > 0 && (
                <dl>
                    <dt>Coupon discounts</dt>
                    <dd><b>-{couponPrice.toLocaleString()}</b></dd>
                </dl>
            )}

            <dl className="total">
                <dt>Total price</dt>
                <dd>${finalPrice.toLocaleString()}USD</dd>
            </dl>

            {!products || !products.length ? '' :  (
                <Button 
                    block 
                    className="checkout-button"
                    onClick={handleClick}
                >
                    <FaRegCreditCard /> Proceed to payment
                </Button>
            )}
        </div>

    );
}

export default CartPrice;
